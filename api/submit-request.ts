import crypto from 'crypto';

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  project_id?: string;
  [key: string]: any;
}

interface SubmissionRecord {
  lastSubmittedAt: number;
  hash: string;
}

// In-memory cache for Google OAuth token, rate limiting, and duplicate protection
let cachedToken: { token: string; expiresAt: number } | null = null;
const submissionHistory = new Map<string, SubmissionRecord>();
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function getISTTimestamp(): string {
  const d = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(d);
  const map: Record<string, string> = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
}

function parseServiceAccountCredentials(): ServiceAccountCredentials {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw || !raw.trim()) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
  }

  let cleaned = raw.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    try {
      cleaned = JSON.parse(cleaned);
    } catch {
      cleaned = cleaned.slice(1, -1);
    }
  }

  let creds: any;
  try {
    creds = typeof cleaned === 'object' ? cleaned : JSON.parse(cleaned);
  } catch {
    throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Please ensure it is valid JSON.');
  }

  if (!creds.client_email || !creds.private_key) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is missing client_email or private_key fields.');
  }

  if (typeof creds.private_key === 'string' && creds.private_key.includes('\\n')) {
    creds.private_key = creds.private_key.replace(/\\n/g, '\n');
  }

  return creds as ServiceAccountCredentials;
}

async function getGoogleAccessToken(creds: ServiceAccountCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.token;
  }

  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64UrlEncode = (obj: object): string =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(claimSet)}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  sign.end();
  const signature = sign
    .sign(creds.private_key)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Google OAuth Error]:', response.status, errorText);
    throw new Error(`Google OAuth authentication failed (${response.status})`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in || 3600)
  };

  return data.access_token;
}

async function appendCustomerSubmission(params: {
  customerName: string;
  awbNumber: string;
  message: string;
}) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId || !sheetId.trim()) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not configured.');
  }

  const creds = parseServiceAccountCredentials();
  const accessToken = await getGoogleAccessToken(creds);
  const timestamp = getISTTimestamp();

  const rowValues = [
    timestamp,
    params.customerName.trim(),
    params.awbNumber.trim(),
    params.message.trim()
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    sheetId.trim()
  )}/values/A:D:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const appendResponse = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [rowValues] })
  });

  if (!appendResponse.ok) {
    const errText = await appendResponse.text();
    console.error('[Google Sheets Append Error]:', appendResponse.status, errText);
    throw new Error(`Google Sheets API error (${appendResponse.status})`);
  }

  const resultData = (await appendResponse.json()) as any;
  return {
    success: true,
    timestamp,
    updatedRange: resultData?.updates?.updatedRange || 'A:D'
  };
}

function sanitizeString(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, maxLength);
}

export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    });
  }

  try {
    const clientIp = (
      req.headers?.['x-forwarded-for'] ||
      req.socket?.remoteAddress ||
      'unknown-ip'
    ).toString().split(',')[0].trim();

    // 1. Rate limiting check (max 10 requests per 10 minutes per IP)
    const now = Date.now();
    const ipData = ipRequestCounts.get(clientIp);
    if (ipData && ipData.resetAt > now) {
      if (ipData.count >= 10) {
        return res.status(429).json({
          success: false,
          message: 'Too many submissions from your connection. Please wait a few minutes before trying again.'
        });
      }
      ipData.count += 1;
    } else {
      ipRequestCounts.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    const parsedBody =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : (req.body || {});

    const {
      customerName: rawCustomerName,
      awbNumber: rawAwbNumber,
      message: rawMessage,
      _hp
    } = parsedBody;

    // 2. Honeypot check
    if (_hp) {
      return res.status(200).json({
        success: true,
        message: 'Your Christmas wish has been received!'
      });
    }

    // 3. Data sanitization
    const customerName = sanitizeString(rawCustomerName, 100);
    const awbNumber = sanitizeString(rawAwbNumber, 60) || '-';
    const message = sanitizeString(rawMessage, 3000);

    // 4. Validation
    if (!customerName || customerName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your name.'
      });
    }

    if (!message || message.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please share your Christmas wish with us.'
      });
    }

    // 5. Duplicate submission check (same sender & wish within 60 seconds)
    const submissionHash = `${clientIp}:${customerName.toLowerCase()}:${awbNumber.toLowerCase()}:${message.slice(0, 50).toLowerCase()}`;
    const previous = submissionHistory.get(submissionHash);
    if (previous && now - previous.lastSubmittedAt < 60000) {
      return res.status(400).json({
        success: false,
        message: 'You have recently submitted this wish. Please wait a moment before sending again.'
      });
    }

    // 6. Append to Google Sheets
    const result = await appendCustomerSubmission({
      customerName,
      awbNumber,
      message
    });

    submissionHistory.set(submissionHash, {
      lastSubmittedAt: now,
      hash: submissionHash
    });

    if (submissionHistory.size > 500) {
      for (const [key, val] of submissionHistory.entries()) {
        if (now - val.lastSubmittedAt > 120000) {
          submissionHistory.delete(key);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your Christmas wish has been received! Thank you for sharing your happiness with Skyone International.',
      timestamp: result.timestamp
    });

  } catch (error: any) {
    const errorMsg = error?.message || 'Internal server error';
    console.error('[Submit Request API Error]:', errorMsg);

    if (errorMsg.includes('GOOGLE_SHEET_ID') || errorMsg.includes('GOOGLE_SERVICE_ACCOUNT_JSON')) {
      return res.status(503).json({
        success: false,
        message: 'Google Sheets integration is currently being configured on the server. Please check back shortly.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'We were unable to submit your wish at this moment. Please check your connection or try again shortly.'
    });
  }
}

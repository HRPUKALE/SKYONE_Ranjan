import crypto from 'crypto';

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  project_id?: string;
  [key: string]: any;
}

interface AppendCustomerSubmissionParams {
  customerName: string;
  awbNumber: string;
  message: string;
}

interface AppendResult {
  success: boolean;
  timestamp: string;
  updatedRange?: string;
  error?: string;
}

// In-memory cache for Google OAuth token
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Returns the current timestamp in India Standard Time (Asia/Kolkata)
 * Format: YYYY-MM-DD HH:mm:ss
 */
export function getISTTimestamp(): string {
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

/**
 * Parses and validates Google Service Account JSON
 */
function parseServiceAccountCredentials(): ServiceAccountCredentials {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw || !raw.trim()) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
  }

  let cleaned = raw.trim();
  // Strip outer quotes if enclosed
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
  } catch (err: any) {
    throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Please ensure it is valid JSON.');
  }

  if (!creds.client_email || !creds.private_key) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is missing client_email or private_key fields.');
  }

  // Replace escaped \n if present in private_key
  if (typeof creds.private_key === 'string' && creds.private_key.includes('\\n')) {
    creds.private_key = creds.private_key.replace(/\\n/g, '\n');
  }

  return creds as ServiceAccountCredentials;
}

/**
 * Obtains an OAuth2 Bearer Access Token for Google Sheets API using Service Account JWT
 */
async function getGoogleAccessToken(creds: ServiceAccountCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Return cached token if valid for at least 5 more minutes
  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.token;
  }

  // Build JWT header and payload
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const claimSet = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64UrlEncode = (obj: object): string => {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedClaimSet = base64UrlEncode(claimSet);
  const unsignedToken = `${encodedHeader}.${encodedClaimSet}`;

  // Sign using RSA-SHA256
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

  // Request OAuth access token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Google OAuth Error]:', response.status, errorText);
    throw new Error(`Google OAuth authentication failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in || 3600)
  };

  return data.access_token;
}

/**
 * Appends a customer submission to Google Sheets
 * Columns: A: Timestamp | B: Customer Name | C: AWB / Tracking Number | D: Message / Requirements
 */
export async function appendCustomerSubmission(
  params: AppendCustomerSubmissionParams
): Promise<AppendResult> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId || !sheetId.trim()) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not configured.');
  }

  const creds = parseServiceAccountCredentials();
  const accessToken = await getGoogleAccessToken(creds);
  const timestamp = getISTTimestamp();

  // Clean and prepare row values
  const rowValues = [
    timestamp,
    params.customerName.trim(),
    params.awbNumber.trim(),
    params.message.trim()
  ];

  // Append row to first worksheet columns A:D
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    sheetId.trim()
  )}/values/A:D:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const appendResponse = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [rowValues]
    })
  });

  if (!appendResponse.ok) {
    const errText = await appendResponse.text();
    console.error('[Google Sheets Append Error]:', appendResponse.status, errText);
    throw new Error(`Google Sheets API error (${appendResponse.status}): ${errText}`);
  }

  const resultData = (await appendResponse.json()) as any;
  const updatedRange = resultData?.updates?.updatedRange || 'A:D';

  return {
    success: true,
    timestamp,
    updatedRange
  };
}

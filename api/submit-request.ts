import { appendCustomerSubmission } from './_googleSheets';

// In-memory rate limiting & duplicate submission cache
interface SubmissionRecord {
  lastSubmittedAt: number;
  hash: string;
}

const submissionHistory = new Map<string, SubmissionRecord>();
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function sanitizeString(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, maxLength);
}

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin;
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
      req.headers['x-forwarded-for'] ||
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

    const {
      customerName: rawCustomerName,
      awbNumber: rawAwbNumber,
      message: rawMessage,
      _hp
    } = req.body || {};

    // 2. Honeypot check (spam bots filling hidden field)
    if (_hp) {
      // Silently succeed so bot does not retry
      return res.status(200).json({
        success: true,
        message: 'Your message has been received successfully.'
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
        message: 'You have recently submitted this request. Please wait a moment before sending again.'
      });
    }

    // 6. Append to Google Sheets
    const result = await appendCustomerSubmission({
      customerName,
      awbNumber,
      message
    });

    // Record submission to prevent duplicates
    submissionHistory.set(submissionHash, {
      lastSubmittedAt: now,
      hash: submissionHash
    });

    // Clean up old submission history entries periodically
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

    // Provide friendly, non-sensitive error messages to customer
    if (errorMsg.includes('GOOGLE_SHEET_ID') || errorMsg.includes('GOOGLE_SERVICE_ACCOUNT_JSON')) {
      return res.status(503).json({
        success: false,
        message: 'Google Sheets integration is currently being configured on the server. Please check back shortly.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'We were unable to submit your request at this moment. Please check your connection or try again shortly.'
    });
  }
}

function sanitizeString(input: unknown, maxLength = 255): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const clean = email.trim();
  return clean.length >= 5 && clean.length <= 100 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean);
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
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const {
    name: rawName,
    email: rawEmail,
    phone: rawPhone,
    subject: rawSubject,
    message: rawMessage,
    _hp
  } = req.body || {};

  if (_hp) {
    return res.status(200).json({
      success: true,
      ticketId: 'SKY-T' + Math.floor(10000 + Math.random() * 90000),
      message: 'Thank you for reaching out.'
    });
  }

  const name = sanitizeString(rawName, 80);
  const email = sanitizeString(rawEmail, 100).toLowerCase();
  const phone = sanitizeString(rawPhone, 30);
  const subject = sanitizeString(rawSubject, 100) || 'General Inquiry';
  const message = sanitizeString(rawMessage, 2000);

  if (!name) return res.status(400).json({ success: false, message: 'Your name is required.' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  if (!message) return res.status(400).json({ success: false, message: 'Please provide an inquiry message.' });

  const ticketId = 'SKY-T' + Math.floor(10000 + Math.random() * 90000);

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'SkyOne International Courier',
          type: 'CONTACT',
          referenceId: ticketId,
          name,
          email,
          phone,
          subject,
          message
        })
      });
    } catch (err: any) {
      console.error('Webhook error:', err.message);
    }
  }

  return res.status(200).json({
    success: true,
    ticketId,
    message: 'Your inquiry ticket has been logged with our 24/7 operations desk. A SkyOne representative will respond shortly.'
  });
}

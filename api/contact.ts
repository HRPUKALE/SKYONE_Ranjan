import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER || 'skyonesupport@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : 'fkgoinbrnwojgxay';
const TARGET_EMAIL = process.env.DISPATCH_EMAIL_NOTIFICATION || 'skyonesupport@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

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

async function sendContactEmail(data: {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const mailSubject = `[Contact Inquiry] ${data.referenceId} - ${data.subject} (${data.name})`;

  const textBody = `
========================================
NEW CONTACT / SUPPORT INQUIRY
========================================

Reference ID: ${data.referenceId}
Date & Time:  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

CUSTOMER DETAILS:
-----------------
Name:  ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

SUBJECT:
--------
${data.subject}

MESSAGE:
--------
${data.message}

========================================
SkyOne International Courier Service
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 20px; background: #f8fafc; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
    .header { border-bottom: 2px solid #024BB2; padding-bottom: 10px; margin-bottom: 16px; }
    .header h2 { margin: 0; color: #024BB2; font-size: 18px; }
    .ref { font-size: 13px; color: #64748b; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { padding: 8px 10px; text-align: left; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    th { width: 30%; color: #475569; background: #f8fafc; }
    td { color: #0f172a; font-weight: 500; }
    .section-title { font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
    .notes { background: #f8fafc; border-left: 3px solid #024BB2; padding: 10px; font-size: 13px; margin-top: 8px; }
    .footer { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>New Contact / Support Inquiry</h2>
      <div class="ref">Ticket: <strong>${data.referenceId}</strong> | ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
    </div>

    <div class="section-title">Inquirer Details</div>
    <table>
      <tr><th>Full Name</th><td>${data.name}</td></tr>
      <tr><th>Email Address</th><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><th>Phone / Mobile</th><td><a href="tel:${data.phone}">${data.phone || 'N/A'}</a></td></tr>
      <tr><th>Subject</th><td>${data.subject}</td></tr>
    </table>

    <div class="section-title">Message Body</div>
    <div class="notes">${data.message.replace(/\n/g, '<br/>')}</div>

    <div class="footer">
      SkyOne International Courier Service &bull; Automated Inquiry Desk
    </div>
  </div>
</body>
</html>
`;

  await transporter.sendMail({
    from: `"SkyOne Inquiries" <${SMTP_USER}>`,
    to: TARGET_EMAIL,
    replyTo: data.email,
    subject: mailSubject,
    text: textBody,
    html: htmlBody,
  });
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

  try {
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

    // Send Email to skyonesupport@gmail.com
    await sendContactEmail({
      referenceId: ticketId,
      name,
      email,
      phone,
      subject,
      message
    });

    return res.status(200).json({
      success: true,
      ticketId,
      message: 'Your inquiry ticket has been logged with our 24/7 operations desk. A SkyOne representative will respond shortly.'
    });
  } catch (err: any) {
    console.error('[Contact API Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process inquiry. Please try again later.'
    });
  }
}

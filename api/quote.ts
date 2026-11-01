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

async function sendQuoteEmail(data: {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  pickupCountry: string;
  pickupState?: string;
  pickupCity: string;
  destinationCountry: string;
  destinationCity: string;
  weight: number | string;
  shipmentType: string;
  message?: string;
}) {
  const pickupLocation = [data.pickupCity, data.pickupState, data.pickupCountry].filter(Boolean).join(', ');
  const destinationLocation = [data.destinationCity, data.destinationCountry].filter(Boolean).join(', ');

  const subject = `[New Shipping Quote] ${data.referenceId} - ${data.name} (${pickupLocation} -> ${destinationLocation})`;

  const textBody = `
========================================
NEW INTERNATIONAL SHIPPING QUOTE REQUEST
========================================

Reference ID: ${data.referenceId}
Date & Time:  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

CUSTOMER DETAILS:
-----------------
Name:  ${data.name}
Email: ${data.email}
Phone: ${data.phone}

ROUTE INFORMATION:
------------------
Pickup Location:      ${pickupLocation}
Destination Location: ${destinationLocation}

CONSIGNMENT DETAILS:
--------------------
Shipment Type: ${data.shipmentType}
Weight:        ${data.weight} kg

SPECIAL INSTRUCTIONS:
---------------------
${data.message || 'None provided'}

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
    th { width: 35%; color: #475569; background: #f8fafc; }
    td { color: #0f172a; font-weight: 500; }
    .section-title { font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
    .notes { background: #f8fafc; border-left: 3px solid #024BB2; padding: 10px; font-size: 13px; margin-top: 8px; }
    .footer { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>New International Shipping Quote Request</h2>
      <div class="ref">Ref: <strong>${data.referenceId}</strong> | ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
    </div>

    <div class="section-title">Customer Details</div>
    <table>
      <tr><th>Full Name</th><td>${data.name}</td></tr>
      <tr><th>Phone / Mobile</th><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
      <tr><th>Email Address</th><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
    </table>

    <div class="section-title">Route Information</div>
    <table>
      <tr><th>Pickup Location</th><td>${pickupLocation}</td></tr>
      <tr><th>Destination</th><td>${destinationLocation}</td></tr>
    </table>

    <div class="section-title">Consignment Specifications</div>
    <table>
      <tr><th>Shipment Type</th><td>${data.shipmentType}</td></tr>
      <tr><th>Approx Weight</th><td><strong>${data.weight} kg</strong></td></tr>
    </table>

    ${data.message ? `
    <div class="section-title">Special Instructions</div>
    <div class="notes">${data.message.replace(/\n/g, '<br/>')}</div>
    ` : ''}

    <div class="footer">
      SkyOne International Courier Service &bull; Automated Lead Notification
    </div>
  </div>
</body>
</html>
`;

  await transporter.sendMail({
    from: `"SkyOne Form Leads" <${SMTP_USER}>`,
    to: TARGET_EMAIL,
    replyTo: data.email,
    subject,
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
      company: rawCompany,
      pickupCountry: rawPickupCountry,
      pickupState: rawPickupState,
      pickupCity: rawPickupCity,
      destinationCountry: rawDestinationCountry,
      destinationCity: rawDestinationCity,
      weight: rawWeight,
      shipmentType: rawShipmentType,
      dimensions: rawDimensions,
      message: rawMessage,
      _hp
    } = req.body || {};

    if (_hp) {
      return res.status(200).json({
        success: true,
        quoteId: 'SKY-Q' + Math.floor(100000 + Math.random() * 900000),
        message: 'Your shipping quote request has been received.'
      });
    }

    const name = sanitizeString(rawName, 80);
    const email = sanitizeString(rawEmail, 100).toLowerCase();
    const phone = sanitizeString(rawPhone, 30);
    const pickupCountry = sanitizeString(rawPickupCountry, 60);
    const pickupState = sanitizeString(rawPickupState, 60);
    const pickupCity = sanitizeString(rawPickupCity, 60);
    const destinationCountry = sanitizeString(rawDestinationCountry, 60);
    const destinationCity = sanitizeString(rawDestinationCity, 60);
    const shipmentType = sanitizeString(rawShipmentType, 50) || 'Household Parcel';
    const message = sanitizeString(rawMessage, 1500);

    if (!name) return res.status(400).json({ success: false, message: 'Full name is required.' });
    if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    if (!phone || phone.length < 7) return res.status(400).json({ success: false, message: 'A valid phone or mobile number is required.' });
    if (!pickupCountry || !destinationCountry) return res.status(400).json({ success: false, message: 'Pickup country and destination country are required.' });

    const parsedWeight = parseFloat(String(rawWeight));
    if (isNaN(parsedWeight) || parsedWeight <= 0 || parsedWeight > 100000) {
      return res.status(400).json({ success: false, message: 'A valid package weight between 0.01 kg and 100,000 kg is required.' });
    }

    const quoteRef = 'SKY-Q' + Math.floor(100000 + Math.random() * 900000);

    // Send Email to skyonesupport@gmail.com
    await sendQuoteEmail({
      referenceId: quoteRef,
      name,
      email,
      phone,
      pickupCountry,
      pickupState,
      pickupCity,
      destinationCountry,
      destinationCity,
      weight: parsedWeight,
      shipmentType,
      message
    });

    return res.status(200).json({
      success: true,
      quoteId: quoteRef,
      message: 'Your shipping quote request has been received. Our operations team will contact you shortly.'
    });
  } catch (err: any) {
    console.error('[Quote API Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process shipping quote. Please try again later.'
    });
  }
}

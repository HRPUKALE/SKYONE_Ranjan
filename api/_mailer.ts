import nodemailer from 'nodemailer';

// Email credentials
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

export interface QuoteEmailPayload {
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
}

export interface ContactEmailPayload {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Send Quote Notification Email
 */
export async function sendQuoteEmail(data: QuoteEmailPayload) {
  const pickupLocation = [data.pickupCity, data.pickupState, data.pickupCountry].filter(Boolean).join(', ');
  const destinationLocation = [data.destinationCity, data.destinationCountry].filter(Boolean).join(', ');

  const subject = `[New Shipping Quote] ${data.referenceId} - ${data.name} (${pickupLocation} → ${destinationLocation})`;

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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; margin: 0; padding: 20px; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; }
    .header { border-bottom: 2px solid #024BB2; padding-bottom: 12px; margin-bottom: 20px; }
    .title { font-size: 18px; font-weight: bold; color: #024BB2; margin: 0; }
    .ref { font-size: 13px; color: #64748b; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th, td { padding: 8px 10px; text-align: left; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    th { width: 35%; color: #475569; font-weight: 600; background: #f8fafc; }
    td { color: #0f172a; font-weight: 500; }
    .section-title { font-size: 14px; font-weight: bold; color: #0f172a; margin: 16px 0 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .message-box { background: #f8fafc; border-left: 3px solid #024BB2; padding: 10px 14px; font-size: 13px; color: #334155; margin-top: 8px; }
    .footer { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">New International Shipping Quote Request</div>
      <div class="ref">Reference: <strong>${data.referenceId}</strong> | ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
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
    <div class="section-title">Special Cargo Instructions</div>
    <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
    ` : ''}

    <div class="footer">
      SkyOne International Courier Service &bull; Automated Lead Dispatch
    </div>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"SkyOne Form Leads" <${SMTP_USER}>`,
      to: TARGET_EMAIL,
      replyTo: data.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
    console.log(`[Mailer] Quote email sent for ${data.referenceId} to ${TARGET_EMAIL}`);
  } catch (err: any) {
    console.error('[Mailer] Error sending quote email:', err.message);
  }

  // Forward to Google Sheet Webhook if configured
  await forwardToGoogleSheet({
    type: 'QUOTE',
    referenceId: data.referenceId,
    timestamp: new Date().toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    pickupLocation,
    destinationLocation,
    shipmentType: data.shipmentType,
    weight: data.weight,
    message: data.message || ''
  });
}

/**
 * Send Contact Inquiry Notification Email
 */
export async function sendContactEmail(data: ContactEmailPayload) {
  const subject = `[New Contact Inquiry] ${data.referenceId} - ${data.name} (${data.subject})`;

  const textBody = `
========================================
NEW CONTACT DESK INQUIRY
========================================

Ticket ID:   ${data.referenceId}
Date & Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

CUSTOMER DETAILS:
-----------------
Name:    ${data.name}
Email:   ${data.email}
Phone:   ${data.phone || 'Not provided'}
Subject: ${data.subject}

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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; margin: 0; padding: 20px; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; }
    .header { border-bottom: 2px solid #024BB2; padding-bottom: 12px; margin-bottom: 20px; }
    .title { font-size: 18px; font-weight: bold; color: #024BB2; margin: 0; }
    .ref { font-size: 13px; color: #64748b; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th, td { padding: 8px 10px; text-align: left; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    th { width: 30%; color: #475569; font-weight: 600; background: #f8fafc; }
    td { color: #0f172a; font-weight: 500; }
    .section-title { font-size: 14px; font-weight: bold; color: #0f172a; margin: 16px 0 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .message-box { background: #f8fafc; border-left: 3px solid #024BB2; padding: 12px 14px; font-size: 13px; color: #334155; margin-top: 8px; line-height: 1.6; }
    .footer { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">New Customer Contact Inquiry</div>
      <div class="ref">Ticket ID: <strong>${data.referenceId}</strong> | ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
    </div>

    <div class="section-title">Customer Details</div>
    <table>
      <tr><th>Full Name</th><td>${data.name}</td></tr>
      <tr><th>Phone</th><td><a href="tel:${data.phone}">${data.phone || 'N/A'}</a></td></tr>
      <tr><th>Email Address</th><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><th>Subject</th><td><strong>${data.subject}</strong></td></tr>
    </table>

    <div class="section-title">Inquiry Message</div>
    <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>

    <div class="footer">
      SkyOne International Courier Service &bull; Automated Contact Ticket
    </div>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"SkyOne Contact Desk" <${SMTP_USER}>`,
      to: TARGET_EMAIL,
      replyTo: data.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
    console.log(`[Mailer] Contact email sent for ${data.referenceId} to ${TARGET_EMAIL}`);
  } catch (err: any) {
    console.error('[Mailer] Error sending contact email:', err.message);
  }

  // Forward to Google Sheet Webhook if configured
  await forwardToGoogleSheet({
    type: 'CONTACT',
    referenceId: data.referenceId,
    timestamp: new Date().toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    pickupLocation: '-',
    destinationLocation: '-',
    shipmentType: data.subject,
    weight: '-',
    message: data.message
  });
}

/**
 * Forward lead directly into Google Sheets / Excel Webhook
 */
async function forwardToGoogleSheet(payload: Record<string, any>) {
  const webhookUrl = process.env.GOOGLE_SHEET_URL || process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log(`[GoogleSheet] Successfully forwarded lead ${payload.referenceId}`);
  } catch (err: any) {
    console.error('[GoogleSheet] Error forwarding to spreadsheet webhook:', err.message);
  }
}


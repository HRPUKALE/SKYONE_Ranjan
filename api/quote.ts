import { sendQuoteEmail } from './_mailer';

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
  const company = sanitizeString(rawCompany, 100);
  const pickupCountry = sanitizeString(rawPickupCountry, 60);
  const pickupState = sanitizeString(rawPickupState, 60);
  const pickupCity = sanitizeString(rawPickupCity, 60);
  const destinationCountry = sanitizeString(rawDestinationCountry, 60);
  const destinationCity = sanitizeString(rawDestinationCity, 60);
  const shipmentType = sanitizeString(rawShipmentType, 30) || 'parcel';
  const dimensions = sanitizeString(rawDimensions, 50);
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

  // Send Email & Forward to Google Sheet
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
  }).catch((err: any) => {
    console.error('[Quote] Email dispatch error:', err.message);
  });

  return res.status(200).json({
    success: true,
    quoteId: quoteRef,
    message: 'Your international shipping quote request has been dispatched to our operations team. A logistics specialist will review your routing and send confirmed tariffs within 2 business hours.'
  });
}

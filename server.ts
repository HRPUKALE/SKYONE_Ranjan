import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import cors from 'cors';
import { sendQuoteEmail, sendContactEmail } from './api/_mailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security: Hide Express server fingerprint
app.disable('x-powered-by');

// Security: HTTP headers via Helmet
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https://images.unsplash.com'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"]
    }
  } : false, // Permissive CSP during development so Vite HMR / eval / WebSockets are not blocked
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Security: CORS origin configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://skyonecourier.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by CORS policy'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Security: Strict body payload limits (prevents payload flood DoS)
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Input sanitization helpers
function sanitizeString(input: unknown, maxLength = 255): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '') // remove control chars
    .replace(/<[^>]*>?/gm, '') // strip HTML/XML tags
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const clean = email.trim();
  return clean.length >= 5 && clean.length <= 100 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean);
}

// Built-in sample database for demonstration
const SAMPLE_SHIPMENTS_MAP: Record<string, any> = {
  'SKY123456789': {
    trackingNumber: 'SKY123456789',
    status: 'IN_TRANSIT',
    statusLabel: 'In Transit',
    currentLocation: 'Dubai Air Logistics Hub, UAE',
    origin: 'Mumbai, India',
    destination: 'London, United Kingdom',
    originCode: 'BOM',
    destinationCode: 'LHR',
    estimatedDelivery: '08 October 2026',
    serviceType: 'SkyOne Priority International Express',
    lastUpdated: 'Today, 14:30 GMT+4',
    weight: '4.80 kg',
    pieces: 1,
    carrier: 'SkyOne Air Logistics',
    isDemo: true,
    transitRoute: ['Mumbai (BOM)', 'Dubai Hub (DXB)', 'London Heathrow (LHR)'],
    history: [
      {
        date: '04 Oct 2026',
        time: '14:30',
        location: 'Dubai Air Hub (DXB), UAE',
        status: 'In Transit',
        description: 'Transshipment container sorted and cleared for flight connecting to London Heathrow',
        isCompleted: true
      },
      {
        date: '04 Oct 2026',
        time: '06:15',
        location: 'Dubai Air Hub (DXB), UAE',
        status: 'Arrived at Intermediate Hub',
        description: 'Aircraft landed. Inbound cargo offloaded and processed through security screening',
        isCompleted: true
      },
      {
        date: '03 Oct 2026',
        time: '23:40',
        location: 'Mumbai Int. Airport (BOM), India',
        status: 'Departed Origin Hub',
        description: 'Export customs cleared. Departed on scheduled international flight SK-408',
        isCompleted: true
      },
      {
        date: '03 Oct 2026',
        time: '18:20',
        location: 'Mumbai Central Gateway, India',
        status: 'Processed at Facility',
        description: 'Package weighed, barcoded, and packed in secure air transit container',
        isCompleted: true
      },
      {
        date: '03 Oct 2026',
        time: '12:45',
        location: 'Andheri West, Mumbai, India',
        status: 'Shipment Picked Up',
        description: 'Collected by SkyOne courier dispatch agent',
        isCompleted: true
      },
      {
        date: '03 Oct 2026',
        time: '09:30',
        location: 'SkyOne Online Booking',
        status: 'Shipment Booked',
        description: 'Shipping label generated and booking confirmed electronically',
        isCompleted: true
      }
    ]
  },
  'SKY987654321': {
    trackingNumber: 'SKY987654321',
    status: 'DELIVERED',
    statusLabel: 'Delivered',
    currentLocation: 'Paris 8e, France',
    origin: 'Delhi, India',
    destination: 'Paris, France',
    originCode: 'DEL',
    destinationCode: 'CDG',
    estimatedDelivery: '03 October 2026 (Delivered)',
    serviceType: 'SkyOne Global Express Courier',
    lastUpdated: '03 Oct 2026, 11:20 CET',
    weight: '2.10 kg',
    pieces: 1,
    carrier: 'SkyOne Express Europe',
    isDemo: true,
    transitRoute: ['New Delhi (DEL)', 'Frankfurt Hub (FRA)', 'Paris CDG (CDG)', 'Paris 8e'],
    history: [
      {
        date: '03 Oct 2026',
        time: '11:20',
        location: 'Paris 8e, France',
        status: 'Delivered',
        description: 'Package delivered to recipient and signed by: M. Laurent',
        isCompleted: true
      },
      {
        date: '03 Oct 2026',
        time: '08:45',
        location: 'Paris Distribution Depot, France',
        status: 'Out for Delivery',
        description: 'Assigned to courier route van for final door delivery',
        isCompleted: true
      },
      {
        date: '02 Oct 2026',
        time: '21:10',
        location: 'Charles de Gaulle Airport (CDG), France',
        status: 'Customs Cleared',
        description: 'Import customs clearance completed',
        isCompleted: true
      },
      {
        date: '01 Oct 2026',
        time: '19:00',
        location: 'Indira Gandhi Int. (DEL), India',
        status: 'Departed Origin Hub',
        description: 'International linehaul departure',
        isCompleted: true
      },
      {
        date: '01 Oct 2026',
        time: '10:00',
        location: 'Connaught Place, New Delhi, India',
        status: 'Shipment Picked Up',
        description: 'Received at SkyOne collection counter',
        isCompleted: true
      }
    ]
  },
  'SKY445566778': {
    trackingNumber: 'SKY445566778',
    status: 'OUT_FOR_DELIVERY',
    statusLabel: 'Out For Delivery',
    currentLocation: 'Downtown Commercial Hub, Singapore',
    origin: 'Ahmedabad, India',
    destination: 'Singapore',
    originCode: 'AMD',
    destinationCode: 'SIN',
    estimatedDelivery: 'Today, by 18:00 SGT',
    serviceType: 'SkyOne Air Cargo & Door Delivery',
    lastUpdated: 'Today, 08:15 SGT',
    weight: '12.50 kg',
    pieces: 2,
    carrier: 'SkyOne Asia Logistics',
    isDemo: true,
    transitRoute: ['Ahmedabad (AMD)', 'Mumbai Gateway', 'Singapore Changi (SIN)'],
    history: [
      {
        date: '04 Oct 2026',
        time: '08:15',
        location: 'Changi Logistics Park, Singapore',
        status: 'Out for Delivery',
        description: 'Courier van dispatched for scheduled commercial delivery',
        isCompleted: true
      },
      {
        date: '03 Oct 2026',
        time: '22:30',
        location: 'Changi Airport (SIN), Singapore',
        status: 'Arrived at Destination Hub',
        description: 'Inbound cargo manifest verified and custom duties paid',
        isCompleted: true
      },
      {
        date: '02 Oct 2026',
        time: '16:00',
        location: 'Ahmedabad Central Hub, India',
        status: 'Shipment Picked Up',
        description: 'Commercial consignment verified and barcoded',
        isCompleted: true
      }
    ]
  }
};

/**
 * Normalizes live carrier API response (SPD / Speedex) into SkyOne Shipment format
 */
function normalizeSpdTrackingData(data: any, requestedAwb: string): any {
  const item = Array.isArray(data) ? data[0] : data;
  if (!item || typeof item !== 'object' || item.errors === true) return null;

  // 1. Convert docket_info array-of-pairs into a lookup Map
  const info: Record<string, string> = {};
  if (Array.isArray(item.docket_info)) {
    for (const entry of item.docket_info) {
      if (Array.isArray(entry) && entry.length >= 2) {
        info[String(entry[0]).trim()] = String(entry[1] || '').trim();
      }
    }
  }

  const rawStatus = (info['Status'] || item.status || 'IN_TRANSIT').toString().toUpperCase();
  let status: 'DELIVERED' | 'OUT_FOR_DELIVERY' | 'IN_TRANSIT' | 'BOOKED' = 'IN_TRANSIT';
  let statusLabel = 'In Transit';

  if (rawStatus.includes('DELIVER')) {
    status = 'DELIVERED';
    statusLabel = 'Delivered';
  } else if (rawStatus.includes('OUT') || rawStatus.includes('REDRS') || rawStatus.includes('VEHICLE')) {
    status = 'OUT_FOR_DELIVERY';
    statusLabel = 'Out For Delivery';
  } else if (rawStatus.includes('BOOK') || rawStatus.includes('ENTRY')) {
    status = 'BOOKED';
    statusLabel = 'Shipment Booked';
  }

  // 2. Map docket_events into standardized milestone history
  const history: any[] = [];
  const events = Array.isArray(item.docket_events) ? item.docket_events : [];

  for (const evt of events) {
    const rawTime = evt.event_at || '';
    const [eventDate, eventTime] = rawTime.includes(' ') ? rawTime.split(' ') : [rawTime, ''];
    history.push({
      date: eventDate || '',
      time: eventTime ? eventTime.slice(0, 5) : '',
      location: evt.event_location || evt.add_country_name || evt.add_country_code || 'Transit Hub',
      status: evt.event_description || 'Checkpoint Update',
      description: evt.event_remark || evt.event_description || 'Milestone verified',
      isCompleted: true
    });
  }

  const destinationCity = info['Consignee City'] ? info['Consignee City'].toUpperCase() : '';
  const destinationCountry = info['Consignee Country'] || info['Destination'] || 'International Destination';
  const destination = destinationCity ? `${destinationCity}, ${destinationCountry}` : destinationCountry;

  const originCity = info['Shipper City'] ? info['Shipper City'].toUpperCase() : (info['Origin Hub'] || '');
  const originCountry = info['Origin'] || 'INDIA';
  const origin = originCity ? `${originCity}, ${originCountry}` : originCountry;

  const currentLocation = history.length > 0 ? history[0].location : destination;
  const weight = item.chargeable_weight ? `${item.chargeable_weight} kg` : (info['Weight'] || 'N/A');
  const pieces = item.pcs ? parseInt(item.pcs, 10) : 1;

  // Transit route milestones list
  const routePoints = [origin, ...history.map((h: any) => h.location), destination].filter(Boolean);
  const transitRoute = Array.from(new Set(routePoints));

  return {
    trackingNumber: item.tracking_no || info['AWB No.'] || requestedAwb,
    status,
    statusLabel,
    currentLocation,
    origin,
    destination,
    estimatedDelivery: info['Delivery Date and Time'] || item.expected_datetime || 'Delivered / On Schedule',
    serviceType: `SkyOne Priority Air Courier (${info['Service Name'] || 'DPD Express Network'})`,
    lastUpdated: history.length > 0 ? `${history[0].date} ${history[0].time}` : (info['Delivery Date and Time'] || 'Live'),
    weight,
    pieces,
    carrier: 'SkyOne International Logistics Partner',
    forwardingNo: item.forwarding_no || info['Forwarding No.'] || '',
    consignee: info['Consignee Name'] || '',
    transitRoute: transitRoute.length > 1 ? transitRoute.slice(0, 6) : [origin, destination],
    history: history.length > 0 ? history : [
      {
        date: info['Booking Date'] || 'Recent',
        time: '12:00',
        location: origin,
        status: statusLabel,
        description: `Shipment booked and processed for transit to ${destination}`,
        isCompleted: true
      }
    ]
  };
}

/**
 * Unified tracking controller logic
 * Securely proxies to carrier APIs, checks internal consignment database, and rejects unknown AWBs
 */
async function handleTrackRequest(req: express.Request, res: express.Response) {
  const rawAwb = req.params.awb || (req.query.awb as string) || '';
  const awb = sanitizeString(rawAwb, 32).toUpperCase().replace(/[\s-]/g, '');

  if (!awb) {
    return res.status(400).json({
      success: false,
      errorType: 'EMPTY_INPUT',
      errorMessage: 'Tracking number cannot be empty. Please enter your Air Waybill (AWB) number.'
    });
  }

  // Format validation: AWB numbers should be alphanumeric, between 5 and 30 characters
  if (awb.length < 5 || awb.length > 30 || !/^[A-Z0-9]+$/.test(awb)) {
    return res.status(400).json({
      success: false,
      errorType: 'INVALID_NUMBER',
      errorMessage: 'Invalid tracking number format. Air Waybill numbers typically contain letters and digits (e.g., SKY123456789).'
    });
  }

  // 1. Live Speedex / SPD Express Carrier Tracking API Integration
  const spdApiUrl = process.env.CARRIER_API_URL || 'http://admin.spdexp.com/api/tracking_api/get_tracking_data';
  const spdCompanyId = process.env.CARRIER_COMPANY_ID || '24';
  const spdCustomerCode = process.env.CARRIER_CUSTOMER_CODE || '';

  if (spdCustomerCode) {
    try {
      const url = `${spdApiUrl}?api_company_id=${encodeURIComponent(spdCompanyId)}&customer_code=${encodeURIComponent(spdCustomerCode)}&tracking_no=${encodeURIComponent(awb)}`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const rawData = await response.json();
        const hasError = Array.isArray(rawData) && rawData.length > 0 && rawData[0].errors;
        if (!hasError && rawData) {
          const normalized = normalizeSpdTrackingData(rawData, awb);
          if (normalized) {
            return res.json({
              success: true,
              shipment: normalized
            });
          }
        }
      }
    } catch (err: any) {
      console.error('SPD carrier tracking API connection error:', err.message);
    }
  }

  // 2. Generic external carrier tracking integration if configured via environment variables
  const externalApiUrl = process.env.TRACKING_API_URL;
  const externalApiKey = process.env.TRACKING_API_KEY;

  if (externalApiUrl) {
    try {
      const response = await fetch(`${externalApiUrl}?awb=${encodeURIComponent(awb)}`, {
        headers: {
          'Authorization': `Bearer ${externalApiKey || ''}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({
            success: false,
            errorType: 'NOT_FOUND',
            errorMessage: `AWB ${awb} was not found in the carrier tracking registry.`
          });
        }
        return res.status(502).json({
          success: false,
          errorType: 'API_ERROR',
          errorMessage: 'Carrier tracking service is temporarily unavailable. Please retry shortly.'
        });
      }

      const externalData = await response.json();
      return res.json({
        success: true,
        shipment: externalData
      });
    } catch (err: any) {
      console.error('External carrier tracking API error:', err);
      // Fall through to sample lookup or 404
    }
  }

  // 2. Verified sample shipment lookup (for preview/verification)
  if (SAMPLE_SHIPMENTS_MAP[awb]) {
    return res.json({
      success: true,
      shipment: SAMPLE_SHIPMENTS_MAP[awb]
    });
  }

  // 3. For any unknown AWB: Return clean NOT_FOUND state (Do NOT invent fake events)
  return res.status(404).json({
    success: false,
    errorType: 'NOT_FOUND',
    errorMessage: `Consignment AWB "${awb}" was not found in our active tracking registry. If this shipment was recently booked, milestone updates may take up to 2 hours to appear. For immediate verification, contact the 24/7 Dispatch Desk at +91 22 8800 1200.`
  });
}

// In-memory rate limiter structures with automatic garbage collection
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const leadRateLimitMap = new Map<string, RateLimitRecord>();
const trackRateLimitMap = new Map<string, RateLimitRecord>();

// Periodically prune expired rate-limit records every 5 minutes (prevents memory leak)
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of leadRateLimitMap.entries()) {
    if (now > record.resetTime) leadRateLimitMap.delete(ip);
  }
  for (const [ip, record] of trackRateLimitMap.entries()) {
    if (now > record.resetTime) trackRateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000).unref();

function leadRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxSubmissions = 10;

  const current = leadRateLimitMap.get(ip);
  if (!current || now > current.resetTime) {
    leadRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (current.count >= maxSubmissions) {
    return res.status(429).json({
      success: false,
      message: 'Too many submissions received from this network. Please wait a few minutes or call our dispatch desk directly at +91 22 8800 1200.'
    });
  }

  current.count += 1;
  return next();
}

function trackRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxLookups = 60; // Max 60 tracking queries per minute per IP

  const current = trackRateLimitMap.get(ip);
  if (!current || now > current.resetTime) {
    trackRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (current.count >= maxLookups) {
    return res.status(429).json({
      success: false,
      errorType: 'RATE_LIMIT_EXCEEDED',
      errorMessage: 'Tracking query limit reached. Please wait a moment before searching again.'
    });
  }

  current.count += 1;
  return next();
}

// Support both query param (/api/track?awb=...) and RESTful path (/api/track/:awb) with rate limiting
app.get('/api/track', trackRateLimiter, handleTrackRequest);
app.get('/api/track/:awb', trackRateLimiter, handleTrackRequest);

/**
 * Dispatch notification service
 * Outputs structured operational logs and forwards to external webhooks or CRM if configured
 */
async function notifyLeadDispatch(type: 'QUOTE' | 'CONTACT', payload: Record<string, any>) {
  const timestamp = new Date().toISOString();

  // 1. Structured logging
  console.log(`\n=======================================================`);
  console.log(`[SKYONE LOGISTICS DISPATCH - ${type === 'QUOTE' ? 'NEW QUOTE INQUIRY' : 'NEW CONTACT TICKET'}]`);
  console.log(`Reference: ${payload.referenceId} | Time: ${timestamp}`);
  console.log(`Contact: ${payload.name} (${payload.email}) | Tel: ${payload.phone || 'N/A'}`);
  if (type === 'QUOTE') {
    console.log(`Route: ${payload.pickupCity}, ${payload.pickupCountry} -> ${payload.destinationCity}, ${payload.destinationCountry}`);
    console.log(`Cargo: ${payload.weight} kg (${payload.shipmentType || 'parcel'}) | Dimensions: ${payload.dimensions || 'N/A'}`);
  }
  if (payload.message) {
    console.log(`Message: "${payload.message}"`);
  }
  console.log(`=======================================================\n`);

  // 2. Automated Email & Google Sheet notification
  try {
    if (type === 'QUOTE') {
      await sendQuoteEmail({
        referenceId: payload.referenceId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        pickupCountry: payload.pickupCountry,
        pickupState: payload.pickupState,
        pickupCity: payload.pickupCity,
        destinationCountry: payload.destinationCountry,
        destinationCity: payload.destinationCity,
        weight: payload.weight,
        shipmentType: payload.shipmentType || 'Household Parcel',
        message: payload.message
      });
    } else {
      await sendContactEmail({
        referenceId: payload.referenceId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject || 'General Inquiry',
        message: payload.message
      });
    }
  } catch (err: any) {
    console.error('[server.ts] Error sending notification email:', err.message);
  }

  // 3. Webhook forwarding if configured (Slack / Teams / Zapier / CRM)
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'SkyOne International Courier',
          type,
          timestamp,
          ...payload
        })
      });
    } catch (err: any) {
      console.error(`Failed to forward lead to webhook (${webhookUrl}):`, err.message);
    }
  }
}

/**
 * Server-side /api/quote route
 */
app.post('/api/quote', leadRateLimiter, async (req, res) => {
  const { 
    name: rawName, 
    email: rawEmail, 
    phone: rawPhone, 
    company: rawCompany, 
    pickupCountry: rawPickupCountry, 
    pickupCity: rawPickupCity, 
    destinationCountry: rawDestinationCountry, 
    destinationCity: rawDestinationCity, 
    weight: rawWeight, 
    shipmentType: rawShipmentType, 
    dimensions: rawDimensions, 
    message: rawMessage,
    _hp // honeypot
  } = req.body || {};

  // Silent drop for automated spam bots filling the honeypot
  if (_hp) {
    return res.json({
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
  const pickupCity = sanitizeString(rawPickupCity, 60);
  const destinationCountry = sanitizeString(rawDestinationCountry, 60);
  const destinationCity = sanitizeString(rawDestinationCity, 60);
  const shipmentType = sanitizeString(rawShipmentType, 30) || 'parcel';
  const dimensions = sanitizeString(rawDimensions, 50);
  const message = sanitizeString(rawMessage, 1500);

  // Required field checks
  if (!name) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }
  if (!phone || phone.length < 7) {
    return res.status(400).json({ success: false, message: 'A valid phone or mobile number is required.' });
  }
  if (!pickupCountry || !destinationCountry) {
    return res.status(400).json({ success: false, message: 'Pickup country and destination country are required.' });
  }

  const parsedWeight = parseFloat(String(rawWeight));
  if (isNaN(parsedWeight) || parsedWeight <= 0 || parsedWeight > 100000) {
    return res.status(400).json({ success: false, message: 'A valid package weight between 0.01 kg and 100,000 kg is required.' });
  }

  // Generate unique quote reference ID
  const quoteRef = 'SKY-Q' + Math.floor(100000 + Math.random() * 900000);

  // Trigger dispatch notification
  await notifyLeadDispatch('QUOTE', {
    referenceId: quoteRef,
    name,
    company,
    email,
    phone,
    pickupCountry,
    pickupCity,
    destinationCountry,
    destinationCity,
    weight: parsedWeight,
    shipmentType,
    dimensions,
    message
  });

  return res.json({
    success: true,
    quoteId: quoteRef,
    message: 'Your international shipping quote request has been dispatched to our operations team. A logistics specialist will review your routing and send confirmed tariffs within 2 business hours.'
  });
});

/**
 * Server-side /api/contact route
 */
app.post('/api/contact', leadRateLimiter, async (req, res) => {
  const { 
    name: rawName, 
    email: rawEmail, 
    phone: rawPhone, 
    subject: rawSubject, 
    message: rawMessage, 
    _hp 
  } = req.body || {};

  // Silent drop for automated spam bots filling the honeypot
  if (_hp) {
    return res.json({
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

  if (!name) {
    return res.status(400).json({ success: false, message: 'Your name is required.' });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }
  if (!message) {
    return res.status(400).json({ success: false, message: 'Please provide an inquiry message.' });
  }

  const ticketId = 'SKY-T' + Math.floor(10000 + Math.random() * 90000);

  // Trigger dispatch notification
  await notifyLeadDispatch('CONTACT', {
    referenceId: ticketId,
    name,
    email,
    phone,
    subject,
    message
  });

  return res.json({
    success: true,
    ticketId,
    message: 'Your inquiry ticket has been logged with our 24/7 operations desk. A SkyOne representative will respond shortly.'
  });
});

// Explicit 404 for undefined /api/* routes
app.all('/api/*', (_req, res) => {
  return res.status(404).json({ success: false, message: 'API endpoint not found.' });
});

// Centralized Express error handler (catches JSON parse errors, CORS blocks, etc.)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Malformed JSON payload provided in request.' });
  }
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ success: false, message: 'Request forbidden by CORS policy.' });
  }
  console.error('[UNHANDLED SERVER ERROR]', err);
  return res.status(500).json({ success: false, message: 'An internal server error occurred.' });
});

/**
 * Validates operational environment variables on startup
 */
function validateEnvironment() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = parseInt(process.env.PORT || '3000', 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error(`[FATAL] Invalid PORT specified in environment: ${process.env.PORT}`);
    process.exit(1);
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      new URL(process.env.LEAD_WEBHOOK_URL);
    } catch {
      console.warn(`[SECURITY WARN] LEAD_WEBHOOK_URL is not a valid URL: ${process.env.LEAD_WEBHOOK_URL}`);
    }
  }

  if (process.env.TRACKING_API_URL) {
    try {
      new URL(process.env.TRACKING_API_URL);
    } catch {
      console.warn(`[SECURITY WARN] TRACKING_API_URL is not a valid URL: ${process.env.TRACKING_API_URL}`);
    }
  }

  console.log(`[CONFIG] SkyOne running in [${nodeEnv.toUpperCase()}] mode on port ${port}`);
  console.log(`[SECURITY] Helmet active | CORS configured | Body limit 50kb | Rate limiters enabled`);
}

// Setup Vite middleware in dev or static files in production
async function startServer() {
  validateEnvironment();

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkyOne server running at http://0.0.0.0:${PORT}`);
  });

  const shutdown = (signal: string) => {
    console.log(`\n[SHUTDOWN] Received ${signal}. Closing SkyOne HTTP server gracefully...`);
    server.close(() => {
      console.log('[SHUTDOWN] HTTP server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] Unhandled Promise Rejection:', reason);
});

startServer();

import type { IncomingMessage, ServerResponse } from 'http';

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

function sanitizeString(input: unknown, maxLength = 255): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, maxLength);
}

function normalizeSpdTrackingData(data: any, requestedAwb: string): any {
  const item = Array.isArray(data) ? data[0] : data;
  if (!item || typeof item !== 'object' || item.errors === true) return null;

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

export default async function handler(req: any, res: any) {
  // Setup CORS
  const origin = req.headers.origin;
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((s: string) => s.trim())
    : ['http://localhost:3000', 'https://skyone-ranjan.vercel.app'];

  if (origin && (allowedOrigins.includes(origin) || allowedOrigins.includes('*'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Extract AWB from query (e.g., /api/track?awb=XXX)
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const rawAwb = req.query?.awb || url.searchParams.get('awb') || '';
  const awb = sanitizeString(rawAwb, 32).toUpperCase().replace(/[\s-]/g, '');

  if (!awb) {
    return res.status(400).json({
      success: false,
      errorType: 'EMPTY_INPUT',
      errorMessage: 'Tracking number cannot be empty. Please enter your Air Waybill (AWB) number.'
    });
  }

  if (awb.length < 5 || awb.length > 30 || !/^[A-Z0-9]+$/.test(awb)) {
    return res.status(400).json({
      success: false,
      errorType: 'INVALID_NUMBER',
      errorMessage: 'Invalid tracking number format. Air Waybill numbers typically contain letters and digits.'
    });
  }

  // 1. Live Speedex / SPD Express Carrier Tracking API Integration
  const spdApiUrl = process.env.CARRIER_API_URL || 'http://admin.spdexp.com/api/tracking_api/get_tracking_data';
  const spdCompanyId = process.env.CARRIER_COMPANY_ID || '24';
  const spdCustomerCode = process.env.CARRIER_CUSTOMER_CODE || 'SWIFT';

  if (spdCustomerCode) {
    try {
      const targetUrl = `${spdApiUrl}?api_company_id=${encodeURIComponent(spdCompanyId)}&customer_code=${encodeURIComponent(spdCustomerCode)}&tracking_no=${encodeURIComponent(awb)}`;
      const response = await fetch(targetUrl, {
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const rawData = await response.json();
        const hasError = Array.isArray(rawData) && rawData.length > 0 && rawData[0].errors;
        if (!hasError && rawData) {
          const normalized = normalizeSpdTrackingData(rawData, awb);
          if (normalized) {
            return res.status(200).json({
              success: true,
              shipment: normalized
            });
          }
        }
      }
    } catch (err: any) {
      console.error('SPD carrier tracking API connection error on Vercel:', err.message);
    }
  }

  // 2. Generic external carrier tracking integration if configured
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

      if (response.ok) {
        const externalData = await response.json();
        return res.status(200).json({
          success: true,
          shipment: externalData
        });
      }
    } catch (err: any) {
      console.error('External carrier tracking API error:', err.message);
    }
  }

  // 3. Verified sample shipment lookup
  if (SAMPLE_SHIPMENTS_MAP[awb]) {
    return res.status(200).json({
      success: true,
      shipment: SAMPLE_SHIPMENTS_MAP[awb]
    });
  }

  // 4. Return clean NOT_FOUND state
  return res.status(404).json({
    success: false,
    errorType: 'NOT_FOUND',
    errorMessage: `Consignment AWB "${awb}" was not found in our active tracking registry. If this shipment was recently booked, milestone updates may take up to 2 hours to appear. For immediate verification, contact the 24/7 Dispatch Desk at +91 79075 90062.`
  });
}

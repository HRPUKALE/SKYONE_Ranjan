import { Shipment, TrackingQueryResult } from '../types';
import { SAMPLE_SHIPMENTS } from '../data/mockShipments';
import { SKYONE_CONFIG } from '../config';

export const DEMO_MODE = true;

/**
 * Normalizes any external carrier tracking payload into the standardized SkyOne Shipment model.
 */
export function normalizeShipmentData(raw: any): Shipment {
  if (!raw) {
    throw new Error('Empty shipment payload');
  }

  return {
    trackingNumber: String(raw.trackingNumber || raw.awb || raw.tracking_number || '').trim().toUpperCase(),
    status: raw.status || 'IN_TRANSIT',
    statusLabel: raw.statusLabel || raw.status_label || raw.status || 'In Transit',
    currentLocation: raw.currentLocation || raw.current_location || 'Transit Hub',
    origin: raw.origin || 'Origin Facility',
    destination: raw.destination || 'Destination Facility',
    originCode: raw.originCode || raw.origin_code,
    destinationCode: raw.destinationCode || raw.destination_code,
    estimatedDelivery: raw.estimatedDelivery || raw.estimated_delivery || 'Pending Confirmation',
    serviceType: raw.serviceType || raw.service_type || 'SkyOne International Express',
    lastUpdated: raw.lastUpdated || raw.last_updated || new Date().toISOString(),
    weight: raw.weight || '1.0 kg',
    pieces: Number(raw.pieces || 1),
    carrier: raw.carrier || 'SkyOne Express',
    forwardingNo: raw.forwardingNo ? String(raw.forwardingNo) : undefined,
    consignee: raw.consignee ? String(raw.consignee) : undefined,
    isDemo: Boolean(raw.isDemo ?? false),
    transitRoute: Array.isArray(raw.transitRoute) ? raw.transitRoute : undefined,
    history: Array.isArray(raw.history)
      ? raw.history.map((h: any) => ({
          date: String(h.date || ''),
          time: String(h.time || ''),
          location: String(h.location || ''),
          status: String(h.status || ''),
          description: String(h.description || ''),
          isCompleted: Boolean(h.isCompleted ?? true)
        }))
      : []
  };
}

/**
 * Query shipment status securely through server-side /api/track.
 * Falls back to demo records during prototyping when DEMO_MODE is true.
 */
export async function trackShipment(trackingInput: string): Promise<TrackingQueryResult> {
  const cleanedAwb = trackingInput.trim().toUpperCase().replace(/[\s-]/g, '');

  if (!cleanedAwb) {
    return {
      success: false,
      errorType: 'EMPTY_INPUT',
      errorMessage: 'Please enter a valid AWB or shipment tracking number.'
    };
  }

  // Validate format: AWB should typically be alphanumeric, 6-25 characters
  if (cleanedAwb.length < 5 || cleanedAwb.length > 30 || !/^[A-Z0-9]+$/.test(cleanedAwb)) {
    return {
      success: false,
      errorType: 'INVALID_NUMBER',
      errorMessage: 'Invalid tracking number format. An AWB number typically contains letters and numbers (e.g., SKY123456789).'
    };
  }

  // Try calling the backend /api/track endpoint first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`/api/track?awb=${encodeURIComponent(cleanedAwb)}`, {
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await res.json().catch(() => null);

    if (res.ok && data && data.success && data.shipment) {
      return {
        success: true,
        shipment: normalizeShipmentData(data.shipment)
      };
    }

    if (data && data.errorType) {
      return {
        success: false,
        errorType: data.errorType,
        errorMessage: data.errorMessage || `AWB "${cleanedAwb}" not found in tracking records.`
      };
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return {
        success: false,
        errorType: 'TIMEOUT',
        errorMessage: 'The tracking system timed out. Please check your network connection and retry.'
      };
    }
    // Fall through to sample lookup for offline preview
  }

  // Offline / Static Preview Fallback (Only for verified documented sample AWBs)
  if (SAMPLE_SHIPMENTS[cleanedAwb]) {
    return {
      success: true,
      shipment: SAMPLE_SHIPMENTS[cleanedAwb]
    };
  }

  return {
    success: false,
    errorType: 'NOT_FOUND',
    errorMessage: `Consignment AWB "${cleanedAwb}" was not found in our global tracking registry. Please verify the tracking number printed on your receipt or contact the 24/7 Operations Desk at ${SKYONE_CONFIG.primaryPhone}.`
  };
}

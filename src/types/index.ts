export type TrackingStatus = 
  | 'BOOKED'
  | 'PICKED_UP'
  | 'DEPARTED_ORIGIN'
  | 'IN_TRANSIT'
  | 'DESTINATION_HUB'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION';

export interface TrackingHistoryItem {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  isCompleted?: boolean;
}

export interface Shipment {
  trackingNumber: string;
  status: TrackingStatus;
  statusLabel: string;
  currentLocation: string;
  origin: string;
  destination: string;
  originCode?: string;
  destinationCode?: string;
  estimatedDelivery: string;
  serviceType: string;
  lastUpdated: string;
  weight?: string;
  pieces?: number;
  carrier?: string;
  forwardingNo?: string;
  consignee?: string;
  history: TrackingHistoryItem[];
  transitRoute?: string[];
  isDemo?: boolean;
}

export interface TrackingQueryResult {
  success: boolean;
  shipment?: Shipment;
  errorType?: 'EMPTY_INPUT' | 'INVALID_NUMBER' | 'NOT_FOUND' | 'API_ERROR' | 'NETWORK_ERROR' | 'TIMEOUT';
  errorMessage?: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  idealFor: string[];
  deliveryTime: string;
}

export interface LocationItem {
  id: string;
  country: string;
  region: string;
  city: string;
  office: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isHub?: boolean;
}

export interface QuoteFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  pickupCountry: string;
  pickupCity: string;
  destinationCountry: string;
  destinationCity: string;
  shipmentType: 'document' | 'parcel' | 'air-cargo' | 'freight' | 'e-commerce';
  weight: string;
  dimensions?: string;
  preferredDate?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

import { Shipment } from '../types';

export const SAMPLE_SHIPMENTS: Record<string, Shipment> = {
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
        description: 'Package delivered to recipient and signed by: M. Laurent (Reception desk)',
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
        description: 'Import customs clearance completed without duties inspection',
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

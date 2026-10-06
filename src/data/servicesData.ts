import { ServiceDetail } from '../types';

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'international-courier',
    slug: 'international-courier',
    number: '01',
    title: 'International Courier',
    shortDescription: 'Fast, secure parcel and document shipping across global air routes with door-to-door tracking.',
    fullDescription: 'Our signature international courier service bridges continents with dedicated airline space allocations and seamless local delivery partnerships. Designed for urgent business consignments, commercial samples, and priority packages requiring speed and maximum security.',
    iconName: 'Globe',
    deliveryTime: '2 - 4 Business Days',
    features: [
      'Comprehensive end-to-end tracking with AWB milestones',
      'Priority customs fast-track processing',
      'Direct airport-to-airport express linehaul',
      'Tamper-evident security sealing and barcode validation',
      'Signature on delivery with electronic proof (e-POD)'
    ],
    idealFor: [
      'Time-critical international documents',
      'Export samples & corporate trade shipments',
      'High-value electronics & medical devices',
      'Retail and direct-to-consumer goods'
    ]
  },
  {
    id: 'express-delivery',
    slug: 'express-delivery',
    number: '02',
    title: 'Express Delivery',
    shortDescription: 'Guaranteed next-flight-out priority transit for time-critical international consignments.',
    fullDescription: 'When hours make the difference, SkyOne Express puts your parcel on the fastest flight itinerary available. Backed by dedicated courier dispatch agents and expedite customs pre-clearance while in flight.',
    iconName: 'Zap',
    deliveryTime: '24 - 48 Hours',
    features: [
      'Earliest possible flight allocation',
      'Real-time proactive status notifications',
      'Dedicated handling courier on destination ground',
      'Weekend and after-hours pickup options',
      'Money-back transit commitment'
    ],
    idealFor: [
      'Urgent contracts & tender documents',
      'AOG (Aircraft on Ground) replacement parts',
      'Critical medical pathology specimens',
      'Emergency equipment components'
    ]
  },
  {
    id: 'air-freight',
    slug: 'air-freight',
    number: '03',
    title: 'Air Freight',
    shortDescription: 'Heavy-weight commercial air cargo consolidation and scheduled freighter transport.',
    fullDescription: 'Specialized air cargo solutions for freight consignments exceeding 50 kg. We coordinate airport-to-airport, airport-to-door, and door-to-door commercial air cargo shipments through tier-1 global carriers.',
    iconName: 'Plane',
    deliveryTime: '3 - 5 Business Days',
    features: [
      'Unit Load Device (ULD) container palletization',
      'Full and partial air charter capabilities',
      'Dangerous goods (IATA compliant) certification',
      'Temperature-controlled cool chain handling',
      'Comprehensive cargo manifest and master AWB management'
    ],
    idealFor: [
      'Industrial machinery and manufacturing parts',
      'Bulk pharmaceutical consignments',
      'Automotive components and spares',
      'Heavy commercial export merchandise'
    ]
  },
  {
    id: 'cargo',
    slug: 'cargo',
    number: '04',
    title: 'Cargo Services',
    shortDescription: 'Customized heavy freight and multimodal transport for commercial trade and bulk goods.',
    fullDescription: 'Reliable logistics engineering for oversized, breakbulk, or scheduled commercial trade cargo. We coordinate multi-modal transfers between air, sea-air, and road transport networks to optimize transit cost and speed.',
    iconName: 'Package',
    deliveryTime: '5 - 7 Business Days',
    features: [
      'Heavy cargo crating and specialized lashing',
      'Intermodal transfer coordination',
      'Dedicated logistics account manager',
      'Warehouse staging and buffer storage',
      'Export cargo insurance coverage'
    ],
    idealFor: [
      'Commercial bulk exporters',
      'Engineering and project cargo',
      'Textile and garment container loads',
      'Raw material consignments'
    ]
  },
  {
    id: 'door-to-door',
    slug: 'door-to-door',
    number: '05',
    title: 'Door-to-Door Delivery',
    shortDescription: 'Complete seamless logistics from sender doorstep to recipient address worldwide.',
    fullDescription: 'Eliminate complexity with single-invoice door-to-door service. SkyOne handles local collection, terminal transfer, customs documentation, international air transit, and last-mile residential or corporate handoff.',
    iconName: 'Truck',
    deliveryTime: '3 - 6 Business Days',
    features: [
      'Scheduled courier pickup at your premises',
      'Automated customs duty calculation',
      'Direct final delivery to residential or commercial addresses',
      'Flexible redelivery scheduling via SMS/email',
      'Zero terminal handover hassle for recipient'
    ],
    idealFor: [
      'Cross-border e-commerce orders',
      'Corporate gifting and sample distribution',
      'Personal effects and expatriate relocation parcels',
      'Artisanal and boutique brand overseas orders'
    ]
  },
  {
    id: 'customs-clearance',
    slug: 'customs-clearance',
    number: '06',
    title: 'Customs Clearance',
    shortDescription: 'Expert international import & export documentation, tariff classification and brokerage.',
    fullDescription: 'Navigate international border controls effortlessly. Our licensed customs brokerage specialists ensure accurate HS tariff classification, duties assessment, compliance verification, and regulatory clearances.',
    iconName: 'ShieldCheck',
    deliveryTime: 'Integrated Service',
    features: [
      'Harmonized System (HS) code assignment',
      'Commercial invoice and bill of entry validation',
      'Pre-arrival electronic clearance filing',
      'Duty and tax advance disbursement management',
      'Regulatory compliance audits (FDA, CE, BIS, etc.)'
    ],
    idealFor: [
      'First-time international exporters',
      'Companies facing customs query hold-ups',
      'Regulated consumer goods and supplements',
      'High-value dutiable merchandise'
    ]
  },
  {
    id: 'e-commerce-logistics',
    slug: 'e-commerce-logistics',
    number: '07',
    title: 'E-Commerce Logistics',
    shortDescription: 'Cross-border fulfillment, tracking webhooks, and reverse logistics for online brands.',
    fullDescription: 'Designed for high-growth online retailers selling to global customers. Offers consolidated freight to regional fulfillment hubs, localized last-mile carrier handoff, and hassle-free returns management.',
    iconName: 'ShoppingBag',
    deliveryTime: '4 - 7 Business Days',
    features: [
      'Automated API integration with Shopify & WooCommerce',
      'Delivered Duty Paid (DDP) transparent checkout support',
      'Branded tracking page with delivery notifications',
      'International return label generation and sorting'
    ],
    idealFor: [
      'Direct-to-consumer lifestyle brands',
      'Fashion, apparel & jewelry merchants',
      'Consumer tech and gadget makers',
      'Subscription box creators'
    ]
  },
  {
    id: 'document-delivery',
    slug: 'document-delivery',
    number: '08',
    title: 'Document Delivery',
    shortDescription: 'Ultra-secure, weather-sealed courier dispatch for sensitive paperwork and certificates.',
    fullDescription: 'Specialized pouch and hardened packaging for time-sensitive, irreplaceable physical documents. Handled under chain-of-custody protocols with priority clearance.',
    iconName: 'FileText',
    deliveryTime: '2 - 3 Business Days',
    features: [
      'Tamper-evident waterproof security envelopes',
      'High-priority cabin and express pouch stowage',
      'Specific in-person recipient verification',
      'Chain-of-custody barcode scanning'
    ],
    idealFor: [
      'Legal affidavits & international contracts',
      'Academic transcripts & university credentials',
      'Financial instruments & bank securities',
      'Immigration dossiers & passport renewals'
    ]
  }
];

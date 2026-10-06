export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS_LIST: FaqItem[] = [
  {
    id: 'track-shipment',
    category: 'Tracking & AWB',
    question: 'How can I track my shipment?',
    answer: 'You can track your shipment anytime by entering your unique Air Waybill (AWB) number into the tracking bar at the top of our homepage or on the dedicated Track page. You will receive live status milestones, current facility location, flight departures, and estimated delivery dates.'
  },
  {
    id: 'find-awb',
    category: 'Tracking & AWB',
    question: 'Where can I find my AWB number?',
    answer: 'Your AWB number is located in the upper right corner of your physical shipping consignment note, or inside the confirmation email and SMS dispatch receipt sent immediately when your parcel was booked (e.g., format: SKY123456789).'
  },
  {
    id: 'delivery-time',
    category: 'Services & Timing',
    question: 'How long does international delivery take?',
    answer: 'Transit times depend on your destination and chosen service level. SkyOne Express Delivery typically delivers in 24 to 48 hours for key metropolitan corridors. Standard International Priority Courier delivers within 2 to 4 business days, while bulk air cargo runs on scheduled 3 to 5 business day cycles.'
  },
  {
    id: 'international-shipping',
    category: 'Services & Timing',
    question: 'Do you offer international shipping across all major trade lanes?',
    answer: 'Yes. SkyOne provides international courier and cargo coverage connecting India to key global hubs across the United Kingdom, Europe, the United States, Canada, the Middle East (UAE, Saudi Arabia, Qatar), Australia, and Asia-Pacific.'
  },
  {
    id: 'door-to-door',
    category: 'Services & Timing',
    question: 'Do you provide door-to-door delivery?',
    answer: 'Absolutely. Our end-to-end door-to-door courier service includes scheduled pickup from your home or corporate premises, export customs compliance, international air linehaul, and direct delivery to the recipient’s address with signature confirmation.'
  },
  {
    id: 'customs-handling',
    category: 'Customs & Documentation',
    question: 'Do you handle customs clearance and documentation?',
    answer: 'Yes. SkyOne manages all standard customs documentation, electronic manifest pre-filing, and customs brokerage support. For dutiable commercial goods, our clearance team assists in calculating applicable tariffs and coordinating Duty & Tax payment.'
  },
  {
    id: 'what-can-i-ship',
    category: 'Shipping Regulations',
    question: 'What items can I ship internationally?',
    answer: 'We accept commercial goods, business documents, sample merchandise, electronics, textiles, non-perishable packaged foods (subject to destination regulations), and manufactured equipment. Prohibited items include hazardous flammables, explosives, illegal substances, and uncertified lithium battery packs. Check our Prohibited Items guide for complete details.'
  },
  {
    id: 'request-quote',
    category: 'Pricing & Booking',
    question: 'How do I request a rate quote for commercial cargo or courier?',
    answer: 'Click "Get a Quote" in our navigation bar or fill out our quick quote form with pickup and delivery locations, package weight, and dimensions. A SkyOne cargo specialist will respond with competitive tariff rates and flight schedule options.'
  }
];

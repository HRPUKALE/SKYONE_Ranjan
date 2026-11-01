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
  },

  // ── Kerala-Specific FAQs (added for local SEO) ──────────────────────────
  {
    id: 'pickup-kerala',
    category: 'Kerala Pickup & Delivery',
    question: 'Do you offer doorstep pickup from all districts in Kerala?',
    answer: 'Yes. SkyOne provides scheduled doorstep pickup from all 14 districts of Kerala — including Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Malappuram, Kannur, Kollam, Palakkad, Alappuzha, Kottayam, Idukki, Wayanad, Kasaragod and Pathanamthitta. Book a pickup online or call our Kerala dispatch desk to schedule a same-day or next-day collection.'
  },
  {
    id: 'kochi-dubai-transit-time',
    category: 'Kerala Pickup & Delivery',
    question: 'How long does courier from Kerala to Dubai take?',
    answer: 'From Kochi, Trivandrum and Kozhikode, courier to Dubai (UAE) typically takes 1–2 business days on our Express service and 2–3 business days on our Standard International Courier. Shipments depart via Cochin International Airport (COK) on direct or one-stop Gulf sector flights. Emirates and Air India cargo lanes provide frequent daily departures for fast transit.'
  },
  {
    id: 'kochi-uk-transit-time',
    category: 'Kerala Pickup & Delivery',
    question: 'How long does a parcel from Kerala to the UK take?',
    answer: 'Express courier from Kerala to the United Kingdom (London, Manchester, Birmingham and other cities) typically delivers in 2–3 business days. Standard service delivers in 3–5 business days. Parcels fly from Cochin International Airport (COK) via connecting hubs such as Dubai or Delhi. UK Customs clearance is handled by our local partner brokerage at Heathrow.'
  },
  {
    id: 'homemade-food-gulf',
    category: 'Shipping Regulations',
    question: 'Can I send homemade food from Kerala to the Gulf (UAE, Saudi Arabia, Qatar)?',
    answer: 'Certain homemade and packaged food items can be sent to Gulf countries, but UAE, Saudi Arabia and Qatar customs apply restrictions. Commercially sealed and labelled packaged food (like packaged pickles, spices and sweets) are generally accepted. Fresh, perishable or meat-containing homemade items are typically prohibited. We recommend declaring all food items accurately and contacting our Kerala team before booking — we will advise on destination-specific regulations to avoid customs rejection.'
  },
  {
    id: 'nri-documents-kerala',
    category: 'Customs & Documentation',
    question: 'What documents are needed to send important NRI papers (visa, certificates) from Kerala?',
    answer: 'For sending NRI documents such as visa application papers, degree certificates, employment contracts, affidavits or legal attestations from Kerala, you typically need: (1) a copy of your ID proof (Aadhaar/passport), (2) a covering letter explaining the content, and (3) the recipient\'s full address and contact number. Our document courier service uses tamper-evident security pouches with chain-of-custody scanning. For attestation documents being sent to UAE or Saudi Arabia, we can coordinate with the respective consulate offices.'
  },
  {
    id: 'malappuram-kannur-courier',
    category: 'Kerala Pickup & Delivery',
    question: 'Do you serve Malappuram and Kannur for international courier to the Gulf?',
    answer: 'Yes. Malappuram and Kannur are two of our busiest pickup zones given the high concentration of Gulf-based Keralites from northern Malabar. We provide pickup from all major towns in Malappuram (Manjeri, Tirur, Perinthalmanna, Kondotty, Kalpetta) and Kannur (Thalassery, Payyannur, Iritty). Parcels are consolidated at our Kozhikode or Kochi hub before air dispatch via COK or Calicut International Airport (CCJ).'
  },
  {
    id: 'max-weight-parcel',
    category: 'Pricing & Booking',
    question: 'What is the maximum weight and size for a parcel from Kerala?',
    answer: 'For our standard international courier service, individual parcels up to 30 kg are accepted. For heavier shipments (30 kg to several tonnes), our Air Freight and Cargo services handle palletised and bulk freight without upper weight limits. Dimensional weight (volumetric weight) applies — the chargeable weight is whichever is higher between actual weight and volumetric weight (L×W×H in cm ÷ 5000). Contact our Kerala team for a precise quote based on your package dimensions.'
  },
  {
    id: 'malayalam-support',
    category: 'Pricing & Booking',
    question: 'Is Malayalam-language customer support available?',
    answer: 'Yes. Our Kerala-based customer support team is fully Malayalam-speaking. You can reach us by phone, WhatsApp or in-person at our Kochi office in your preferred language. Our dispatch advisors are available Monday to Saturday, 8 AM to 10 PM IST.'
  }
];

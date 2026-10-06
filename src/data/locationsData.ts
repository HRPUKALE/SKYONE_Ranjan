import { LocationItem } from '../types';

export const GLOBAL_HUBS: LocationItem[] = [
  {
    id: 'in-mum',
    country: 'India',
    region: 'South Asia',
    city: 'Mumbai',
    office: 'SkyOne Western Gateway Hub',
    address: 'Logistics Air Cargo Complex, Sahar Road, Andheri East, Mumbai 400099',
    phone: '+91 22 8800 1200',
    email: 'mumbai.hub@skyonecourier.com',
    hours: '24/7 Operations Hub',
    isHub: true
  },
  {
    id: 'in-del',
    country: 'India',
    region: 'South Asia',
    city: 'New Delhi',
    office: 'SkyOne Northern Gateway Terminal',
    address: 'Air Cargo Terminal 2, IGI Airport Expressway, New Delhi 110037',
    phone: '+91 11 8800 3400',
    email: 'delhi.hub@skyonecourier.com',
    hours: 'Mon - Sat: 08:00 - 22:00',
    isHub: true
  },
  {
    id: 'uae-dxb',
    country: 'United Arab Emirates',
    region: 'Middle East',
    city: 'Dubai',
    office: 'SkyOne Middle East Transshipment Hub',
    address: 'Dubai Airport Freezone (DAFZA), Cargo Mega Terminal, Dubai, UAE',
    phone: '+971 4 800 9090',
    email: 'dubai.hub@skyonecourier.com',
    hours: '24/7 Operations Hub',
    isHub: true
  },
  {
    id: 'uk-lon',
    country: 'United Kingdom',
    region: 'Europe',
    city: 'London',
    office: 'SkyOne UK & European Gateway',
    address: 'World Cargo Centre, Heathrow Airport, Hounslow, TW6 3SH, UK',
    phone: '+44 20 7946 0991',
    email: 'london.desk@skyonecourier.com',
    hours: 'Mon - Fri: 08:30 - 19:30',
    isHub: true
  },
  {
    id: 'de-fra',
    country: 'Germany',
    region: 'Europe',
    city: 'Frankfurt',
    office: 'SkyOne Central Europe Cargo Desk',
    address: 'CargoCity Süd, Geb. 501, 60549 Frankfurt am Main, Germany',
    phone: '+49 69 9000 8820',
    email: 'frankfurt.cargo@skyonecourier.com',
    hours: 'Mon - Fri: 08:00 - 18:00',
    isHub: false
  },
  {
    id: 'us-nyc',
    country: 'United States',
    region: 'North America',
    city: 'New York (JFK)',
    office: 'SkyOne North America Linehaul Hub',
    address: 'Building 75, North Boundary Road, JFK International Airport, Jamaica, NY 11430',
    phone: '+1 718 555 0192',
    email: 'us.operations@skyonecourier.com',
    hours: 'Mon - Sat: 08:00 - 20:00',
    isHub: true
  },
  {
    id: 'sg-sin',
    country: 'Singapore',
    region: 'Asia Pacific',
    city: 'Singapore',
    office: 'SkyOne Southeast Asia Distribution Office',
    address: 'Changi Airfreight Centre, Cargo Agents Building D, Singapore 819830',
    phone: '+65 6789 2210',
    email: 'singapore.ops@skyonecourier.com',
    hours: 'Mon - Fri: 09:00 - 19:00',
    isHub: true
  },
  {
    id: 'au-syd',
    country: 'Australia',
    region: 'Oceania',
    city: 'Sydney',
    office: 'SkyOne Australasia Service Centre',
    address: 'Link Road, Mascot, Sydney Airport Precinct, NSW 2020, Australia',
    phone: '+61 2 9310 7740',
    email: 'sydney.cargo@skyonecourier.com',
    hours: 'Mon - Fri: 08:30 - 18:00',
    isHub: false
  }
];

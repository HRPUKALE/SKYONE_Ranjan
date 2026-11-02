import React from 'react';
import { SERVICES_LIST } from '../data/servicesData';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Plane, 
  Globe, 
  Package, 
  ShieldCheck, 
  Zap, 
  Truck, 
  ShoppingBag, 
  FileText 
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { DURATION, EASING } from '../utils/motion';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenQuote
}) => {
  const service = SERVICES_LIST.find((s) => s.slug === slug) || SERVICES_LIST[0];
  const shouldReduceMotion = useReducedMotion();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Zap': return Zap;
      case 'Plane': return Plane;
      case 'Package': return Package;
      case 'Truck': return Truck;
      case 'ShieldCheck': return ShieldCheck;
      case 'ShoppingBag': return ShoppingBag;
      case 'FileText': return FileText;
      default: return Package;
    }
  };

  const Icon = getIcon(service.iconName);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: 'SkyOne International Courier Service',
      url: 'https://www.skyoneinternational.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'SNDP Union Bldg, Ground Floor, Shop No 744, Near My G Showroom, M C Road',
        addressLocality: 'Thiruvalla',
        addressRegion: 'Kerala',
        postalCode: '689101',
        addressCountry: 'IN',
      },
      telephone: '+91 79075 90062'
    },
    description: service.shortDescription,
    areaServed: ['USA', 'United Kingdom', 'Canada', 'Europe', 'Germany', 'Ireland', 'New Zealand', 'Australia', 'UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kerala', 'India']
  };

  // Per-slug SEO metadata for keyword-rich, geo-targeted titles
  const seoMeta: Record<string, { title: string; description: string }> = {
    'international-courier': {
      title: 'International Courier Service from Kerala | SkyOne — 2–4 Day Delivery',
      description: 'Fast, secure international courier from Kerala with doorstep pickup. Documents, parcels and commercial goods delivered to USA, UK, Canada, Europe, Germany, Ireland, New Zealand, UAE and 200+ countries in 2–4 business days.',
    },
    'express-delivery': {
      title: 'Express International Courier from Kerala | 24–48 Hour Delivery | SkyOne',
      description: 'Next-flight-out express courier from Kerala. Urgent documents, contracts and time-critical parcels delivered internationally in 24–48 hours with real-time AWB tracking.',
    },
    'air-freight': {
      title: 'Air Freight from Kerala | Commercial Cargo to USA, UK, Canada, Europe & Global | SkyOne',
      description: 'Commercial air freight solutions from Kerala. Heavy cargo, palletized freight and bulk shipments to USA, UK, Canada, Europe, Germany, Ireland, UAE and worldwide in 3–5 business days.',
    },
    'cargo': {
      title: 'Cargo Services from Kerala | Heavy Freight & Commercial Shipments | SkyOne',
      description: 'Reliable heavy cargo and multimodal freight from Kerala. Bulk commercial goods, project cargo and oversized shipments to global destinations in 5–7 business days.',
    },
    'door-to-door': {
      title: 'Door-to-Door International Delivery from Kerala | SkyOne Courier',
      description: 'Complete door-to-door international courier from Kerala. We collect from your doorstep across all Kerala districts and deliver to the recipient\'s address worldwide in 3–6 days.',
    },
    'customs-clearance': {
      title: 'Customs Clearance Services | International Export from Kerala | SkyOne',
      description: 'Expert customs brokerage and clearance for international shipments from Kerala. HS code classification, duty calculation and pre-arrival electronic filing for smooth export.',
    },
    'e-commerce-logistics': {
      title: 'E-Commerce International Shipping from India | SkyOne Cross-Border Logistics',
      description: 'Cross-border e-commerce fulfillment from India. Shopify and WooCommerce integration, DDP delivery, branded tracking pages and international returns management.',
    },
    'document-delivery': {
      title: 'International Document Courier from Kerala | Visa, Legal & Certificate Delivery',
      description: 'Secure express document courier from Kerala for NRIs. Visa applications, degree certificates, legal affidavits and employment documents delivered to Gulf countries and worldwide in 2–3 days.',
    },
  };

  const pageSeo = seoMeta[service.slug] ?? {
    title: `${service.title} | International Courier Service from Kerala | SkyOne`,
    description: service.shortDescription,
  };

  // BreadcrumbList schema for sitelinks and rich results
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.skyoneinternational.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.skyoneinternational.com/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.skyoneinternational.com/services/${service.slug}`
      }
    ]
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEO
        title={pageSeo.title}
        description={pageSeo.description}
        canonicalPath={`/services/${service.slug}`}
        schema={[serviceSchema, breadcrumbSchema]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation Breadcrumb */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: DURATION.micro }}
          className="mb-6"
        >
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#024BB2] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Services</span>
          </button>
        </motion.div>

        {/* Hero Card */}
        <ScrollReveal className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
              <span>SERVICE {service.number}</span>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-[#024BB2]" />
              <span>Standard Transit: {service.deliveryTime}</span>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0 shadow-xs">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
                {service.title}
              </h1>
              <p className="text-base text-slate-600 mt-2 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {service.fullDescription}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <AnimatedButton
              variant="primary"
              onClick={onOpenQuote}
            >
              <span>GET QUOTE FOR {service.title.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 text-[#E5192D] flight-arrow" />
            </AnimatedButton>

            <AnimatedButton
              variant="secondary"
              onClick={() => onNavigate('/track')}
            >
              <span>Track Existing Consignment</span>
            </AnimatedButton>
          </div>
        </ScrollReveal>

        {/* Two Columns: Specifications & Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Features / Capabilities */}
          <ScrollReveal className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs h-full">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-display">
              <ShieldCheck className="w-5 h-5 text-[#024BB2]" />
              <span>Key Service Capabilities</span>
            </h3>

            <div className="space-y-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#024BB2] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Suitable Commodities / Best For */}
          <ScrollReveal delay={0.1} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs h-full">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-display">
              <Package className="w-5 h-5 text-[#E5192D]" />
              <span>Recommended Commodities</span>
            </h3>

            <div className="space-y-3">
              {service.idealFor.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-[#E5192D]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>

      </div>
    </div>
  );
};

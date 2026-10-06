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
      '@type': 'LogisticsService',
      name: 'SkyOne International Courier Service',
      url: 'https://skyonecourier.com'
    },
    description: service.shortDescription,
    areaServed: 'Worldwide'
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEO
        title={`${service.title} | International Logistics`}
        description={service.shortDescription}
        canonicalPath={`/services/${service.slug}`}
        schema={serviceSchema}
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

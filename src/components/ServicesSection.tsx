import React from 'react';
import { 
  Globe, 
  Zap, 
  Plane, 
  Package, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  FileText, 
  ArrowRight 
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SERVICES_LIST } from '../data/servicesData';
import { ScrollReveal } from './motion/ScrollReveal';
import { DURATION, EASING } from '../utils/motion';

interface ServicesSectionProps {
  onSelectService: (slug: string) => void;
  onViewAll?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  onViewAll 
}) => {
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

  return (
    <section id="services-section" className="py-20 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
              <span>COMPREHENSIVE LOGISTICS SOLUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-display">
              Engineered for Global Speed &amp; Precision
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From mission-critical document dispatch to heavy commercial air cargo, SkyOne delivers tailored supply chain solutions worldwide.
            </p>
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#024BB2] hover:text-[#003B91] group cursor-pointer transition-colors"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 text-[#E5192D] group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </ScrollReveal>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service, idx) => {
            const IconComponent = getIcon(service.iconName);

            return (
              <ScrollReveal
                key={service.id}
                delay={0.06 * idx}
                className="h-full"
              >
                <motion.div
                  onClick={() => onSelectService(service.slug)}
                  whileHover={shouldReduceMotion ? {} : { y: -6, borderColor: '#024BB2' }}
                  transition={{ duration: DURATION.micro, ease: EASING.snappy }}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-blue-900/10 transition-all flex flex-col justify-between cursor-pointer h-full"
                >
                  {/* Top Number & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#E5192D] transition-colors">
                        {service.number}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-blue-50/80 text-[#024BB2] group-hover:bg-[#024BB2] group-hover:text-white transition-all flex items-center justify-center">
                        <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#024BB2] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 font-normal leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Action & Transit Time */}
                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 font-mono">
                      {service.deliveryTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#024BB2] group-hover:text-[#E5192D] transition-colors font-bold">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

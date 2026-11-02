import React from 'react';
import { 
  ShieldCheck, 
  Globe2, 
  Lock, 
  Radar, 
  Headphones, 
  Workflow,
  ArrowRight 
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './motion/ScrollReveal';
import { DURATION, EASING } from '../utils/motion';

export const WhySkyOne: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const reasons = [
    {
      title: 'Reliable Delivery',
      desc: 'Committed airline space allocations and predictable flight schedules ensure your deadlines are honored without transshipment delays.',
      icon: ShieldCheck,
      color: 'text-[#024BB2]'
    },
    {
      title: 'Global Reach',
      desc: 'Seamless connections through key transshipment gateways linking India to over 250 destination countries and territories.',
      icon: Globe2,
      color: 'text-[#024BB2]'
    },
    {
      title: 'Secure Handling',
      desc: 'Barcode scanning at every handoff, tamper-evident pouch sealing, and rigorous chain-of-custody protocols safeguard your assets.',
      icon: Lock,
      color: 'text-[#E5192D]'
    },
    {
      title: 'Real-Time Tracking',
      desc: 'Live Air Waybill milestone updates from initial booking scan through customs clearance and final recipient signature.',
      icon: Radar,
      color: 'text-[#024BB2]'
    },
    {
      title: 'Professional Support',
      desc: 'Direct access to experienced air cargo coordinators and logistics specialists ready to resolve documentation and customs queries.',
      icon: Headphones,
      color: 'text-[#E5192D]'
    },
    {
      title: 'Flexible Logistics',
      desc: 'Custom solutions scaled from lightweight urgent document pouches up to palletized commercial freighter shipments.',
      icon: Workflow,
      color: 'text-[#024BB2]'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
            <span>THE SKYONE DIFFERENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-display">
            Why Choose SkyOne?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Purpose-built logistics infrastructure designed around speed, operational integrity, and customer peace of mind.
          </p>
        </ScrollReveal>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={idx}
                delay={0.06 * idx}
                className="h-full"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -6, borderColor: '#024BB2' }}
                  transition={{ duration: DURATION.micro, ease: EASING.snappy }}
                  className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/80 hover:shadow-xl hover:shadow-blue-900/5 transition-all group flex flex-col justify-between h-full cursor-default"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#024BB2] group-hover:bg-[#024BB2] group-hover:text-white transition-all flex items-center justify-center mb-5 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#024BB2] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-[#E5192D] transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

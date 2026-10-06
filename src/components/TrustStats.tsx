import React, { useState, useEffect } from 'react';
import {
  Package,
  Globe,
  Headphones,
  Star,
  ArrowRight,
  Plane
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '../utils/motion';

interface TrustStatsProps {
  embedded?: boolean;
  onNavigate?: (path: string) => void;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ embedded = false, onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();
  const [counts, setCounts] = useState({
    shipments: 0,
    countries: 0,
    support: 24,
    satisfaction: 0
  });

  useEffect(() => {
    // Smooth counter animation
    const duration = 1400;
    const steps = 35;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);

      if (progress >= 1 || step >= steps) {
        setCounts({
          shipments: 100,
          countries: 250,
          support: 24,
          satisfaction: 99
        });
        clearInterval(timer);
        return;
      }

      // smooth easeOutExpo
      const ease = 1 - Math.pow(2, -10 * progress);

      setCounts({
        shipments: Math.min(100, Math.round(ease * 100)),
        countries: Math.min(250, Math.round(ease * 250)),
        support: 24,
        satisfaction: Math.min(99, Math.round(ease * 99))
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      value: `${counts.shipments}K+`,
      label: 'Shipments Delivered',
      subtext: 'Connecting businesses and people across the globe.',
      icon: Package,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#024BB2]',
      cornerBorder: 'border-[#024BB2]',
      hasArrow: false,
      arrowBg: '',
      arrowHoverBg: '',
      arrowColor: '',
      targetPath: '/services'
    },
    {
      value: `${counts.countries}+`,
      label: 'Countries Served',
      subtext: 'Global reach, local presence in 250+ countries.',
      icon: Globe,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      cornerBorder: 'border-[#0284c7]',
      hasArrow: true,
      arrowBg: 'bg-blue-50',
      arrowHoverBg: 'bg-[#024BB2]',
      arrowColor: 'text-[#024BB2]',
      targetPath: '/locations'
    },
    {
      value: '24/7',
      label: 'Tracking Support',
      subtext: 'Always here to help, anytime, anywhere.',
      icon: Headphones,
      iconBg: 'bg-rose-50',
      iconColor: 'text-[#E5192D]',
      cornerBorder: 'border-[#E5192D]',
      hasArrow: true,
      arrowBg: 'bg-rose-50',
      arrowHoverBg: 'bg-[#E5192D]',
      arrowColor: 'text-[#E5192D]',
      targetPath: '/contact'
    },
    {
      value: `${counts.satisfaction}%`,
      label: 'Customer Satisfaction',
      subtext: 'Committed to delivering excellence, every time.',
      icon: Star,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      cornerBorder: 'border-emerald-500',
      hasArrow: true,
      arrowBg: 'bg-emerald-50',
      arrowHoverBg: 'bg-emerald-600',
      arrowColor: 'text-emerald-600',
      targetPath: '/about'
    }
  ];

  const content = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={idx}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: DURATION.micro, ease: EASING.snappy }}
            className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-md shadow-slate-900/5 hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default min-h-[168px]"
          >
            {/* Top-Right Curved Accent Arc matching reference image */}
            <div
              className={`absolute top-0 right-0 w-11 h-11 border-t-[3.5px] border-r-[3.5px] ${item.cornerBorder} rounded-tr-2xl pointer-events-none group-hover:scale-105 transition-transform duration-300`}
            />

            {/* Subtle plane/sparkle watermark on Card 1 */}
            {idx === 0 && (
              <Plane
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 w-16 h-16 text-slate-100 group-hover:text-blue-50/70 -rotate-12 transition-all duration-500 pointer-events-none"
              />
            )}

            {/* Top Row: Circular Icon on Left + Stat & Label */}
            <div className="relative z-10 flex items-start gap-4">
              {/* Circular Icon Badge */}
              <div
                className={`w-12 h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform duration-300`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Stat & Label Content */}
              <div className="space-y-1 pr-6">
                <div className="text-3xl sm:text-4xl font-black text-slate-950 font-display tracking-tight leading-none font-mono tabular-nums">
                  {item.value}
                </div>

                <div className="text-sm font-bold text-slate-900 pt-0.5">
                  {item.label}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal pt-0.5">
                  {item.subtext}
                </p>
              </div>
            </div>

            {/* Bottom-Right Small Circular Arrow Button (for Cards 2, 3, 4) */}
            {item.hasArrow && (
              <button
                type="button"
                onClick={() => {
                  if (onNavigate && item.targetPath) {
                    onNavigate(item.targetPath);
                  }
                }}
                className={`absolute bottom-4 right-4 w-7 h-7 rounded-full ${item.arrowBg} ${item.arrowColor} hover:${item.arrowHoverBg} hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs group-hover:translate-x-0.5`}
                aria-label={`Learn more about ${item.label}`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="relative py-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};


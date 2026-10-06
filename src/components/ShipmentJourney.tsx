import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASING, DURATION } from '../utils/motion';
import { ScrollReveal } from './motion/ScrollReveal';

/* =========================================================================
   Custom Vector Illustrations for the 6 Shipping Steps
   Crafted in editorial flat vector style matching SkyOne's brand colors:
   Crimson Red (#C5221F), Deep Charcoal (#1E293B), Clean White, and Soft Slate.
   ========================================================================= */

// 1. Get A Quote: Web interface calculator & customer reviewing rates
const IllustrationQuote: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground baseline */}
    <line x1="15" y1="124" x2="145" y2="124" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Web Browser / Calculator Screen */}
    <rect x="25" y="44" width="76" height="72" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
    <path d="M25 56H101" stroke="#E2E8F0" strokeWidth="1.5" />
    <circle cx="32" cy="50" r="1.5" fill="#EF4444" />
    <circle cx="37" cy="50" r="1.5" fill="#F59E0B" />
    <circle cx="42" cy="50" r="1.5" fill="#10B981" />
    
    {/* Form & rate card elements */}
    <rect x="33" y="63" width="16" height="13" rx="2" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="54" y="63" width="16" height="13" rx="2" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="75" y="63" width="16" height="13" rx="2" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="33" y="82" width="16" height="13" rx="2" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="54" y="82" width="16" height="13" rx="2" fill="#F8FAFC" stroke="#E2E8F0" />
    
    {/* Prominent Red Quote Package */}
    <rect x="73" y="78" width="22" height="20" rx="2" fill="#C5221F" />
    <path d="M84 78V98M73 88H95" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
    
    {/* Customer Character */}
    <circle cx="114" cy="50" r="5" fill="#1E293B" />
    <path d="M110 48C110 44 118 44 118 48C119 52 118 57 118 57" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M111 57H117L119 78H109L111 57Z" fill="#C5221F" />
    <path d="M111 63L101 70" stroke="#C5221F" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="112" y1="78" x2="110" y2="124" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="116" y1="78" x2="120" y2="124" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
);

// 2. Pick: Doorstep handover between courier agent and customer
const IllustrationPick: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground baseline and subtle garden grass */}
    <line x1="15" y1="124" x2="145" y2="124" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M30 124Q33 117 36 124M39 124Q41 118 43 124" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Courier Agent (Left) */}
    <circle cx="62" cy="46" r="5" fill="#1E293B" />
    <path d="M57 54H67L68 76H56L57 54Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
    <path d="M65 62L76 68" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="59" y1="76" x2="57" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="76" x2="71" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    
    {/* Red Handover Box */}
    <rect x="74" y="60" width="20" height="18" rx="2" fill="#C5221F" />
    <path d="M84 60V78M74 69H94" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
    
    {/* Customer (Right) */}
    <circle cx="104" cy="49" r="5" fill="#1E293B" />
    <path d="M99 47C99 42 109 42 109 47C110 52 108 57 108 57" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M100 56H108L110 76H98L100 56Z" fill="#C5221F" />
    <path d="M101 62L89 68" stroke="#C5221F" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="102" y1="76" x2="100" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <line x1="106" y1="76" x2="114" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 3. Pack: Packaging items into standard export carton
const IllustrationPack: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground baseline */}
    <line x1="15" y1="124" x2="145" y2="124" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Background accent plant / decor */}
    <path d="M42 124Q38 98 48 94Q54 112 50 124" fill="#F1F5F9" />
    
    {/* Sealed stack cartons on left */}
    <rect x="52" y="104" width="16" height="20" rx="1" fill="#1E293B" />
    <path d="M60 104V124" stroke="#CBD5E1" strokeWidth="1" />
    
    {/* Main Open Shipping Box (Red) */}
    <rect x="100" y="92" width="28" height="32" rx="2" fill="#C5221F" />
    <path d="M96 92L100 84H114L112 92" fill="#991B1B" />
    <path d="M128 92L132 84H118L120 92" fill="#991B1B" />
    
    {/* Packing Person */}
    <circle cx="76" cy="48" r="5" fill="#1E293B" />
    <path d="M72 46C71 42 81 42 81 47C82 52 80 57 80 57" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M72 56H80L85 86H68L72 56Z" fill="#C5221F" />
    <path d="M78 64L102 76" stroke="#C5221F" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="105" cy="74" r="3.5" fill="#DC2626" />
    <line x1="73" y1="86" x2="68" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <line x1="80" y1="86" x2="84" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 4. Ship: Dispatch crates & airport linehaul transit
const IllustrationShip: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground baseline */}
    <line x1="15" y1="124" x2="145" y2="124" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Freight dispatch crates */}
    <rect x="42" y="86" width="34" height="38" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
    <rect x="46" y="68" width="22" height="18" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
    
    {/* Route waypoint pins */}
    <path d="M44 80C44 77 47 75 49 75C51 75 54 77 54 80C54 84 49 89 49 89C49 89 44 84 44 80Z" fill="#CBD5E1" />
    <path d="M80 78C80 73 84 70 87 70C90 70 94 73 94 78C94 85 87 92 87 92C87 92 80 85 80 78Z" fill="#C5221F" />
    <circle cx="87" cy="78" r="2.5" fill="#FFFFFF" />
    
    {/* Dispatch Coordinator (sitting on crate) */}
    <circle cx="56" cy="42" r="4.5" fill="#1E293B" />
    <path d="M53 48H60L62 66H51L53 48Z" fill="#C5221F" />
    <line x1="60" y1="66" x2="72" y2="76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Logistics Agent (standing) with dispatch parcel */}
    <circle cx="109" cy="46" r="4.5" fill="#1E293B" />
    <path d="M105 52H113L114 74H104L105 52Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
    <rect x="101" y="60" width="16" height="14" rx="1.5" fill="#C5221F" />
    <line x1="106" y1="74" x2="104" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <line x1="112" y1="74" x2="116" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 5. Track: Live GPS route grid & location pin
const IllustrationTrack: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground baseline */}
    <line x1="15" y1="124" x2="145" y2="124" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Map Grid */}
    <rect x="80" y="44" width="48" height="34" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
    <path d="M80 55H128M80 66H128M96 44V78M112 44V78" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
    
    {/* Prominent Red GPS Pin */}
    <path d="M96 50C96 42 104 38 108 38C112 38 120 42 120 50C120 60 108 72 108 72C108 72 96 60 96 50Z" fill="#C5221F" />
    <circle cx="108" cy="50" r="4.5" fill="#FFFFFF" />
    
    {/* Tracking Specialist */}
    <circle cx="56" cy="46" r="5" fill="#1E293B" />
    <path d="M50 54H62L64 78H48L50 54Z" fill="#1E293B" />
    <path d="M55 54L56 66L57 54" stroke="#C5221F" strokeWidth="1.5" />
    <line x1="53" y1="78" x2="52" y2="124" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="59" y1="78" x2="60" y2="124" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

// 6. Delivered: Verified doorstep package handover with checkmark
const IllustrationDelivered: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground baseline */}
    <line x1="15" y1="124" x2="145" y2="124" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Delivered cartons on doorstep */}
    <rect x="52" y="82" width="34" height="42" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
    <path d="M69 82V124" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Verified Delivery Badge */}
    <circle cx="53" cy="84" r="6" fill="#C5221F" />
    <path d="M50 84L52 86L56 82" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Happy Customer with package */}
    <circle cx="114" cy="46" r="5" fill="#1E293B" />
    <path d="M109 44C108 40 119 40 119 45C120 50 118 56 118 56" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M109 54H118L120 74H107L109 54Z" fill="#C5221F" />
    
    {/* Delivered Parcel Box */}
    <rect x="91" y="58" width="22" height="16" rx="2" fill="#C5221F" />
    <path d="M102 58V74M91 66H113" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
    <path d="M109 60L102 65" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    
    <line x1="110" y1="74" x2="108" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <line x1="116" y1="74" x2="122" y2="124" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const ShipmentJourney: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      id: 'quote',
      title: 'Get A Quote',
      desc: 'Get clear and reliable shipping quotes for 220+ countries.',
      Illustration: IllustrationQuote
    },
    {
      id: 'pick',
      title: 'Pick',
      desc: 'Get a fast and convenient doorstep pickup for your shipment anywhere in Kerala.',
      Illustration: IllustrationPick
    },
    {
      id: 'pack',
      title: 'Pack',
      desc: 'We pack your shipments according to international standards.',
      Illustration: IllustrationPack
    },
    {
      id: 'ship',
      title: 'Ship',
      desc: 'Smooth & stress-free shipping every time.',
      Illustration: IllustrationShip
    },
    {
      id: 'track',
      title: 'Track',
      desc: 'Get real-time tracking updates for your shipment.',
      Illustration: IllustrationTrack
    },
    {
      id: 'delivered',
      title: 'Delivered',
      desc: 'Get your shipment delivered to your designated address.',
      Illustration: IllustrationDelivered
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F6F8FB] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching Reference Image */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Simple &amp; Hassle Free <span className="text-[#C5221F]">Shipping Process</span>
          </h2>
        </ScrollReveal>

        {/* Desktop View: 6 Circular Steps with Animated Curved Dotted Red Route */}
        <div className="hidden xl:block relative">
          
          {/* SVG Curved Connecting Path with Directional Arrows */}
          <div className="absolute top-10 left-0 right-0 h-28 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none">
              <defs>
                <marker
                  id="processArrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 1 2 L 7 5 L 1 8" stroke="#C5221F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </marker>
              </defs>

              {/* Segment 1 -> 2: Arches UP over */}
              <path
                d="M 160 52 Q 200 12 240 52"
                stroke="#C5221F"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path d="M 197 19 L 204 22 L 197 25" stroke="#C5221F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Segment 2 -> 3: Dips DOWN under */}
              <path
                d="M 360 70 Q 400 110 440 70"
                stroke="#C5221F"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path d="M 397 100 L 404 103 L 397 106" stroke="#C5221F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Segment 3 -> 4: Arches UP over */}
              <path
                d="M 560 52 Q 600 12 640 52"
                stroke="#C5221F"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path d="M 597 19 L 604 22 L 597 25" stroke="#C5221F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Segment 4 -> 5: Dips DOWN under */}
              <path
                d="M 760 70 Q 800 110 840 70"
                stroke="#C5221F"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path d="M 797 100 L 804 103 L 797 106" stroke="#C5221F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Segment 5 -> 6: Arches UP over */}
              <path
                d="M 960 52 Q 1000 12 1040 52"
                stroke="#C5221F"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path d="M 997 19 L 1004 22 L 997 25" stroke="#C5221F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* 6 Step Nodes */}
          <div className="grid grid-cols-6 gap-3 relative z-10">
            {steps.map((step, idx) => {
              const IllustrationComponent = step.Illustration;

              return (
                <ScrollReveal
                  key={step.id}
                  delay={0.08 * idx}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Large Circular Illustration Card */}
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.03 }}
                    transition={{ duration: DURATION.micro, ease: EASING.flight }}
                    className="w-36 h-36 xl:w-40 xl:h-40 rounded-full bg-white shadow-lg shadow-slate-200/70 border border-slate-100 flex items-center justify-center p-3 relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-red-100 cursor-default"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <IllustrationComponent />
                    </div>
                  </motion.div>

                  {/* Text details */}
                  <div className="mt-5 space-y-1.5 px-1">
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-[190px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Tablet View: 2 or 3 Column Responsive Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:hidden gap-8 max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const IllustrationComponent = step.Illustration;

            return (
              <ScrollReveal
                key={step.id}
                delay={0.06 * idx}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-36 h-36 rounded-full bg-white shadow-md shadow-slate-200/70 border border-slate-100 flex items-center justify-center p-3 relative overflow-hidden">
                  <IllustrationComponent />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1 max-w-[220px]">
                  {step.desc}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile View: Vertical Step Sequence */}
        <div className="sm:hidden space-y-6 max-w-sm mx-auto">
          {steps.map((step, idx) => {
            const IllustrationComponent = step.Illustration;
            const isLast = idx === steps.length - 1;

            return (
              <ScrollReveal
                key={step.id}
                delay={0.05 * idx}
                className="relative pl-24"
              >
                {/* Connecting Vertical Dotted Line */}
                {!isLast && (
                  <div className="absolute left-[38px] top-20 bottom-[-24px] w-0.5 border-l-2 border-dashed border-[#C5221F]/40" />
                )}

                {/* Circle Illustration */}
                <div className="absolute left-0 top-0 w-20 h-20 rounded-full bg-white shadow-md shadow-slate-200/70 border border-slate-100 p-2 overflow-hidden flex items-center justify-center">
                  <IllustrationComponent />
                </div>

                <div className="pt-2">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

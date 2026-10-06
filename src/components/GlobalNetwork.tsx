import React from 'react';
import { Globe, Plane, MapPin, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EASING, DURATION } from '../utils/motion';
import { ScrollReveal } from './motion/ScrollReveal';

interface GlobalNetworkProps {
  onViewLocations?: () => void;
}

export const GlobalNetwork: React.FC<GlobalNetworkProps> = ({ onViewLocations }) => {
  const shouldReduceMotion = useReducedMotion();

  const routes = [
    { origin: 'Mumbai (BOM)', destination: 'Dubai (DXB)', duration: 'Same-Day / Next-Day', tag: 'High Frequency' },
    { origin: 'Delhi (DEL)', destination: 'London (LHR)', duration: '2 - 3 Days Express', tag: 'Core Linehaul' },
    { origin: 'Mumbai (BOM)', destination: 'New York (JFK)', duration: '3 - 4 Days Priority', tag: 'Transatlantic' },
    { origin: 'Bangalore (BLR)', destination: 'Singapore (SIN)', duration: '2 Days Express', tag: 'Asia Corridor' }
  ];

  const regions = [
    { name: 'India Hubs', desc: 'Mumbai, New Delhi, Ahmedabad, Bangalore, Chennai' },
    { name: 'Middle East', desc: 'Dubai, Abu Dhabi, Riyadh, Doha, Muscat' },
    { name: 'United Kingdom', desc: 'London Heathrow, Manchester, Birmingham' },
    { name: 'Europe', desc: 'Frankfurt, Paris, Amsterdam, Milan, Madrid' },
    { name: 'North America', desc: 'New York, Chicago, Los Angeles, Toronto' },
    { name: 'Asia Pacific', desc: 'Singapore, Hong Kong, Sydney, Melbourne' }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#0A1120] text-white relative overflow-hidden">
      {/* Background Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-[#E5192D]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Coordinate Grid */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="networkGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#60A5FA" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#networkGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 text-blue-400 border border-blue-800/80 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
            <span>GLOBAL REACH &bull; FROM INDIA TO THE WORLD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Moving What Matters, Worldwide
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Strategic international air transit corridors connecting Indian commercial centers directly with major distribution gateways across the Middle East, Europe, the Americas, and Asia-Pacific.
          </p>
        </ScrollReveal>

        {/* Global Map Schematic Visual */}
        <ScrollReveal className="relative bg-slate-900/80 rounded-2xl border border-slate-800/90 p-6 sm:p-8 mb-10 shadow-2xl overflow-hidden backdrop-blur-xs">
          
          <div className="relative h-64 sm:h-84 w-full flex items-center justify-center">
            
            {/* SVG Flight Routes Visualizer */}
            <svg className="w-full h-full max-w-4xl overflow-visible" viewBox="0 0 900 400" fill="none">
              <defs>
                <linearGradient id="globalRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="60%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#E5192D" />
                </linearGradient>

                <path id="primaryLinehaul" d="M 600 210 Q 530 140 440 110" />
              </defs>

              {/* World Map Simplified Outlines (Stylized) */}
              <g opacity="0.22" stroke="#3B82F6" strokeWidth="1" fill="#1E293B">
                {/* North America */}
                <path d="M 120 100 Q 200 90 240 140 T 160 220 Z" />
                {/* Europe */}
                <path d="M 420 80 Q 480 80 500 120 T 440 160 Z" />
                {/* Africa */}
                <path d="M 430 180 Q 510 180 520 280 T 440 300 Z" />
                {/* India & South Asia */}
                <path d="M 580 160 Q 640 170 650 240 T 590 260 Z" fill="#024BB2" opacity="0.5" />
                {/* East Asia */}
                <path d="M 680 120 Q 780 130 760 220 T 670 200 Z" />
                {/* Australia */}
                <path d="M 720 270 Q 820 270 800 340 T 730 340 Z" />
              </g>

              {/* Major Hub Flight Arcs */}
              {/* Mumbai -> Dubai */}
              <path d="M 600 210 Q 565 185 530 180" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
              
              {/* Mumbai -> Dubai -> London (Main Animated Flight Arc) */}
              <motion.path
                d="M 600 210 Q 530 140 440 110"
                stroke="url(#globalRouteGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: EASING.flight }}
              />

              {/* London -> New York */}
              <path d="M 440 110 Q 320 80 210 130" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />

              {/* Mumbai -> Singapore */}
              <path d="M 600 210 Q 660 215 710 240" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

              {/* Moving Airplane on primary corridor */}
              {!shouldReduceMotion && (
                <g>
                  <path
                    d="M0 -3 L8 0 L0 3 L2 0 Z M2 0 L-4 6 L-2 0 L-4 -6 Z"
                    fill="#FFFFFF"
                    stroke="#E5192D"
                    strokeWidth="1"
                  >
                    <animateMotion
                      dur="5s"
                      repeatCount="indefinite"
                      rotate="auto"
                      keyPoints="0;0.5;1"
                      keyTimes="0;0.5;1"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    >
                      <mpath href="#primaryLinehaul" />
                    </animateMotion>
                  </path>
                </g>
              )}

              {/* Hub Nodes */}
              {/* Mumbai Gateway */}
              <circle cx="600" cy="210" r="7" fill="#024BB2" stroke="#FFFFFF" strokeWidth="2.5" />
              <text x="600" y="235" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">MUMBAI</text>

              {/* Dubai Hub */}
              <circle cx="530" cy="180" r="5" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="530" y="165" fill="#93C5FD" fontSize="10" fontWeight="700" textAnchor="middle">DUBAI</text>

              {/* London Heathrow with Pulsing Node */}
              <circle cx="440" cy="110" r="6" fill="#E5192D" stroke="#FFFFFF" strokeWidth="2" />
              {!shouldReduceMotion && (
                <circle cx="440" cy="110" r="11" fill="none" stroke="#E5192D" strokeWidth="1.5" className="animate-ping opacity-75" />
              )}
              <text x="440" y="95" fill="#FCA5A5" fontSize="10" fontWeight="700" textAnchor="middle">LONDON</text>

              {/* New York JFK */}
              <circle cx="210" cy="130" r="5.5" fill="#E5192D" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="210" y="115" fill="#FCA5A5" fontSize="10" fontWeight="700" textAnchor="middle">NEW YORK</text>

              {/* Singapore */}
              <circle cx="710" cy="240" r="5" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="710" y="260" fill="#93C5FD" fontSize="10" fontWeight="700" textAnchor="middle">SINGAPORE</text>
            </svg>

          </div>

          {/* Connected Sample Route Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {routes.map((rt, idx) => (
              <motion.div
                key={idx}
                whileHover={shouldReduceMotion ? {} : { y: -3, borderColor: '#3B82F6' }}
                transition={{ duration: DURATION.micro }}
                className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 transition-colors cursor-default"
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="text-blue-400 font-mono font-semibold">{rt.tag}</span>
                  <span className="text-slate-400">{rt.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <span>{rt.origin}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5192D] shrink-0" />
                  <span>{rt.destination}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </ScrollReveal>

        {/* Global Regions Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {regions.map((reg, idx) => (
            <ScrollReveal
              key={idx}
              delay={0.05 * idx}
              className="bg-slate-900/50 hover:bg-slate-900/80 rounded-xl p-3.5 border border-slate-800/80 transition-all hover:border-slate-700"
            >
              <div className="text-xs font-black text-white flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-[#E5192D] shrink-0" />
                <span className="truncate">{reg.name}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {reg.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {onViewLocations && (
          <ScrollReveal delay={0.2} className="mt-8 text-center">
            <button
              onClick={onViewLocations}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white uppercase tracking-wider cursor-pointer group transition-colors"
            >
              <span>Explore All Gateway Hubs &amp; Offices</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5192D] group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};

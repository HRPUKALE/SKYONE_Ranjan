import React from 'react';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Plane, 
  Globe, 
  Clock, 
  Ship, 
  DoorOpen, 
  ShieldAlert, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EASING, DURATION } from '../utils/motion';
import heroBg from '../assets/images/skyone_hero_bg.jpg';

interface HeroProps {
  onTrackClick: () => void;
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTrackClick, onQuoteClick }) => {
  const shouldReduceMotion = useReducedMotion();

  const quickFeatures = [
    {
      title: 'International Courier',
      icon: Globe,
      color: 'text-[#024BB2]',
      bg: 'bg-blue-50/90 border-blue-200/80'
    },
    {
      title: 'Cargo Logistics',
      icon: Plane,
      color: 'text-[#E5192D]',
      bg: 'bg-rose-50/90 border-rose-200/80'
    },
    {
      title: 'Air Freight',
      icon: Ship,
      color: 'text-[#024BB2]',
      bg: 'bg-blue-50/90 border-blue-200/80'
    },
    {
      title: 'Door-to-Door',
      icon: DoorOpen,
      color: 'text-[#E5192D]',
      bg: 'bg-rose-50/90 border-rose-200/80'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      
      {/* 1. Photographic Aviation Logistics Background Image with SkyOne livery & branded parcels */}
      <div 
        className="absolute inset-0 bg-cover bg-right lg:bg-[right_center] pointer-events-none opacity-100 transition-opacity"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      {/* 2. Soft Luminous Gradient Mask to ensure ultra-sharp readability on the left without washing out the plane & parcels */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-30% to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Bottom Curved Swoosh Waves (Royal Blue & Crimson Red) */}
      <div className="absolute -bottom-1 left-0 right-0 h-20 sm:h-24 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Royal Blue wave */}
          <path 
            d="M -50,120 Q 250,50 650,95 T 1440,110 L 1440,120 L -50,120 Z" 
            fill="#024BB2" 
            opacity="0.95"
          />
          {/* Crimson Red wave */}
          <path 
            d="M 150,120 Q 600,45 1050,85 T 1440,95 L 1440,120 L 150,120 Z" 
            fill="#E5192D" 
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & Primary Conversion */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Kicker Header: FAST • SECURE • GLOBAL ─── */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, ease: EASING.flight }}
              className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#024BB2] uppercase"
            >
              <span>FAST</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#024BB2]" />
              <span>SECURE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#024BB2]" />
              <span>GLOBAL</span>
              <span className="w-10 h-[2px] bg-[#024BB2]/70 inline-block ml-1" />
            </motion.div>

            {/* Primary Page H1 */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, delay: 0.05, ease: EASING.flight }}
              className="text-base sm:text-lg font-bold text-[#024BB2] tracking-normal"
            >
              International Courier Service from Kerala
            </motion.h1>

            {/* Main Headline & Tagline */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard + 0.1, delay: 0.1, ease: EASING.cinematic }}
              className="text-4xl sm:text-5xl lg:text-[62px] font-black text-slate-950 tracking-tight leading-[1.06] font-display"
            >
              Your Shipment.
              <br />
              <span className="text-[#024BB2] relative inline-block">
                Our Commitment.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E5192D]" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <motion.path
                    d="M 0 6 Q 150 12 300 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={shouldReduceMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: EASING.snappy }}
                  />
                </svg>
              </span>
            </motion.p>

            {/* Supporting Paragraph */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, delay: 0.2, ease: EASING.flight }}
              className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed pt-1"
            >
              Fast, secure and reliable international courier and cargo solutions — from pickup to delivery. Direct global air links connecting your parcels to key world markets with priority tracking.
            </motion.p>

            {/* CTA Group with Pill Buttons matching reference */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, delay: 0.3, ease: EASING.flight }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              {/* Primary Pill Button: Track Your Shipment */}
              <button
                type="button"
                onClick={onTrackClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-blue-900/20 transition-all cursor-pointer group active:scale-[0.98] min-h-[46px] whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-white shrink-0" />
                <span>TRACK YOUR SHIPMENT</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Pill Button: Get a Quote */}
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold rounded-full border border-slate-300 shadow-xs transition-all cursor-pointer group active:scale-[0.98] min-h-[46px] whitespace-nowrap"
              >
                <span>GET A QUOTE</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* 4 Feature Badges in a Row matching reference */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, delay: 0.4 }}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
            >
              {quickFeatures.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 border shadow-2xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* Right Column: Premium "EXPRESS FLIGHT LINEHAUL" Glass Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-24 xl:mt-28">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: DURATION.feature, delay: 0.25, ease: EASING.flight }}
              className="relative mx-auto max-w-[360px] sm:max-w-[375px] lg:ml-2"
            >
              
              {/* Main Navy / Sapphire Card Container - Sleek & Compact */}
              <div className="relative bg-gradient-to-b from-[#08182B]/95 via-[#0A1F38]/95 to-[#071526]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 text-white shadow-2xl shadow-slate-950/40 border border-blue-400/20 overflow-visible">
                
                {/* Header of Visual */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5192D] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5192D]" />
                    </span>
                    <span className="text-[11px] font-extrabold tracking-wider text-slate-200 uppercase">
                      EXPRESS FLIGHT LINEHAUL
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-bold font-mono text-blue-400 bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-700/60 uppercase tracking-wider">
                    AWB DISPATCH
                  </span>
                </div>

                {/* Route Visualizer Graph with Curved Trajectory & Airplane */}
                <div className="py-3 relative">
                  <svg className="w-full h-20 overflow-visible" viewBox="0 0 320 65" fill="none">
                    <defs>
                      <linearGradient id="flightArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="60%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#E5192D" />
                      </linearGradient>

                      {/* Flight Path Curve */}
                      <path id="flightTrajectory" d="M 30 50 Q 160 8 290 50" />
                    </defs>

                    {/* Gradient Arc Path */}
                    <path
                      d="M 30 50 Q 160 8 290 50"
                      stroke="url(#flightArcGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Airplane in the middle of flight curve */}
                    <g transform="translate(160, 26) rotate(5)">
                      <circle cx="0" cy="0" r="10" fill="#0A1F38" />
                      <path
                        d="M 0 -6 L 6 0 L 0 6 L 1.8 0 Z M 1.8 0 L -4 6.5 L -1.8 0 L -4 -6.5 Z"
                        fill="#FFFFFF"
                        stroke="#024BB2"
                        strokeWidth="1"
                        transform="rotate(90)"
                      />
                    </g>
                  </svg>

                  {/* Nodes positioned at ends of arc */}
                  <div className="absolute bottom-1 left-2 flex flex-col items-center">
                    {/* Indian Flag Circular Roundel */}
                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md flex flex-col">
                      <div className="h-1/3 bg-[#FF9933] w-full" />
                      <div className="h-1/3 bg-white w-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
                      </div>
                      <div className="h-1/3 bg-[#138808] w-full" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-200 mt-0.5 uppercase tracking-wide">
                      INDIA
                    </span>
                  </div>

                  <div className="absolute bottom-1 right-2 flex flex-col items-center">
                    {/* Globe / Destination Red Pin */}
                    <div className="w-7 h-7 rounded-full bg-rose-600/30 border-2 border-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-900/30">
                      <Globe className="w-3.5 h-3.5 text-rose-300" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-200 mt-0.5 uppercase tracking-wide">
                      GLOBAL
                    </span>
                  </div>
                </div>

                {/* Status & Metrics Sub-panel (Illustration) */}
                <div className="bg-[#061220]/90 rounded-xl p-3 border border-blue-900/50 space-y-2" aria-label="Tracking interface illustration" role="img">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Transit Monitoring</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Scheduled Air Linehaul
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-slate-800/80">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-semibold">Transit Mode</div>
                      <div className="text-[11px] font-bold text-sky-400 flex items-center gap-1 mt-0.5">
                        <Plane className="w-3 h-3 text-sky-400 shrink-0" />
                        <span>Air Cargo</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-semibold">Clearance</div>
                      <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Pre-Cleared</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-semibold">Security</div>
                      <div className="text-[11px] font-bold text-rose-400 flex items-center gap-1 mt-0.5">
                        <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
                        <span>Sealed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Line */}
                <div className="pt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-blue-400" />
                    Continuous flight monitoring
                  </span>
                </div>

                {/* Overlapping Floating Badge matching reference */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-4 -right-2 sm:-right-4 bg-white text-slate-900 px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-2.5 z-30"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold text-slate-900 leading-tight">Cross-Border Reach</div>
                    <div className="text-[9px] text-slate-500 leading-tight">Express hubs worldwide</div>
                  </div>
                </motion.div>

              </div>

            </motion.div>
          </div>

        </div>

        {/* 4. Bottom Floating Tracking Ribbon Bar matching reference */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.standard, delay: 0.5, ease: EASING.flight }}
          className="mt-14 max-w-2xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-3 sm:py-3.5 border border-slate-200/90 shadow-lg shadow-slate-900/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5192D] text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 -rotate-45" />
              </div>
              <div className="text-left">
                <div className="text-[11px] sm:text-xs font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
                  REAL-TIME CONSIGNMENT TRACKING
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">
                  From our hub to your door — always in sight.
                </div>
              </div>
            </div>

            {/* Dotted Flight Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="w-20 border-b-2 border-dotted border-blue-300" />
              <span className="w-20 border-b-2 border-dotted border-red-300" />
              <Plane className="w-4 h-4 text-[#E5192D] -rotate-45" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

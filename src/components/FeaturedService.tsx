import React from 'react';
import {
  ArrowRight,
  Plane,
  ShieldCheck,
  MapPin,
  Package,
  FileText,
  Globe,
  Headphones,
  Shield,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '../utils/motion';
import featuredCargoImg from '../assets/images/skyone_featured_cargo.jpg';

interface FeaturedServiceProps {
  onLearnMore: () => void;
  onGetQuote: () => void;
}

const features = [
  {
    title: 'Fast Transit',
    desc: 'Direct international air routes with optimized linehauls.',
    icon: Plane,
    color: 'text-[#024BB2]',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    fullWidth: false,
  },
  {
    title: 'Secure Handling',
    desc: 'Tamper-evident sealing and verified chain-of-custody.',
    icon: ShieldCheck,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    fullWidth: false,
  },
  {
    title: 'Shipment Tracking',
    desc: 'Real-time AWB updates and dispatch notifications.',
    icon: MapPin,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    fullWidth: false,
  },
  {
    title: 'Door-to-Door Delivery',
    desc: 'Direct doorstep pickup through to final recipient handover.',
    icon: Package,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    fullWidth: false,
  },
  {
    title: 'Customs Assistance',
    desc: 'Comprehensive regulatory documentation and HS guidance.',
    icon: FileText,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    fullWidth: true,
  },
];

export const FeaturedService: React.FC<FeaturedServiceProps> = ({ onLearnMore, onGetQuote }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f0fd 35%, #eef4ff 65%, #f8faff 100%)',
      }}
    >
      {/* ── Google Fonts ── */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>

      {/* ─── BACKGROUND DECORATIONS ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* World-map dot-grid right side */}
        <svg className="absolute right-0 top-0 w-[52%] h-full opacity-[0.055]"
          viewBox="0 0 700 600" fill="none" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="155" cy="175" rx="115" ry="78" fill="#024BB2"/>
          <ellipse cx="205" cy="345" rx="58" ry="88" fill="#024BB2"/>
          <ellipse cx="358" cy="158" rx="52" ry="48" fill="#024BB2"/>
          <ellipse cx="378" cy="322" rx="62" ry="92" fill="#024BB2"/>
          <ellipse cx="528" cy="178" rx="128" ry="78" fill="#024BB2"/>
          <ellipse cx="578" cy="392" rx="58" ry="42" fill="#024BB2"/>
          {Array.from({length: 22}).map((_, r) =>
            Array.from({length: 30}).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c*24+8} cy={r*28+8} r="1.1" fill="#024BB2"/>
            ))
          )}
        </svg>

        {/* Flight path arc — top right */}
        <svg className="absolute top-6 right-4 w-[400px] h-48 opacity-55"
          viewBox="0 0 400 200" fill="none">
          <path d="M20 160 C100 55 285 38 382 82"
            stroke="#93C5FD" strokeWidth="1.8" strokeDasharray="6 5"/>
          <circle cx="298" cy="52" r="5" fill="#E5192D"/>
          <circle cx="298" cy="52" r="12" fill="#E5192D" opacity="0.18"/>
          <text x="375" y="90" fontSize="14" fill="#024BB2" transform="rotate(-22,375,90)">✈</text>
        </svg>

        {/* Flight path arc — bottom left */}
        <svg className="absolute bottom-14 left-6 w-64 h-20 opacity-35"
          viewBox="0 0 260 80" fill="none">
          <path d="M8 68 C78 18 188 28 252 46"
            stroke="#93C5FD" strokeWidth="1.4" strokeDasharray="5 5"/>
          <text x="248" y="50" fontSize="11" fill="#024BB2" transform="rotate(12,248,50)">✈</text>
        </svg>

        {/* Bottom-right blue + red swoosh */}
        <div className="absolute bottom-0 right-0 w-64 sm:w-[380px] h-24 overflow-hidden">
          <svg viewBox="0 0 380 96" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,96 Q170,22 380,0 L380,96Z" fill="#024BB2" opacity="0.9"/>
            <path d="M55,96 Q210,38 380,14 L380,96Z" fill="#E5192D" opacity="0.85"/>
          </svg>
        </div>

        {/* Blue glow blob left side */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-blue-500 opacity-[0.06] blur-3xl"/>
      </div>

      {/* ─── MAIN GRID ─── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-14 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-center">

          {/* ══ LEFT: Aircraft Composition ══ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: DURATION.feature, ease: EASING.cinematic }}
            className="relative"
          >

            {/* Organic blob background behind image */}
            <div
              className="absolute -inset-4 sm:-inset-6 lg:-inset-8 -z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(140deg, #024BB2 0%, #0258C4 45%, #0369a1 100%)',
                borderRadius: '40% 60% 54% 46% / 44% 38% 62% 56%',
                opacity: 0.9,
                transform: 'rotate(-2.5deg) scale(1.05)',
              }}
            />

            {/* Inner white glow ring */}
            <div
              className="absolute -inset-1.5 z-[1] rounded-[2.25rem] border-2 border-white/55 pointer-events-none"
              style={{ boxShadow: '0 0 0 1px rgba(2,75,178,0.22), inset 0 0 0 1px rgba(255,255,255,0.08)' }}
            />

            {/* Image card */}
            <div
              className="relative rounded-[2rem] overflow-hidden"
              style={{ boxShadow: '0 28px 72px rgba(2,75,178,0.28), 0 6px 20px rgba(0,0,0,0.16)' }}
            >
              {/* Handwritten tag — overlaid on upper right of image */}
              <div
                className="absolute top-4 right-5 z-20 text-right pointer-events-none select-none"
              >
                <span style={{
                  fontFamily: '"Dancing Script", cursive',
                  fontSize: 'clamp(20px, 2vw, 30px)',
                  color: '#ffffff',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  display: 'block',
                  transform: 'rotate(-3deg)',
                  textShadow: '0 2px 12px rgba(2,75,178,0.55), 0 1px 4px rgba(0,0,0,0.35)',
                }}>
                  Your Cargo<br/>Our Priority
                </span>
                <svg className="w-28 sm:w-36 h-4 mt-1.5 ml-auto" viewBox="0 0 140 14" fill="none">
                  <path d="M4 9 Q70 14 136 4" stroke="#E5192D" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Aircraft photo */}
              <div className="relative w-full bg-slate-900"
                style={{ height: 'clamp(360px, 38vw, 560px)' }}>
                <img
                  src={featuredCargoImg}
                  alt="SkyOne cargo aircraft active air freight at sunset"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* Bottom-heavy vignette for stats panel readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/92 via-[#060f1e]/10 to-[#071526]/30 pointer-events-none"/>
              </div>

              {/* Global Shipping Network badge */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[#060f1e]/82 backdrop-blur-md border border-white/18 shadow-2xl">
                  <div className="w-9 h-9 rounded-full bg-[#024BB2] flex items-center justify-center shrink-0 shadow-inner">
                    <Plane className="w-4 h-4 text-white -rotate-45"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white leading-none">
                      Global Shipping Network
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">200+ Countries & Territories</div>
                  </div>
                </div>
              </div>

              {/* Stats panel — overlaps bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#060f1e]/86 backdrop-blur-xl border-t border-white/10 rounded-b-[2rem] px-3 sm:px-4 py-3.5 sm:py-5">
                <div className="grid grid-cols-4 text-center">

                  {[
                    { icon: Plane, iconColor: 'text-blue-400', val: '100K+', label: 'Shipments Delivered', sub: '+12% this month', rotate: true },
                    { icon: Globe, iconColor: 'text-sky-400',  val: '250+',  label: 'Countries Served',    sub: 'Global Reach' },
                    { icon: Shield, iconColor: 'text-emerald-400', val: '99%',  label: 'On-Time Delivery', sub: 'Reliability First' },
                    { icon: Headphones, iconColor: 'text-rose-400', val: '24/7', label: 'Customer Support', sub: "We're Always Here" },
                  ].map(({ icon: Icon, iconColor, val, label, sub, rotate }, i) => (
                    <div key={i} className={`flex flex-col items-center gap-0.5 py-1 ${i > 0 ? 'border-l border-slate-700/50' : ''}`}>
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor} mb-0.5 ${rotate ? '-rotate-45' : ''}`}/>
                      <div className="text-lg sm:text-2xl lg:text-[28px] font-black text-white leading-none tracking-tight">{val}</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-300 font-semibold leading-tight mt-0.5 px-1">{label}</div>
                      <div className="flex items-center gap-0.5 text-[9px] text-rose-400 font-semibold mt-0.5">
                        <span>↑</span><span>{sub}</span>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Tiny decorative plane below card */}
            <div className="flex justify-center mt-5" aria-hidden="true">
              <Plane className="w-4 h-4 text-[#024BB2]/35 rotate-45"/>
            </div>
          </motion.div>

          {/* ══ RIGHT: Content ══ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: DURATION.feature, delay: 0.12, ease: EASING.cinematic }}
            className="space-y-5 xl:space-y-6"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-slate-200/75 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E5192D]"/>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Featured Core Service</span>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-black text-slate-950 leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(38px, 4.2vw, 74px)', fontFamily: 'var(--font-display)' }}>
                Global Delivery.
              </h2>
              <h2 className="font-black leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(38px, 4.2vw, 74px)', fontFamily: 'var(--font-display)' }}>
                <span className="text-[#024BB2]">Local </span>
                <span className="text-[#E5192D]">Attention.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed max-w-prose"
              style={{ fontSize: 'clamp(13.5px, 1.05vw, 16.5px)' }}>
              When shipping overseas, certainty matters. SkyOne International Courier combines dedicated global air logistics with meticulous door-to-door ground operations. We treat every parcel, commercial sample, and critical document as an imperative commitment.
            </p>

            {/* Service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: '0 10px 28px rgba(2,75,178,0.09)' }}
                    transition={{ duration: 0.15 }}
                    className={`
                      flex items-center justify-between gap-3
                      bg-white/88 backdrop-blur-sm rounded-2xl
                      border border-slate-200/65 shadow-sm
                      hover:border-slate-300 transition-all duration-200
                      p-3.5 sm:p-4 xl:p-5 group cursor-default
                      ${item.fullWidth ? 'sm:col-span-2' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 xl:w-11 xl:h-11 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 border ${item.border} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5"/>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[13px] xl:text-sm font-bold text-slate-900 group-hover:text-[#024BB2] transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] xl:text-xs text-slate-500 leading-snug mt-0.5 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full shrink-0 bg-slate-100 border border-slate-200 text-slate-400 group-hover:bg-[#024BB2] group-hover:border-[#024BB2] group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"/>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.button
                onClick={onLearnMore}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 bg-[#024BB2] hover:bg-[#003B91] text-white text-[13px] sm:text-sm font-bold rounded-full shadow-lg shadow-blue-900/18 transition-colors cursor-pointer group"
              >
                <span>LEARN MORE ABOUT COURIERS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
              </motion.button>
              <motion.button
                onClick={onGetQuote}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-[13px] sm:text-sm font-bold rounded-full transition-colors cursor-pointer shadow-sm"
              >
                Request Custom Quote
              </motion.button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

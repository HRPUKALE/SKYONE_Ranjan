import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Search,
  Users,
  IndianRupee,
  PlaneTakeoff,
  Globe,
  MapPin,
  Plane,
} from 'lucide-react';

interface AboutHeroProps {
  onNavigate: (path: string) => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onNavigate }) => {
  const stats = [
    {
      icon: Users,
      value: '80%',
      label: 'Kerala diaspora in GCC countries',
    },
    {
      icon: IndianRupee,
      value: '₹2L Cr+',
      label: 'Annual NRI remittances to Kerala',
    },
    {
      icon: PlaneTakeoff,
      value: '60%',
      label: 'Kerala air cargo via Cochin Airport',
    },
    {
      icon: Globe,
      value: '220+',
      label: 'Countries connected from Kerala',
    },
  ];

  const handleExploreStory = () => {
    const storySection = document.getElementById('our-story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('/about#our-story');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #024BB2 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Backwater Image Blend (Bottom-Left) */}
      <div className="absolute -bottom-8 left-0 w-full sm:w-[55%] h-[340px] pointer-events-none z-0 select-none overflow-hidden opacity-35 sm:opacity-45">
        <img
          src="/kerala_backwaters.jpg"
          alt="Kerala backwaters reflection"
          className="w-full h-full object-cover object-bottom"
          style={{
            maskImage:
              'radial-gradient(ellipse 90% 80% at 15% 95%, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 80% at 15% 95%, black 40%, transparent 80%)',
          }}
        />
        {/* Soft gradient wash over backwaters */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN: Content & Details */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="w-1.5 h-4 bg-[#E5192D] rounded-full inline-block" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-slate-600">
                Kerala's Global Courier Partner
              </span>
            </motion.div>

            {/* Display Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-slate-950 tracking-tight font-display leading-[1.06]">
                From Kerala.
              </h1>
              <div className="text-4xl sm:text-5xl lg:text-[62px] font-black text-[#024BB2] tracking-tight font-display leading-[1.06]">
                To Everywhere.
              </div>
            </motion.div>

            {/* Descriptive Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl"
            >
              Trusted international courier delivery for Keralites worldwide — connecting your loved ones,
              businesses and dreams across the globe.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              <button
                type="button"
                onClick={handleExploreStory}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#024BB2] hover:bg-[#013b8f] text-white text-sm sm:text-base font-bold tracking-wide shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore our story</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/track')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-semibold border border-slate-300 hover:border-slate-400 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#024BB2]" />
                <span>Track a shipment</span>
              </button>
            </motion.div>

            {/* FLOATING STATS BAR (Desktop / Tablet view under text) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="pt-4 lg:pt-6"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-4 sm:p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={i}
                        className={`text-center group transition-all duration-300 px-2 sm:px-3 ${
                          i > 0 && i % 2 === 0 ? 'pt-3 sm:pt-0' : i === 1 ? 'pt-0' : i > 1 ? 'pt-3 sm:pt-0' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#024BB2] flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 group-hover:bg-[#024BB2] group-hover:text-white transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Visual Hero Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Visual Canvas Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white group"
            >
              {/* Courier Hero Image - Clear, crisp, natural lighting */}
              <div className="relative aspect-[16/10.5] sm:aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src="/kerala_courier_hero.jpg"
                  alt="SkyOne Courier Delivery at Cochin International Airport cargo terminal"
                  className="w-full h-full object-cover object-[55%_center] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Light Sky Ambient Glow - zero darkening on face */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Branded SkyOne Express Badge in bottom left corner of image (unobstructed) */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 pointer-events-none select-none z-10">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black tracking-tight text-[#024BB2] font-display">
                      SKY<span className="text-[#E5192D]">ONE</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border-l border-slate-200 pl-2">
                      Cochin Cargo Hub
                    </span>
                  </div>
                </div>

                {/* LIVE FLIGHT ROUTE ARC (Positioned strictly in the upper open sky) */}
                <div className="absolute top-2 left-3 right-3 sm:top-3 sm:left-4 sm:right-4 h-16 sm:h-20 pointer-events-none z-20">
                  <svg className="w-full h-full" viewBox="0 0 540 80" fill="none">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E5192D" stopOpacity="0.85" />
                        <stop offset="35%" stopColor="#024BB2" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#024BB2" stopOpacity="0.85" />
                      </linearGradient>
                    </defs>

                    {/* Dotted Flight Path Curve in the high sky */}
                    <path
                      d="M 20 62 C 90 28, 170 12, 340 18"
                      stroke="url(#routeGradient)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-80"
                    />

                    {/* Animated Gliding Jet Plane on the Route */}
                    <motion.g
                      animate={{
                        x: [0, 6, 0],
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Plane near Dubai waypoint in open sky */}
                      <g transform="translate(145, 23) rotate(-14)">
                        <circle cx="0" cy="0" r="9" fill="#024BB2" className="opacity-95 shadow-sm" />
                        <path
                          d="M -3.5 -0.8 L -1 -0.8 L 0 -4 L 0.8 -4 L 0.8 -0.8 L 4 0 L 0.8 0.8 L 0.8 4 L 0 4 L -1 0.8 L -3.5 0.8 Z"
                          fill="white"
                          transform="scale(1.2)"
                        />
                      </g>
                    </motion.g>

                    {/* Waypoint 1: KERALA */}
                    <g transform="translate(20, 62)">
                      <circle cx="0" cy="0" r="9" fill="#E5192D" opacity="0.25" className="animate-ping" />
                      <circle cx="0" cy="0" r="4.5" fill="#E5192D" />
                      <circle cx="0" cy="0" r="1.5" fill="white" />
                      <text
                        x="0"
                        y="15"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="8"
                        fontWeight="bold"
                        letterSpacing="0.08em"
                        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.85))"
                      >
                        KERALA
                      </text>
                    </g>

                    {/* Waypoint 2: DUBAI */}
                    <g transform="translate(145, 36)">
                      <circle cx="0" cy="0" r="3" fill="#024BB2" />
                      <circle cx="0" cy="0" r="1" fill="white" />
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="8"
                        fontWeight="bold"
                        letterSpacing="0.08em"
                        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.85))"
                      >
                        DUBAI
                      </text>
                    </g>

                    {/* Waypoint 3: LONDON */}
                    <g transform="translate(250, 18)">
                      <circle cx="0" cy="0" r="3" fill="#024BB2" />
                      <circle cx="0" cy="0" r="1" fill="white" />
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="8"
                        fontWeight="bold"
                        letterSpacing="0.08em"
                        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.85))"
                      >
                        LONDON
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Floating "Local roots. Global reach." Badge Card - positioned in top right clear runway sky */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{
                    opacity: 1,
                    y: [0, -5, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30"
                >
                  <div className="bg-[#071d42]/95 backdrop-blur-md text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-white/20 shadow-xl shadow-blue-950/50 w-[140px] sm:w-[155px]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/25 border border-blue-400/30 text-blue-300 flex items-center justify-center">
                        <Globe className="w-3.5 h-3.5 text-blue-300" />
                      </div>
                      <div className="w-4 h-0.5 bg-[#E5192D] rounded-full" />
                    </div>
                    <div className="text-xs sm:text-[13px] font-black text-white leading-tight tracking-tight">
                      Local roots.
                    </div>
                    <div className="text-xs sm:text-[13px] font-black text-white leading-tight tracking-tight">
                      Global reach.
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

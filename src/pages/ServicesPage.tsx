import React, { useState } from "react";
import { SERVICES_LIST } from "../data/servicesData";
import {
  ArrowRight, ArrowUpRight, Plane, Globe, Zap, Package, Truck,
  ShieldCheck, ShoppingBag, FileText, CheckCircle2, Clock,
  Sparkles, Star,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SEO } from "../components/SEO";
import { ScrollReveal } from "../components/motion/ScrollReveal";
import { DURATION, EASING } from "../utils/motion";

interface ServicesPageProps {
  onSelectService: (slug: string) => void;
  onOpenQuote: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Zap, Plane, Package, Truck, ShieldCheck, ShoppingBag, FileText,
};

const ACCENT: Record<string, {
  iconBg: string; iconColor: string; iconBorder: string;
  badgeBg: string; badgeText: string; badgeBorder: string;
  hoverBorder: string; barColor: string;
}> = {
  "international-courier": {
    iconBg: "bg-blue-50", iconColor: "text-[#024BB2]", iconBorder: "border-blue-100",
    badgeBg: "bg-blue-50", badgeText: "text-[#024BB2]", badgeBorder: "border-blue-200",
    hoverBorder: "hover:border-blue-300", barColor: "#024BB2",
  },
  "express-delivery": {
    iconBg: "bg-rose-50", iconColor: "text-[#E5192D]", iconBorder: "border-rose-100",
    badgeBg: "bg-rose-50", badgeText: "text-[#E5192D]", badgeBorder: "border-rose-200",
    hoverBorder: "hover:border-rose-300", barColor: "#E5192D",
  },
  "air-freight": {
    iconBg: "bg-violet-50", iconColor: "text-violet-700", iconBorder: "border-violet-100",
    badgeBg: "bg-violet-50", badgeText: "text-violet-700", badgeBorder: "border-violet-200",
    hoverBorder: "hover:border-violet-300", barColor: "#7C3AED",
  },
  "cargo": {
    iconBg: "bg-cyan-50", iconColor: "text-cyan-700", iconBorder: "border-cyan-100",
    badgeBg: "bg-cyan-50", badgeText: "text-cyan-700", badgeBorder: "border-cyan-200",
    hoverBorder: "hover:border-cyan-300", barColor: "#0891B2",
  },
  "door-to-door": {
    iconBg: "bg-amber-50", iconColor: "text-amber-700", iconBorder: "border-amber-100",
    badgeBg: "bg-amber-50", badgeText: "text-amber-700", badgeBorder: "border-amber-200",
    hoverBorder: "hover:border-amber-300", barColor: "#D97706",
  },
  "customs-clearance": {
    iconBg: "bg-emerald-50", iconColor: "text-emerald-700", iconBorder: "border-emerald-100",
    badgeBg: "bg-emerald-50", badgeText: "text-emerald-700", badgeBorder: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300", barColor: "#059669",
  },
  "e-commerce-logistics": {
    iconBg: "bg-pink-50", iconColor: "text-pink-700", iconBorder: "border-pink-100",
    badgeBg: "bg-pink-50", badgeText: "text-pink-700", badgeBorder: "border-pink-200",
    hoverBorder: "hover:border-pink-300", barColor: "#DB2777",
  },
  "document-delivery": {
    iconBg: "bg-orange-50", iconColor: "text-orange-700", iconBorder: "border-orange-100",
    badgeBg: "bg-orange-50", badgeText: "text-orange-700", badgeBorder: "border-orange-200",
    hoverBorder: "hover:border-orange-300", barColor: "#EA580C",
  },
};

const DEFAULT_ACCENT = ACCENT["international-courier"];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService, onOpenQuote }) => {
  const reduced = !!useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.feature, ease: EASING.cinematic } },
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f0fd 35%, #eef4ff 65%, #f8faff 100%)" }}
    >
      <SEO
        title="International Courier & Cargo Services from Kerala | SkyOne"
        description="Full range of international logistics from Kerala: express air courier, door-to-door delivery, air freight, customs clearance and document delivery to 200+ countries."
        canonicalPath="/services"
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* World-map dot-grid */}
        <svg className="absolute right-0 top-0 w-[55%] h-full opacity-[0.045]" viewBox="0 0 700 600" fill="none" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="155" cy="175" rx="115" ry="78" fill="#024BB2" />
          <ellipse cx="205" cy="345" rx="58" ry="88" fill="#024BB2" />
          <ellipse cx="358" cy="158" rx="52" ry="48" fill="#024BB2" />
          <ellipse cx="378" cy="322" rx="62" ry="92" fill="#024BB2" />
          <ellipse cx="528" cy="178" rx="128" ry="78" fill="#024BB2" />
          <ellipse cx="578" cy="392" rx="58" ry="42" fill="#024BB2" />
          {Array.from({ length: 22 }).map((_, r) =>
            Array.from({ length: 30 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 24 + 8} cy={r * 28 + 8} r="1.1" fill="#024BB2" />
            ))
          )}
        </svg>

        {/* Flight arc top right */}
        <svg className="absolute top-8 right-6 w-[420px] h-52 opacity-50" viewBox="0 0 400 200" fill="none">
          <path d="M20 160 C100 55 285 38 382 82" stroke="#93C5FD" strokeWidth="1.8" strokeDasharray="6 5" />
          <circle cx="298" cy="52" r="5" fill="#E5192D" />
          <circle cx="298" cy="52" r="12" fill="#E5192D" opacity="0.18" />
        </svg>

        {/* Flight arc bottom left */}
        <svg className="absolute bottom-20 left-6 w-64 h-20 opacity-35" viewBox="0 0 260 80" fill="none">
          <path d="M8 68 C78 18 188 28 252 46" stroke="#93C5FD" strokeWidth="1.4" strokeDasharray="5 5" />
        </svg>

        {/* Blue glow */}
        <div className="absolute -left-24 top-1/3 w-[520px] h-[520px] rounded-full bg-blue-500 opacity-[0.06] blur-3xl" />
        {/* Red glow */}
        <div className="absolute -right-24 bottom-1/4 w-[380px] h-[380px] rounded-full bg-red-500 opacity-[0.05] blur-3xl" />

        {/* Bottom swoosh */}
        <div className="absolute -bottom-1 left-0 right-0 h-20 overflow-hidden">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M -50,120 Q 250,50 650,95 T 1440,110 L 1440,120 L -50,120 Z" fill="#024BB2" opacity="0.9" />
            <path d="M 150,120 Q 600,45 1050,85 T 1440,95 L 1440,120 L 150,120 Z" fill="#E5192D" opacity="0.85" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-32">

        {/* HEADER */}
        <motion.div
          className="text-center mb-16 space-y-5"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.feature, ease: EASING.cinematic }}
        >
          <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#024BB2] uppercase">
            <span>FAST</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#024BB2]" />
            <span>SECURE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#024BB2]" />
            <span>GLOBAL</span>
            <span className="w-10 h-[2px] bg-[#024BB2]/60 inline-block ml-1" />
          </div>

          <h1
            className="font-black text-slate-950 leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(38px, 5.5vw, 76px)", fontFamily: "var(--font-display)" }}
          >
            Our{" "}
            <span className="text-[#024BB2] relative inline-block">
              International
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E5192D]" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M 0 6 Q 150 12 300 4"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: EASING.snappy }}
                />
              </svg>
            </span>
            {" "}Services
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}>
            Engineered for corporate exporters, e-commerce retailers, and time-sensitive cargo —
            from pickup to delivery, always in your control.
          </p>

          <motion.svg
            className="mx-auto mt-1 opacity-50"
            width="260" height="24" viewBox="0 0 260 24" fill="none"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <motion.path
              d="M0 12 Q65 4 130 12 Q195 20 260 12"
              stroke="url(#hdr-grad)" strokeWidth="2" strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASING.cinematic }}
            />
            <defs>
              <linearGradient id="hdr-grad" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#024BB2" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#E5192D" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* CARDS GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {SERVICES_LIST.map((service) => {
            const Icon = ICON_MAP[service.iconName] ?? Package;
            const accent = ACCENT[service.slug] ?? DEFAULT_ACCENT;
            const isHovered = hovered === service.id;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="h-full"
                onHoverStart={() => setHovered(service.id)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => onSelectService(service.slug)}
              >
                <div
                  className={`relative flex flex-col h-full rounded-[1.25rem] bg-white/90 backdrop-blur-sm border border-slate-200/80 overflow-hidden cursor-pointer transition-all duration-200 ${accent.hoverBorder}`}
                  style={{
                    boxShadow: isHovered && !reduced
                      ? `0 20px 48px ${accent.barColor}1a, 0 2px 8px rgba(0,0,0,0.06)`
                      : "0 4px 20px rgba(2,75,178,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Top colour bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[1.25rem] transition-all duration-300"
                    style={{
                      background: accent.barColor,
                      opacity: isHovered ? 1 : 0.45,
                      transform: `scaleX(${isHovered ? 1 : 0.35})`,
                      transformOrigin: "left",
                    }}
                  />

                  <div className="relative p-6 sm:p-7 flex flex-col h-full">
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">
                        SERVICE {service.number}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${accent.badgeBg} ${accent.badgeText} ${accent.badgeBorder}`}>
                        <Clock className="w-3 h-3" />
                        {service.deliveryTime}
                      </span>
                    </div>

                    {/* Icon + title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-200 ${accent.iconBg} ${accent.iconBorder} ${isHovered && !reduced ? "scale-110 -rotate-3" : "scale-100 rotate-0"}`}
                      >
                        <Icon className={`w-6 h-6 ${accent.iconColor}`} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3
                          className="font-black text-slate-900 leading-tight"
                          style={{ fontSize: "clamp(17px, 1.4vw, 21px)", fontFamily: "var(--font-display)" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-slate-500 text-xs mt-1 leading-snug max-w-xs">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {service.fullDescription}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 mb-7 flex-grow">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${accent.iconColor}`} />
                          <span className="text-xs text-slate-600 leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-5 flex items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(2,75,178,0.07)" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectService(service.slug); }}
                        className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors group/link ${accent.iconColor} cursor-pointer`}
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenQuote(); }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        style={{
                          background: `linear-gradient(135deg, ${accent.barColor}, ${accent.barColor}cc)`,
                          boxShadow: isHovered ? `0 8px 20px ${accent.barColor}33` : "none",
                        }}
                      >
                        Get Quote
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOTTOM CTA BANNER */}
        <ScrollReveal className="mt-20">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(135deg, #f0f7ff 0%, #e8f0fd 40%, #f5f8ff 100%)",
              border: "1px solid rgba(2,75,178,0.12)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-blue-500 opacity-[0.07] blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-red-500 opacity-[0.06] blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[280px] h-20 overflow-hidden">
                <svg viewBox="0 0 380 80" fill="none" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,80 Q170,18 380,0 L380,80Z" fill="#024BB2" opacity="0.08" />
                  <path d="M55,80 Q210,28 380,10 L380,80Z" fill="#E5192D" opacity="0.06" />
                </svg>
              </div>
              <div
                className="absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: "radial-gradient(circle, #024BB2 1px, transparent 1px)", backgroundSize: "32px 32px" }}
              />
            </div>

            <div className="relative z-10 px-8 sm:px-14 py-14 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto bg-white border border-slate-200 shadow-sm">
                <Sparkles className="w-6 h-6 text-[#024BB2]" />
              </div>

              <h2
                className="font-black text-slate-950 leading-tight mb-4"
                style={{ fontSize: "clamp(26px, 3.2vw, 46px)", fontFamily: "var(--font-display)" }}
              >
                Need a Customized{" "}
                <span className="text-[#024BB2]">Multi-Modal</span>{" "}
                Cargo Plan?
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
                For charter flights, dangerous goods (IATA certified), or enterprise contract freight rates,
                our senior cargo team will structure a dedicated schedule tailored to your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-bold text-white text-sm sm:text-base cursor-pointer group hover:scale-[1.03] active:scale-[0.97] transition-transform"
                  style={{
                    background: "linear-gradient(135deg, #024BB2 0%, #0258C4 50%, #1a3a8f 100%)",
                    boxShadow: "0 12px 36px rgba(2,75,178,0.30)",
                  }}
                >
                  <Plane className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Request Enterprise Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectService("international-courier")}
                  className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 rounded-full font-bold text-slate-800 text-sm sm:text-base cursor-pointer bg-white border border-slate-300 shadow-sm hover:bg-slate-50 active:scale-97 transition-all"
                >
                  Browse All Services
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-500">
                {["IATA Certified", "200+ Countries", "24/7 Support", "Insured Shipments"].map((label) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-[#024BB2]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

import React from 'react';
import { AboutHero } from '../components/AboutHero';
import {
  ArrowRight,
  Globe,
  Shield,
  Target,
  Compass,
  PlaneTakeoff,
  PackageCheck,
  Award,
  MapPin,
  Plane,
  Heart,
  Star,
  Users,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { AnimatedButton } from '../components/motion/AnimatedButton';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {

  const milestones = [
    {
      step: '01',
      title: 'Born in Kerala',
      desc: "Founded in God's Own Country with a singular mission: to serve the millions of Keralites and businesses who need a trustworthy bridge to the world.",
      icon: MapPin,
      accent: '#024BB2',
    },
    {
      step: '02',
      title: 'Gulf Corridor Mastery',
      desc: 'Built direct, high-frequency air cargo corridors connecting Kochi and Thiruvananthapuram to Dubai, Riyadh, Muscat, Doha, Abu Dhabi, and Kuwait.',
      icon: Plane,
      accent: '#E5192D',
    },
    {
      step: '03',
      title: 'Global Network Expansion',
      desc: 'Tier-1 airline alliances secured, enabling next-day and 2-3 day express delivery to over 250 countries across Europe, North America, and Asia-Pacific.',
      icon: Globe,
      accent: '#024BB2',
    },
    {
      step: '04',
      title: "Kerala's Most Trusted Courier",
      desc: "Recognised as Kerala's go-to international courier — trusted by NRI families, exporters, students, and enterprises for documents, parcels, and commercial cargo.",
      icon: Award,
      accent: '#E5192D',
    },
  ];

  const whyKeralaAdvantage = [
    {
      title: 'Global NRI & Western Corridors',
      desc: 'Connecting Kerala families to the USA, UK, Canada, Europe, Germany, Ireland, New Zealand, as well as the UAE, Saudi Arabia, Qatar, and Gulf destinations with dedicated flight allocations and export customs expertise.',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      title: 'Cochin Airport Hub Advantage',
      desc: 'Operating directly from Cochin International Airport (CIAL) — handling ~60% of Kerala air cargo — gives us priority access, faster turnaround, and direct freighter routes to the Gulf and beyond.',
      icon: PlaneTakeoff,
      color: 'text-[#024BB2]',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      title: 'NRI Document Specialists',
      desc: 'We handle visa applications, attestation documents, degree certificates, employment contracts, and legal paperwork with utmost care — because we understand what is truly at stake for every Keralite working abroad.',
      icon: PackageCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      title: 'Home Food & Specialties',
      desc: "From Kerala's beloved homemade pickles, snacks, and traditional food to Ayurvedic medicines — we ship what matters most to Keralites abroad with specialized packaging and customs know-how.",
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      title: 'Doorstep Pickup Across Kerala',
      desc: 'Full doorstep pickup network spanning Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Malappuram, Kannur, and more — no need to travel to a shipping office.',
      icon: MapPin,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      title: 'Local Trust, Global Standards',
      desc: 'The personal touch of a Kerala company that speaks your language and understands your needs — backed by international airline networks, AWB tracking, and global delivery infrastructure.',
      icon: Shield,
      color: 'text-[#024BB2]',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
  ];

  const destinations = [
    { flag: '🇺🇸', country: 'USA', city: 'New York / LA / Chicago' },
    { flag: '🇬🇧', country: 'United Kingdom (UK)', city: 'London / Manchester / Heathrow' },
    { flag: '🇨🇦', country: 'Canada', city: 'Toronto / Vancouver' },
    { flag: '🇪🇺', country: 'Europe', city: 'European Gateway Hubs' },
    { flag: '🇩🇪', country: 'Germany', city: 'Frankfurt / Munich' },
    { flag: '🇮🇪', country: 'Ireland', city: 'Dublin / Cork' },
    { flag: '🇳🇿', country: 'New Zealand', city: 'Auckland / Wellington' },
    { flag: '🇦🇺', country: 'Australia', city: 'Sydney / Melbourne' },
    { flag: '🇦🇪', country: 'UAE', city: 'Dubai / Abu Dhabi' },
    { flag: '🇸🇦', country: 'Saudi Arabia', city: 'Riyadh / Jeddah' },
    { flag: '🇶🇦', country: 'Qatar', city: 'Doha' },
    { flag: '🇴🇲', country: 'Oman', city: 'Muscat' },
  ];

  return (
    <div className="space-y-0 bg-white">
      <SEO
        title="About SkyOne | Kerala International Courier, Thiruvalla"
        description="SkyOne International Courier is based in Thiruvalla, Pathanamthitta, serving NRI families, students and exporters across Kerala."
        canonicalPath="/about"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.skyoneinternational.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'About Us',
              item: 'https://www.skyoneinternational.com/about'
            }
          ]
        }}
      />

      {/* HERO SECTION */}
      <AboutHero onNavigate={onNavigate} />

      {/* OUR STORY */}
      <section id="our-story" className="py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
                <span>Our Story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display leading-tight">
                {"We Understand Kerala's "}
                <span className="text-[#024BB2]">Global Heart.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Kerala is unlike any other state in India. With over{' '}
                <strong className="text-slate-800">2.5 million Keralites living and working in the Gulf alone</strong>{' '}
                — and millions more across the UK, USA, Canada, and Australia — our state has one of the most globally
                connected communities on the planet.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Behind every shipment is a story — a mother sending her son's favourite achaar to Dubai, a family
                posting critical employment documents to Riyadh, a business owner exporting commercial samples to the UK.
                At SkyOne, we were built specifically for these moments.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Headquartered in Kerala and operating from{' '}
                <strong className="text-slate-800">Cochin International Airport (CIAL)</strong> — India's first fully
                solar-powered international airport and Kerala's primary air cargo gateway — we leverage strategic
                airline partnerships, dedicated customs expertise for 200+ countries, and a full doorstep pickup
                network across Kerala.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Priority corridors: USA, UK, Canada, Europe, Germany, Ireland, New Zealand',
                  'Direct Gulf corridors: UAE, Saudi Arabia, Qatar, Oman, Kuwait',
                  'Specialist NRI document handling',
                  'Doorstep pickup across all Kerala districts',
                  'Express delivery to global destinations',
                  'Customs pre-clearance expertise',
                  'Malayalam & English customer support (Mon-Sat 8:30 AM-8:30 PM)',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#024BB2] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-blue-100 shadow-2xl bg-gradient-to-br from-[#024BB2] via-[#0258C4] to-[#0369a1] text-white p-8 space-y-6">
                <div className="absolute top-0 right-0 opacity-10 text-[120px] leading-none select-none pointer-events-none" aria-hidden="true">🌴</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Headquartered In</div>
                  <div className="text-2xl font-black tracking-tight">Kerala, India 🌴</div>
                  <div className="text-sm text-blue-200 mt-0.5">{"God's Own Country"}</div>
                </div>
                <div className="border-t border-white/20 pt-5 space-y-4">
                  {[
                    { icon: PlaneTakeoff, label: 'Primary Hub', value: 'Cochin International Airport (COK)' },
                    { icon: Globe, label: 'Primary Corridors', value: 'Gulf · UK · USA · Canada · Australia' },
                    { icon: Users, label: 'Served Communities', value: 'NRI Families · Exporters · Businesses · Students' },
                    { icon: MapPin, label: 'Pickup Network', value: 'All Kerala Districts — Doorstep Service' },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{label}</div>
                        <div className="text-xs text-blue-200">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-300">Currently Accepting Shipments</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* THE KERALA ADVANTAGE */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 shadow-sm text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
              <span>Why SkyOne for Kerala</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display">
              The SkyOne Kerala Advantage
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              {"We're not just another courier company. We're a Kerala company — and that makes all the difference."}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyKeralaAdvantage.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delay={0.07 * idx}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white rounded-2xl p-6 border ${item.border} shadow-sm hover:shadow-lg transition-all group h-full flex flex-col`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 shrink-0 border ${item.border}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#024BB2] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal flex-1">
                      {item.desc}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNEY / MILESTONES */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
              <span>Our Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display">
              How SkyOne Was Built
            </h2>
            <p className="text-sm text-slate-500">
              From a Kerala dream to a global courier operation — one milestone at a time.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <ScrollReveal key={m.step} delay={0.1 * idx}>
                  <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#024BB2] shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                    <div
                      className="text-5xl font-black opacity-[0.07] absolute top-4 right-5 leading-none select-none pointer-events-none font-display"
                      style={{ color: m.accent }}
                    >
                      {m.step}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-black" style={{ color: m.accent }}>
                        PHASE {m.step}
                      </span>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: m.accent }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#024BB2] transition-colors mb-2">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal flex-1">
                      {m.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESTINATIONS FROM KERALA */}
      <section className="py-20 bg-[#060f1e] border-b border-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
              <span>Top Routes from Kerala</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display">
              We Fly From Kerala{' '}
              <span className="text-[#024BB2]">To The World</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Express international delivery from Kochi, Thiruvananthapuram, Kozhikode and all of Kerala.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((dest, i) => (
              <ScrollReveal key={i} delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/[0.08] hover:border-[#024BB2] transition-all group cursor-default"
                >
                  <div className="text-3xl mb-3">{dest.flag}</div>
                  <div className="text-sm font-bold text-white">{dest.country}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{dest.city}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-10">
            <p className="text-slate-500 text-sm">
              {'+ 200 more countries delivered daily. '}
              <span
                className="text-[#024BB2] font-semibold cursor-pointer hover:underline"
                onClick={onOpenQuote}
              >
                Get a custom quote &rarr;
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl shadow-blue-900/20">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-5 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Our Mission</div>
              <h3 className="text-xl sm:text-2xl font-black mb-4 leading-tight">
                Every Kerala Family Connected. Every Kerala Business Empowered.
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                To be the most trusted international courier for Kerala's NRI community and businesses — delivering
                speed, security, and transparency on every route, from Gulf corridors to global destinations, with the
                personal care of a Kerala company that truly understands your needs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#E5192D] via-rose-600 to-rose-800 text-white shadow-xl shadow-rose-900/20">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-5 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-rose-200 mb-2">Our Vision</div>
              <h3 className="text-xl sm:text-2xl font-black mb-4 leading-tight">
                {"Kerala's #1 International Courier — Recognised Globally."}
              </h3>
              <p className="text-sm text-rose-100 leading-relaxed">
                To establish SkyOne as India's premier Kerala-origin international courier brand — synonymous with
                reliability, innovation, and unwavering commitment to the communities we serve, while expanding our
                global network to reach every Keralite wherever they are in the world.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMMITMENT & STANDARDS */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
              <span>Operational Commitments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display">
              Our Principles in Action
            </h2>
            <p className="text-sm text-slate-600">
              How our team in Thiruvalla safeguards every consignment across regional and international airspace.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Direct Origin Custody</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From doorstep collection in Kerala straight to airline airside handoff, packages remain in monitored chain of custody.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Clear Customs Pre-Filing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Export and import compliance checks completed prior to flight departure to prevent holds at destination hubs.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Accountable Support</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct communication with our operations desk during operating hours without automated deflection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 bg-gradient-to-br from-[#060f1e] via-[#0A1F38] to-[#060f1e] text-white text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 flex justify-between pointer-events-none px-8 opacity-10 text-[80px] leading-none select-none" aria-hidden="true">
          <span>🌴</span><span>🌴</span><span>🌴</span>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,75,178,0.18)_0%,_transparent_70%)] pointer-events-none" />

        <ScrollReveal className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <span className="text-base">🌴</span>
            <span>Ship From Kerala Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Ready to Send Your Shipment
            <br />
            <span className="text-[#024BB2]">From Kerala </span>
            <span className="text-[#E5192D]">To The World?</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you're sending documents to the Gulf, homemade food to your family abroad, or commercial cargo to
            international markets — SkyOne is your trusted Kerala courier partner.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <AnimatedButton variant="primary" onClick={onOpenQuote}>
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4 text-[#E5192D] flight-arrow" />
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              onClick={() => onNavigate('/contact')}
              className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
            >
              <span>CONTACT OUR TEAM</span>
            </AnimatedButton>
          </div>

          <p className="text-slate-500 text-xs pt-2">
            Doorstep pickup available across all Kerala districts &middot; Mon-Sat 8:30 AM-8:30 PM &middot; Malayalam &amp; English
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
};

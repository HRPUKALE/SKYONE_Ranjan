import React from 'react';
import { ArrowRight, Plane, Globe, Shield, CheckCircle } from 'lucide-react';
import logisticsHubImg from '../assets/images/logistics_hub.jpg';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onGetQuote?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onGetQuote }) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
              <span>ABOUT SKYONE LOGISTICS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight font-display">
              Moving More Than Packages.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              At SkyOne International Courier Service, we recognize that behind every parcel, consignment, or air cargo pallet is a promise — an urgent business contract, a life-changing document, or a crucial commercial delivery.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We leverage modern logistics technology, scheduled international airline routing, and rigorous operational control to ensure fast, secure, and predictable transit. Built on principles of reliability, technological visibility, and customer-first care, SkyOne connects domestic businesses directly with international markets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#024BB2] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Global air freight space allocations
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#024BB2] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Dedicated customs clearance support
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#024BB2] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  End-to-end milestone visibility
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#024BB2] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Doorstep pickup &amp; delivery
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              {onLearnMore && (
                <button
                  onClick={onLearnMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer group active:scale-[0.98]"
                >
                  <span>Read Full Company Profile</span>
                  <ArrowRight className="w-4 h-4 text-[#E5192D] group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              {onGetQuote && (
                <button
                  onClick={onGetQuote}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Connect with Dispatch</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
              <div className="relative h-[360px] sm:h-[420px] w-full">
                <img
                  src={logisticsHubImg}
                  alt="SkyOne air cargo sorting and dispatch facility"
                  width="500"
                  height="420"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                  <div className="text-xs font-bold text-slate-900">
                    High-Tech Air Sorting &amp; Dispatch Facility
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Automated barcode validation &amp; temperature-monitored cargo handling
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

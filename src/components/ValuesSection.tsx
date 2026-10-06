import React from 'react';
import { ShieldCheck, Zap, Lock, Eye, HeartHandshake } from 'lucide-react';

export const ValuesSection: React.FC = () => {
  const values = [
    {
      name: 'TRUST',
      tagline: 'Reliability in every flight',
      description: 'We honor commitments with disciplined operational rigor, ensuring senders and recipients experience uncompromised peace of mind.',
      icon: ShieldCheck,
      color: 'text-[#024BB2]'
    },
    {
      name: 'SPEED',
      tagline: 'Fast-track international transit',
      description: 'Prioritizing earliest airline departures and rapid customs pre-clearance to shrink delivery turnarounds across continents.',
      icon: Zap,
      color: 'text-[#E5192D]'
    },
    {
      name: 'SECURITY',
      tagline: 'Tamper-evident chain of custody',
      description: 'Multi-layer barcode verification, continuous monitoring, and secure handling protocols protect valuable shipments.',
      icon: Lock,
      color: 'text-[#024BB2]'
    },
    {
      name: 'TRANSPARENCY',
      tagline: 'Real-time honest tracking',
      description: 'Accurate milestone timestamps, truthful status updates, and clear rate structures with no hidden surcharges.',
      icon: Eye,
      color: 'text-[#024BB2]'
    },
    {
      name: 'CUSTOMER FIRST',
      tagline: 'Dedicated personal attention',
      description: 'Direct human support from experienced logistics dispatchers who treat your shipment like our very own priority.',
      icon: HeartHandshake,
      color: 'text-[#E5192D]'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>OPERATIONAL INTEGRITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            The Values That Guide Our Flights
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Our five core pillars defining every customer interaction, flight dispatch, and delivery handover.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#024BB2] hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#024BB2] group-hover:bg-[#024BB2] group-hover:text-white transition-all flex items-center justify-center mb-4 shadow-xs">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#024BB2] transition-colors tracking-wide">
                    {val.name}
                  </h3>

                  <div className="text-xs font-semibold text-[#E5192D] mt-1 mb-2.5">
                    {val.tagline}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#E5192D] transition-colors"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

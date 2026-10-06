import React from 'react';
import { AlertTriangle, ShieldAlert, Ban, Flame, Zap, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ProhibitedItemsPageProps {
  onContactClick: () => void;
}

export const ProhibitedItemsPage: React.FC<ProhibitedItemsPageProps> = ({ onContactClick }) => {
  const categories = [
    {
      title: 'Explosives & Pyrotechnics',
      items: ['Ammunition, firearms and weapon parts', 'Fireworks, flares, and igniters', 'Blasting caps and military hardware', 'Airbag inflators']
    },
    {
      title: 'Flammable Gases & Aerosols',
      items: ['Lighter fuel and refill canisters', 'Aerosol spray cans (deodorants, spray paint)', 'Propane, butane, and camping gas tanks', 'Compressed gas cylinders']
    },
    {
      title: 'Flammable Liquids & Solids',
      items: ['Petroleum, acetone, alcohol >70%', 'Paints, thinners, and varnishes', 'Matches and chemical fire starters', 'Self-heating metals and phosphorus']
    },
    {
      title: 'Toxic, Infectious & Biohazard',
      items: ['Poisons, arsenic, cyanide, and pesticides', 'Infectious clinical medical samples (non-certified)', 'Radioactive isotopes and materials', 'Corrosive acids (battery acid, sulfuric acid)']
    },
    {
      title: 'Uncertified Batteries & Devices',
      items: ['Damaged, recalled or swollen lithium batteries', 'Loose uninstalled lithium-ion cells without UN3481 certification', 'Hoverboards and uncertified e-scooters', 'Power banks with rating exceeding 100Wh']
    },
    {
      title: 'Contraband & Illegal Substances',
      items: ['Narcotics and controlled prescription drugs without export permits', 'Counterfeit currency and fake identity documents', 'Protected wildlife flora/fauna (CITES regulated)', 'Bullion, unrefined precious metals, and untaxed gems']
    }
  ];

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <SEO
        title="Prohibited Items & Aviation Dangerous Goods Guide"
        description="Review international air transport safety regulations, prohibited commodities, hazardous goods guidelines, and dual-view screening requirements."
        canonicalPath="/prohibited-items"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-100 text-[#E5192D] text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>AVIATION SAFETY &amp; COMPLIANCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
            Prohibited &amp; Dangerous Goods
          </h1>

          <p className="text-sm sm:text-base text-slate-600">
            For aviation security and compliance with IATA/ICAO civil aviation standards, these items cannot be tendered for international air courier carriage.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 sm:p-6 mb-10 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-[#E5192D] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <h2 className="font-extrabold text-rose-950">
              Mandatory Air Cargo Screening Notice
            </h2>
            <p className="leading-relaxed">
              All international shipments undergo dual-view X-ray inspection, explosive trace detection (ETD), and customs verification prior to loading on aircraft. Falsely declaring hazardous contents constitutes a serious aviation safety violation under international law.
            </p>
          </div>
        </div>

        {/* Prohibited Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                <Ban className="w-4 h-4 text-[#E5192D]" />
                <span>{cat.title}</span>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#E5192D] mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Inquire */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            Unsure if your commodity can be shipped?
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Contact our dangerous goods (DG) compliance team to review Material Safety Data Sheets (MSDS) and special packing instructions.
          </p>
          <div className="pt-2">
            <button
              onClick={onContactClick}
              className="px-6 py-2.5 bg-[#024BB2] hover:bg-[#003B91] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Consult Dangerous Goods Specialist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

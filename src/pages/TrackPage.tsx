import React from 'react';
import { TrackingSection } from '../components/TrackingSection';
import { ShieldCheck, HelpCircle, Phone, FileText, ArrowRight } from 'lucide-react';
import { SKYONE_CONFIG } from '../config';
import { SEO } from '../components/SEO';

interface TrackPageProps {
  initialAwb?: string;
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const TrackPage: React.FC<TrackPageProps> = ({ initialAwb, onNavigate, onOpenQuote }) => {
  // Extract AWB from prop or URL search param (?awb=...)
  const effectiveAwb = initialAwb || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('awb') || '' : '');

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO
        title={effectiveAwb ? `Track ${effectiveAwb} — SkyOne Shipment Status` : 'Track Your Shipment | SkyOne International Courier Kerala'}
        description="Track your SkyOne international courier in real-time. Enter your AWB number to see live flight status, customs clearance updates and estimated delivery to USA, UK, Canada, Europe, Germany, Ireland, New Zealand, UAE and beyond."
        canonicalPath={effectiveAwb ? `/track?awb=${encodeURIComponent(effectiveAwb)}` : '/track'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>OFFICIAL AWB TRACKING GATEWAY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
            Track Your Global Consignment
          </h1>

          <p className="text-sm sm:text-base text-slate-600">
            Real-time status updates, flight departures, and customs clearance milestones for all international parcels.
          </p>
        </div>

        {/* The Main Tracking Component */}
        <TrackingSection initialAwb={effectiveAwb} autoScroll={true} />

        {/* Helpful Tracking Guide Below */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#024BB2] flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Where to Find Your AWB
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your Air Waybill (AWB) number is printed at the top-right of your receipt or in the SMS confirmation. Format begins with "SKY" (e.g. SKY123456789).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Verified Scan Milestones
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every status change is verified through optical barcode scanners at origin terminals, airline cargo holds, and customs gates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E5192D] flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              24/7 Dispatch Desk
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need immediate clearance details or change of destination? Reach our dedicated operations desk at {SKYONE_CONFIG.primaryPhone}.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

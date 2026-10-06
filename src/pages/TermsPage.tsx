import React from 'react';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <SEO
        title="Terms of Service & International Carriage"
        description="Review standard terms, contractual carriage conditions, airwaybill contractual rules, and liability limitations."
        canonicalPath="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>LEGAL CONTRACT &amp; CARRIAGE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
            Terms of Carriage &amp; Service
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            Governing standard international courier and cargo transit • SkyOne International
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Air Waybill (AWB) Contract
            </h2>
            <p>
              By tendering a shipment to SkyOne International Courier Service, the shipper agrees that the carriage is governed by the terms set forth on the physical or electronic Air Waybill, the Warsaw Convention, and the Montreal Convention where applicable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Shipper’s Warranties &amp; Packaging
            </h2>
            <p>
              The shipper warrants that each parcel is accurately described, properly packaged, marked, and labeled to ensure safe transport with ordinary handling. Shippers certify that consignments contain no hazardous materials, contraband, or items prohibited under international civil aviation regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Customs Duties, Taxes &amp; Tariffs
            </h2>
            <p>
              Unless explicitly booked under Delivered Duty Paid (DDP) service terms, all customs duties, local value-added taxes (VAT/GST), and import inspection fees assessed by destination authorities remain the legal responsibility of the recipient. SkyOne reserves the right to charge demurrage fees for consignments held due to delayed customs document submission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Transit Times &amp; Delays
            </h2>
            <p>
              While SkyOne makes every commercially reasonable effort to meet quoted transit times, flight departures are subject to airline scheduling, weather conditions, air traffic control restrictions, and customs inspection hold-ups beyond our direct control.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Claims &amp; Limitation of Liability
            </h2>
            <p>
              Claims for loss, damage, or delay must be submitted in writing within 14 calendar days of delivery (or within 30 days of shipment date in the event of total non-delivery). Liability is limited pursuant to standard IATA / Convention guidelines unless declared value insurance has been purchased prior to dispatch.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <SEO
        title="Privacy Policy | Data Protection & AWB Confidentiality"
        description="Learn how SkyOne International Courier Service safeguards customer data, consignment records, and customs filings."
        canonicalPath="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>DATA INTEGRITY &amp; COMPLIANCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026 • SkyOne International Courier Service
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Information We Collect
            </h2>
            <p>
              SkyOne International Courier Service collects personal and corporate information necessary to fulfill international air carriage, customs compliance, and door-to-door delivery. This includes sender and recipient names, corporate entities, physical delivery addresses, contact telephone numbers, email addresses, and descriptions of consignment contents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Use of Consignment Data
            </h2>
            <p>
              Consignment information is processed exclusively for generating Air Waybill (AWB) documents, filing mandatory customs declarations with border control authorities, coordinating cargo space allocations with commercial airline carriers, and transmitting live tracking updates to senders and recipients.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Customs &amp; Regulatory Disclosures
            </h2>
            <p>
              In accordance with international civil aviation standards (ICAO/IATA) and global customs treaties, consignment manifests, commercial invoices, and HS tariff codes are shared with authorized border agencies and partner customs brokers in the origin and destination countries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Data Retention &amp; Security
            </h2>
            <p>
              We implement end-to-end encryption for electronic data interchange (EDI) transmissions. Consignment records and proof-of-delivery signatures are retained for regulatory audit periods and tax compliance purposes in secure, access-controlled data environments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Contacting the Compliance Officer
            </h2>
            <p>
              If you have inquiries regarding the storage, correction, or deletion of shipment data, please reach our data privacy officer at <span className="font-semibold text-[#024BB2]">privacy@skyonecourier.com</span>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

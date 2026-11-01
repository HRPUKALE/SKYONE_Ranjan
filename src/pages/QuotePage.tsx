import React, { useState } from 'react';
import { QuoteFormData } from '../types';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, Clock, Plane } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SKYONE_CONFIG } from '../config';

export const QuotePage: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    pickupCountry: 'India',
    pickupState: 'Kerala',
    pickupCity: 'Kochi',
    destinationCountry: 'United Arab Emirates',
    destinationCity: 'Dubai',
    shipmentType: 'parcel',
    weight: '2.5',
    dimensions: '',
    preferredDate: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [quoteSuccessId, setQuoteSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid corporate or personal email.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMessage('Please enter a valid telephone or mobile number.');
      return;
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      setErrorMessage('Please enter a valid shipment weight in kilograms.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setQuoteSuccessId(data.quoteId);
      } else {
        setErrorMessage(data?.message || 'Unable to submit quote request. Please verify details.');
      }
    } catch (err) {
      setErrorMessage(`Network connection error. We were unable to reach our dispatch server. Please check your internet connection or call our Operations Desk directly at ${SKYONE_CONFIG.primaryPhone}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <SEO
        title="Request an International Shipping Quote"
        description="Get verified international air freight tariffs, commercial parcel shipping rates, and express delivery quotes from SkyOne logistics specialists."
        canonicalPath="/quote"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>INTERNATIONAL FREIGHT &amp; COURIER TARIFFS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
            Request an Official Shipping Quote
          </h1>

          <p className="text-sm sm:text-base text-slate-600">
            Tell us your origin, destination, and package specifications. Our international air dispatch team will calculate confirmed rates with transparent fuel surcharges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            {quoteSuccessId ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in-50">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Quote Request Dispatched
                </h2>
                <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 py-1.5 px-3 rounded-md inline-block">
                  Reference ID: {quoteSuccessId}
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. We have logged your request from <span className="font-semibold text-slate-800">{formData.pickupCity}</span> to <span className="font-semibold text-slate-800">{formData.destinationCity}</span> ({formData.weight} kg). Our air freight specialists will prepare a comprehensive tariff calculation and email you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setQuoteSuccessId(null);
                      setFormData({
                        ...formData,
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-[#024BB2] hover:bg-[#003B91] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Another Quote Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs font-semibold text-rose-800">
                    <AlertCircle className="w-4 h-4 text-[#E5192D] shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Section 1: Contact */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#024BB2] mb-3">
                    1. Sender Contact Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ramesh@example.com"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 79075 90062"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Origin & Destination */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#024BB2] mb-3">
                    2. Shipment Routing
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Pickup Location (Country, State &amp; City) *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          value={formData.pickupCountry}
                          onChange={(e) => setFormData({ ...formData, pickupCountry: e.target.value })}
                          placeholder="Country (e.g. India)"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={formData.pickupState || ''}
                          onChange={(e) => setFormData({ ...formData, pickupState: e.target.value })}
                          placeholder="State (e.g. Kerala)"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={formData.pickupCity}
                          onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                          placeholder="City (e.g. Kochi)"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Destination (Country &amp; City) *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={formData.destinationCountry}
                          onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                          placeholder="Country (e.g. UAE / UK)"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={formData.destinationCity}
                          onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                          placeholder="City (e.g. Dubai / London)"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Package Specifications */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#024BB2] mb-3">
                    3. Cargo &amp; Weight Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Shipment Service Type
                      </label>
                      <select
                        value={formData.shipmentType}
                        onChange={(e: any) => setFormData({ ...formData, shipmentType: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="parcel">Commercial Parcel</option>
                        <option value="document">Priority Document</option>
                        <option value="household-parcel">Household Parcel</option>
                        <option value="e-commerce">E-Commerce Goods</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Total Weight (kg) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="e.g. 5.5"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Special Instructions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Special Cargo Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specific commodity type, customs clearance requests, fragile contents..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Calculating Route &amp; Filing Request...</span>
                      </>
                    ) : (
                      <>
                        <span>REQUEST OFFICIAL TARIFF QUOTATION</span>
                        <ArrowRight className="w-4 h-4 text-[#E5192D]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Why Quote With SkyOne (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Tariff Commitments
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Direct Airline Contracts</h4>
                    <p className="mt-0.5 leading-relaxed">No intermediary broker markups. We leverage space allotments with commercial carriers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Zero Hidden Surcharges</h4>
                    <p className="mt-0.5 leading-relaxed">Quotes itemize base freight, fuel index adjustments, and local handling fees upfront.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E5192D] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Rapid Quotation Desk</h4>
                    <p className="mt-0.5 leading-relaxed">Commercial rate responses are processed within business hours by senior cargo specialists.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-blue-400">NEED RAPID DISPATCH?</div>
              <h4 className="text-lg font-bold">Call Our Express Helpdesk</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                For time-critical next-flight-out bookings or AOG emergency shipments, call our operations desk directly:
              </p>
              <div className="text-base font-extrabold text-[#E5192D] font-mono">
                <a href={`tel:${SKYONE_CONFIG.primaryPhone.replace(/\s+/g, '')}`} className="hover:underline">
                  {SKYONE_CONFIG.primaryPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

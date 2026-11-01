import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { QuoteFormData } from '../types';
import { SKYONE_CONFIG } from '../config';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    pickupCountry: 'India',
    pickupState: 'Kerala',
    pickupCity: 'Kochi',
    destinationCountry: 'United States',
    destinationCity: 'New York',
    shipmentType: 'parcel',
    weight: '3.5',
    dimensions: '',
    preferredDate: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [quoteSuccessId, setQuoteSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lock background body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMessage('Please enter a valid telephone or mobile number with country code.');
      return;
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      setErrorMessage('Please enter a valid package weight greater than 0.');
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
        setErrorMessage(data?.message || 'Unable to submit quote. Please verify details and try again.');
      }
    } catch (err) {
      setErrorMessage(`Network error. Unable to reach dispatch servers. Please check your internet connection or call our desk at ${SKYONE_CONFIG.primaryPhone}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuoteSuccessId(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-slate-950 text-white px-6 py-4.5 flex items-center justify-between border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                SkyOne Commercial Cargo &amp; Courier
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Request an International Shipping Quote
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {quoteSuccessId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  Quote Request Dispatched
                </h4>
                <div className="text-xs font-mono font-bold text-slate-500 bg-slate-100 py-1.5 px-3 rounded-md inline-block">
                  Reference: {quoteSuccessId}
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. A SkyOne international logistics specialist will review your routing from <span className="font-semibold text-slate-800">{formData.pickupCity}, {formData.pickupCountry}</span> to <span className="font-semibold text-slate-800">{formData.destinationCity}, {formData.destinationCountry}</span> and contact you shortly with confirmed freight rates.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#024BB2] hover:bg-[#003B91] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs font-semibold text-rose-800">
                    <AlertCircle className="w-4 h-4 text-[#E5192D] shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Sender & Contact Info */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                      placeholder="rajesh@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 79075 90062"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pickup & Destination Routing */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-extrabold text-[#024BB2] uppercase tracking-wider mb-3">
                    Route Information
                  </div>
                  <div className="space-y-3">
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
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={formData.pickupState || ''}
                          onChange={(e) => setFormData({ ...formData, pickupState: e.target.value })}
                          placeholder="State (e.g. Kerala)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={formData.pickupCity}
                          onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                          placeholder="City (e.g. Kochi)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                          placeholder="Country (e.g. USA / UK / Canada / Europe)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={formData.destinationCity}
                          onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                          placeholder="City (e.g. Dubai / London)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cargo Details */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-extrabold text-[#024BB2] uppercase tracking-wider mb-3">
                    Consignment Specifications
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Shipment Type
                      </label>
                      <select
                        value={formData.shipmentType}
                        onChange={(e: any) => setFormData({ ...formData, shipmentType: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="parcel">Commercial Parcel</option>
                        <option value="document">Priority Document</option>
                        <option value="household-parcel">Household Parcel</option>
                        <option value="e-commerce">E-Commerce Goods</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Approx Weight (kg) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="Weight in kg"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Special Cargo Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Fragile items, customs clearance requests, hazardous goods disclosure..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Dispatch Desk...</span>
                      </>
                    ) : (
                      <>
                        <span>REQUEST OFFICIAL QUOTE</span>
                        <ArrowRight className="w-4 h-4 text-[#E5192D]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

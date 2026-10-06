import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SKYONE_CONFIG } from '../config';
import { ContactFormData } from '../types';
import { SEO } from '../components/SEO';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Cargo Inquiry',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please include your inquiry message.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setSuccessTicketId(data.ticketId);
      } else {
        setErrorMessage(data?.message || 'Unable to submit message. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. We were unable to reach our support desk. Please check your internet connection or call our Operations Desk directly at +91 22 8800 1200.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <SEO
        title="Contact Us & 24/7 Air Cargo Operations Desk"
        description="Connect with SkyOne dispatch coordinators, customer support officers, or corporate inquiry representatives in Mumbai and worldwide."
        canonicalPath="/contact"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>GET IN TOUCH WITH SKYONE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
            Contact Air Dispatch &amp; Support
          </h1>

          <p className="text-sm sm:text-base text-slate-600">
            Have questions regarding AWB status, flight schedules, customs documentation, or corporate accounts? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Headquarters &amp; Dispatch Desk
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#E5192D]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Corporate Terminal</h3>
                    <p className="mt-0.5 leading-relaxed text-slate-600">
                      {SKYONE_CONFIG.corporateAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#024BB2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Telephone Lines</h3>
                    <p className="mt-0.5 text-slate-600">
                      Direct: <span className="font-semibold text-slate-800">{SKYONE_CONFIG.primaryPhone}</span>
                    </p>
                    <p className="text-slate-500 text-xs">
                      Toll-Free Support: {SKYONE_CONFIG.tollFreeSupport}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#024BB2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Inquiries</h3>
                    <p className="mt-0.5 text-slate-600">
                      General: <span className="font-semibold text-[#024BB2]">{SKYONE_CONFIG.supportEmail}</span>
                    </p>
                    <p className="text-slate-500 text-xs">
                      Quotes: {SKYONE_CONFIG.quoteEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#024BB2] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Operational Hours</h3>
                    <p className="mt-0.5 text-slate-600 leading-relaxed">
                      {SKYONE_CONFIG.operatingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800">
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                Emergency Dispatch
              </div>
              <h4 className="text-base font-bold">
                Time-Critical AOG &amp; Medical Consignments
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                For immediate next-flight-out bookings requiring airside tarmac collection, our 24/7 priority line is available continuously.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xs">
            {successTicketId ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in-50">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Message Dispatched Successfully
                </h3>
                <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 py-1.5 px-3 rounded-md inline-block">
                  Support Ticket: #{successTicketId}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. A SkyOne customer care specialist will review your inquiry and follow up within business hours at <span className="font-semibold text-slate-800">{formData.email}</span>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSuccessTicketId(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Cargo Inquiry',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-[#024BB2] hover:bg-[#003B91] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Send a Message
                </h3>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs font-semibold text-rose-800">
                    <AlertCircle className="w-4 h-4 text-[#E5192D] shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya@company.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="General Cargo Inquiry">General Cargo Inquiry</option>
                      <option value="Existing AWB Tracking Issue">Existing AWB Tracking Issue</option>
                      <option value="Corporate Account Application">Corporate Account Application</option>
                      <option value="Customs Documentation Question">Customs Documentation Question</option>
                      <option value="Billing & Invoicing">Billing &amp; Invoicing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Message / Consignment Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your shipment, origin, destination, or specific questions..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT INQUIRY TO DESK</span>
                      <Send className="w-4 h-4 text-[#E5192D]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface RateCalculatorSectionProps {
  onOpenQuote: () => void;
}

export const RateCalculatorSection: React.FC<RateCalculatorSectionProps> = ({ onOpenQuote }) => {
  const [origin, setOrigin] = useState('India');
  const [destination, setDestination] = useState('United Kingdom');
  const [shipmentType, setShipmentType] = useState('parcel');
  const [weight, setWeight] = useState('2.5');
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Layout: Quote CTA Left, Rate Estimator Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Need a Shipping Solution? */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
              <span>CUSTOM COMMERCIAL QUOTES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight font-display">
              Need a Shipping Solution?
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Tell us what you need to move and our team will help you find the right solution. Whether you need express courier pouches, palletized air freight, or scheduled cross-border distributions, SkyOne provides customized corporate tariffs and guaranteed space allocations.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-sm font-bold rounded-xl shadow-md shadow-blue-900/15 transition-all cursor-pointer group active:scale-[0.98]"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4 text-[#E5192D] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Rate Calculator Box */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200/80 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#024BB2] flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Shipping Rate Estimator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Indicative estimation for international routes
                  </p>
                </div>
              </div>

              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FROM */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      From (Origin)
                    </label>
                    <select
                      value={origin}
                      onChange={(e) => {
                        setOrigin(e.target.value);
                        setHasCalculated(false);
                      }}
                      className="w-full px-3.5 py-2.5 min-h-[44px] bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="India">India (Mumbai / Delhi / Hubs)</option>
                      <option value="UAE">United Arab Emirates (Dubai)</option>
                      <option value="United Kingdom">United Kingdom (London)</option>
                      <option value="Singapore">Singapore (SIN)</option>
                    </select>
                  </div>

                  {/* TO */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      To (Destination)
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setHasCalculated(false);
                      }}
                      className="w-full px-3.5 py-2.5 min-h-[44px] bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="United States">United States (USA)</option>
                      <option value="UAE">United Arab Emirates (Dubai)</option>
                      <option value="Germany">Germany (Europe)</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* SHIPMENT TYPE */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Shipment Type
                    </label>
                    <select
                      value={shipmentType}
                      onChange={(e) => {
                        setShipmentType(e.target.value);
                        setHasCalculated(false);
                      }}
                      className="w-full px-3.5 py-2.5 min-h-[44px] bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="document">Express Document (Up to 0.5kg)</option>
                      <option value="parcel">Commercial Parcel / Sample</option>
                      <option value="air-cargo">Air Cargo (Heavy freight)</option>
                    </select>
                  </div>

                  {/* WEIGHT */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="1000"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                        setHasCalculated(false);
                      }}
                      placeholder="e.g. 5.0"
                      className="w-full px-3.5 py-2.5 min-h-[44px] bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 min-h-[44px] bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center"
                >
                  CHECK ESTIMATE
                </button>
              </form>

              {/* Exact requirement according to instructions:
                  Until a real rate API is connected: Show: "Rates will be calculated through our shipping system." Do NOT invent pricing. */}
              {hasCalculated && (
                <div className="mt-4 p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-slate-800 space-y-2 animate-in fade-in-50">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#024BB2]">
                    <Info className="w-4 h-4 text-[#024BB2] shrink-0" />
                    <span>Rate Calculation Request Received</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    Rates will be calculated through our shipping system.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Route: <span className="font-semibold text-slate-800">{origin} → {destination}</span> ({weight} kg, {shipmentType}). Please request a formal quotation below for verified airline fuel surcharges and customs tariffs.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#024BB2] hover:text-[#003B91] cursor-pointer"
                    >
                      <span>Proceed to Official Quote Form</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5192D]" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

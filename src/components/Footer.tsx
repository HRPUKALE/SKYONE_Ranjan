import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe,
  ShieldCheck
} from 'lucide-react';
import { SkyOneLogo } from './SkyOneLogo';
import { SKYONE_CONFIG } from '../config';
import { ScrollReveal } from './motion/ScrollReveal';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-[#0A1120] text-white border-t border-slate-800 relative overflow-hidden">
      {/* Background Subtle Atmosphere Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info (span 4) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <button
              onClick={() => onNavigate('/')}
              className="text-left focus:outline-none cursor-pointer group"
              aria-label="SkyOne Home"
            >
              <SkyOneLogo size="md" variant="dark" />
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              SkyOne is Kerala's trusted international courier service. Headquartered at Thiruvalla, Pathanamthitta, we provide doorstep pickup across all Kerala districts with express delivery to UAE, Saudi Arabia, UK, USA and 200+ countries worldwide.
            </p>

            {/* Quick Contact Micro-items */}
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E5192D] shrink-0" />
                <a href={`tel:${SKYONE_CONFIG.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{SKYONE_CONFIG.primaryPhone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#024BB2] shrink-0" />
                <a href={`mailto:${SKYONE_CONFIG.supportEmail}`} className="hover:text-white transition-colors">{SKYONE_CONFIG.supportEmail}</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{SKYONE_CONFIG.corporateAddress}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">All Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Contact Desk</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/locations')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Our Locations</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/services/international-courier')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">International Courier</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services/express-delivery')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Express Delivery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services/air-freight')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Air Freight Cargo</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services/door-to-door')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Door-to-Door</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services/customs-clearance')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Customs Clearance</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Tracking & Tools (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Tracking &amp; Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/track')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Track Shipment</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Request a Quote</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Help &amp; FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/prohibited-items')}
                  className="hover:text-white transition-colors cursor-pointer text-rose-300/90 flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Prohibited Items</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Operations (span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Carriage</span>
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block pt-2">
                  Operating 24/7 International Cargo Gateways
                </span>
              </li>
            </ul>
          </div>

        </ScrollReveal>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 SkyOne International Courier Service. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-300 cursor-pointer">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-300 cursor-pointer">Terms of Service</button>
            <button onClick={() => onNavigate('/prohibited-items')} className="hover:text-slate-300 cursor-pointer">Dangerous Goods</button>
          </div>
        </div>
      </div>

    </footer>
  );
};

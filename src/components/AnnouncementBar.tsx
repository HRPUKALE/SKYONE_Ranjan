import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onQuoteClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-slate-950 text-white text-xs py-2 px-4 border-b border-blue-900/40 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left / Center Message */}
        <div className="flex items-center gap-2 mx-auto md:mx-0 overflow-hidden text-center md:text-left">
          {/* Animated red & blue indicator */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5192D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#024BB2]"></span>
          </span>
          <p className="truncate text-slate-300 font-medium">
            <span className="text-white font-semibold">International Courier &amp; Cargo Services</span>
            <span className="hidden sm:inline text-slate-500 mx-2">|</span>
            <span className="hidden sm:inline text-slate-300">Secure • Fast • Reliable Global Network</span>
          </p>
        </div>

        {/* Right CTA & Dismiss */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onQuoteClick}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <span>Request Corporate Rates</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

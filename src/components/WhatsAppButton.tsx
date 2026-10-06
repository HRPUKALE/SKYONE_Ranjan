import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SKYONE_CONFIG } from '../config';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = SKYONE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(SKYONE_CONFIG.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center">
      {/* Tooltip */}
      {showTooltip && (
        <div className="mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap animate-in fade-in-50 duration-150">
          Chat with SkyOne
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-150 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with SkyOne on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};

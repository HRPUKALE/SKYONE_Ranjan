import React from 'react';
import { Plane, Search, ArrowRight, Home } from 'lucide-react';
import { SEO } from '../components/SEO';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-24 bg-slate-50 min-h-[70vh] flex items-center justify-center">
      <SEO
        title="404 Page Not Found"
        description="The requested shipping portal page could not be located. Track an AWB or return to home."
        canonicalPath="/404"
      />

      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        
        {/* Animated Graphic */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#024BB2] animate-spin"></div>
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#E5192D] flex items-center justify-center">
            <Plane className="w-8 h-8 transform rotate-45" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-black font-mono text-[#024BB2]">
            404
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Route Off Course
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The page you are looking for has been moved or does not exist in our international routing table.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#024BB2] hover:bg-[#003B91] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('/track')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#024BB2]" />
            <span>Track AWB Consignment</span>
          </button>
        </div>

      </div>
    </div>
  );
};

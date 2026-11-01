import React from 'react';
import { Hero } from '../components/Hero';
import { TrackingSection } from '../components/TrackingSection';
import { TrustStats } from '../components/TrustStats';
import { FeaturedService } from '../components/FeaturedService';
import { ShipmentJourney } from '../components/ShipmentJourney';
import { WhySkyOne } from '../components/WhySkyOne';
import { ValuesSection } from '../components/ValuesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { RateCalculatorSection } from '../components/RateCalculatorSection';
import { FaqSection } from '../components/FaqSection';
import { SEO } from '../components/SEO';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote }) => {
  const scrollToTracking = () => {
    const el = document.getElementById('tracking-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-0">
      <SEO
        title="International Courier Service from Kerala | SkyOne — Dubai, UK, USA"
        description="Kerala's trusted international courier. Door-to-door delivery to UAE, Saudi Arabia, UK, USA and 200+ countries. Doorstep pickup across Kochi, Trivandrum, Kozhikode and all Kerala districts."
        canonicalPath="/"
      />

      {/* 3. Hero */}
      <Hero
        onTrackClick={scrollToTracking}
        onQuoteClick={onOpenQuote}
      />

      {/* SEO Content Block — keyword-rich text indexed by Googlebot */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              International Courier Service from Kerala — Trusted by NRIs Worldwide
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              SkyOne is Kerala's dedicated international courier service, operating from Cochin International Airport (COK) with doorstep pickup across all 14 Kerala districts — Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Malappuram, Kannur, Kollam, Palakkad and more. We connect Kerala families and businesses to the UAE, Saudi Arabia, Qatar, Oman, Kuwait, United Kingdom, United States, Canada and 200+ countries worldwide.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are an NRI sending important documents from Kerala to Dubai, a family shipping personal parcels to the Gulf, or a business exporting commercial cargo from Kochi to Europe — SkyOne provides fast, secure and fully tracked air courier with real-time AWB updates from pickup to delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Track Shipment & Real-Time Stats (Unified matching reference image) */}
      <TrackingSection showStats={true} />


      {/* 7. Featured International Courier */}
      <FeaturedService
        onLearnMore={() => onNavigate('/services/international-courier')}
        onGetQuote={onOpenQuote}
      />

      {/* 8. Your Shipment Journey (6-Stage Lifecycle Flow) */}
      <ShipmentJourney />

      {/* 10. Why SkyOne (6 Features) */}
      <WhySkyOne />

      {/* 12. Values (5 Values) */}
      <ValuesSection />

      {/* 13. Testimonials Carousel */}
      <TestimonialsSection />

      {/* 14. Quote CTA & Rate Calculator */}
      <RateCalculatorSection onOpenQuote={onOpenQuote} />

      {/* 15. FAQ Section */}
      <FaqSection onContactClick={() => onNavigate('/contact')} />
    </div>
  );
};

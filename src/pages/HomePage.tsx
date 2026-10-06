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
        title="SkyOne International Courier Service | Global Courier & Cargo"
        description="Fast, secure and reliable international courier and commercial air cargo solutions connecting India to over 50 destinations worldwide."
        canonicalPath="/"
      />

      {/* 3. Hero */}
      <Hero
        onTrackClick={scrollToTracking}
        onQuoteClick={onOpenQuote}
      />

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

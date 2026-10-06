import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { QuoteModal } from './components/QuoteModal';
import { AnimatePresence } from 'motion/react';
import { PageTransition } from './components/motion/PageTransition';

// Primary landing page loaded directly for fastest First Contentful Paint
import { HomePage } from './pages/HomePage';

// Secondary routes code-split and loaded on demand
const TrackPage = lazy(() => import('./pages/TrackPage').then(m => ({ default: m.TrackPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const QuotePage = lazy(() => import('./pages/QuotePage').then(m => ({ default: m.QuotePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ProhibitedItemsPage = lazy(() => import('./pages/ProhibitedItemsPage').then(m => ({ default: m.ProhibitedItemsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return (window.location.pathname + window.location.search) || '/';
  });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath((window.location.pathname + window.location.search) || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render current view
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      );
    }

    if (currentPath === '/track' || currentPath.startsWith('/track?') || currentPath.startsWith('/track/')) {
      const searchParams = new URLSearchParams(window.location.search);
      let initialAwb = searchParams.get('awb') || '';
      if (!initialAwb && currentPath.startsWith('/track/')) {
        initialAwb = currentPath.replace('/track/', '').split('?')[0];
      }
      return (
        <TrackPage
          initialAwb={initialAwb}
          onNavigate={navigate}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      );
    }

    if (currentPath === '/services') {
      return (
        <ServicesPage
          onSelectService={(slug) => navigate(`/services/${slug}`)}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      );
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <ServiceDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <AboutPage
          onNavigate={navigate}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      );
    }

    if (currentPath === '/quote') {
      return <QuotePage />;
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    if (currentPath === '/faq') {
      return (
        <FaqPage
          onNavigate={navigate}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      );
    }

    if (currentPath === '/privacy') {
      return <PrivacyPage />;
    }

    if (currentPath === '/terms') {
      return <TermsPage />;
    }

    if (currentPath === '/prohibited-items') {
      return (
        <ProhibitedItemsPage
          onContactClick={() => navigate('/contact')}
        />
      );
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#024BB2] selection:text-white">
      {/* Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenTrack={() => {
          if (currentPath === '/') {
            const el = document.getElementById('tracking-portal');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              navigate('/track');
            }
          } else {
            navigate('/track');
          }
        }}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[50vh] flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-[#024BB2] rounded-full animate-spin mb-4" />
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Page...</p>
          </div>
        }>
          <AnimatePresence mode="wait">
            <PageTransition key={currentPath.split('?')[0]} pageKey={currentPath.split('?')[0]}>
              {renderCurrentPage()}
            </PageTransition>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* 16. Footer */}
      <Footer
        onNavigate={navigate}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Quick Action Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}

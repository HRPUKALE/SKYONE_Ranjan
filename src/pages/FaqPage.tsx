import React, { useState } from 'react';
import { FAQS_LIST } from '../data/faqData';
import { ChevronDown, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

interface FaqPageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(FAQS_LIST[0].id);

  const filteredFaqs = FAQS_LIST.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_LIST.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <SEO
        title="Frequently Asked Questions | SkyOne International Courier"
        description="Answers to common questions about international courier from Kerala: delivery times to USA, UK and Dubai, AWB tracking, customs documents and door-to-door pickup."
        canonicalPath="/faq"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.skyoneinternational.com/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'FAQ',
                item: 'https://www.skyoneinternational.com/faq'
              }
            ]
          },
          faqSchema
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]"></span>
            <span>KNOWLEDGE BASE &amp; PROCEDURES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-slate-600">
            Find answers to common questions about international air courier operations, consignment tracking, packaging, and customs clearance.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g., AWB number, delivery time, customs)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full py-4.5 px-6 flex items-center justify-between gap-4 text-left font-bold text-slate-900 hover:text-[#024BB2] transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {faq.category}
                    </span>
                    <div className="text-sm sm:text-base text-slate-900 font-bold leading-snug">
                      {faq.question}
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-blue-50 text-[#024BB2]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Kept rendered in DOM for indexing */}
                <div className={`${isOpen ? 'block' : 'hidden'} px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-14 p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Cannot find the answer to your shipping question?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Our international logistics support team is available Monday to Saturday, 08:30 AM to 08:30 PM IST to clarify customs regulations and tariff guidelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 bg-[#024BB2] hover:bg-[#003B91] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Contact Support Desk
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Request a Rate Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { FAQS_LIST } from '../data/faqData';
import { ScrollReveal } from './motion/ScrollReveal';
import { DURATION, EASING } from '../utils/motion';

interface FaqSectionProps {
  onContactClick?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [openId, setOpenId] = useState<string | null>(FAQS_LIST[0].id);
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-24 bg-slate-50/80 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-display">
            Clear Answers for Your Shipments
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Everything you need to know about international courier procedures, AWB tracking, and customs clearance.
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <ScrollReveal
                key={faq.id}
                delay={0.04 * idx}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-bold text-slate-900 hover:text-[#024BB2] transition-colors cursor-pointer min-h-[48px]"
                >
                  <span className="text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: DURATION.micro, ease: EASING.flight }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen ? 'bg-blue-50 text-[#024BB2]' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Hidden container so all FAQ answers exist in the rendered DOM for crawlers */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`${isOpen ? 'block' : 'hidden'} px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100`}
                >
                  <p>{faq.answer}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Still have questions? */}
        {onContactClick && (
          <ScrollReveal delay={0.2} className="mt-10 text-center text-xs text-slate-500">
            Have a specialized cargo or tender question?{' '}
            <button
              onClick={onContactClick}
              className="font-bold text-[#024BB2] hover:underline cursor-pointer inline-flex items-center gap-1 group"
            >
              <span>Contact our Air Logistics Helpdesk</span>
              <ArrowRight className="w-3 h-3 text-[#E5192D] group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './motion/ScrollReveal';
import { DURATION, EASING } from '../utils/motion';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const testimonials = [
    {
      name: 'R. K. Sharma',
      role: 'Head of Export Operations',
      company: 'Apex Precision Engineering (Demo Client)',
      rating: 5,
      review: 'SkyOne handled our critical air cargo machinery consignment to Frankfurt with flawless precision. The proactive milestone updates gave our German buyers total confidence.'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Supply Chain Coordinator',
      company: 'Meridian Global Trade UK (Demo Client)',
      rating: 5,
      review: 'The express document delivery between Mumbai and London Heathrow consistently meets our tight deadlines. Customs pre-clearance has saved us days on time-sensitive tenders.'
    },
    {
      name: 'Dr. Vikram Mehta',
      role: 'Managing Director',
      company: 'BioHealth Diagnostic Supplies (Demo Client)',
      rating: 5,
      review: 'Reliability in temperature-controlled diagnostic samples is non-negotiable. SkyOne delivers with pristine integrity and true 24/7 dispatcher responsiveness.'
    },
    {
      name: 'Amanda Chen',
      role: 'Cross-Border E-Commerce Director',
      company: 'Aura Lifestyle Brands (Demo Client)',
      rating: 5,
      review: 'Their seamless door-to-door transit to Dubai and Singapore reduced our parcel returns significantly. The tracking portal is clear and easy for our customers.'
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Select 3 items starting from currentIndex with circular wrap
  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#024BB2] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D] animate-ping" />
              <span>CUSTOMER EXPERIENCES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-display">
              What Our Customers Say
            </h2>

            <p className="text-sm sm:text-base text-slate-600">
              Trusted by corporate exporters, manufacturers, and international businesses worldwide.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={handlePrev}
              className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#024BB2] hover:border-blue-300 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={handleNext}
              className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#024BB2] hover:border-blue-300 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((item, idx) => (
              <motion.div
                key={`${item.name}-${currentIndex}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: DURATION.standard, delay: 0.05 * idx, ease: EASING.flight }}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:border-[#024BB2] transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-blue-100" />
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{item.review}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#024BB2] font-semibold">
                    {item.role}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Client Endorsement Note */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 italic">
            * Verified corporate export and trade client reviews across SkyOne express air corridors.
          </p>
        </div>

      </div>
    </section>
  );
};

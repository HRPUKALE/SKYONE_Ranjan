import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Package, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Instagram, 
  ShieldCheck, 
  Sparkles, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { SkyOneLogo } from '../components/SkyOneLogo';
import { Snowfall } from '../components/christmas/Snowfall';
import { christmasAudio } from '../utils/christmasAudio';
import { SKYONE_CONFIG } from '../config';

// Configurable Instagram Profile URL (falls back to SkyOne social config or direct handle)
const INSTAGRAM_PROFILE_URL = 
  (import.meta as any).env?.VITE_INSTAGRAM_PROFILE_URL || 
  'https://www.instagram.com/skyoneinternational';

interface FormState {
  customerName: string;
  awbNumber: string;
  message: string;
  _hp: string; // Honeypot field
}

interface FormErrors {
  customerName?: string;
  awbNumber?: string;
  message?: string;
}

export const ChristmasPage: React.FC = () => {
  // Audio state
  const [isPlayingMusic, setIsPlayingMusic] = useState(() => christmasAudio.isPlaying());

  // Form submission state
  const [formData, setFormData] = useState<FormState>({
    customerName: '',
    awbNumber: '',
    message: '',
    _hp: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Background audio autoplay on page open + seamless fallback on first touch/click
  useEffect(() => {
    const unsubscribe = christmasAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });

    // Attempt immediate autoplay
    christmasAudio.play(false);

    // If browser blocks unmuted autoplay, start on the user's very first interaction
    // unless the user explicitly clicked the mute button.
    const handleFirstGesture = async () => {
      if (!christmasAudio.isPlaying() && !christmasAudio.hasUserMuted()) {
        await christmasAudio.play(true);
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    window.addEventListener('mousedown', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      unsubscribe();
      christmasAudio.pause(false);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('mousedown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const handleToggleMusic = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await christmasAudio.toggle();
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    const cleanName = formData.customerName.trim();
    const cleanMsg = formData.message.trim();

    if (!cleanName) {
      errors.customerName = 'Please enter your name.';
    } else if (cleanName.length < 2) {
      errors.customerName = 'Name must be at least 2 characters.';
    }

    if (!cleanMsg) {
      errors.message = 'Please share your Christmas wish with us.';
    } else if (cleanMsg.length < 3) {
      errors.message = 'Your wish must be at least 3 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName: formData.customerName.trim(),
          awbNumber: formData.awbNumber.trim(),
          message: formData.message.trim(),
          _hp: formData._hp
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || 'We could not save your submission. Please try again shortly.'
        );
      }

      // Backend confirmed successful Google Sheets append!
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error('Submission error:', err);
      setServerError(
        err.message || 'Connection error. Please verify your internet and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a1f18] text-slate-100 font-sans selection:bg-[#E5192D] selection:text-white pb-8 md:pb-4 flex flex-col">
      {/* 1. Rich Festive Background Layer (Responsive: Portrait on Mobile, Widescreen on Desktop) */}
      <div 
        className="block md:hidden fixed inset-0 z-0 bg-cover bg-top bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/christmas_bg_mobile.jpg')`,
          filter: 'brightness(0.92)'
        }}
      />
      <div 
        className="hidden md:block fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/christmas_bg.jpg')`,
          filter: 'brightness(0.92)'
        }}
      />

      {/* Atmospheric Winter Gradient Overlays */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#061510]/70 via-[#061510]/15 to-[#050f0c]/85 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />

      {/* 2. Interactive Snowfall Canvas */}
      <Snowfall />

      {/* 3. Top Floating Navigation Header */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-3 sm:pt-4 flex items-center justify-between">
        {/* SkyOne Logo Badge */}
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-white/40 flex items-center transition-transform hover:scale-102">
          <SkyOneLogo size="sm" />
        </div>

        {/* Music Control Pill Button */}
        <button
          onClick={handleToggleMusic}
          type="button"
          aria-label={isPlayingMusic ? 'Mute Christmas Music' : 'Play Christmas Music'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg backdrop-blur-md border ${
            isPlayingMusic
              ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40 shadow-emerald-950/50 hover:bg-emerald-900/80'
              : 'bg-black/60 text-amber-200 border-amber-400/30 shadow-black/40 hover:bg-black/80'
          }`}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Music On</span>
              <span className="text-[10px] sm:text-xs text-emerald-300/80 border-l border-emerald-500/30 pl-2 ml-0.5">
                Mute
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-amber-300" />
              <span className="text-amber-100">Tap to Play Music</span>
            </>
          )}
        </button>
      </header>

      {/* 4. Main Page Content Container */}
      <main className="relative z-20 w-full max-w-lg mx-auto px-4 pt-3 sm:pt-3 flex-1 flex flex-col items-center justify-center">
        
        {/* Season's Greetings Hero Header */}
        <div className="text-center mb-3 sm:mb-4 max-w-lg">
          {/* Festive Santa Hat / Golden Star Accent */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-200 text-[11px] font-semibold uppercase tracking-wider mb-1.5 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Holiday Special Edition</span>
          </div>

          <h1 className="font-extrabold tracking-tight text-white drop-shadow-md">
            <span 
              className="block italic font-serif text-2xl sm:text-3xl md:text-[34px] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 font-normal leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Season's Greetings
            </span>
            <span className="flex items-center justify-center gap-3 text-[11px] sm:text-xs font-semibold tracking-widest text-emerald-200 uppercase my-0.5">
              <span className="h-px w-8 bg-emerald-400/50" />
              from
              <span className="h-px w-8 bg-emerald-400/50" />
            </span>
            <span className="text-white text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Skyone International!
            </span>
          </h1>

          <p className="mt-1.5 text-xs sm:text-[13px] text-emerald-100/90 leading-snug font-medium drop-shadow-sm px-2">
            Thank you for choosing Skyone International. We're delighted to be a part of your journey. This Christmas, we'd love to hear your wishes, hopes, and heartfelt messages. Share a little happiness with us!
          </p>
        </div>

        {/* 5. Interactive Form / Success Switcher */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* =================== CUSTOMER FORM CARD =================== */
            <motion.div
              key="customer-form"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full relative"
            >
              {/* Festive Candy Cane Border Container */}
              <div 
                className="relative p-[5px] sm:p-[6px] rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  background: 'repeating-linear-gradient(45deg, #E5192D, #E5192D 12px, #ffffff 12px, #ffffff 24px, #024BB2 24px, #024BB2 27px, #ffffff 27px, #ffffff 32px)'
                }}
              >
                {/* Decorative Red Christmas Ribbon Bow at Top Center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none drop-shadow-lg">
                  <div className="relative flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🎀</span>
                  </div>
                </div>

                {/* Inner White Card */}
                <div className="bg-white rounded-[22px] px-5 py-5 sm:px-7 sm:py-5 text-slate-800 shadow-inner relative">
                  
                  {/* Festive Form Heading */}
                  <div className="text-center mb-3.5 pt-1">
                    <h2
                      className="text-lg sm:text-xl font-bold text-[#0c3b28] tracking-tight flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      <span>🎀</span>
                      <span>Make a Christmas Wish</span>
                    </h2>
                    <div className="mt-1.5 mx-auto w-16 h-0.5 rounded-full bg-gradient-to-r from-[#E5192D] via-amber-400 to-[#0c3b28]" />
                  </div>

                  {serverError && (
                    <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Submission Unsuccessful</p>
                        <p className="mt-0.5 leading-normal">{serverError}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
                    {/* Honeypot field for invisible spam prevention */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="_hp">Leave this empty</label>
                      <input
                        type="text"
                        id="_hp"
                        name="_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData._hp}
                        onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                      />
                    </div>

                    {/* FIELD 1: Customer Name */}
                    <div>
                      <label 
                        htmlFor="customerName"
                        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <User className="w-3.5 h-3.5" />
                        </span>
                        <span>Your Name <strong className="text-red-500">*</strong></span>
                      </label>
                      <div className="relative">
                        <input
                          id="customerName"
                          type="text"
                          required
                          value={formData.customerName}
                          onChange={(e) => {
                            setFormData({ ...formData, customerName: e.target.value });
                            if (formErrors.customerName) {
                              setFormErrors({ ...formErrors, customerName: undefined });
                            }
                          }}
                          placeholder="Enter your name"
                          disabled={isSubmitting}
                          className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-slate-900 text-sm font-medium placeholder:text-slate-400 bg-slate-50/50 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                            formErrors.customerName
                              ? 'border-red-400 focus:ring-red-400/30'
                              : 'border-slate-200 focus:border-[#E5192D] focus:ring-red-500/20'
                          }`}
                        />
                      </div>
                      {formErrors.customerName && (
                        <p className="mt-1 text-xs text-red-600 font-medium pl-1 flex items-center gap-1">
                          <span>•</span> {formErrors.customerName}
                        </p>
                      )}
                    </div>

                    {/* FIELD 2: AWB / Tracking Number (Optional) */}
                    <div>
                      <label 
                        htmlFor="awbNumber"
                        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <Package className="w-3.5 h-3.5" />
                        </span>
                        <span>AWB / Tracking Number</span>
                      </label>
                      <div className="relative">
                        <input
                          id="awbNumber"
                          type="text"
                          value={formData.awbNumber}
                          onChange={(e) => {
                            setFormData({ ...formData, awbNumber: e.target.value });
                            if (formErrors.awbNumber) {
                              setFormErrors({ ...formErrors, awbNumber: undefined });
                            }
                          }}
                          placeholder="Enter your tracking number (Optional)"
                          disabled={isSubmitting}
                          className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-slate-900 text-sm font-medium placeholder:text-slate-400 bg-slate-50/50 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                            formErrors.awbNumber
                              ? 'border-red-400 focus:ring-red-400/30'
                              : 'border-slate-200 focus:border-[#E5192D] focus:ring-red-500/20'
                          }`}
                        />
                      </div>
                      {formErrors.awbNumber && (
                        <p className="mt-1 text-xs text-red-600 font-medium pl-1 flex items-center gap-1">
                          <span>•</span> {formErrors.awbNumber}
                        </p>
                      )}
                    </div>

                    {/* FIELD 3: Christmas Wish */}
                    <div>
                      <label 
                        htmlFor="message"
                        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </span>
                        <span>Your Christmas Wish <strong className="text-red-500">*</strong></span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({ ...formData, message: e.target.value });
                            if (formErrors.message) {
                              setFormErrors({ ...formErrors, message: undefined });
                            }
                          }}
                          placeholder="What's your wish for this Christmas or the coming New Year? Share your dreams, wishes, or a heartfelt message with us..."
                          disabled={isSubmitting}
                          className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-slate-900 text-sm font-medium placeholder:text-slate-400 bg-slate-50/50 transition-all focus:bg-white focus:outline-none focus:ring-2 resize-none ${
                            formErrors.message
                              ? 'border-red-400 focus:ring-red-400/30'
                              : 'border-slate-200 focus:border-[#E5192D] focus:ring-red-500/20'
                          }`}
                        />
                      </div>
                      {formErrors.message && (
                        <p className="mt-1 text-xs text-red-600 font-medium pl-1 flex items-center gap-1">
                          <span>•</span> {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 sm:py-3 px-6 rounded-2xl bg-gradient-to-r from-[#D91428] via-[#E5192D] to-[#BA0E1F] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-red-600/30 hover:shadow-red-600/50 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending Your Wish...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            <span>Send My Wish ❤️</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Privacy & Security Note */}
                    <div className="pt-1 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium text-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Your wishes are special to us. Your information is safe with us.</span>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            /* =================== SUCCESS SECTION =================== */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full space-y-6"
            >
              {/* 1. Main Festive Success Confirmation Card */}
              <div className="relative bg-gradient-to-b from-amber-50/95 via-white/95 to-amber-50/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center text-slate-800 shadow-2xl border-2 border-amber-300/60">
                {/* Sunburst Icon Badge */}
                <div className="relative -mt-12 sm:-mt-14 mb-4 flex justify-center">
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl border-4 border-white">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
                    <span className="absolute -inset-2 rounded-full border border-emerald-400/40 animate-ping pointer-events-none" />
                  </div>
                </div>

                {/* Heading in Elegant Festive Script */}
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-emerald-900 leading-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  🎄 Your Christmas wish has been received!
                </h2>

                {/* Supporting Confirmation Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium max-w-md mx-auto">
                  Thank you for sharing your happiness with Skyone International. May your Christmas be filled with love, joy and beautiful moments. ❤️
                </p>

                {/* Festive Greeting Line */}
                <div className="mt-5 pt-4 border-t border-amber-200/80">
                  <p 
                    className="text-base sm:text-lg font-serif italic font-bold text-red-600 tracking-wide"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Wishing You a Merry Christmas and a Happy New Year!
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-emerald-700">
                    <span className="h-px w-10 bg-amber-300" />
                    <span className="text-sm">🎄</span>
                    <span className="h-px w-10 bg-amber-300" />
                  </div>
                </div>
              </div>

              {/* 2. Instagram Community Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2e21] via-[#082218] to-[#04130c] border border-emerald-500/30 p-5 sm:p-6 text-white shadow-xl">
                {/* Subtle festive background illumination */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  {/* Instagram Logo Gradient Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-0.5 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950/20 backdrop-blur-xs rounded-[14px] flex items-center justify-center text-white">
                      <Instagram className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-amber-200 tracking-tight">
                      Stay Connected With Us!
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-emerald-100/80 leading-normal">
                      Follow us on Instagram for the latest updates, services, announcements, and more.
                    </p>
                  </div>

                  {/* Instagram Follow Button */}
                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] hover:brightness-110 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all shrink-0 cursor-pointer"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Follow Us on Instagram →</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Page Footer Branding */}
        <footer className="mt-4 sm:mt-5 text-center text-white/80">
          <div className="flex items-center justify-center gap-3 text-xs tracking-widest uppercase font-semibold text-emerald-200/90 mb-1">
            <span className="h-px w-10 bg-white/20" />
            <span>SKYONE INTERNATIONAL</span>
            <span className="h-px w-10 bg-white/20" />
          </div>
          <p className="text-xs text-white/70 font-medium">
            Together for a Better Tomorrow <span className="text-red-400">❤️</span>
          </p>
        </footer>

      </main>
    </div>
  );
};

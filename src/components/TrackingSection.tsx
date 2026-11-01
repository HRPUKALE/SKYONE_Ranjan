import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  Plane, 
  AlertCircle, 
  Loader2, 
  Calendar,
  Building,
  RotateCcw,
  Sparkles,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Shipment, TrackingQueryResult } from '../types';
import { trackShipment } from '../services/trackingService';
import { SKYONE_CONFIG } from '../config';
import { EASING, DURATION } from '../utils/motion';
import trackBg from '../assets/images/skyone_track_bg.jpg';
import { TrustStats } from './TrustStats';

interface TrackingSectionProps {
  initialAwb?: string;
  autoScroll?: boolean;
  showStats?: boolean;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ 
  initialAwb = '',
  autoScroll = false,
  showStats = true
}) => {
  const [awbInput, setAwbInput] = useState(initialAwb);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingQueryResult | null>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle tracking submission
  const handleTrack = async (awbToTrack?: string) => {
    const targetAwb = (awbToTrack || awbInput).trim();
    if (!targetAwb) {
      setTrackingResult({
        success: false,
        errorType: 'EMPTY_INPUT',
        errorMessage: 'Please enter your Air Waybill (AWB) or tracking number.'
      });
      return;
    }

    setIsLoading(true);
    setTrackingResult(null);

    try {
      const res = await trackShipment(targetAwb);
      setTrackingResult(res);

      // Keep browser URL synchronized on tracking views for shareability
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/track')) {
        const newUrl = `${window.location.pathname}?awb=${encodeURIComponent(targetAwb)}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch (err: any) {
      setTrackingResult({
        success: false,
        errorType: 'NETWORK_ERROR',
        errorMessage: 'Unable to connect to the tracking network. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If initialAwb changes, trigger track
  useEffect(() => {
    if (initialAwb) {
      setAwbInput(initialAwb);
      handleTrack(initialAwb);
    }
  }, [initialAwb]);

  // Smooth scroll into view when results arrive if autoScroll is enabled
  useEffect(() => {
    if (autoScroll && trackingResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [trackingResult, autoScroll]);

  const shipment = trackingResult?.shipment;

  // Standard milestone timeline steps
  const standardSteps = [
    { key: 'BOOKED', label: 'Booked' },
    { key: 'PICKED_UP', label: 'Picked Up' },
    { key: 'DEPARTED_ORIGIN', label: 'Departed Origin' },
    { key: 'IN_TRANSIT', label: 'In Transit' },
    { key: 'DESTINATION_HUB', label: 'Destination Hub' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' }
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const order = ['BOOKED', 'PICKED_UP', 'DEPARTED_ORIGIN', 'IN_TRANSIT', 'DESTINATION_HUB', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <section id="tracking-portal" className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      {/* Panoramic Maritime & Air Cargo Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_top] pointer-events-none opacity-100 transition-opacity"
        style={{ backgroundImage: `url(${trackBg})` }}
        aria-hidden="true"
      />
      {/* Soft luminous veil to preserve the light pastel sky, delicate world map & distant plane */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#024BB2]">
            <span className="w-8 h-[2px] bg-[#024BB2]" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5192D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5192D]" />
            </span>
            <span>REAL-TIME CONSIGNMENT TRACKING</span>
            <span className="w-8 h-[2px] bg-[#024BB2]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-display">
            Track Your <span className="text-[#024BB2]">Shipment</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            Enter your AWB or tracking number to see the latest shipment status, route progress, and delivery schedule.
          </p>
        </div>

        {/* Big White Tracking Search Card matching reference */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.standard, ease: EASING.flight }}
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-5 sm:p-7 relative overflow-hidden"
        >
          {/* Top-Left Corner Accent Curved Ribbon */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#024BB2] rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 left-16 w-8 h-1 bg-[#E5192D] pointer-events-none" />

          {/* Inner 3-Zone Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            
            {/* Left Zone: Illustrated Flight Track with Waypoints */}
            <div className="hidden xl:flex items-center gap-2 relative w-56 shrink-0 py-2 pl-4">
              <svg className="w-full h-14 overflow-visible" viewBox="0 0 180 50" fill="none">
                <path 
                  d="M 10 40 Q 90 8 170 20" 
                  stroke="#93C5FD" 
                  strokeWidth="2.5" 
                  strokeDasharray="4 4" 
                />
                <circle cx="20" cy="38" r="3.5" fill="#024BB2" />
                <circle cx="95" cy="18" r="4.5" fill="#E5192D" />
                <circle cx="95" cy="18" r="9" fill="#E5192D" opacity="0.3" className="animate-ping" />
              </svg>
              <div className="absolute left-6 top-1">
                <Plane className="w-6 h-6 text-[#024BB2] transform -rotate-12 filter drop-shadow-xs" />
              </div>
              <div className="absolute right-3 top-0">
                <Plane className="w-4 h-4 text-[#024BB2] transform rotate-45" />
              </div>
            </div>

            {/* Center Zone: Input Form */}
            <div className="flex-1 w-full max-w-3xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTrack();
                }}
                className="flex flex-col sm:flex-row gap-3 items-stretch"
              >
                <div className="relative flex-1 flex items-center">
                  <div className="absolute left-4 flex items-center pointer-events-none text-[#024BB2] z-10">
                    <Package className="w-5 h-5 text-[#024BB2]" />
                  </div>
                  <input
                    type="text"
                    value={awbInput}
                    onChange={(e) => setAwbInput(e.target.value)}
                    placeholder="Enter Tracking / AWB Number"
                    className="w-full h-14 pl-12 pr-4 bg-white hover:bg-slate-50/50 focus:bg-white text-slate-900 text-sm font-semibold rounded-2xl border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-[#024BB2] focus:ring-4 focus:ring-blue-100/70 transition-all outline-none placeholder:text-slate-500 font-medium box-border leading-normal shadow-2xs"
                    aria-label="Tracking or AWB number"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="h-14 inline-flex items-center justify-center gap-2.5 px-8 bg-[#024BB2] hover:bg-[#003B91] active:bg-[#002A6B] text-white text-sm font-bold rounded-2xl shadow-md shadow-blue-900/15 transition-all cursor-pointer disabled:opacity-75 group whitespace-nowrap border border-transparent box-border"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Tracking...</span>
                    </>
                  ) : (
                    <>
                      <span>TRACK SHIPMENT</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Right Zone: Live Tracking Badge */}
            <div className="hidden lg:flex items-center gap-3 bg-slate-50/90 border border-slate-200/90 rounded-2xl px-5 py-3.5 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 leading-tight">Live Tracking</div>
                <div className="text-[10px] text-slate-500 leading-tight">Your shipment is on the move</div>
              </div>
            </div>

          </div>

        {/* Loading State Banner with Subtle Route Flow */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8 p-7 max-w-3xl mx-auto rounded-xl bg-slate-50 border border-slate-200 text-center overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#024BB2] flex items-center justify-center mx-auto mb-3">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Querying live dispatch network...</h3>
              <p className="text-xs text-slate-500 mt-1">Connecting to Speedex/SkyOne carrier gateway and retrieving milestone history.</p>
              
              {/* Subtle Route Loader Bar */}
              <div className="max-w-xs mx-auto mt-4 h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#024BB2] to-[#E5192D] w-1/3 rounded-full"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Container (Error or Success) */}
        <div ref={resultRef} id="tracking-results">
          {/* Error States */}
          {!isLoading && trackingResult && !trackingResult.success && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard }}
              className="mt-8 max-w-3xl mx-auto p-5 rounded-xl bg-rose-50/70 border border-rose-200 text-slate-800"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#E5192D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-900">
                    {trackingResult.errorType === 'EMPTY_INPUT' && 'Tracking Number Required'}
                    {trackingResult.errorType === 'INVALID_NUMBER' && 'Invalid Tracking Format'}
                    {trackingResult.errorType === 'NOT_FOUND' && 'Consignment Not Found'}
                    {trackingResult.errorType === 'TIMEOUT' && 'Connection Timeout'}
                    {trackingResult.errorType === 'NETWORK_ERROR' && 'Network Connection Issue'}
                    {trackingResult.errorType === 'API_ERROR' && 'Tracking Service Temporarily Unavailable'}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {trackingResult.errorMessage}
                  </p>
                  <div className="pt-2 text-xs text-slate-500">
                    Need assistance? Contact our 24/7 Air Cargo Desk at{' '}
                    <span className="font-semibold text-slate-800">{SKYONE_CONFIG.primaryPhone}</span> or email{' '}
                    <span className="font-semibold text-[#024BB2]">{SKYONE_CONFIG.supportEmail}</span>.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Tracking Result Dashboard with Slide-in Transition */}
          {!isLoading && shipment && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard + 0.1, ease: EASING.flight }}
              className="mt-8 border-t border-slate-200 pt-8"
            >
              {/* Shipment Summary Card - Two-Tone Navy Header + Clean White Data Matrix (matching Image 2) */}
              <div className="rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden mb-6 bg-white">
                {/* Top Dark Navy Header */}
                <div className="bg-[#0B253E] text-white px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: AWB & Label */}
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-slate-300/80 uppercase flex items-center gap-2">
                      <span>AIR WAYBILL / CONSIGNMENT NUMBER</span>
                      {shipment.isDemo && (
                        <span className="px-2 py-0.5 text-[10px] font-bold tracking-normal bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                          DEMO RECORD
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mt-0.5">
                      {shipment.trackingNumber}
                    </div>
                  </div>

                  {/* Right: Status Pill */}
                  <div className="flex items-center sm:self-center">
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        shipment.status === 'DELIVERED'
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                          : shipment.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-red-950/70 text-red-300 border border-red-500/40'
                          : 'bg-amber-950/70 text-amber-300 border border-amber-600/40'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          shipment.status === 'DELIVERED'
                            ? 'bg-emerald-400'
                            : shipment.status === 'OUT_FOR_DELIVERY'
                            ? 'bg-red-400'
                            : 'bg-amber-400'
                        }`}
                      />
                      <span>{shipment.statusLabel}</span>
                    </div>
                  </div>
                </div>

                {/* White Data Matrix Body */}
                <div className="p-6 sm:p-7 bg-white text-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        ORIGIN
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 leading-snug">
                        {shipment.origin}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        DESTINATION
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 leading-snug">
                        {shipment.destination}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        LAST MILESTONE SCAN
                      </div>
                      <div className="text-sm font-bold text-slate-900 font-mono leading-snug">
                        {shipment.lastUpdated}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        RECIPIENT
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 leading-snug">
                        {shipment.consignee || 'Valued Recipient'}
                      </div>
                      {shipment.forwardingNo && (
                        <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                          <span>Forwarding No:</span>
                          <span className="font-mono font-bold text-[#024BB2] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/90 shadow-2xs">
                            {shipment.forwardingNo}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipment Route Visualization Corridor */}
              <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 mb-8">
                <div className="flex items-center justify-between pb-3 border-b border-blue-100/80 mb-4">
                  <span className="text-xs font-bold text-[#024BB2] uppercase tracking-wider flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-[#E5192D]" />
                    Transit Route Corridor
                  </span>
                  <span className="text-xs text-slate-500">
                    {shipment.weight} &bull; {shipment.pieces} Piece(s)
                  </span>
                </div>

                {/* Interactive Route Corridor */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#024BB2] text-white flex items-center justify-center font-bold text-xs">
                      {shipment.originCode || 'ORG'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{shipment.origin}</div>
                      <div className="text-[11px] text-slate-500">Origin Clearance</div>
                    </div>
                  </div>

                  {/* Connecting track with airplane marker */}
                  <div className="hidden md:flex flex-1 items-center px-4 relative">
                    <div className="w-full h-1 bg-slate-200 relative overflow-hidden rounded-full">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-[#024BB2]"
                        initial={shouldReduceMotion ? { width: '80%' } : { width: '0%' }}
                        animate={{ width: shipment.status === 'DELIVERED' ? '100%' : '75%' }}
                        transition={{ duration: 1.2, ease: EASING.flight }}
                      />
                    </div>
                    <motion.div
                      className="absolute -translate-x-1/2 -top-2.5 bg-white p-1 rounded-full border border-blue-200 text-[#E5192D] shadow-xs"
                      initial={shouldReduceMotion ? { left: '80%' } : { left: '10%' }}
                      animate={{ left: shipment.status === 'DELIVERED' ? '96%' : '75%' }}
                      transition={{ duration: 1.4, ease: EASING.flight }}
                    >
                      <Plane className="w-3.5 h-3.5 transform rotate-45" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{shipment.destination}</div>
                      <div className="text-[11px] text-slate-500">Destination Hub</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#E5192D] text-white flex items-center justify-center font-bold text-xs">
                      {shipment.destinationCode || 'DST'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Milestones Timeline */}
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#024BB2]" />
                  <span>Shipment Milestones</span>
                </h3>

                {/* Desktop Horizontal Milestone Flow */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-7 gap-2 relative">
                    {standardSteps.map((step, idx) => {
                      const status = getStepStatus(step.key, shipment.status);
                      const isCompleted = status === 'completed';
                      const isCurrent = status === 'current';
                      const isDelivered = shipment.status === 'DELIVERED' && step.key === 'DELIVERED';

                      return (
                        <div key={step.key} className="text-center relative">
                          {/* Connecting Line */}
                          {idx < standardSteps.length - 1 && (
                            <div 
                              className={`absolute top-4 left-1/2 w-full h-0.5 z-0 ${
                                isCompleted ? 'bg-[#024BB2]' : 'bg-slate-200'
                              }`}
                            />
                          )}

                          {/* Step Marker */}
                          <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                              initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.05 * idx, duration: DURATION.micro }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDelivered
                                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-sm'
                                  : isCompleted
                                  ? 'bg-[#024BB2] text-white shadow-xs'
                                  : isCurrent
                                  ? 'bg-[#E5192D] text-white ring-4 ring-red-100 shadow-sm animate-pulse'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}
                            >
                              {isDelivered || isCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : isCurrent ? (
                                <span className="w-2 h-2 rounded-full bg-white" />
                              ) : (
                                <span>{idx + 1}</span>
                              )}
                            </motion.div>

                            <div className={`mt-2 text-xs font-semibold ${
                              isDelivered
                                ? 'text-emerald-600 font-bold'
                                : isCurrent
                                ? 'text-[#E5192D] font-bold'
                                : isCompleted
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}>
                              {step.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile / Tablet Step Progress Overview */}
                <div className="lg:hidden bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-700 uppercase tracking-wider">Milestone Progress</span>
                    <span className="font-bold text-[#024BB2]">
                      {(() => {
                        const order = ['BOOKED', 'PICKED_UP', 'DEPARTED_ORIGIN', 'IN_TRANSIT', 'DESTINATION_HUB', 'OUT_FOR_DELIVERY', 'DELIVERED'];
                        const currentIdx = Math.max(0, order.indexOf(shipment.status));
                        return `Stage ${currentIdx + 1} of ${order.length}`;
                      })()}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                    <div 
                      className="bg-gradient-to-r from-[#024BB2] to-[#E5192D] h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(() => {
                          const order = ['BOOKED', 'PICKED_UP', 'DEPARTED_ORIGIN', 'IN_TRANSIT', 'DESTINATION_HUB', 'OUT_FOR_DELIVERY', 'DELIVERED'];
                          const currentIdx = Math.max(0, order.indexOf(shipment.status));
                          return Math.round(((currentIdx + 1) / order.length) * 100);
                        })()}%`
                      }}
                    />
                  </div>

                  {/* Active Step Name */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E5192D] animate-ping" />
                      Current: <span className="font-bold text-[#024BB2]">{shipment.statusLabel}</span>
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {shipment.status === 'DELIVERED' ? 'Delivery Completed' : `Destination: ${shipment.destination}`}
                    </span>
                  </div>
                </div>

                {/* Event Log with Progressive Stagger */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Detailed Event Log ({shipment.history.length} events)
                  </h4>

                  <div className="relative border-l-2 border-blue-200/80 ml-3 sm:ml-4 pl-4 sm:pl-6 space-y-5">
                    {shipment.history.map((event, index) => {
                      const isLatest = index === 0;

                      return (
                        <motion.div
                          key={index}
                          initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 * index, duration: DURATION.micro }}
                          className="relative group"
                        >
                          {/* Dot on the timeline */}
                          <div
                            className={`absolute -left-[23px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                              isLatest
                                ? shipment.status === 'DELIVERED'
                                  ? 'bg-emerald-600 ring-4 ring-emerald-100'
                                  : 'bg-[#E5192D] ring-4 ring-red-100'
                                : 'bg-[#024BB2]'
                            }`}
                          />

                          <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors p-4 rounded-xl border border-slate-200/80">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                              <span className="font-extrabold text-slate-900 text-sm">
                                {event.status}
                              </span>
                              <span className="font-mono text-slate-500">
                                {event.date} &bull; {event.time}
                              </span>
                            </div>

                            <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mt-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{event.location}</span>
                            </div>

                            <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </div>

      </motion.div>

      {/* 4 Trust & Metric Cards row directly below the search card */}
      {showStats && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.standard, delay: 0.1, ease: EASING.flight }}
          className="mt-6 sm:mt-8"
        >
          <TrustStats embedded={true} />
        </motion.div>
      )}

      </div>
    </section>
  );
};

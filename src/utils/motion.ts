/**
 * SkyOne International Courier Service - Global Motion Design System
 * 
 * Curated animation tokens, spring dynamics, and reusable variants tailored
 * for an international courier and aviation movement aesthetic.
 * Adheres strictly to prefers-reduced-motion standards.
 */

// Timing Tiers (in seconds)
export const DURATION = {
  micro: 0.18,       // Buttons, icons, micro-hover states
  standard: 0.35,    // Cards, list items, small modal transitions
  feature: 0.65,     // Section reveals, hero components, tracking reveals
  cinematic: 1.4     // Flight path route drawing, shipment journey progress
} as const;

// Easing Curves (Cubic Beziers)
export const EASING = {
  // Ultra-smooth decelerated curve (luxurious, aviation glide feel)
  cinematic: [0.16, 1, 0.3, 1] as const,
  // Snappy modern logistics interaction curve
  snappy: [0.25, 0.1, 0.25, 1] as const,
  // Soft gentle ease out
  gentle: [0.33, 1, 0.68, 1] as const,
  // Flight vector transition curve
  flight: [0.4, 0, 0.2, 1] as const
};

// Spring Dynamics
export const SPRINGS = {
  soft: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 },
  interactive: { type: 'spring', stiffness: 400, damping: 30, mass: 0.6 },
  gentleFloat: { type: 'spring', stiffness: 80, damping: 15, mass: 1 }
} as const;

// Reusable Framer Motion Variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.standard,
      ease: EASING.cinematic
    }
  }
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: DURATION.standard,
      ease: EASING.gentle
    }
  }
};

export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren
    }
  }
});

export const flightRouteVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: DURATION.cinematic, ease: EASING.cinematic },
      opacity: { duration: 0.3 }
    }
  }
};

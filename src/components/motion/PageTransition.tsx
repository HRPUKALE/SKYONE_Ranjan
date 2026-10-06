import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '../../utils/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey?: string;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pageKey,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: DURATION.standard,
        ease: EASING.cinematic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

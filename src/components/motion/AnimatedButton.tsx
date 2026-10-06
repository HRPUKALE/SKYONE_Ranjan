import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SPRINGS } from '../../utils/motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  isLoading?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  isLoading = false,
  disabled,
  onClick,
  type = 'button',
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Style matrix
  const baseStyles = 'inline-flex flex-row flex-nowrap items-center justify-center whitespace-nowrap font-bold tracking-tight rounded-xl transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[38px] gap-2',
    md: 'text-xs sm:text-sm px-5 py-3 sm:py-3.5 min-h-[44px] gap-2.5',
    lg: 'text-sm sm:text-base px-7 py-4 min-h-[48px] gap-3'
  }[size];

  const variantStyles = {
    primary: 'bg-[#024BB2] hover:bg-[#003B91] text-white shadow-md shadow-blue-900/15 border border-transparent',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs hover:border-slate-400',
    accent: 'bg-[#E5192D] hover:bg-[#CC1325] text-white shadow-md shadow-red-900/15 border border-transparent',
    outline: 'bg-transparent hover:bg-blue-50/70 text-[#024BB2] border border-blue-200 hover:border-blue-300',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
  }[variant];

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: disabled || isLoading ? {} : { y: -1.5 },
        whileTap: disabled || isLoading ? {} : { scale: 0.98, y: 0 },
        transition: SPRINGS.interactive
      };

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex flex-row flex-nowrap items-center justify-center gap-2.5 whitespace-nowrap ${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...motionProps}
      {...(rest as any)}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 inline-flex items-center transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      {children}

      {icon && iconPosition === 'right' && (
        <span className="shrink-0 inline-flex items-center transition-transform duration-200 group-hover:translate-x-1 text-[#E5192D]">
          {icon}
        </span>
      )}
    </motion.button>
  );
};

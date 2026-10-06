import React from 'react';
import skyoneLogoImg from '../assets/skyone_logo_clean.png';

interface SkyOneLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const SkyOneLogo: React.FC<SkyOneLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md'
}) => {
  // Height sizing
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-22'
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center select-none ${
        isDark
          ? 'bg-white rounded-xl p-1.5 sm:p-2 shadow-xs border border-white/20'
          : ''
      } ${className}`}
    >
      <img
        src={skyoneLogoImg}
        alt="SkyOne International Courier Service"
        className={`${sizeClasses[size]} w-auto max-w-full object-contain block`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

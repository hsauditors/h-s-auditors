'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  useLogo2?: boolean;
  href?: string;
}

export function BrandLogo({
  variant = 'light',
  className = '',
  size = 'md',
  useLogo2 = false,
  href = '/',
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const shouldUseLogo2 = isDark || useLogo2;

  const logoHeightClass = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-9 sm:h-10 w-auto',
    lg: 'h-11 sm:h-12 w-auto',
  }[size];

  const textSizeClass = {
    sm: 'text-[15px] sm:text-base font-black',
    md: 'text-base sm:text-lg md:text-[21px] font-black',
    lg: 'text-lg sm:text-xl md:text-2xl font-black',
  }[size];

  const logoSrc = shouldUseLogo2
    ? '/images/H&S Auditors logo3.png'
    : '/images/hs-logo.png';

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 sm:gap-2.5 group select-none ${className}`}
    >
      {/* Official HS Logo Image */}
      <div className="relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
        <Image
          src={logoSrc}
          alt="H&S Auditors Logo"
          width={shouldUseLogo2 ? 76 : 64}
          height={64}
          priority
          unoptimized
          className={`${logoHeightClass} object-contain ${
            shouldUseLogo2
              ? 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]'
              : ''
          }`}
        />
      </div>

      {/* Elegant Vertical Divider Line */}
      <div
        className={`h-7 w-[1.5px] rounded-full hidden sm:block ${
          isDark ? 'bg-white/20' : 'bg-gray-200'
        }`}
      />

      {/* Thick Solid Brand Name Typography */}
      <div className="flex items-center">
        <span
          className={`${textSizeClass} tracking-tight uppercase leading-none ${
            isDark ? 'text-white' : 'text-[#071A3D]'
          }`}
        >
          H<span className="text-[#F59E0B] mx-0.5">&amp;</span>S{' '}
          <span className={isDark ? 'text-white' : 'text-[#071A3D]'}>AUDITORS</span>
        </span>
      </div>
    </Link>
  );
}

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
  showEmblem?: boolean;
}

export function BrandLogo({
  variant = 'light',
  className = '',
  size = 'md',
  useLogo2 = false,
  href = '/',
  showEmblem = true,
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const shouldUseLogo2 = isDark || useLogo2;

  const logoHeightClass = {
    sm: 'h-7 sm:h-8 w-auto',
    md: 'h-8 sm:h-9 w-auto',
    lg: 'h-10 sm:h-11 w-auto',
  }[size];

  const barHeightClass = {
    sm: 'h-5 sm:h-6 w-[2.5px]',
    md: 'h-6 sm:h-7 w-[3px]',
    lg: 'h-7 sm:h-8 w-[3.5px]',
  }[size];

  const hsTextClass = {
    sm: 'text-[17px] sm:text-[19px]',
    md: 'text-[20px] sm:text-[23px]',
    lg: 'text-[23px] sm:text-[26px] md:text-[29px]',
  }[size];

  const auditorsTextClass = {
    sm: 'text-[14px] sm:text-[16px]',
    md: 'text-[16px] sm:text-[19px]',
    lg: 'text-[18px] sm:text-[21px] md:text-[24px]',
  }[size];

  const logoSrc = shouldUseLogo2
    ? '/images/H&S Auditors logo3.png'
    : '/images/hs-logo.png';

  const navyColor = isDark ? 'text-white' : 'text-[#051836]';

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 sm:gap-2.5 group select-none ${className}`}
    >
      {/* 1. Official HS 3D Emblem Image */}
      {showEmblem && (
        <div className="relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
          <Image
            src={logoSrc}
            alt="H&S Auditors Logo"
            width={shouldUseLogo2 ? 72 : 60}
            height={60}
            priority
            unoptimized
            className={`${logoHeightClass} object-contain ${
              shouldUseLogo2 ? 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]' : ''
            }`}
          />
        </div>
      )}

      {/* 2. Gold Vertical Accent Line matching screenshot */}
      <span
        className={`${barHeightClass} bg-gradient-to-b from-[#F59E0B] via-[#D97706] to-[#B45309] rounded-full flex-shrink-0`}
      />

      {/* 3. Brand Name Typography Lockup: Serif H&S with Gold & + Bold Geometric Sans AUDITORS */}
      <div className="flex items-baseline tracking-normal">
        {/* Serif H&S */}
        <span
          className={`font-serif font-black ${hsTextClass} ${navyColor} leading-none tracking-tight transition-colors`}
          style={{ fontFamily: 'Georgia, "Playfair Display", "Times New Roman", serif' }}
        >
          H
          <span
            className="text-[#D97706] font-serif font-bold italic mx-[1px]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            &amp;
          </span>
          S
        </span>

        {/* Space separator */}
        <span className="w-1.5 sm:w-2" />

        {/* Geometric Bold Sans AUDITORS */}
        <span
          className={`font-sans font-extrabold tracking-[0.05em] uppercase ${auditorsTextClass} ${navyColor} leading-none transition-colors`}
        >
          AUDITORS
        </span>
      </div>
    </Link>
  );
}

'use client';

import React, { useState } from 'react';
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
  logoSrc?: string;
}

export function BrandLogo({
  variant = 'light',
  className = '',
  size = 'md',
  href = '/',
  showEmblem = true,
  logoSrc,
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const [imageError, setImageError] = useState(false);

  // Height mappings tailored for header, footer & admin sidebar
  const logoHeightClass = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9 md:h-10',
    lg: 'h-10 sm:h-12',
  }[size];

  // Resolve source: custom override -> default '/logo/logo.png'
  const resolvedLogoSrc = logoSrc || '/logo/logo.png';

  return (
    <Link
      href={href}
      className={`inline-flex items-center group select-none ${className}`}
      aria-label="H&S Auditors Home"
    >
      {!imageError && showEmblem ? (
        <div
          className={`relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.02] ${
            isDark ? 'bg-white px-3.5 py-1.5 rounded-xl shadow-xs' : ''
          }`}
        >
          <Image
            src={resolvedLogoSrc}
            alt="H&S Auditors"
            width={280}
            height={68}
            priority
            unoptimized
            onError={() => setImageError(true)}
            className={`${logoHeightClass} w-auto object-contain`}
          />
        </div>
      ) : (
        /* Typographic fallback */
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2b2d54] text-white flex items-center justify-center font-bold text-sm">
            HS
          </div>
          <span className={`font-extrabold text-base tracking-tight ${isDark ? 'text-white' : 'text-[#2b2d54]'}`}>
            H&amp;S AUDITORS
          </span>
        </div>
      )}
    </Link>
  );
}

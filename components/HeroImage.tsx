'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HeroImageProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

export function HeroImage({ desktopSrc, mobileSrc, alt }: HeroImageProps) {
  const [currentDesktop, setCurrentDesktop] = useState(desktopSrc);
  const [currentMobile, setCurrentMobile] = useState(mobileSrc);

  React.useEffect(() => {
    setCurrentDesktop(desktopSrc);
  }, [desktopSrc]);

  React.useEffect(() => {
    setCurrentMobile(mobileSrc);
  }, [mobileSrc]);

  const fallbackSvg = '/images/hero-accounting-team.svg';

  const handleDesktopError = () => {
    if (currentDesktop !== fallbackSvg) {
      setCurrentDesktop(fallbackSvg);
    }
  };

  const handleMobileError = () => {
    if (currentMobile === '/images/hero-mobile.jpg') {
      setCurrentMobile('/api/hero-mobile-image');
    } else if (currentMobile === '/api/hero-mobile-image') {
      setCurrentMobile('/images/hero-team.jpg');
    } else if (currentMobile !== fallbackSvg) {
      setCurrentMobile(fallbackSvg);
    }
  };

  return (
    <>
      {/* Desktop Image */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Image
          src={currentDesktop}
          alt={alt}
          fill
          priority
          onError={handleDesktopError}
          className="object-cover object-right lg:object-[80%_center] xl:object-[center_right] w-full h-full"
          sizes="100vw"
        />
      </div>

      {/* Mobile Image - Centered on sky at top, team & laptop at bottom */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <Image
          src={currentMobile}
          alt={alt}
          fill
          priority
          onError={handleMobileError}
          className="object-cover object-bottom w-full h-full"
          sizes="100vw"
        />
        {/* Richer, deeper fade gradient behind the text ensuring comfortable readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 via-54% to-transparent pointer-events-none" />
        {/* Soft top-right ambient circular accent from mockup */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-blue-100/40 blur-xl pointer-events-none" />
      </div>
    </>
  );
}

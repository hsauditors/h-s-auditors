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

      {/* Mobile Image - Crisp framing with no bottom gradient overlay */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <Image
          src={currentMobile}
          alt={alt}
          fill
          priority
          onError={handleMobileError}
          className="object-cover object-[center_60%] w-full h-full"
          sizes="100vw"
        />
        {/* Top-only text backing: restricted strictly to top half so bottom has zero gradient */}
        <div className="absolute top-0 left-0 right-0 h-[48%] bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
      </div>
    </>
  );
}

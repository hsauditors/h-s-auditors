'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, FileText, ShieldCheck, Award, Handshake } from 'lucide-react';
import { HomepageSection } from '@/types';
import { HeroImage } from './HeroImage';
import { openConsultationModal } from './ConsultationModal';

interface HeroSectionProps {
  heroData: HomepageSection | null;
}

export function HeroSection({ heroData }: HeroSectionProps) {
  if (heroData && heroData.is_active === false) {
    return null;
  }

  const eyebrow = heroData?.eyebrow || 'PREMIER ACCOUNTING & TAX CONSULTANCY • INDIA';
  const headline = heroData?.headline || 'Your Trusted Partner in Financial Growth and Compliance';
  const description =
    heroData?.description ||
    'Professional accounting, taxation and compliance solutions brought together with deep expertise in GST, income tax, audit & assurance, and corporate advisory across India.';
  const primaryCtaText = heroData?.primary_cta_text || 'Book a Consultation';
  const secondaryCtaText = heroData?.secondary_cta_text || 'Our Services';
  const secondaryCtaLink = heroData?.secondary_cta_link || '/services';

  const rawDesktop = heroData?.desktop_image_url || '';
  const rawMobile = heroData?.mobile_image_url || '';

  const desktopImage =
    rawDesktop && !rawDesktop.includes('.svg')
      ? rawDesktop
      : '/images/hero-team.jpg';

  const mobileImage =
    rawMobile && !rawMobile.includes('.svg')
      ? rawMobile
      : '/images/hero-mobile.jpg';

  const imageAlt = heroData?.image_alt || 'H&S Auditors Team of Accounting & Tax Professionals';

  // Render headline highlighting "Financial Growth" in radiant theme yellow
  const renderHeadline = (text: string) => {
    if (text.includes('Financial Growth')) {
      const [before, after] = text.split('Financial Growth');
      return (
        <>
          {before}
          <span className="text-[#fcdd5e] block sm:inline">
            Financial Growth
          </span>
          {after}
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative w-full bg-white overflow-hidden min-h-[500px] h-[calc(82dvh-68px)] max-h-[640px] md:h-auto md:max-h-none md:min-h-[calc(100dvh-80px)] flex items-start md:items-center justify-between">
      {/* 1. Full-Width Edge-to-Edge Background Image Banner */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <HeroImage
          desktopSrc={desktopImage}
          mobileSrc={mobileImage}
          alt={imageAlt}
        />
      </div>

      {/* 2. Content Container: Centered at top on Mobile, Left-aligned on Desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 md:py-12 lg:py-16">
        <div className="max-w-xl lg:max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          
          {/* Eyebrow: Editorial badge with gold hairline */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
            <span className="text-[9.5px] sm:text-[11px] font-bold tracking-[0.22em] text-[#2b2d54] md:text-[#e6c645] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Mobile Headline */}
          <h1 className="md:hidden text-[26px] sm:text-[31px] font-black text-[#2b2d54] leading-[1.15] tracking-tight mb-2.5 max-w-[350px] mx-auto text-center">
            Your Trusted Partner in<br />
            <span className="text-[#fcdd5e] text-[36px] sm:text-[42px] leading-tight block my-0.5 font-bold">
              Financial Growth
            </span>
            <span>and Compliance</span>
          </h1>

          {/* Desktop Headline */}
          <h1 className="hidden md:block text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#2b2d54] leading-[1.14] tracking-tight mb-4 text-left">
            {renderHeadline(headline)}
          </h1>

          {/* Minimal Subtext on Mobile */}
          <p className="block md:hidden text-[13px] font-medium text-slate-700 leading-snug mb-4 max-w-[300px] mx-auto text-center">
            Expert accounting, taxation and statutory compliance solutions for your business.
          </p>

          {/* Full Detailed Subtext on Desktop */}
          <p className="hidden md:block text-[14.5px] lg:text-[15.5px] font-normal text-slate-700 leading-relaxed mb-6 max-w-xl text-left">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 mb-5">
            <button
              type="button"
              onClick={() => openConsultationModal()}
              className="inline-flex items-center justify-center gap-2 bg-[#fcdd5e] hover:bg-[#ebd052] text-[#2b2d54] font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-[0_4px_16px_rgba(252,221,94,0.35)] hover:shadow-lg transition-all text-xs sm:text-sm whitespace-nowrap group cursor-pointer"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-[#2b2d54] transition-transform duration-150 group-hover:translate-x-1" />
            </button>

            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-[#2b2d54] font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-xs transition-all text-xs sm:text-sm whitespace-nowrap group backdrop-blur-sm"
            >
              <span>{secondaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-slate-600 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Trust Badges */}
          <div className="flex md:hidden items-center justify-center gap-1.5 sm:gap-2 px-1 py-1">
            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fcdd5e]/15 flex items-center justify-center flex-shrink-0 text-[#2b2d54] shadow-2xs">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#2b2d54] leading-none">
                Expert Guidance
              </span>
            </div>

            <span className="w-px h-4 bg-stone-300 mx-1" />

            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fcdd5e]/15 flex items-center justify-center flex-shrink-0 text-[#2b2d54] shadow-2xs">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#2b2d54] leading-none">
                Transparent
              </span>
            </div>

            <span className="w-px h-4 bg-stone-300 mx-1" />

            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fcdd5e]/15 flex items-center justify-center flex-shrink-0 text-[#2b2d54] shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#2b2d54] leading-none">
                Timely Support
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

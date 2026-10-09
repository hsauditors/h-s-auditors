import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowRight, Users, FileText, ShieldCheck } from 'lucide-react';
import { HomepageSection } from '@/types';
import { HeroImage } from './HeroImage';

interface HeroSectionProps {
  heroData: HomepageSection | null;
}

export function HeroSection({ heroData }: HeroSectionProps) {
  // Sync clean mobile image to public directory if needed
  try {
    const source =
      'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\ce0b4e2c-2cfb-4289-b5b3-db171af02d6a\\hero_mobile_clean_1791534775721.jpg';
    const destDir = path.join(process.cwd(), 'public', 'images');
    const dest = path.join(destDir, 'hero-mobile.jpg');
    if (fs.existsSync(source) && !fs.existsSync(dest)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(source, dest);
    }

    // Also sync logo2 and logo3
    const logo2Source = path.join(destDir, 'H&S Auditors logo2.png');
    const logo2Dest = path.join(destDir, 'hs-logo2.png');
    if (fs.existsSync(logo2Source) && !fs.existsSync(logo2Dest)) {
      fs.copyFileSync(logo2Source, logo2Dest);
    }

    const logo3Source = path.join(destDir, 'H&S Auditors logo3.png');
    const logo3Dest = path.join(destDir, 'hs-logo3.png');
    if (fs.existsSync(logo3Source) && !fs.existsSync(logo3Dest)) {
      fs.copyFileSync(logo3Source, logo3Dest);
    }
  } catch {
    // Graceful fallback
  }

  if (heroData && heroData.is_active === false) {
    return null;
  }

  const eyebrow = heroData?.eyebrow || 'PREMIER ACCOUNTING & TAX CONSULTANCY – INDIA';
  const headline = heroData?.headline || 'Your Trusted Partner in Financial Growth and Compliance';
  const description =
    heroData?.description ||
    'Professional accounting, taxation and compliance solutions brought together with deep expertise in GST, income tax and business advisory.';
  const primaryCtaText = heroData?.primary_cta_text || 'Book a Consultation';
  const primaryCtaLink = heroData?.primary_cta_link || '/contact';
  const secondaryCtaText = heroData?.secondary_cta_text || 'Our Services';
  const secondaryCtaLink = heroData?.secondary_cta_link || '/services';

  const trustBadgeValue = heroData?.trust_badge_value || '500+';
  const trustBadgeLabel = heroData?.trust_badge_label || 'Businesses Trust Us';

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

  // Render headline highlighting "Financial Growth" in vibrant blue
  const renderHeadline = (text: string) => {
    if (text.includes('Financial Growth')) {
      const [before, after] = text.split('Financial Growth');
      return (
        <>
          <span>{before}</span>
          <span className="text-[#0066FF] block sm:inline">Financial Growth</span>
          <span>{after}</span>
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative w-full min-h-[690px] sm:min-h-[560px] md:min-h-[580px] lg:min-h-[620px] flex items-start md:items-center overflow-hidden border-b border-gray-200/80 bg-white">
      {/* 1. Full-Width Edge-to-Edge Background Image Banner */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <HeroImage
          desktopSrc={desktopImage}
          mobileSrc={mobileImage}
          alt={imageAlt}
        />
      </div>

      {/* 2. Top-Right Calligraphy Text (Desktop only) */}
      <div className="absolute top-5 right-6 sm:top-7 sm:right-10 z-20 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] text-right hidden md:block">
        <div className="font-serif italic text-white leading-tight">
          <span className="text-base sm:text-xl md:text-2xl font-bold tracking-wide">Compliance</span><br />
          <span className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-gold uppercase not-italic">Today</span><br />
          <span className="text-sm sm:text-lg md:text-xl font-bold">A Stronger Tomorrow</span>
        </div>
      </div>

      {/* 3. Floating Trust Badge (Bottom-Right, matching reference image) */}
      <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-10 z-20">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-lg border border-gray-100 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
            <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="text-sm sm:text-lg font-black text-brand-deepNavy leading-tight">
              {trustBadgeValue}
            </div>
            <div className="text-[9px] sm:text-xs font-semibold text-gray-500">
              {trustBadgeLabel}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Content Container: Centered at top on Mobile, Left-aligned on Desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-10 md:py-12 lg:py-16">
        <div className="max-w-xl lg:max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          
          {/* Eyebrow */}
          <div className="mb-2 sm:mb-2.5">
            <span className="inline-block text-[10.5px] sm:text-xs font-bold tracking-wider text-[#D97706] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[27px] sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-[#071A3D] leading-[1.18] sm:leading-[1.14] tracking-tight mb-2.5 sm:mb-3.5">
            {renderHeadline(headline)}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-[14px] lg:text-[15px] text-gray-700 leading-relaxed mb-4 sm:mb-6 max-w-sm sm:max-w-xl mx-auto md:mx-0 font-normal">
            {description}
          </p>

          {/* CTA Buttons: Side-by-Side 2 columns on mobile, row on desktop */}
          <div className="grid grid-cols-2 gap-2.5 max-w-[320px] sm:max-w-none mx-auto md:mx-0 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5 mb-4 sm:mb-6">
            <Link
              href={primaryCtaLink}
              className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#07152E] font-bold px-3 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-md shadow-xs transition-all text-xs sm:text-sm group"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#07152E] transition-transform duration-150 group-hover:translate-x-1" />
            </Link>

            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-[#07152E] font-bold px-3 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-md border border-gray-300 shadow-xs transition-all text-xs sm:text-sm group"
            >
              <span>{secondaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#07152E] transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust Badges: 3 circular badges with gold rings matching reference image */}
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-5 pt-1">
            {/* Badge 1: Expert Guidance */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#07152E] border border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-800 leading-tight text-left">
                Expert<br className="block sm:hidden" /> Guidance
              </div>
            </div>

            {/* Badge 2: Tailored Solutions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#07152E] border border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-800 leading-tight text-left">
                Tailored<br className="block sm:hidden" /> Solutions
              </div>
            </div>

            {/* Badge 3: Reliable Support */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#07152E] border border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-800 leading-tight text-left">
                Reliable<br className="block sm:hidden" /> Support
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

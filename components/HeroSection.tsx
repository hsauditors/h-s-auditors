import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowRight, Users, FileText, ShieldCheck, Award, Handshake } from 'lucide-react';
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
    <section className="relative w-full min-h-[730px] sm:min-h-[560px] md:min-h-[580px] lg:min-h-[620px] flex items-start md:items-center overflow-hidden border-b border-gray-200/80 bg-white">
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


      {/* 4. Content Container: Centered at top on Mobile, Left-aligned on Desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-6 md:py-12 lg:py-16">
        <div className="max-w-xl lg:max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          
          {/* Eyebrow: Exact mockup with gold line on left & right in mobile */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-2.5 mb-2 sm:mb-3">
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#F59E0B] block md:hidden" />
            <span className="text-[9.5px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest text-[#071A3D] md:text-[#D97706] uppercase">
              PREMIER ACCOUNTING &amp; TAX CONSULTANCY • INDIA
            </span>
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#F59E0B] block md:hidden" />
          </div>

          {/* Mobile Headline - Larger, impactful font matching user request */}
          <h1 className="md:hidden text-[26px] sm:text-[31px] font-black text-[#071A3D] leading-[1.15] tracking-tight mb-2.5 max-w-[350px] mx-auto text-center">
            Your Trusted Partner in<br />
            <span className="text-[#0066FF] text-[36px] sm:text-[42px] leading-tight block my-0.5 font-black">
              Financial Growth
            </span>
            <span>and Compliance</span>
          </h1>

          {/* Desktop Headline */}
          <h1 className="hidden md:block text-4xl lg:text-[42px] xl:text-[46px] font-black text-[#071A3D] leading-[1.14] tracking-tight mb-4 text-left">
            {renderHeadline(headline)}
          </h1>

          {/* Minimal Subtext on Mobile */}
          <p className="block md:hidden text-[13px] font-medium text-slate-700 leading-snug mb-4 max-w-[300px] mx-auto text-center">
            Expert accounting, taxation and compliance solutions for your business.
          </p>

          {/* Full Detailed Subtext on Desktop */}
          <p className="hidden md:block text-[14.5px] lg:text-[15px] font-normal text-slate-700 leading-relaxed mb-6 max-w-xl text-left">
            {description}
          </p>

          {/* CTA Buttons: Exact mockup rounded pills */}
          <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
            <Link
              href={primaryCtaLink}
              className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#07152E] font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-xs transition-all text-xs sm:text-sm whitespace-nowrap group"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#07152E] transition-transform duration-150 group-hover:translate-x-1" />
            </Link>

            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-[#07152E] font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-slate-300 shadow-xs transition-all text-xs sm:text-sm whitespace-nowrap group"
            >
              <span>{secondaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#07152E] transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Trust Badges - Exact 3 circular light-blue badges with dividers */}
          <div className="flex md:hidden items-center justify-center gap-1.5 sm:gap-2 px-1 py-1">
            {/* 1. Expert Guidance */}
            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-2xs">
                <Award className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-[#071A3D] leading-tight">
                Expert<br />Guidance
              </div>
            </div>

            <div className="w-[1px] h-6 bg-gray-200/90 mx-1" />

            {/* 2. Tailored Solutions */}
            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-2xs">
                <Handshake className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-[#071A3D] leading-tight">
                Tailored<br />Solutions
              </div>
            </div>

            <div className="w-[1px] h-6 bg-gray-200/90 mx-1" />

            {/* 3. Reliable Support */}
            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-[#071A3D] leading-tight">
                Reliable<br />Support
              </div>
            </div>
          </div>

          {/* Desktop Trust Badges */}
          <div className="hidden md:inline-flex items-center justify-start gap-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#07152E] border border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs font-semibold text-gray-800 leading-tight">
                Expert Guidance
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#07152E] border border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs font-semibold text-gray-800 leading-tight">
                Tailored Solutions
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#07152E] border border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs font-semibold text-gray-800 leading-tight">
                Reliable Support
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

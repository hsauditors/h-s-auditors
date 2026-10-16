import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck,
  Receipt,
  Calculator,
  BookOpen,
  Landmark,
  Award,
  ArrowRight,
  ShieldCheck,
  FileText,
  TrendingUp,
  BarChart2,
  Phone,
} from 'lucide-react';
import {
  getServices,
  getServicesBanner,
  getNavigationItems,
  getSiteSettings,
} from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { ServiceCategoryGrid } from '@/components/ServiceCategoryGrid';

export const metadata: Metadata = {
  title: 'Our Services | Professional Audit, Tax & Business Advisory',
  description:
    'Explore our comprehensive accounting, audit, GST compliance, income tax, and advisory services delivered by seasoned Chartered Accountants and corporate consultants.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function CategoryBadgeIcon({ iconName }: { iconName?: string }) {
  const norm = (iconName || '').toLowerCase().trim();

  if (norm.includes('receipt') || norm.includes('tax') || norm.includes('file')) {
    return <FileText className="w-5 h-5 text-[#2b2d54]" />;
  }
  if (norm.includes('trend') || norm.includes('chart') || norm.includes('advisory')) {
    return <TrendingUp className="w-5 h-5 text-[#2b2d54]" />;
  }
  if (norm.includes('calculator') || norm.includes('accounting') || norm.includes('book')) {
    return <Calculator className="w-5 h-5 text-[#2b2d54]" />;
  }
  if (norm.includes('shield') || norm.includes('check') || norm.includes('audit')) {
    return <ShieldCheck className="w-5 h-5 text-[#2b2d54]" />;
  }
  if (norm.includes('landmark') || norm.includes('roc') || norm.includes('business')) {
    return <Landmark className="w-5 h-5 text-[#2b2d54]" />;
  }

  return <DynamicIcon name={iconName || 'FileText'} className="w-5 h-5 text-[#2b2d54]" />;
}

export default async function ServicesPage() {
  const [categories, banner, navItems, settings] = await Promise.all([
    getServices(),
    getServicesBanner(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  const bannerEyebrow = banner.eyebrow || 'OUR SERVICES';
  const bannerHeadline = banner.headline || 'Accounting, Audit & Advisory Services';
  const bannerDesc =
    banner.description ||
    'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.';
  const bannerImg = banner.image_url || '/images/service-accounting.jpg';

  // Format headline with "Advisory" in antique gold
  const renderHeadline = () => {
    if (bannerHeadline.includes('Advisory')) {
      const parts = bannerHeadline.split('Advisory');
      return (
        <>
          {parts[0]}
          <span className="text-[#fcdd5e] font-bold">Advisory</span>
          {parts.slice(1).join('Advisory')}
        </>
      );
    }
    return bannerHeadline;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      <Navbar navItems={navItems} settings={settings} />

      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28 text-white">
        {/* Full-Width Background Image */}
        {bannerImg && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerImg}
              alt={bannerHeadline}
              className="w-full h-full object-cover object-center filter saturate-75 brightness-75"
            />
          </div>
        )}

        {/* Multi-layer Dark Obsidian Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1c1e38] via-[#2b2d54]/95 md:via-[#2b2d54]/90 to-[#2b2d54]/80" />
        <div className="absolute inset-0 z-0 bg-[#1c1e38]/40" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow in Antique Gold */}
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#fcdd5e] uppercase">
                {bannerEyebrow}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.16] mb-4">
              {renderHeadline()}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal max-w-2xl">
              {bannerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY-WISE SERVICES SECTIONS */}
      {/* ========================================================================= */}
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">
          {categories.map((category: any, catIdx: number) => {
            const subServices = category.sub_services || [];

            return (
              <section
                key={category.id || category.slug || catIdx}
                id={category.slug}
                className="scroll-mt-24"
              >
                {/* Category Header */}
                <div className="flex items-start gap-3.5 sm:gap-4 mb-6 sm:mb-7">
                  {/* Icon Badge or Image */}
                  {category.image_url ? (
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(43,45,84,0.08)] flex-shrink-0 mt-0.5 border border-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={category.image_url}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-white shadow-[0_2px_8px_rgba(43,45,84,0.08)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CategoryBadgeIcon iconName={category.icon} />
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2b2d54] tracking-tight leading-snug">
                      {category.title}
                    </h2>
                    {category.short_description && (
                      <p className="text-xs sm:text-[13px] text-slate-600 max-w-3xl leading-relaxed mt-1 font-normal">
                        {category.short_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub-Services Cards */}
                {subServices.length > 0 ? (
                  <ServiceCategoryGrid subServices={subServices} />
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center text-xs text-slate-400 shadow-xs">
                    Services for this category are being updated.
                  </div>
                )}
              </section>
            );
          })}

          {/* ========================================================================= */}
          {/* 3. BOTTOM CONSULTATION CTA BANNER */}
          {/* ========================================================================= */}
          <div className="bg-[#2b2d54] rounded-3xl p-7 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_12px_40px_rgba(43,45,84,0.18)]">
            {/* Subtle background glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#fcdd5e]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#fcdd5e] uppercase mb-2 block">
                CUSTOM FINANCIAL STRUCTURING
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Need a Tailored <span className="text-[#fcdd5e]">Compliance Package?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-2 font-normal">
                Our partners work directly with businesses to craft custom accounting, audit, and tax plans aligned with your volume and operational requirements.
              </p>
            </div>

            <div className="hidden md:block h-16 w-px bg-white/10 mx-2 flex-shrink-0 relative z-10" />

            <div className="relative z-10 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-[#fcdd5e] hover:bg-[#ebd04f] text-[#2b2d54] px-7 py-4 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group w-full sm:w-auto"
              >
                <span>Speak with a Partner</span>
                <ArrowRight className="w-4 h-4 text-[#2b2d54] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

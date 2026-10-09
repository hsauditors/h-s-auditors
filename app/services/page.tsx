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
    return <FileText className="w-5 h-5 text-[#2563EB]" />;
  }
  if (norm.includes('trend') || norm.includes('chart') || norm.includes('advisory')) {
    return <TrendingUp className="w-5 h-5 text-[#2563EB]" />;
  }
  if (norm.includes('calculator') || norm.includes('accounting') || norm.includes('book')) {
    return <Calculator className="w-5 h-5 text-[#2563EB]" />;
  }
  if (norm.includes('shield') || norm.includes('check') || norm.includes('audit')) {
    return <ShieldCheck className="w-5 h-5 text-[#2563EB]" />;
  }
  if (norm.includes('landmark') || norm.includes('roc') || norm.includes('business')) {
    return <Landmark className="w-5 h-5 text-[#2563EB]" />;
  }

  return <DynamicIcon name={iconName || 'FileText'} className="w-5 h-5 text-[#2563EB]" />;
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

  // Format headline with "Advisory" in light blue
  const renderHeadline = () => {
    if (bannerHeadline.includes('Advisory')) {
      const parts = bannerHeadline.split('Advisory');
      return (
        <>
          {parts[0]}
          <span className="text-[#60A5FA]">Advisory</span>
          {parts.slice(1).join('Advisory')}
        </>
      );
    }
    return bannerHeadline;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER (Full-Width Background Image with Navy Overlay) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28 text-white border-b border-blue-900/30">
        {/* Full-Width Background Image */}
        {bannerImg && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerImg}
              alt={bannerHeadline}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Multi-layer Dark Navy Overlays for Visual Balance & High Contrast Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#040E20] via-[#061530]/95 md:via-[#061530]/90 to-[#071939]/70" />
        <div className="absolute inset-0 z-0 bg-[#040E20]/45" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow in Gold with dash */}
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
                {bannerEyebrow}
              </span>
              <span className="w-8 h-[2px] bg-[#F59E0B] inline-block rounded-full" />
            </div>

            {/* Title with Serif font */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.16] mb-4">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {categories.map((category: any, catIdx: number) => {
            const subServices = category.sub_services || [];
            const isTwoCards = subServices.length === 2;

            return (
              <section
                key={category.id || category.slug || catIdx}
                id={category.slug}
                className="scroll-mt-24"
              >
                {/* Category Header (Circular Icon + Serif Title + Subtitle) */}
                <div className="flex items-start gap-3.5 sm:gap-4 mb-6 sm:mb-7">
                  {/* Circular Icon Badge */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EBF3FE] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5 border border-blue-100">
                    <CategoryBadgeIcon iconName={category.icon} />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B192C] tracking-tight leading-snug">
                      {category.title}
                    </h2>
                    {category.short_description && (
                      <p className="text-xs sm:text-[13px] text-gray-500 max-w-3xl leading-relaxed mt-1 font-normal">
                        {category.short_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub-Services Cards */}
                {subServices.length > 0 ? (
                  isTwoCards ? (
                    /* 2-Card Horizontal Layout (e.g. Accounting & Business Support) */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      {subServices.map((sub: any, subIdx: number) => {
                        const hasImage = Boolean(sub.image_url && sub.image_url.trim());

                        return (
                          <div
                            key={sub.id || subIdx}
                            className="bg-white rounded-xl border border-gray-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-blue-200 transition-all duration-200 overflow-hidden flex flex-col sm:flex-row group"
                          >
                            {/* Optional Left Image if added from admin */}
                            {hasImage && (
                              <div className="w-full sm:w-5/12 h-44 sm:h-auto relative overflow-hidden bg-slate-100 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={sub.image_url}
                                  alt={sub.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className={`w-full ${hasImage ? 'sm:w-7/12' : ''} p-5 flex flex-col justify-between flex-grow`}>
                              <div>
                                <h3 className="text-sm sm:text-base font-bold text-[#0B192C] group-hover:text-blue-600 transition-colors leading-snug mb-2">
                                  {sub.title}
                                </h3>
                                <p className="text-xs text-gray-500 leading-relaxed font-normal mb-4">
                                  {sub.description}
                                </p>
                              </div>

                              <Link
                                href={`/contact?subject=${encodeURIComponent(sub.title)}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#0B192C] transition-colors mt-auto w-fit"
                              >
                                <span>Learn More</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* 4-Column Responsive Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5.5">
                      {subServices.map((sub: any, subIdx: number) => {
                        const hasImage = Boolean(sub.image_url && sub.image_url.trim());

                        return (
                          <div
                            key={sub.id || subIdx}
                            className="bg-white rounded-xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                          >
                            {/* Card Top Image Header if added from admin */}
                            {hasImage && (
                              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={sub.image_url}
                                  alt={sub.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            {/* Card Body */}
                            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                              <div>
                                <h3 className="text-sm sm:text-[15px] font-bold text-[#0B192C] group-hover:text-blue-600 transition-colors leading-snug mb-2">
                                  {sub.title}
                                </h3>
                                <p className="text-xs text-gray-500 leading-relaxed font-normal mb-4 line-clamp-4">
                                  {sub.description}
                                </p>
                              </div>

                              <Link
                                href={`/contact?subject=${encodeURIComponent(sub.title)}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#0B192C] transition-colors mt-auto w-fit"
                              >
                                <span>Learn More</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  <div className="bg-white rounded-xl p-8 border border-gray-200 text-center text-xs text-gray-400">
                    Services for this category are being updated.
                  </div>
                )}
              </section>
            );
          })}

          {/* ========================================================================= */}
          {/* 3. BOTTOM CONSULTATION CTA BANNER */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-r from-[#EFF6FF] via-[#F4F8FF] to-white border border-[#DBEAFE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="relative z-10 max-w-xl">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#2563EB] uppercase mb-1 block">
                CUSTOM FINANCIAL STRUCTURING
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] tracking-tight">
                Need a Tailored <span className="text-[#2563EB]">Compliance Package?</span>
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed mt-1.5 font-normal">
                Our partners work directly with businesses to craft custom accounting, audit, and tax plans aligned with your volume and operational requirements.
              </p>
            </div>

            <div className="hidden md:block h-14 w-px bg-[#BFDBFE] mx-2 flex-shrink-0 relative z-10" />

            <div className="relative z-10 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-[#07152E] hover:bg-[#0E2A5C] text-white px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group w-full sm:w-auto"
              >
                <span>Speak with a Partner</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

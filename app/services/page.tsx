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
} from 'lucide-react';
import { getServices, getNavigationItems, getSiteSettings } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const metadata: Metadata = {
  title: 'Our Services | Professional Audit, Tax & Business Advisory',
  description:
    'Comprehensive statutory audit, GST compliance, income tax, accounting, and business advisory services organized by specialized practice areas.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function CategoryIcon({ iconName }: { iconName?: string }) {
  const norm = (iconName || '').toLowerCase().trim();

  if (norm.includes('check') || norm.includes('audit')) {
    return <FileCheck className="w-5 h-5 text-white" />;
  }
  if (norm.includes('receipt') || norm.includes('gst')) {
    return <Receipt className="w-5 h-5 text-white" />;
  }
  if (norm.includes('calculator') || norm.includes('tax') || norm.includes('coins')) {
    return <Calculator className="w-5 h-5 text-white" />;
  }
  if (norm.includes('book') || norm.includes('accounting') || norm.includes('payroll')) {
    return <BookOpen className="w-5 h-5 text-white" />;
  }
  if (norm.includes('landmark') || norm.includes('roc') || norm.includes('business')) {
    return <Landmark className="w-5 h-5 text-white" />;
  }
  if (norm.includes('award') || norm.includes('advisory')) {
    return <Award className="w-5 h-5 text-white" />;
  }
  if (norm.includes('shield')) {
    return <ShieldCheck className="w-5 h-5 text-white" />;
  }

  return <DynamicIcon name={iconName || 'FileText'} className="w-5 h-5 text-white" />;
}

export default async function ServicesPage() {
  const [categories, navItems, settings] = await Promise.all([
    getServices(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow relative overflow-hidden py-12 sm:py-16 lg:py-20">
        {/* Background Decorative Tech Waves & Dot Matrix */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <svg
            className="w-full h-full min-h-[900px] object-cover"
            viewBox="0 0 1440 850"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Top-Left Tech Node Connection */}
            <line
              x1="105"
              y1="0"
              x2="105"
              y2="185"
              stroke="#93C5FD"
              strokeWidth="1.2"
            />
            <circle cx="105" cy="185" r="4.5" fill="#2563EB" />

            {/* Tech Waves swooping across canvas */}
            <path
              d="M 0,25 C 160,85 240,240 105,185"
              stroke="#BFDBFE"
              strokeWidth="1.2"
            />
            <path
              d="M 105,185 C 0,195 -30,290 380,270 C 820,245 1120,110 1440,230"
              stroke="#93C5FD"
              strokeWidth="1.2"
            />
            <path
              d="M 125,0 C 230,170 540,430 1440,160"
              stroke="#BFDBFE"
              strokeWidth="1.1"
            />
            <path
              d="M 1080,440 C 1220,320 1340,240 1440,210"
              stroke="#BFDBFE"
              strokeWidth="1"
            />

            {/* 5x5 Dot Matrix Grid on Upper-Right */}
            <g transform="translate(1130, 65)" fill="#60A5FA" opacity="0.85">
              <circle cx="0" cy="0" r="2.2" />
              <circle cx="18" cy="0" r="2.2" />
              <circle cx="36" cy="0" r="2.2" />
              <circle cx="54" cy="0" r="2.2" />
              <circle cx="72" cy="0" r="2.2" />

              <circle cx="0" cy="18" r="2.2" />
              <circle cx="18" cy="18" r="2.2" />
              <circle cx="36" cy="18" r="2.2" />
              <circle cx="54" cy="18" r="2.2" />
              <circle cx="72" cy="18" r="2.2" />

              <circle cx="0" cy="36" r="2.2" />
              <circle cx="18" cy="36" r="2.2" />
              <circle cx="36" cy="36" r="2.2" />
              <circle cx="54" cy="36" r="2.2" />
              <circle cx="72" cy="36" r="2.2" />

              <circle cx="0" cy="54" r="2.2" />
              <circle cx="18" cy="54" r="2.2" />
              <circle cx="36" cy="54" r="2.2" />
              <circle cx="54" cy="54" r="2.2" />
              <circle cx="72" cy="54" r="2.2" />

              <circle cx="0" cy="72" r="2.2" />
              <circle cx="18" cy="72" r="2.2" />
              <circle cx="36" cy="72" r="2.2" />
              <circle cx="54" cy="72" r="2.2" />
              <circle cx="72" cy="72" r="2.2" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title Section */}
          <div className="mb-12 sm:mb-16 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
                PRACTICE AREAS &amp; CAPABILITIES
              </span>
              <span className="w-8 h-[2px] bg-[#F59E0B] inline-block rounded-full" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B192C] leading-tight">
              Accounting, Audit &amp;{' '}
              <span className="text-[#2563EB]">Advisory Services</span>
            </h1>

            <div className="w-12 h-1 bg-[#F59E0B] rounded-full my-4" />

            <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed">
              Explore our core domains below. Each vertical provides structured, regulatory-compliant execution tailored to enterprise operations and business goals.
            </p>
          </div>

          {/* Category-Wise Services Container */}
          <div className="space-y-12 sm:space-y-16">
            {categories.map((category: any, catIdx: number) => {
              const subServices = category.sub_services || [];

              return (
                <section
                  key={category.id || category.slug || catIdx}
                  id={category.slug}
                  className="scroll-mt-24"
                >
                  {/* Category Header (Icon + Heading + Subtitle) */}
                  <div className="flex items-start gap-3.5 sm:gap-4 mb-5 sm:mb-6">
                    {/* Small Dark Navy Square Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#07152E] flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                      <CategoryIcon iconName={category.icon} />
                    </div>

                    {/* Heading and Description */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B192C] tracking-tight leading-tight">
                        {category.title}
                      </h2>
                      {category.short_description && (
                        <p className="text-xs sm:text-[13px] text-[#64748B] max-w-3xl leading-relaxed mt-1 font-normal">
                          {category.short_description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sub-Cards 3-Column Grid (NO images, clean luxury cards) */}
                  {subServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {subServices.map((sub: any, subIdx: number) => (
                        <div
                          key={sub.id || subIdx}
                          className="bg-white rounded-2xl p-5 sm:p-5.5 border border-blue-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-cardHover hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
                        >
                          <div>
                            <h3 className="text-sm sm:text-[15px] font-bold text-[#0B192C] group-hover:text-[#2563EB] transition-colors duration-150 leading-snug mb-2">
                              {sub.title}
                            </h3>
                            <p className="text-xs text-[#64748B] leading-relaxed font-normal">
                              {sub.description}
                            </p>
                          </div>

                          <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-gray-400 group-hover:text-[#2563EB] transition-colors">
                              Sector Advisory
                            </span>
                            <Link
                              href={`/contact?subject=${encodeURIComponent(sub.title)}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:text-[#0B192C] transition-colors"
                            >
                              <span>Consult</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Fallback if category has no sub_services */
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center text-xs text-gray-400">
                      Sub-services for this category are being updated.
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Bottom Consultation Box */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-[#EFF6FF] via-[#F3F8FF] to-white border border-[#DBEAFE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
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

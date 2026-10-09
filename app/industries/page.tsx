import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Factory,
  Store,
  HardHat,
  HeartPulse,
  Truck,
  Settings as CogIcon,
  GraduationCap,
  Shirt,
} from 'lucide-react';
import { getIndustries, getNavigationItems, getSiteSettings } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Industry } from '@/types';

export const metadata: Metadata = {
  title: 'Industries We Work With | Sector-Specific Tax & Compliance Advisory',
  description:
    'Every industry has unique regulatory requirements. We deliver specialized accounting, audit, tax, and advisory services tailored to the operational needs of your sector.',
};

export const revalidate = 60;

// Helper to render accurate icons matching the screenshot
function IndustryCardIcon({ iconName }: { iconName: string }) {
  const norm = (iconName || '').toLowerCase().trim();

  if (norm.includes('factory') || norm.includes('manufacturing')) {
    return <Factory className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('store') || norm.includes('retail') || norm.includes('shop')) {
    return <Store className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('hardhat') || norm.includes('construction') || norm.includes('helmet')) {
    return <HardHat className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('heart') || norm.includes('health') || norm.includes('pulse')) {
    return <HeartPulse className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('hotel') || norm.includes('restaurant') || norm.includes('utensil') || norm.includes('food')) {
    // Exact fork & knife vector matching the screenshot
    return (
      <svg
        className="w-7 h-7 text-[#2563EB]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2v20M21 2c0 2.5-1.5 4-3 4M5 2v6a3 3 0 0 0 6 0V2M8 8v14" />
      </svg>
    );
  }
  if (norm.includes('truck') || norm.includes('transport') || norm.includes('logistics')) {
    return <Truck className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('gear') || norm.includes('cog') || norm.includes('software') || norm.includes('it') || norm.includes('settings')) {
    return <CogIcon className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('graduation') || norm.includes('education') || norm.includes('trust') || norm.includes('school')) {
    return <GraduationCap className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }
  if (norm.includes('shirt') || norm.includes('textile') || norm.includes('apparel')) {
    return <Shirt className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
  }

  // Fallback to dynamic icon
  return <DynamicIcon name={iconName} className="w-7 h-7 text-[#2563EB] stroke-[1.8]" />;
}

export default async function IndustriesPage() {
  const [industries, navItems, settings] = await Promise.all([
    getIndustries(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow relative overflow-hidden pb-16 sm:pb-24">
        {/* Top Hero Section with Graphic Accents */}
        <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">


          {/* Hero Content Left */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl">
              <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-[#2563EB] uppercase block mb-3">
                SECTOR EXPERTISE
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#0B192C] leading-[1.1] mb-4">
                Industries We{' '}
                <span className="text-[#1D4ED8] block">Work With</span>
              </h1>

              {/* Golden Yellow Accent Bar */}
              <div className="w-12 h-1 bg-[#F59E0B] rounded-full mt-4 mb-5" />

              <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed max-w-xl font-normal">
                Every industry has unique regulatory requirements. We deliver specialized
                accounting, audit, tax, and advisory services tailored to the operational
                needs of your sector.
              </p>
            </div>
          </div>
        </section>

        {/* 9 Industry Cards Grid */}
        <section className="relative z-10 mt-6 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {industries.map((ind: Industry, idx: number) => (
                <Link
                  key={ind.id || ind.slug || idx}
                  href={`/contact?subject=${encodeURIComponent(ind.title)}`}
                  id={ind.slug}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex items-start gap-3.5 sm:gap-4 group"
                >
                  {/* Left Circular Icon Badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-blue-100/70 transition-transform duration-200">
                    <IndustryCardIcon iconName={ind.icon_name || ind.title} />
                  </div>

                  {/* Middle Content */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h2 className="text-sm sm:text-[15px] font-bold text-[#0B192C] group-hover:text-[#2563EB] transition-colors duration-150 leading-snug mb-1.5">
                      {ind.title}
                    </h2>
                    <p className="text-xs text-[#64748B] leading-relaxed font-normal">
                      {ind.description}
                    </p>
                  </div>

                  {/* Right Circular Arrow Button */}
                  <div className="w-7 h-7 rounded-full border border-blue-200 text-[#2563EB] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all duration-200 self-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA Callout Box */}
            <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#EFF6FF] via-[#F3F8FF] to-white border border-[#DBEAFE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">


              {/* Left Content */}
              <div className="relative z-10 max-w-xl">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#2563EB] uppercase mb-1.5 block">
                  NEED SECTOR-SPECIFIC GUIDANCE?
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] tracking-tight">
                  Discuss Your <span className="text-[#2563EB]">Industry Needs</span>
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed mt-2 font-normal">
                  Our team regularly adapts to new industries, regulatory updates and specific
                  tax codes. Get a tailored solution for your business.
                </p>
              </div>

              {/* Center Divider Line */}
              <div className="hidden md:block h-14 w-px bg-[#BFDBFE] mx-2 flex-shrink-0 relative z-10" />

              {/* Right Button */}
              <div className="relative z-10 flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#07152E] hover:bg-[#0E2A5C] text-white px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>Talk to Our Experts</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
}

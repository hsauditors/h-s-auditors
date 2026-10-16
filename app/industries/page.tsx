import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Factory,
  Store,
  HardHat,
  Heart,
  Utensils,
  Truck,
  Laptop,
  GraduationCap,
  Scissors,
  Sprout,
  Users,
  Landmark,
} from 'lucide-react';
import { getNavigationItems, getSiteSettings, getIndustries } from '@/lib/data';
import { syncHomepageImages } from '@/lib/syncImages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Industries We Work With | Sector-Specific Tax & Compliance Advisory',
  description:
    'Every industry has unique regulatory requirements. We deliver specialised accounting, audit, tax, and advisory services tailored to the operational needs of your sector.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndustriesPage() {
  // Sync images to public directory
  syncHomepageImages();

  const [dbIndustries, navItems, settings] = await Promise.all([
    getIndustries(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  // Map icon component helper
  const getIconForTitle = (title: string) => {
    const norm = (title || '').toLowerCase();
    if (norm.includes('manufacturing')) return Factory;
    if (norm.includes('retail') || norm.includes('trading')) return Store;
    if (norm.includes('construction') || norm.includes('real estate')) return HardHat;
    if (norm.includes('health') || norm.includes('hospital')) return Heart;
    if (norm.includes('hotel') || norm.includes('restaurant')) return Utensils;
    if (norm.includes('logistics') || norm.includes('transport')) return Truck;
    if (norm.includes('it') || norm.includes('software')) return Laptop;
    if (norm.includes('education') || norm.includes('trust')) return GraduationCap;
    if (norm.includes('textile') || norm.includes('apparel')) return Scissors;
    if (norm.includes('agri') || norm.includes('commodity')) return Sprout;
    if (norm.includes('professional') || norm.includes('consultant')) return Users;
    if (norm.includes('nbfc') || norm.includes('society') || norm.includes('bank')) return Landmark;
    return Factory;
  };

  const industriesList = (dbIndustries || []).map((item) => ({
    id: item.id,
    title: item.title,
    description:
      item.description ||
      'Specialised accounting, tax, and advisory solutions for this sector.',
    icon: getIconForTitle(item.title),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow pb-16 sm:pb-24">
        {/* 1. Hero Banner Section with Exact Uploaded Image */}
        <section className="relative w-full min-h-[460px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-end sm:justify-center sm:items-center bg-white overflow-hidden">
          {/* Full-bleed background image with right alignment for executives & skyline */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Image
              src="/images/industries-hero-banner.png"
              alt="Industries We Work With"
              fill
              priority
              className="object-cover object-[95%_12%] sm:object-right w-full h-full"
              sizes="100vw"
            />
          </div>

          {/* Left Hero Content - placed at image bottom on mobile */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-6 sm:py-16">
            <div className="max-w-xl lg:max-w-2xl relative text-left">
              {/* Eyebrow with gold line */}
              <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
                <span className="text-[11px] sm:text-[13px] font-bold tracking-wider text-[#2b2d54]/80 uppercase">
                  SECTOR EXPERTISE
                </span>
              </div>

              {/* Headline - on same line */}
              <h1 className="text-[22px] xs:text-2xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#2b2d54] leading-tight mb-2 sm:mb-3">
                Industries We <span className="text-[#2b2d54]">Work With</span>
              </h1>

              {/* Gold Accent Bar */}
              <div className="w-10 sm:w-12 h-1 bg-[#fcdd5e] rounded-full my-2.5 sm:my-4" />

              {/* Subtitle */}
              <p className="text-xs sm:text-sm lg:text-[15px] text-gray-700 leading-relaxed max-w-lg font-medium">
                Every industry has unique regulatory requirements. We deliver
                specialised accounting, audit, tax, and advisory services tailored
                to the operational needs of your sector.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 12 Industries Grid (3 Columns on mobile to reduce space, 4 Columns on desktop) */}
        <section className="relative z-10 mt-8 sm:mt-12 lg:mt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
              {industriesList.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Link
                    key={ind.id}
                    href={`/contact?subject=${encodeURIComponent(ind.title)}`}
                    className="group bg-white rounded-xl sm:rounded-2xl p-2 sm:p-5 shadow-[0_2px_14px_rgba(43,45,84,0.05)] hover:shadow-xl transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 relative min-h-[92px] sm:min-h-0"
                  >
                    {/* Circular Icon Badge */}
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#fcdd5e]/25 flex items-center justify-center flex-shrink-0 text-[#2b2d54] group-hover:scale-105 group-hover:bg-[#2b2d54] group-hover:text-[#fcdd5e] transition-all duration-200 shadow-2xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.85]" />
                    </div>

                    {/* Middle Content */}
                    <div className="flex-1 min-w-0 pr-0 sm:pr-1">
                      <h2 className="text-[10.5px] sm:text-sm font-bold text-[#2b2d54] group-hover:text-[#2b2d54] transition-colors leading-tight sm:leading-snug mb-0 sm:mb-1">
                        {ind.title}
                      </h2>
                      <p className="hidden sm:block text-[11.5px] sm:text-xs text-gray-500 leading-snug font-normal line-clamp-2">
                        {ind.description}
                      </p>
                    </div>

                    {/* Right Circular Arrow Button (Desktop / Tablet only) */}
                    <div className="hidden sm:flex w-6 h-6 rounded-full bg-[#fcdd5e]/20 text-[#2b2d54] items-center justify-center flex-shrink-0 group-hover:bg-[#2b2d54] group-hover:text-[#fcdd5e] transition-all duration-200 self-center ml-auto">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 3. Bottom Callout Card */}
            <div className="mt-12 sm:mt-16 bg-[#2b2d54] rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_4px_24px_rgba(43,45,84,0.15)]">
              {/* Subtle background chart image on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block pointer-events-none overflow-hidden">
                <Image
                  src="/images/service-tax-gst.jpg"
                  alt="Sector Guidance"
                  fill
                  unoptimized
                  className="object-cover object-center opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2b2d54] via-transparent to-transparent" />
              </div>

              {/* Left Content */}
              <div className="relative z-10 max-w-xl">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#fcdd5e] uppercase mb-2 block">
                  NEED SECTOR SPECIFIC GUIDANCE?
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Discuss Your <span className="text-[#fcdd5e]">Industry Needs</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mt-2 font-normal">
                  Our team will help you with a tailored compliance, taxation and advisory
                  solution based on your industry and business goals.
                </p>
              </div>

              {/* Right Button */}
              <div className="relative z-10 flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#fcdd5e] hover:bg-[#ebd04f] text-[#2b2d54] px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>Talk to Our Experts</span>
                  <ArrowRight className="w-4 h-4 text-[#2b2d54] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

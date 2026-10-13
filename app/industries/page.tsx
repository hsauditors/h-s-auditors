import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
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

  // Local fallback copy if needed
  try {
    const brainDir =
      'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\d6957bc8-ff05-458e-aa67-4dfc9cea036f';
    const userUploadedDir = path.join(brainDir, '.user_uploaded');
    const industriesBannerSrc = path.join(
      userUploadedDir,
      'media_1791882780942.png'
    );
    const destDir = path.join(process.cwd(), 'public', 'images');
    if (fs.existsSync(industriesBannerSrc)) {
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(
        industriesBannerSrc,
        path.join(destDir, 'industries-hero-banner.png')
      );
      fs.copyFileSync(
        industriesBannerSrc,
        path.join(destDir, 'industries-hero-banner.jpg')
      );
    }
  } catch {
    // Graceful fallback
  }

  const [dbIndustries, navItems, settings] = await Promise.all([
    getIndustries(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  // Exact 12 industries matching reference image
  const defaultIndustries = [
    {
      id: 'manufacturing',
      title: 'Manufacturing & MSME',
      description:
        'Industry-specific support for compliance, taxation and MSME benefits.',
      icon: Factory,
    },
    {
      id: 'retail',
      title: 'Retail & Trading',
      description:
        'Practical solutions for inventory, GST and financial management.',
      icon: Store,
    },
    {
      id: 'construction',
      title: 'Construction & Real Estate',
      description:
        'Advisory for project accounting, GST and regulatory compliance.',
      icon: HardHat,
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Hospitals',
      description:
        'Comprehensive support for healthcare compliance, audits and taxation.',
      icon: Heart,
    },
    {
      id: 'hospitality',
      title: 'Hotels & Restaurants',
      description:
        'Guidance for GST, accounting and operational compliance.',
      icon: Utensils,
    },
    {
      id: 'logistics',
      title: 'Logistics & Transport',
      description:
        'Expertise in transport taxation, fleet management and regulatory requirements.',
      icon: Truck,
    },
    {
      id: 'it-services',
      title: 'IT & Software Exports',
      description:
        'Support for export benefits, international taxation and compliance.',
      icon: Laptop,
    },
    {
      id: 'education',
      title: 'Education & Trusts',
      description:
        'Accounting and compliance support for educational institutions and trusts.',
      icon: GraduationCap,
    },
    {
      id: 'textiles',
      title: 'Textiles & Apparel',
      description:
        'Solutions for manufacturing, export compliance and tax efficiency.',
      icon: Scissors,
    },
    {
      id: 'agriculture',
      title: 'Agriculture & Commodities',
      description:
        'Advisory for agri-businesses and commodity trading.',
      icon: Sprout,
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      description:
        'Tailored support for consultants, agencies and service providers.',
      icon: Users,
    },
    {
      id: 'nbfc',
      title: 'NBFC & Co-operative Societies',
      description:
        'Accounting, audit and regulatory support for financial institutions.',
      icon: Landmark,
    },
  ];

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

  const industriesList =
    dbIndustries && dbIndustries.length >= 12
      ? dbIndustries.map((item) => ({
          id: item.id,
          title: item.title,
          description:
            item.description ||
            'Specialised accounting, tax, and advisory solutions for this sector.',
          icon: getIconForTitle(item.title),
        }))
      : defaultIndustries;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow pb-16 sm:pb-24">
        {/* 1. Hero Banner Section with Exact Uploaded Image */}
        <section className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center border-b border-gray-200/80 bg-white overflow-hidden">
          {/* Full-bleed background image with right alignment for executives & skyline */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Image
              src="/images/industries-hero-banner.png"
              alt="Industries We Work With"
              fill
              priority
              className="object-cover object-right lg:object-center"
              sizes="100vw"
            />
            {/* Mobile gradient to guarantee text contrast on small screens */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-45% to-transparent sm:hidden pointer-events-none" />
          </div>

          {/* Left Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-xl lg:max-w-2xl">
              {/* Eyebrow with gold line */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#071A3D] uppercase">
                  SECTOR EXPERTISE
                </span>
                <span className="w-8 sm:w-10 h-[2px] bg-[#F59E0B]" />
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#071A3D] leading-[1.12] mb-3">
                Industries We{' '}
                <span className="text-[#1D4ED8] block">Work With</span>
              </h1>

              {/* Gold Accent Bar */}
              <div className="w-12 h-1 bg-[#F59E0B] rounded-full my-3 sm:my-4" />

              {/* Subtitle */}
              <p className="text-xs sm:text-sm lg:text-[15px] text-gray-600 leading-relaxed max-w-lg font-normal">
                Every industry has unique regulatory requirements. We deliver
                specialised accounting, audit, tax, and advisory services tailored
                to the operational needs of your sector.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 12 Industries Grid (4 Columns x 3 Rows) */}
        <section className="relative z-10 mt-10 sm:mt-12 lg:mt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {industriesList.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Link
                    key={ind.id}
                    href={`/contact?subject=${encodeURIComponent(ind.title)}`}
                    className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_2px_12px_rgba(7,26,61,0.03)] hover:shadow-md hover:border-blue-200 transition-all duration-200 flex items-start gap-3.5 relative"
                  >
                    {/* Left Circular Icon Badge */}
                    <div className="w-11 h-11 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[1.85]" />
                    </div>

                    {/* Middle Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h2 className="text-sm font-bold text-[#071A3D] group-hover:text-blue-600 transition-colors leading-snug mb-1">
                        {ind.title}
                      </h2>
                      <p className="text-[11.5px] sm:text-xs text-gray-500 leading-snug font-normal line-clamp-2">
                        {ind.description}
                      </p>
                    </div>

                    {/* Right Circular Arrow Button */}
                    <div className="w-6 h-6 rounded-full border border-blue-200 text-blue-500 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200 self-center ml-auto">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 3. Bottom Callout Card */}
            <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-50/90 via-[#F3F8FF] to-white border border-blue-100 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_4px_20px_rgba(7,26,61,0.03)]">
              {/* Subtle background chart image on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block pointer-events-none overflow-hidden">
                <Image
                  src="/images/service-tax-gst.jpg"
                  alt="Sector Guidance"
                  fill
                  unoptimized
                  className="object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F3F8FF] via-transparent to-transparent" />
              </div>

              {/* Left Content */}
              <div className="relative z-10 max-w-xl">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-blue-600 uppercase mb-2 block">
                  NEED SECTOR SPECIFIC GUIDANCE?
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071A3D] tracking-tight">
                  Discuss Your <span className="text-[#1D4ED8]">Industry Needs</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 font-normal">
                  Our team will help you with a tailored compliance, taxation and advisory
                  solution based on your industry and business goals.
                </p>
              </div>

              {/* Right Button */}
              <div className="relative z-10 flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>Talk to Our Experts</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform duration-200 group-hover:translate-x-1" />
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

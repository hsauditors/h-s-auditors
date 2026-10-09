import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  BarChart3,
  Users,
  Lock,
  Clock,
  FileText,
  BarChart2,
  Settings,
  FileCheck,
  Globe,
} from 'lucide-react';
import {
  getAboutContent,
  getAboutFeatures,
  getValues,
  getWhyChooseItems,
  getNavigationItems,
  getSiteSettings,
} from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | Premier Accounting & Tax Consultancy Firm',
  description:
    'Committed to clarity, accuracy, and personal attention for enterprises across India. Learn about H&S Auditors, our values and expertise.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const [about, features, values, whyChoose, navItems, settings] = await Promise.all([
    getAboutContent(),
    getAboutFeatures(),
    getValues(),
    getWhyChooseItems(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  const officeImage = about?.image_url || '/images/about-office.jpg';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header / Navbar */}
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow">
        {/* 2. Hero Banner: Dark Navy with Architectural Skyscraper Facade & Wave Curves */}
        <section className="relative w-full bg-[#07152D] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-brand-border/20">
          {/* Subtle architectural glass & deep blue wave background graphics */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Ambient blue glow */}
            <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-25 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/40 via-transparent to-transparent pointer-events-none" />

            {/* Architectural glass skyscraper facade geometry on right */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 hidden md:block opacity-30 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 600 500" fill="none">
                <defs>
                  <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#1E40AF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#07152D" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path d="M150,0 L600,0 L600,500 L320,500 Z" fill="url(#glassGrad)" />
                <line x1="220" y1="0" x2="380" y2="500" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="310" y1="0" x2="470" y2="500" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.5" />
                <line x1="410" y1="0" x2="570" y2="500" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="160" y1="110" x2="600" y2="90" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.35" />
                <line x1="200" y1="230" x2="600" y2="200" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.35" />
                <line x1="250" y1="350" x2="600" y2="320" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.35" />
              </svg>
            </div>

            {/* Smooth deep blue curves on left */}
            <svg
              className="absolute -left-16 bottom-0 h-full w-[540px] text-blue-500/10 pointer-events-none"
              viewBox="0 0 540 500"
              fill="none"
            >
              <path
                d="M-40,80 C120,180 80,420 360,480 C440,500 500,440 540,480"
                stroke="currentColor"
                strokeWidth="45"
                strokeLinecap="round"
              />
              <path
                d="M-80,220 C80,300 160,390 420,440"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Heading and Description */}
              <div className="lg:col-span-7">
                <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#F59E0B] uppercase block mb-3">
                  ABOUT OUR FIRM
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.15] text-white mb-4">
                  Premier Accounting &amp;{' '}
                  <span className="text-[#38BDF8] block">Tax Consultancy</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg font-normal">
                  Committed to clarity, accuracy, and personal attention for enterprises across India.
                </p>
              </div>

              {/* Right Column: 3 Glassmorphism Feature Badges */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 max-w-md lg:ml-auto w-full">
                {/* 1. Trusted Expertise */}
                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">Trusted Expertise</h3>
                    <p className="text-xs text-blue-200/75 mt-0.5">Professional and reliable</p>
                  </div>
                </div>

                {/* 2. Client Focused */}
                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">Client Focused</h3>
                    <p className="text-xs text-blue-200/75 mt-0.5">Tailored financial solutions</p>
                  </div>
                </div>

                {/* 3. Long-Term Partnership */}
                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">Long-Term Partnership</h3>
                    <p className="text-xs text-blue-200/75 mt-0.5">Your growth is our priority</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. "WHO WE ARE" Section: Office Image + 10+ Years Floating Stat + Story + 6 Checkmarks */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Reception Office Photo with Floating 10+ Years Stat Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/3.4] rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-gray-100">
                  <Image
                    src={officeImage}
                    alt={about?.image_alt || 'H&S Auditors Corporate Reception'}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

                {/* Floating Stat Badge in bottom-left */}
                <div className="absolute -bottom-4 left-4 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-xl border border-gray-200/80 max-w-[210px]">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] leading-none mb-1">
                    10+
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-gray-700 leading-snug">
                    Years of Professional Excellence
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative Story, 2-Column Checklist & CTA Button */}
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase block mb-2">
                  WHO WE ARE
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B192C] tracking-tight leading-tight mb-4">
                  Your Reliable Partner in{' '}
                  <span className="text-blue-600 block">Financial Growth &amp; Compliance</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                  {about?.paragraph_1 ||
                    'H&S Auditors is a premier Accounting & Tax consultancy firm. Our team of seasoned professionals brings together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration.'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {about?.paragraph_2 ||
                    'We believe every business deserves financial clarity without compromise. Our commitment to integrity, confidentiality, and timely delivery has made us the preferred partner for businesses across India.'}
                </p>

                {/* 6 Core Capabilities in 2-Column Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-7">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                      GST registration, returns &amp; compliance
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                      Income tax planning, filing and advisory
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                      Statutory, internal and special audits
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                      Business registration &amp; compliance
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                      Payroll, TDS and incentive management
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                      Company &amp; LLP compliance with ROC
                    </span>
                  </div>
                </div>

                {/* Dark Navy CTA Button */}
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#0A1931] hover:bg-[#071324] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all group w-full sm:w-auto"
                  >
                    <span>Connect With Our Team</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. "Integrity · Confidentiality · Timely Delivery" Values Section */}
        <section className="w-full bg-[#F0F6FF] py-16 sm:py-20 border-b border-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] text-center tracking-tight mb-10 sm:mb-12">
              Integrity · Confidentiality · Timely Delivery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Integrity */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B192C] mb-2">Integrity</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  We uphold the highest ethical standards in everything we do.
                </p>
              </div>

              {/* Confidentiality */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B192C] mb-2">Confidentiality</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Your information is always secure with us.
                </p>
              </div>

              {/* Timely Delivery */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B192C] mb-2">Timely Delivery</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  We value your time and ensure on-time solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. "WHY CHOOSE H&S" Section */}
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column */}
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase mb-2 block">
                  WHY CHOOSE H&amp;S
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B192C] tracking-tight leading-tight mb-4">
                  Built on Precision.{' '}
                  <span className="text-blue-600 block">Trusted by Hundreds.</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                  We deliver more than just compliance — we deliver peace of mind. Our commitment to accuracy, professional integrity and client-first approach make us a trusted partner for businesses of all sizes.
                </p>
              </div>

              {/* Right Column: 2x3 Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* 1. End-to-end financial compliance */}
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    End-to-end financial compliance support
                  </span>
                </div>

                {/* 2. Real-time financial insights */}
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    Real-time financial insights and reporting
                  </span>
                </div>

                {/* 3. Proactive tax planning */}
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    Proactive tax planning for your business
                  </span>
                </div>

                {/* 4. Personalised advisory */}
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    Personalised advisory by industry experts
                  </span>
                </div>

                {/* 5. Transparent and hassle-free */}
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    Transparent and hassle-free processes
                  </span>
                </div>

                {/* 6. Multi-industry experience */}
                <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    Multi-industry experience across India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA Banner: "Need a tailored financial or tax solution?" */}
        <section className="w-full bg-[#06142A] text-white py-16 sm:py-20 relative overflow-hidden">
          {/* Subtle blue wave background graphic */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
              <path
                d="M0,160 C320,300 420,0 720,160 C1020,320 1120,60 1440,160 L1440,320 L0,320 Z"
                fill="#1E40AF"
              />
              <path
                d="M0,96 C240,224 480,32 720,128 C960,224 1200,64 1440,96"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Need a tailored financial or tax solution?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
              Our certified consultants will understand your business needs and provide a customised solution that ensures compliance and long term growth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B192C] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md transition-all group w-full sm:w-auto"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#0B192C] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <Footer settings={settings} />
    </div>
  );
}

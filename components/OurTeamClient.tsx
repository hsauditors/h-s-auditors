'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  Mail,
  Users,
  Layers,
  Target,
  GraduationCap,
  Lock,
  Star,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface PracticeArea {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  icon: 'audit' | 'tax' | 'gst' | 'accounting' | 'compliance' | 'business';
}

const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: '1',
    number: '01',
    title: 'Audit & Assurance',
    description: 'Statutory, tax and referral audits with detailed review and reporting.',
    category: 'Audit & Assurance',
    slug: 'audit-assurance',
    icon: 'audit',
  },
  {
    id: '2',
    number: '02',
    title: 'Direct Taxation',
    description: 'Individual and corporate tax filing, planning and TDS compliance.',
    category: 'Direct Taxation',
    slug: 'direct-taxation',
    icon: 'tax',
  },
  {
    id: '3',
    number: '03',
    title: 'GST & Indirect Taxation',
    description: 'Registrations, monthly/annual returns and advisory support.',
    category: 'GST & Indirect Taxation',
    slug: 'gst-compliance',
    icon: 'gst',
  },
  {
    id: '4',
    number: '04',
    title: 'Accounting & Payroll',
    description: 'Bookkeeping, MIS, payroll and year-end finalisation.',
    category: 'Accounting & Payroll',
    slug: 'accounting-payroll',
    icon: 'accounting',
  },
  {
    id: '5',
    number: '05',
    title: 'Corporate Compliance',
    description: 'ROC filings, statutory registers and governance support.',
    category: 'Corporate Compliance',
    slug: 'corporate-compliance',
    icon: 'compliance',
  },
  {
    id: '6',
    number: '06',
    title: 'Business Set-up & Registration',
    description: 'Company & LLP incorporation, PAN, TAN, GST and import/export code.',
    category: 'Business Setup',
    slug: 'business-setup-roc',
    icon: 'business',
  },
];

const FILTER_TABS = [
  'All Teams',
  'Audit & Assurance',
  'Direct Taxation',
  'GST & Indirect Taxation',
  'Accounting & Payroll',
  'Corporate Compliance',
  'Business Setup',
];

function AreaIcon({ type }: { type: PracticeArea['icon'] }) {
  switch (type) {
    case 'audit':
      return (
        <svg
          className="w-6 h-6 text-[#2563EB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx="11.5" cy="14.5" r="2.5" />
          <path d="m13.5 16.5 2 2" strokeLinecap="round" />
        </svg>
      );
    case 'tax':
      return (
        <svg
          className="w-6 h-6 text-[#2563EB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    case 'gst':
      return (
        <svg
          className="w-6 h-6 text-[#2563EB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <text
            x="5.5"
            y="16.5"
            fontSize="6.5"
            fontWeight="bold"
            fill="currentColor"
            stroke="none"
          >
            GST
          </text>
        </svg>
      );
    case 'accounting':
      return (
        <svg
          className="w-6 h-6 text-[#2563EB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="4" y="2" width="16" height="20" rx="3" />
          <line x1="8" y1="6" x2="16" y2="6" strokeLinecap="round" />
          <circle cx="8" cy="11" r="1" fill="currentColor" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="16" cy="11" r="1" fill="currentColor" />
          <circle cx="8" cy="14.5" r="1" fill="currentColor" />
          <circle cx="12" cy="14.5" r="1" fill="currentColor" />
          <circle cx="16" cy="14.5" r="1" fill="currentColor" />
          <circle cx="8" cy="18" r="1" fill="currentColor" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
          <circle cx="16" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case 'compliance':
      return (
        <svg
          className="w-6 h-6 text-[#2563EB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'business':
      return (
        <svg
          className="w-6 h-6 text-[#2563EB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
  }
}

export function OurTeamClient({ settings }: { settings: SiteSettings | null }) {
  const [activeTab, setActiveTab] = useState('All Teams');

  const phone = settings?.phone || '+91 97461 35644';
  const email = settings?.email || 'info@hsauditors.com';

  const displayedAreas =
    activeTab === 'All Teams'
      ? PRACTICE_AREAS
      : PRACTICE_AREAS.filter((area) => area.category === activeTab);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Full-Width Hero Section matching the Screenshot */}
      <section className="relative w-full bg-white overflow-hidden border-b border-gray-100 min-h-[500px] lg:min-h-[540px] flex flex-col justify-between">
        {/* Background Team Office Photo positioned to show characters clearly on mobile and desktop */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[68%] pointer-events-none select-none z-0">
          <Image
            src="/images/H&S ourteam page.png"
            alt="The team behind your compliance - H&S Auditors"
            fill
            priority
            unoptimized
            className="object-cover object-[72%_center] sm:object-[65%_center] lg:object-right"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />
          {/* Seamless gradient fade overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 sm:via-white/70 lg:via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent sm:hidden" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 w-full flex-grow flex flex-col justify-between">
          
          {/* Top Text & Stats */}
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow with gold accent bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
                OUR PEOPLE
              </span>
              <span className="w-8 h-[2px] bg-[#F59E0B] rounded-full inline-block" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#0B192C] leading-[1.12] tracking-tight">
              The team behind
              <br />
              your <span className="text-[#E88B12]">compliance</span>
            </h1>

            {/* Subtitle Description */}
            <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-gray-600 leading-relaxed max-w-xl font-normal">
              Every engagement at H&amp;S Auditors is led by a qualified chartered accountant and supported by specialists in taxation, audit and corporate law.
            </p>

            {/* 3 Stats Row with Vertical Dividers */}
            <div className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-8 pt-1">
              {/* Stat 1: 15+ Team Members */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0B192C] tracking-tight leading-none">
                    15+
                  </span>
                  <Users className="w-5 h-5 text-[#2563EB] stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-gray-500 mt-1">
                  Team Members
                </span>
              </div>

              <div className="h-9 w-[1px] bg-slate-200" />

              {/* Stat 2: 6 Practice Areas */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0B192C] tracking-tight leading-none">
                    6
                  </span>
                  <Layers className="w-5 h-5 text-[#2563EB] stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-gray-500 mt-1">
                  Practice Areas
                </span>
              </div>

              <div className="h-9 w-[1px] bg-slate-200" />

              {/* Stat 3: 100% Client Focused */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0B192C] tracking-tight leading-none">
                    100%
                  </span>
                  <Target className="w-5 h-5 text-[#F59E0B] stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-gray-500 mt-1">
                  Client Focused
                </span>
              </div>
            </div>
          </div>

          {/* Full Width Filter Tabs / Pill Bar */}
          {/* On Desktop: Spans wide so all 7 tabs fit on 1 single line with no scrollbar */}
          {/* On Mobile: Smoothly slidable with horizontal touch scrolling and hidden scrollbar */}
          <div className="mt-8 lg:mt-12 w-full overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-md flex-nowrap">
              {FILTER_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'text-gray-700 hover:text-[#0B192C] hover:bg-slate-100/80'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Practice Leadership Section & Grid */}
      <section className="bg-[#F8FAFC] py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="mb-8 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase block mb-1.5">
              PRACTICE LEADERSHIP
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C] tracking-tight">
              Expertise across key practice areas
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
              Our practice is organised around specialised teams, each led by a partner or manager with deep expertise. You&apos;ll work with a qualified chartered accountant who reviews and signs every deliverable.
            </p>
          </div>

          {/* 6 Practice Area Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {displayedAreas.map((area) => (
              <Link
                key={area.id}
                href={`/services/${area.slug}`}
                className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-blue-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center transition-transform group-hover:scale-105">
                      <AreaIcon type={area.icon} />
                    </div>
                    <span className="text-[#F59E0B] font-bold text-base tracking-wide font-sans">
                      {area.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B192C] mt-5 mb-2 group-hover:text-[#2563EB] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Why Work With Our Team? 4 Pillars */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] tracking-tight">
                Why work with our team?
              </h3>
              <div className="w-12 h-1 bg-[#F59E0B] rounded-full mt-3 mb-8 sm:mb-10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
              {/* Pillar 1 */}
              <div className="text-center px-3 pt-4 sm:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-3.5 shadow-xs">
                  <Users className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1">
                  Qualified Oversight
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Every report is reviewed by a qualified chartered accountant.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="text-center px-3 pt-6 sm:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-3.5 shadow-xs">
                  <GraduationCap className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1">
                  Continuous Training
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Our team stays updated on the latest laws and regulations.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="text-center px-3 pt-6 sm:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-3.5 shadow-xs">
                  <Lock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1">
                  Strict Confidentiality
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Your information is handled with the highest security.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="text-center px-3 pt-6 sm:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-3.5 shadow-xs">
                  <Star className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1">
                  Client-Focused
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Committed to practical solutions and long-term growth.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA Card: Want to work with our team? */}
          <div className="mt-14 sm:mt-18 bg-[#07152E] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden border border-slate-800 shadow-xl">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
                    JOIN OUR TEAM
                  </span>
                  <span className="w-6 h-[2px] bg-[#F59E0B] inline-block rounded-full" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Want to work with{' '}
                  <span className="text-[#3B82F6]">our team?</span>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed">
                  Reach out for an introductory consultation. We&apos;ll be happy to discuss how our expertise can support your business.
                </p>
              </div>

              {/* 3 Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="bg-white hover:bg-slate-100 text-[#07152E] font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#F59E0B] fill-current" />
                  <span>Call us</span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl transition-all border border-white/20 inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Email us</span>
                </a>

                <Link
                  href="/careers"
                  className="bg-[#F59E0B] hover:bg-[#D97706] text-[#07152E] font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-2 group"
                >
                  <span>Careers</span>
                  <ArrowRight className="w-4 h-4 text-[#07152E] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  Mail,
  Users,
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
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 sm:pb-28">
      {/* Hero Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2.5 mb-3">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
            OUR PEOPLE
          </span>
          <span className="w-8 h-[2px] bg-[#F59E0B] inline-block rounded-full" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#0B192C] leading-[1.15] tracking-tight">
          The team behind
          <br />
          your <span className="text-[#2563EB]">compliance</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
          Every engagement at H&amp;S Auditors is led by a qualified chartered accountant and supported by specialists in taxation, audit and corporate law.
        </p>

        {/* Stats Row */}
        <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-12 pt-2">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] tracking-tight">
              15+
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
              Team Members
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-200 hidden xs:block" />

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] tracking-tight">
              6
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
              Practice Areas
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-200 hidden xs:block" />

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
              Client Focused
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs / Pills Bar */}
      <div className="mt-12 sm:mt-14 mb-12 sm:mb-14 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 border border-slate-200 shadow-xs backdrop-blur-sm">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#07152E] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-slate-100/70'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice Leadership Heading & Subtitle */}
      <div className="mb-8">
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase block mb-1.5">
          PRACTICE LEADERSHIP
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] tracking-tight">
          Expertise across key
          <br className="hidden sm:inline" /> practice areas
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
          Our practice is organised around specialised teams, each led by a partner or manager with deep expertise. You&apos;ll work with a qualified chartered accountant who reviews and signs every deliverable.
        </p>
      </div>

      {/* 6 Practice Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {displayedAreas.map((area) => (
          <Link
            key={area.id}
            href={`/services/${area.slug}`}
            className="group bg-white rounded-3xl p-7 border border-blue-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-cardHover hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
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
              <div className="w-9 h-9 rounded-full border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all shadow-2xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Why Work With Our Team? Section */}
      <div className="mt-20 sm:mt-24 pt-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] tracking-tight">
            Why work with our team?
          </h2>
          <div className="w-12 h-1 bg-[#F59E0B] rounded-full mt-3 mb-10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
          {/* Pillar 1 */}
          <div className="text-center px-4 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-4 shadow-2xs">
              <Users className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1.5">
              Qualified Oversight
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Every report is reviewed by a qualified chartered accountant.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="text-center px-4 pt-6 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-4 shadow-2xs">
              <GraduationCap className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1.5">
              Continuous Training
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Our team stays updated on the latest laws and regulations.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="text-center px-4 pt-6 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-4 shadow-2xs">
              <Lock className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1.5">
              Strict Confidentiality
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Your information is handled with the highest security.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="text-center px-4 pt-6 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-4 shadow-2xs">
              <Star className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h4 className="font-bold text-[#0B192C] text-sm sm:text-base mb-1.5">
              Client-Focused
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Committed to practical solutions and long-term growth.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner: "Want to work with our team?" */}
      <div className="mt-16 sm:mt-20 bg-[#07152E] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        {/* Decorative background vectors inside CTA */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1000 300"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,200 C 300,100 600,280 1000,120"
              stroke="#60A5FA"
              strokeWidth="1.5"
            />
            <path
              d="M 200,300 C 500,180 800,240 1000,200"
              stroke="#93C5FD"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* 5x5 subtle dot matrix inside CTA bottom right */}
        <div className="absolute right-10 bottom-6 pointer-events-none select-none opacity-25 hidden sm:block">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="#60A5FA">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={c * 16} cy={r * 16} r="2" />
              ))
            )}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
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
              className="bg-white hover:bg-slate-100 text-[#07152E] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F59E0B] fill-current" />
              <span>Call us</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all border border-white/20 inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Email us</span>
            </a>

            <Link
              href="/careers"
              className="bg-[#F59E0B] hover:bg-[#D97706] text-[#07152E] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2 group"
            >
              <span>Careers</span>
              <ArrowRight className="w-4 h-4 text-[#07152E] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

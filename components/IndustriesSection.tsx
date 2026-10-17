'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
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
  Briefcase,
  Landmark,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Industry } from '@/types';

interface IndustriesSectionProps {
  industries?: Industry[];
}

function getIconForIndustry(title: string) {
  const norm = (title || '').toLowerCase();
  if (norm.includes('manufacturing')) return Factory;
  if (norm.includes('retail') || norm.includes('trading')) return Store;
  if (norm.includes('construction') || norm.includes('real estate')) return HardHat;
  if (norm.includes('health') || norm.includes('hospital')) return Heart;
  if (norm.includes('hotel') || norm.includes('restaurant') || norm.includes('hospitality')) return Utensils;
  if (norm.includes('logistics') || norm.includes('transport')) return Truck;
  if (norm.includes('it') || norm.includes('software')) return Laptop;
  if (norm.includes('education') || norm.includes('trust')) return GraduationCap;
  if (norm.includes('textile') || norm.includes('apparel')) return Scissors;
  if (norm.includes('agri') || norm.includes('commodity')) return Sprout;
  if (norm.includes('professional') || norm.includes('consultant')) return Briefcase;
  if (norm.includes('nbfc') || norm.includes('society') || norm.includes('bank')) return Landmark;
  return Factory;
}

export function IndustriesSection({ industries = [] }: IndustriesSectionProps) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const activeIndustries = (industries || []).filter((ind) => ind.is_active !== false);

  if (activeIndustries.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FFFFFF] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Header Column: Eyebrow, Heading, Description & CTA */}
          <div data-animate="slide-left" className="lg:col-span-4 lg:pr-4">
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2b2d54]/80">
                SECTORS WE ADVISE
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#2b2d54] tracking-tight leading-[1.18] mb-3 sm:mb-4">
              Domain expertise across <span className="text-[#2b2d54]">industries</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5 sm:mb-7">
              We work with enterprises across key economic sectors, providing tailored statutory compliance, tax advisory, and strategic financial management.
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 bg-[#2b2d54] hover:bg-[#222443] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-colors group"
              >
                <span>View All Sectors</span>
                <ArrowRight className="w-4 h-4 text-[#fcdd5e] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Cards Grid: Dynamic database records */}
          <div className="lg:col-span-8 flex flex-col">
            <div data-animate="stagger-cards" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              {activeIndustries.map((ind, index) => {
                const Icon = getIconForIndustry(ind.title);
                const isHiddenOnMobile = !showAllMobile && index >= 6;

                return (
                  <Link
                    key={ind.id || ind.slug}
                    href={`/industries#${ind.slug}`}
                    data-animate-child
                    className={`group items-center justify-start sm:justify-between text-center sm:text-left gap-1.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FAF9F6] hover:bg-white transition-all duration-300 shadow-[0_2px_10px_rgba(43,45,84,0.04)] hover:shadow-lg hover:-translate-y-1 min-h-[92px] sm:min-h-[64px] ${
                      isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                    } flex-col sm:flex-row`}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 min-w-0">
                      {/* Icon Badge */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fcdd5e]/25 flex items-center justify-center flex-shrink-0 text-[#2b2d54] group-hover:bg-[#2b2d54] group-hover:text-[#fcdd5e] transition-all duration-200">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.85]" />
                      </div>

                      {/* Title */}
                      <span className="text-[11px] sm:text-[13px] md:text-sm font-semibold text-[#2b2d54] group-hover:text-[#2b2d54] transition-colors leading-tight sm:leading-snug line-clamp-2">
                        {ind.title}
                      </span>
                    </div>

                    {/* Right Arrow Button (Desktop / Tablet only) */}
                    <div className="hidden sm:flex w-6 h-6 rounded-full bg-stone-100 group-hover:bg-[#2b2d54] items-center justify-center text-slate-400 group-hover:text-[#fcdd5e] transition-all duration-200 flex-shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile-Only "View More / View Less" Button Centered */}
            {activeIndustries.length > 6 && (
              <div className="sm:hidden flex justify-center mt-5">
                <button
                  type="button"
                  onClick={() => setShowAllMobile((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2b2d54] hover:opacity-80 bg-[#FAF9F6] hover:bg-[#F4EFE6] px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>{showAllMobile ? 'View Less' : 'View More'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#2b2d54] transition-transform duration-200 ${
                      showAllMobile ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
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
} from 'lucide-react';
import { Industry } from '@/types';

interface IndustriesSectionProps {
  industries?: Industry[];
}

export function IndustriesSection({ industries }: IndustriesSectionProps) {
  // 12 industries matching sector advisory
  const industryList = [
    {
      id: 'manufacturing',
      title: 'Manufacturing & MSME',
      slug: 'manufacturing',
      icon: Factory,
    },
    {
      id: 'retail',
      title: 'Retail & Trading',
      slug: 'retail',
      icon: Store,
    },
    {
      id: 'construction',
      title: 'Construction & Real Estate',
      slug: 'construction',
      icon: HardHat,
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Hospitals',
      slug: 'healthcare',
      icon: Heart,
    },
    {
      id: 'hospitality',
      title: 'Hospitality',
      slug: 'hospitality',
      icon: Utensils,
    },
    {
      id: 'logistics',
      title: 'Logistics & Transport',
      slug: 'logistics',
      icon: Truck,
    },
    {
      id: 'it-services',
      title: 'IT & Software Exports',
      slug: 'it-services',
      icon: Laptop,
    },
    {
      id: 'education',
      title: 'Education & Trusts',
      slug: 'education',
      icon: GraduationCap,
    },
    {
      id: 'textiles',
      title: 'Textiles & Apparel',
      slug: 'textiles',
      icon: Scissors,
    },
    {
      id: 'agriculture',
      title: 'Agriculture & Commodities',
      slug: 'agriculture',
      icon: Sprout,
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      slug: 'professional-services',
      icon: Briefcase,
    },
    {
      id: 'nbfc',
      title: 'NBFC & Co-operative Societies',
      slug: 'nbfc',
      icon: Landmark,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F8FAFC] to-white py-12 sm:py-16 lg:py-20 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Header Column: Eyebrow, Heading, Description & CTA */}
          <div className="lg:col-span-4 lg:pr-4">
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706]">
                INDUSTRIES WE SERVE
              </span>
              <span className="w-8 sm:w-10 h-[2px] bg-[#D97706]" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071A3D] font-serif tracking-tight leading-[1.18] mb-3 sm:mb-4">
              Expertise across <span className="text-[#1D4ED8]">industries</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              We work with businesses across diverse sectors, offering
              industry-specific insights, regulatory compliance, and practical financial solutions.
            </p>

            {/* CTA Button */}
            <div className="mt-5 sm:mt-7">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <span>View All Industries</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Cards Grid: 3 columns on mobile, 2 columns on tablet/desktop */}
          <div className="lg:col-span-8 grid grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-3.5">
            {industryList.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.id}
                  href={`/industries#${ind.slug}`}
                  className="group flex flex-col sm:flex-row items-center justify-start sm:justify-between text-center sm:text-left gap-1.5 sm:gap-3 px-1.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-blue-50/50 border border-gray-200/70 hover:border-blue-300 transition-all duration-200 shadow-[0_2px_8px_rgba(7,26,61,0.03)] hover:shadow-md hover:-translate-y-0.5 min-h-[92px] sm:min-h-[62px]"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 min-w-0">
                    {/* Icon Badge */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200 shadow-2xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.85]" />
                    </div>

                    {/* Title */}
                    <span className="text-[10.5px] sm:text-[13px] md:text-sm font-bold text-[#071A3D] group-hover:text-blue-600 transition-colors leading-tight sm:leading-snug sm:truncate">
                      {ind.title}
                    </span>
                  </div>

                  {/* Subtle Right Arrow (tablet/desktop only) */}
                  <div className="hidden sm:flex w-6 h-6 rounded-full border border-gray-100 bg-gray-50/80 group-hover:bg-blue-100/60 group-hover:border-blue-200 items-center justify-center text-gray-400 group-hover:text-blue-600 transition-all duration-200 flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

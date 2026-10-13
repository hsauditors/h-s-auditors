import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AboutContent, AboutFeature } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface AboutSectionProps {
  about: AboutContent | null;
  features: AboutFeature[];
}

export function AboutSection({ about, features }: AboutSectionProps) {
  const eyebrow = about?.eyebrow || 'ABOUT THE FIRM';
  const heading = about?.heading || 'Premier Accounting & Tax Consultancy';
  const paragraph1 =
    about?.paragraph_1 ||
    'H&S Auditors is a premier Accounting & Tax consultancy firm. Our team of seasoned specialists brings together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration.';
  const paragraph2 =
    about?.paragraph_2 ||
    'We believe every business deserves financial clarity without compromise. Our commitment to integrity, confidentiality, and timely delivery has made us the preferred partner for businesses across India.';
  const ctaText = about?.cta_text || 'More About Us';
  const ctaLink = about?.cta_link || '/about';
  const officeImage = about?.image_url || '/images/H&S Auditors about section.png';

  const defaultFeatures: AboutFeature[] = [
    { id: '1', title: 'GST registration, returns, refunds and departmental notices', icon_name: 'FileCheck', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', title: 'Income tax planning, filing and representation before authorities', icon_name: 'Calculator', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', title: 'Statutory, internal, stock and tax audits', icon_name: 'ShieldCheck', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', title: 'Company & LLP incorporation with ROC compliance', icon_name: 'Building2', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', title: 'Payroll, TDS and monthly management reporting', icon_name: 'Users', display_order: 5, is_active: true, created_at: '', updated_at: '' },
  ];
  const featureList = features && features.length > 0 ? features : defaultFeatures;

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Office Image on Laptop Screens */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3.4] rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-gray-100">
              <Image
                src={officeImage}
                alt={about?.image_alt || 'H&S Auditors Corporate Reception'}
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>

            {/* Floating 10+ Years Stat Badge */}
            <div className="absolute -bottom-3 left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-gray-200/80 max-w-[200px]">
              <div className="text-2xl font-extrabold text-[#0B192C] leading-none mb-1">
                10+
              </div>
              <div className="text-xs font-semibold text-gray-700 leading-snug">
                Years of Professional Excellence
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Features & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase block">
                {eyebrow}
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#F59E0B]" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#071A3D] tracking-tight leading-snug mb-3.5">
              {heading}
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
              {paragraph1}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">
              {paragraph2}
            </p>

            {/* 5 Features Grid / Checklist */}
            <div className="space-y-2.5 sm:space-y-3 bg-gray-50/70 p-4 sm:p-5 rounded-2xl border border-gray-200/70 mb-6">
              {featureList.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100">
                    <DynamicIcon name={feature.icon_name || 'CheckCircle2'} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-gray-700 leading-snug">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group w-full sm:w-auto"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

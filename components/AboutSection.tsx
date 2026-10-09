import React from 'react';
import Link from 'next/link';
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

  const defaultFeatures: AboutFeature[] = [
    { id: '1', title: 'GST registration, returns, refunds and departmental notices', icon_name: 'FileCheck', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', title: 'Income tax planning, filing and representation before authorities', icon_name: 'Calculator', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', title: 'Statutory, internal, stock and tax audits', icon_name: 'ShieldCheck', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', title: 'Company & LLP incorporation with ROC compliance', icon_name: 'Building2', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', title: 'Payroll, TDS and monthly management reporting', icon_name: 'Users', display_order: 5, is_active: true, created_at: '', updated_at: '' },
  ];
  const featureList = features && features.length > 0 ? features : defaultFeatures;

  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase mb-1 block">
              {eyebrow}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-brand-deepNavy tracking-tight leading-snug mb-3.5">
              {heading}
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
              {paragraph1}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
              {paragraph2}
            </p>

            <div>
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors group w-full sm:w-auto"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Feature Items */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-3.5 bg-gray-50/70 p-4 sm:p-6 rounded-2xl border border-gray-200/70">
            {featureList.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100">
                  <DynamicIcon name={feature.icon_name || 'CheckCircle2'} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-gray-700 leading-snug">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

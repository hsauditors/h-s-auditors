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

export function AboutSection({ about, features = [] }: AboutSectionProps) {
  const eyebrow = about?.eyebrow || 'ABOUT THE PRACTICE';
  const heading = about?.heading || 'Premier Accounting & Tax Consultancy';
  const paragraph1 = about?.paragraph_1 || '';
  const paragraph2 = about?.paragraph_2 || '';
  const ctaText = about?.cta_text || 'More About Us';
  const ctaLink = about?.cta_link || '/about';
  const officeImage = about?.image_url || '/images/H&S Auditors about section.png';

  const featureList = (features || []).filter((f) => f.is_active !== false);

  return (
    <section className="w-full bg-[#FFFFFF] py-10 sm:py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Office Image with Floating Stat Badge */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3.4] rounded-2xl overflow-hidden shadow-md bg-stone-100">
              <Image
                src={officeImage}
                alt={about?.image_alt || 'H&S Auditors Corporate Reception'}
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>

            {/* Floating 10+ Years Stat Badge */}
            <div className="absolute -bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl max-w-[210px]">
              <div className="text-3xl font-bold text-[#2b2d54] leading-none mb-1">
                10+
              </div>
              <div className="text-xs font-semibold text-slate-700 leading-snug">
                Years of Professional Excellence
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Features & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-[10.5px] sm:text-xs font-bold tracking-[0.2em] text-[#2b2d54]/80 uppercase block">
                {eyebrow}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#2b2d54] tracking-tight leading-snug mb-4">
              {heading}
            </h2>

            {paragraph1 && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-normal">
                {paragraph1}
              </p>
            )}

            {paragraph2 && (
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                {paragraph2}
              </p>
            )}

            {/* Features Checklist from Database */}
            {featureList.length > 0 && (
              <div className="space-y-2.5 sm:space-y-3 bg-[#FAF9F6] p-4 sm:p-5 rounded-2xl mb-6">
                {featureList.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#fcdd5e]/25 flex items-center justify-center flex-shrink-0 text-[#2b2d54]">
                      <DynamicIcon name={feature.icon_name || 'CheckCircle2'} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-[13.5px] font-medium text-slate-800 leading-snug">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div>
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-[#2b2d54] hover:bg-[#222443] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm transition-all group w-full sm:w-auto"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#fcdd5e] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

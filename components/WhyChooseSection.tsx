import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { WhyChooseItem } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface WhyChooseSectionProps {
  items?: WhyChooseItem[];
}

export function WhyChooseSection({ items }: WhyChooseSectionProps) {
  // Ensure the exact user-uploaded banner is synced to public directory
  try {
    const brainDir =
      'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\d6957bc8-ff05-458e-aa67-4dfc9cea036f';
    const userUploadedDir = path.join(brainDir, '.user_uploaded');
    const exactWhyChooseSrc = path.join(
      userUploadedDir,
      'media_1791875220935.png'
    );
    const destDir = path.join(process.cwd(), 'public', 'images');
    if (fs.existsSync(exactWhyChooseSrc)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(
        exactWhyChooseSrc,
        path.join(destDir, 'why-choose-exact.png')
      );
    }
  } catch {
    // Graceful fallback
  }

  const defaultPillars: WhyChooseItem[] = [
    {
      id: 'expertise',
      icon_name: 'Trophy',
      title: 'Deep Expertise',
      description: 'Specialists in accounting, audit, tax and compliance.',
      display_order: 1,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: 'business',
      icon_name: 'TrendingUp',
      title: 'Business-Focused',
      description: 'Practical solutions tailored to your goals.',
      display_order: 2,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: 'partnership',
      icon_name: 'Users',
      title: 'Long-Term Partnership',
      description: 'Committed to your growth journey.',
      display_order: 3,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
  ];

  // Dynamically load active items saved by admin in CMS
  const activeItems =
    items && items.length > 0
      ? items.filter((item) => item.is_active !== false)
      : defaultPillars;

  const displayList = activeItems.length > 0 ? activeItems : defaultPillars;


  return (
    <section className="relative w-full bg-[#071936] text-white border-b border-gray-800 overflow-hidden">
      {/* 1. Desktop Edge-to-Edge Background Banner */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
        <Image
          src="/images/why-choose-exact.png"
          alt="Built on precision, trusted through every stage"
          fill
          className="object-cover object-left"
          sizes="50vw"
        />
        {/* Subtle right gradient to guarantee text contrast on ultrawide monitors */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#071936]/40 to-[#071936]/90 hidden xl:block pointer-events-none" />
      </div>

      {/* 2. Mobile / Tablet Top Image Banner */}
      <div className="relative w-full h-[235px] sm:h-[290px] lg:hidden z-0 overflow-hidden bg-[#071936]">
        <Image
          src="/images/why-choose-exact.png"
          alt="Built on precision, trusted through every stage"
          fill
          className="object-cover object-left scale-[1.18] translate-x-5 sm:translate-x-7 origin-center"
          sizes="100vw"
        />
        {/* Smooth bottom fade into dark navy content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071936] via-[#071936]/30 to-transparent pointer-events-none" />
      </div>

      {/* 3. Section Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left empty spacer on desktop so the executive photo shows clearly */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[340px]" />

          {/* Right Column: Text & Dynamic Circular Pillars */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl lg:ml-auto">
              
              {/* Eyebrow with gold accent line */}
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                  WHY BUSINESSES CHOOSE US
                </span>
                <span className="w-8 sm:w-12 h-[1.5px] bg-[#F59E0B]" />
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight leading-tight mb-3 sm:mb-4">
                <span>Built on precision.</span>
                <span className="block text-[#F59E0B] font-serif">
                  Trusted through every stage.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed mb-6 sm:mb-8 font-normal max-w-xl">
                We combine domain expertise with a practical, business-first
                approach to deliver solutions that create long-term value.
              </p>

              {/* Dynamic Pillars: Configurable from Admin Panel (Icon + Big Text only) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {displayList.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white/[0.06] border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-200 min-h-[96px] sm:min-h-0 justify-start sm:justify-start"
                  >
                    {/* Circular Gold Icon Badge */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#F59E0B]/80 bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0 text-[#F59E0B] shadow-2xs">
                      <DynamicIcon
                        name={pillar.icon_name || 'Award'}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.9]"
                      />
                    </div>

                    {/* Big Text Title */}
                    <h3 className="text-[10.5px] sm:text-[12.5px] lg:text-[13px] font-semibold text-white leading-tight sm:leading-snug">
                      {pillar.title}
                    </h3>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

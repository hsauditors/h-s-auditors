import React from 'react';
import Image from 'next/image';
import { WhyChooseItem } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface WhyChooseSectionProps {
  items?: WhyChooseItem[];
}

export function WhyChooseSection({ items = [] }: WhyChooseSectionProps) {
  const activeItems = (items || []).filter((item) => item.is_active !== false);

  if (activeItems.length === 0) {
    return null;
  }

  const displayList = activeItems;

  return (
    <section className="relative w-full bg-[#2b2d54] text-white overflow-hidden">
      {/* 1. Desktop Edge-to-Edge Background Banner */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
        <Image
          src="/images/why-choose-exact.png"
          alt="Built on precision, trusted through every stage"
          fill
          className="object-cover object-left"
          sizes="50vw"
        />
        {/* Deep obsidian gradient to guarantee contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2b2d54]/50 to-[#2b2d54]/95 hidden xl:block pointer-events-none" />
      </div>

      {/* 2. Mobile / Tablet Top Image Banner */}
      <div className="relative w-full h-[235px] sm:h-[290px] lg:hidden z-0 overflow-hidden bg-[#2b2d54]">
        <Image
          src="/images/why-choose-exact.png"
          alt="Built on precision, trusted through every stage"
          fill
          className="object-cover object-left scale-[1.18] translate-x-5 sm:translate-x-7 origin-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d54] via-[#2b2d54]/40 to-transparent pointer-events-none" />
      </div>

      {/* 3. Section Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left empty spacer on desktop so the executive photo shows clearly */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[340px]" />

          {/* Right Column: Editorial Text & Dynamic Circular Pillars */}
          <div data-animate="slide-right" className="lg:col-span-7">
            <div className="max-w-2xl lg:ml-auto">
              
              {/* Eyebrow with gold accent line */}
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#fcdd5e]">
                  WHY BUSINESSES CHOOSE US
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight leading-tight mb-3 sm:mb-4">
                <span>Built on precision. </span>
                <span className="block text-[#fcdd5e]">
                  Trusted through every stage.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal max-w-xl">
                We combine deep statutory acumen with a pragmatic, client-first approach to deliver financial clarity without compromise.
              </p>

              {/* Dynamic Pillars with Warm Gold Tonal Backgrounds */}
              <div data-animate="stagger-cards" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-1">
                {displayList.map((pillar) => (
                  <div
                    key={pillar.id}
                    data-animate-child
                    className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3 p-3.5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.14] hover:shadow-goldGlow hover:-translate-y-1 backdrop-blur-sm transition-all duration-300 min-h-[96px] sm:min-h-0 justify-start"
                  >
                    {/* Circular Antique Gold Icon Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#fcdd5e]/20 group-hover:bg-[#fcdd5e]/30 flex items-center justify-center flex-shrink-0 text-[#fcdd5e] group-hover:scale-110 transition-transform duration-300">
                      <DynamicIcon
                        name={pillar.icon_name || 'Award'}
                        className="w-4 h-4 stroke-[1.9]"
                      />
                    </div>

                    {/* Big Text Title */}
                    <h3 className="text-[11px] sm:text-[13px] font-semibold text-white leading-tight sm:leading-snug">
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

import React from 'react';
import Image from 'next/image';
import { ValueItem } from '@/types';

interface ValuesSectionProps {
  values?: ValueItem[];
}

function getValueImage(val: ValueItem, index: number): string {
  const title = (val.title || '').toLowerCase();
  if (title.includes('integrity')) return '/images/value-integrity.jpg';
  if (title.includes('confidential')) return '/images/value-confidentiality.jpg';
  if (title.includes('time') || title.includes('punctual')) return '/images/value-timely.jpg';
  const defaultImages = [
    '/images/value-integrity.jpg',
    '/images/value-confidentiality.jpg',
    '/images/value-timely.jpg',
  ];
  return defaultImages[index % defaultImages.length];
}

export function ValuesSection({ values = [] }: ValuesSectionProps) {
  const activeValues = (values || []).filter((v) => v.is_active !== false);

  if (activeValues.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div data-animate="fade-down" className="text-center mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2b2d54]/80 block mb-1.5">
            OUR GUIDING PRINCIPLES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#2b2d54] tracking-tight leading-tight">
            Integrity · Confidentiality · Timely
          </h2>
        </div>

        {/* Dynamic Value Cards from Database */}
        <div data-animate="stagger-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {activeValues.map((val, idx) => {
            const number = String(idx + 1).padStart(2, '0');
            const imageUrl = getValueImage(val, idx);

            return (
              <div
                key={val.id || idx}
                data-animate-child
                className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(43,45,84,0.06)] hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Container with subtle wave scoop at bottom */}
                <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={val.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gentle Wave Arc scooped into the bottom of the photo */}
                  <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
                    <svg
                      viewBox="0 0 500 24"
                      preserveAspectRatio="none"
                      className="relative block w-full h-4 sm:h-5 text-white fill-current"
                    >
                      <path d="M0,24 Q250,2 500,24 L500,24 L0,24 Z" />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-5 sm:px-6 pt-3 pb-6 sm:pb-7 flex flex-col flex-1 bg-white">
                  {/* Number + Gold Line + Title */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#fcdd5e] tracking-tight select-none">
                      {number}
                    </span>
                    <span className="w-[1.5px] h-6 sm:h-7 bg-[#fcdd5e] flex-shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-[#2b2d54] tracking-tight">
                      {val.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

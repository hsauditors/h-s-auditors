'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SubService {
  id?: string;
  title: string;
  description?: string;
  image_url?: string;
}

interface ServiceCategoryGridProps {
  subServices: SubService[];
  /** Number of cards visible on mobile before "View More" (default: 4 = 2 rows) */
  mobileLimit?: number;
}

export function ServiceCategoryGrid({ subServices, mobileLimit = 4 }: ServiceCategoryGridProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = subServices.length > mobileLimit;
  const isTwoCards = subServices.length === 2;

  // Desktop columns: 2-card categories keep the wide 2-col layout, others use 4-col
  const desktopCols = isTwoCards ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div>
      <div className={`grid grid-cols-2 ${desktopCols} gap-3 sm:gap-5`}>
        {subServices.map((sub, subIdx) => {
          const hasImage = Boolean(sub.image_url && sub.image_url.trim());
          // On mobile, hide cards beyond the limit unless expanded. Always visible on sm+.
          const hiddenOnMobile = !expanded && subIdx >= mobileLimit;

          return (
            <div
              key={sub.id || subIdx}
              className={`${hiddenOnMobile ? 'hidden sm:flex' : 'flex'} bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex-col group`}
            >
              {/* Card Top Image (if added from admin) */}
              {hasImage && (
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sub.image_url}
                    alt={sub.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Card Body */}
              <div className="p-3.5 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-[12.5px] sm:text-[15px] font-bold text-[#2b2d54] group-hover:opacity-80 transition-colors leading-snug mb-1 sm:mb-2">
                  {sub.title}
                </h3>
                {sub.description && (
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal line-clamp-3 sm:line-clamp-4">
                    {sub.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View More / View Less toggle (mobile only) */}
      {hasMore && (
        <div className="flex justify-center mt-4 sm:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#2b2d54] text-xs font-semibold shadow-sm hover:bg-stone-50 active:scale-[0.98] transition-all"
          >
            <span>
              {expanded
                ? 'View Less'
                : `View More (${subServices.length - mobileLimit})`}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#2b2d54] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

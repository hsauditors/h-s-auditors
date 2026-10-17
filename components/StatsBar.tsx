import React from 'react';
import { HomepageStat } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface StatsBarProps {
  stats?: HomepageStat[];
}

export function StatsBar({ stats = [] }: StatsBarProps) {
  const activeStats = (stats || []).filter((s) => s.is_active !== false);

  if (activeStats.length === 0) {
    return null;
  }

  const items = activeStats;

  // Compute responsive grid columns based on item count
  const gridColsClass =
    items.length <= 3
      ? 'md:grid-cols-3'
      : items.length === 4
      ? 'md:grid-cols-4'
      : 'md:grid-cols-3 lg:grid-cols-4';

  return (
    <section className="w-full bg-[#FAF9F6] py-5 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-animate="stagger-cards"
          className={`grid grid-cols-2 sm:grid-cols-2 ${gridColsClass} gap-x-4 gap-y-4 sm:gap-6`}
        >
          {items.map((stat, idx) => (
            <div
              key={stat.id}
              data-animate-child
              className="group flex items-center gap-2.5 sm:gap-3.5 md:gap-4 min-w-0 bg-white/70 hover:bg-white p-3 sm:p-4 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Refined Icon Badge with Theme Yellow & Blue */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#fcdd5e]/15 flex items-center justify-center flex-shrink-0 text-[#2b2d54] group-hover:scale-110 transition-transform duration-300">
                <DynamicIcon
                  name={stat.icon_name || 'ShieldCheck'}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 stroke-[1.8]"
                />
              </div>

              {/* Text Content */}
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-xl md:text-2xl font-bold text-[#2b2d54] tracking-tight leading-tight truncate sm:whitespace-normal">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5 leading-tight line-clamp-2">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

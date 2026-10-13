import React from 'react';
import { HomepageStat } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface StatsBarProps {
  stats?: HomepageStat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  const defaultStats: HomepageStat[] = [
    {
      id: '1',
      value: '500+',
      label: 'Returns Filed Yearly',
      icon_name: 'FileText',
      display_order: 1,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '2',
      value: '100%',
      label: 'Compliance Record',
      icon_name: 'ShieldCheck',
      display_order: 2,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '3',
      value: '12+',
      label: 'Years of Practice',
      icon_name: 'Award',
      display_order: 3,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '4',
      value: 'Pan-India',
      label: 'Client Coverage',
      icon_name: 'Globe',
      display_order: 4,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
  ];

  // Dynamically use live stats from CMS / admin if available
  const activeStats =
    stats && stats.length > 0
      ? stats.filter((s) => s.is_active !== false)
      : defaultStats;

  const items = activeStats.length > 0 ? activeStats : defaultStats;

  // Compute responsive grid columns based on item count
  const gridColsClass =
    items.length <= 3
      ? 'md:grid-cols-3'
      : items.length === 4
      ? 'md:grid-cols-4'
      : 'md:grid-cols-3 lg:grid-cols-4';

  return (
    <section className="w-full bg-white border-b border-gray-200/80 py-3.5 sm:py-5 md:py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 ${gridColsClass} gap-x-2.5 gap-y-3.5 sm:gap-6 md:divide-x divide-gray-200/80`}
        >
          {items.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex items-center gap-2 sm:gap-3.5 md:gap-4 min-w-0 ${
                idx > 0 ? 'md:pl-6 lg:pl-8' : ''
              }`}
            >
              {/* Circular Blue Icon Badge */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-2xs">
                <DynamicIcon
                  name={stat.icon_name || 'ShieldCheck'}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.8]"
                />
              </div>

              {/* Text Content */}
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm md:text-base font-bold text-[#071A3D] tracking-tight leading-tight truncate sm:whitespace-normal">
                  {stat.value}
                </div>
                <div className="text-[10.5px] sm:text-xs md:text-[13px] text-gray-500 font-normal mt-0.5 leading-tight line-clamp-2">
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

import React from 'react';
import { HomepageStat } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface StatsBarProps {
  stats: HomepageStat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  const defaultStats: HomepageStat[] = [
    { id: '1', value: '500+', label: 'Returns Filed Yearly', icon_name: 'FileText', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', value: '100%', label: 'Compliance Record', icon_name: 'ShieldCheck', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', value: '12+', label: 'Years of Practice', icon_name: 'Award', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', value: 'Pan-India', label: 'Client Coverage', icon_name: 'Globe', display_order: 4, is_active: true, created_at: '', updated_at: '' },
  ];
  const items = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="w-full bg-white border-b border-gray-200/80 py-4 sm:py-5 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:divide-x divide-gray-200/70">
          {items.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex items-center gap-2.5 sm:gap-3.5 ${
                idx > 0 ? 'md:pl-5 lg:pl-6' : ''
              }`}
            >
              {/* Icon Container with soft blue background */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100">
                <DynamicIcon name={stat.icon_name} className="w-5 h-5 sm:w-5 sm:h-5" />
              </div>

              {/* Stat Value & Label */}
              <div>
                <div className="text-xl sm:text-2xl font-black text-brand-deepNavy tracking-tight leading-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5">
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

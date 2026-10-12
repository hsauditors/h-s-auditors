import React from 'react';
import { Service } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative flex flex-col p-3 sm:p-4 bg-white rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div>
        {/* Icon in soft colored container */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2 sm:mb-2.5">
          <DynamicIcon name={service.icon} className="w-4 h-4" />
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-bold text-brand-deepNavy mb-1 leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-normal">
          {service.short_description}
        </p>
      </div>
    </div>
  );
}

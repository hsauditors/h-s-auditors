import React from 'react';
import { Service } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative flex flex-col justify-between p-4 sm:p-5 bg-white rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 h-full">
      <div>
        {/* Icon in soft colored container */}
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
          <DynamicIcon name={service.icon} className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-[15px] font-bold text-brand-deepNavy mb-1.5 leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-gray-500 leading-relaxed font-normal">
          {service.short_description}
        </p>
      </div>
    </div>
  );
}

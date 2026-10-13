import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types';

interface ServicesSectionProps {
  services?: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Reference items matching the exact design provided
  const featuredServices = [
    {
      id: 'accounting-bookkeeping',
      title: 'Accounting & Bookkeeping',
      description:
        'Accurate and up-to-date financial records to help you make informed decisions.',
      imageUrl: '/images/service-accounting.jpg',
      link: '/services/bookkeeping-and-accounting',
    },
    {
      id: 'tax-planning-gst',
      title: 'Tax Planning & GST',
      description:
        'Strategic tax planning and end-to-end GST compliance for businesses and individuals.',
      imageUrl: '/images/service-tax-gst.jpg',
      link: '/services/gst-filing',
    },
    {
      id: 'audit-assurance',
      title: 'Audit & Assurance',
      description:
        'Independent audit and assurance services to ensure transparency and trust.',
      imageUrl: '/images/service-audit-assurance.jpg',
      link: '/services/audit-and-assurance',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10">
          <div>
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706]">
                OUR SERVICES
              </span>
              <span className="w-7 sm:w-10 h-[1.5px] bg-[#D97706]" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#071A3D] font-serif tracking-tight leading-tight">
              How we help your business
            </h2>
          </div>

          {/* View All Services Link */}
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group flex-shrink-0 self-start sm:self-auto"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Featured Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container with smooth hover zoom */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-[#071A3D] mb-2 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group/link mt-auto"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

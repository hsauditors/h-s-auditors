import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service } from '@/types';
import { ServiceCard } from './ServiceCard';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const defaultServices: Service[] = [
    {
      id: '1',
      title: 'GST Filing',
      slug: 'gst-filing',
      short_description: 'Accurate, hassle-free GST registration, monthly returns, and reconciliation.',
      long_description: null,
      icon: 'Receipt',
      image_url: null,
      cta_text: 'Explore Service',
      cta_url: '/services/gst-filing',
      benefits: null,
      process_steps: null,
      display_order: 1,
      is_active: true,
      seo_title: null,
      seo_description: null,
      created_at: '',
      updated_at: '',
    },
    {
      id: '2',
      title: 'Income Tax',
      slug: 'income-tax',
      short_description: 'Maximize tax savings while staying fully compliant with the Income Tax Act.',
      long_description: null,
      icon: 'BarChart2',
      image_url: null,
      cta_text: 'Explore Service',
      cta_url: '/services/income-tax',
      benefits: null,
      process_steps: null,
      display_order: 2,
      is_active: true,
      seo_title: null,
      seo_description: null,
      created_at: '',
      updated_at: '',
    },
    {
      id: '3',
      title: 'Bookkeeping & Accounting',
      slug: 'bookkeeping-and-accounting',
      short_description: 'Clean, current financial records that help you make informed business decisions.',
      long_description: null,
      icon: 'BookOpen',
      image_url: null,
      cta_text: 'Explore Service',
      cta_url: '/services/bookkeeping-and-accounting',
      benefits: null,
      process_steps: null,
      display_order: 3,
      is_active: true,
      seo_title: null,
      seo_description: null,
      created_at: '',
      updated_at: '',
    },
    {
      id: '4',
      title: 'Business Registration',
      slug: 'business-registration',
      short_description: 'End-to-end assistance for company, LLP and firm registration.',
      long_description: null,
      icon: 'Building2',
      image_url: null,
      cta_text: 'Explore Service',
      cta_url: '/services/business-registration',
      benefits: null,
      process_steps: null,
      display_order: 4,
      is_active: true,
      seo_title: null,
      seo_description: null,
      created_at: '',
      updated_at: '',
    },
    {
      id: '5',
      title: 'Audit & Assurance',
      slug: 'audit-and-assurance',
      short_description: 'Statutory, internal and tax audits that ensure compliance and transparency.',
      long_description: null,
      icon: 'ShieldCheck',
      image_url: null,
      cta_text: 'Explore Service',
      cta_url: '/services/audit-and-assurance',
      benefits: null,
      process_steps: null,
      display_order: 5,
      is_active: true,
      seo_title: null,
      seo_description: null,
      created_at: '',
      updated_at: '',
    },
    {
      id: '6',
      title: 'Company Secretarial',
      slug: 'company-secretarial',
      short_description: 'ROC filings, board compliance and secretarial support handled end to end.',
      long_description: null,
      icon: 'Users',
      image_url: null,
      cta_text: 'Explore Service',
      cta_url: '/services/company-secretarial',
      benefits: null,
      process_steps: null,
      display_order: 6,
      is_active: true,
      seo_title: null,
      seo_description: null,
      created_at: '',
      updated_at: '',
    },
  ];
  const items = services && services.length > 0 ? services.slice(0, 6) : defaultServices;

  const highlightChecklist = [
    'Personalised Advisory',
    'Domain Expertise',
    'End-to-End Support',
    'Technology Driven',
    'Confidential & Secure',
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-10 sm:py-12 lg:py-14 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase mb-1 block">
              WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deepNavy tracking-tight">
              Our Core Services
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Each service is a pillar of your financial architecture. Move forward with clarity, compliance and confidence.
            </p>
          </div>

          <div className="mt-3 sm:mt-0 flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 group transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Grid: 3 columns of 2 rows on left (col-span-9) + Feature Card on right (col-span-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* Left Grid: 3 columns x 2 rows */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {items.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Right Feature Card */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            {/* Top Image */}
            <div className="relative w-full aspect-[16/11] bg-slate-900">
              <Image
                src="/images/service-accounting.jpg"
                alt="Reliable Financial Solutions for Your Business"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>

            {/* Content & Checklist */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-center">
              <h3 className="text-[15px] sm:text-base font-bold text-brand-deepNavy mb-3.5 leading-snug">
                Reliable Financial Solutions for Your Business
              </h3>

              <ul className="space-y-2.5">
                {highlightChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

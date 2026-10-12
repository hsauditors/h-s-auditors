
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
      short_description:
        'Accurate, hassle-free GST registration, monthly returns, and reconciliation.',
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
      short_description:
        'Maximize tax savings while staying fully compliant with the Income Tax Act.',
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
      short_description:
        'Clean, current financial records that help you make informed business decisions.',
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
      short_description:
        'End-to-end assistance for company, LLP and firm registration.',
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
      short_description:
        'Statutory, internal and tax audits that ensure compliance and transparency.',
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
      short_description:
        'ROC filings, board compliance and secretarial support handled end to end.',
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

  const items =
    services && services.length > 0
      ? services.slice(0, 6)
      : defaultServices;

  const highlightChecklist = [
    'Personalised Advisory',
    'Domain Expertise',
    'End-to-End Support',
    'Technology Driven',
    'Confidential & Secure',
  ];

  return (
    <section className="w-full border-b border-gray-200/80 bg-[#F8FAFC] py-5 sm:py-7 lg:py-9">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-blue-600 sm:text-xs">
              WHAT WE DO
            </span>

            <h2 className="text-lg font-extrabold tracking-tight text-brand-deepNavy sm:text-2xl lg:text-3xl">
              Our Core Services
            </h2>

            <p className="mt-1 hidden max-w-xl text-xs text-gray-500 sm:block sm:text-sm">
              Expert accounting, taxation and compliance solutions to help
              your business move forward with clarity and confidence.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex flex-shrink-0 items-center gap-1 text-[11px] font-bold text-blue-600 transition-colors hover:text-blue-800 sm:text-sm"
          >
            View All
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
          </Link>
        </div>

        {/* Services Grid + Feature Card */}
        <div className="grid grid-cols-1 items-start gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-4">
          {/* Compact Service Cards */}
          <div className="grid grid-cols-2 items-start gap-2 sm:gap-3 md:grid-cols-3 lg:col-span-9">
            {items.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Compact Feature Card */}
          <div className="flex h-auto flex-row overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition-shadow hover:shadow-md lg:col-span-3 lg:flex-col">
            {/* Feature Image */}
            <div className="relative min-h-[150px] w-24 flex-shrink-0 bg-slate-900 sm:w-32 lg:h-32 lg:min-h-0 lg:w-full">
              <Image
                src="/images/service-accounting.jpg"
                alt="Professional accounting and financial advisory"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 128px, 25vw"
              />
            </div>

            {/* Feature Content */}
            <div className="flex flex-1 flex-col justify-center p-3 sm:p-4 lg:p-4">
              <h3 className="mb-2 text-xs font-bold leading-snug text-brand-deepNavy sm:text-sm">
                Reliable Financial Solutions
              </h3>

              <ul className="space-y-1.5">
                {highlightChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-500 sm:h-3.5 sm:w-3.5" />

                    <span className="text-[10px] leading-snug text-gray-600 sm:text-xs">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 transition-colors hover:text-blue-800 sm:text-xs"
              >
                Talk to an Expert
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

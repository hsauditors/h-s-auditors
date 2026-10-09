import React from 'react';
import Link from 'next/link';
import { Industry } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface IndustriesSectionProps {
  industries: Industry[];
}

export function IndustriesSection({ industries }: IndustriesSectionProps) {
  const defaultIndustries: Industry[] = [
    { id: '1', title: 'Manufacturing & MSME', slug: 'manufacturing-and-msme', description: null, image_url: null, icon_name: 'Factory', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', title: 'Retail & Trading', slug: 'retail-and-trading', description: null, image_url: null, icon_name: 'Store', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', title: 'Construction & Real Estate', slug: 'construction-and-real-estate', description: null, image_url: null, icon_name: 'Building', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', title: 'Healthcare & Hospitals', slug: 'healthcare-and-hospitals', description: null, image_url: null, icon_name: 'Stethoscope', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', title: 'Hotels & Restaurants', slug: 'hotels-and-restaurants', description: null, image_url: null, icon_name: 'Coffee', display_order: 5, is_active: true, created_at: '', updated_at: '' },
    { id: '6', title: 'Logistics & Transport', slug: 'logistics-and-transport', description: null, image_url: null, icon_name: 'Truck', display_order: 6, is_active: true, created_at: '', updated_at: '' },
    { id: '7', title: 'IT & Software Exports', slug: 'it-and-software-exports', description: null, image_url: null, icon_name: 'Code', display_order: 7, is_active: true, created_at: '', updated_at: '' },
    { id: '8', title: 'Education & Trusts', slug: 'education-and-trusts', description: null, image_url: null, icon_name: 'GraduationCap', display_order: 8, is_active: true, created_at: '', updated_at: '' },
    { id: '9', title: 'Textiles & Apparel', slug: 'textiles-and-apparel', description: null, image_url: null, icon_name: 'Scissors', display_order: 9, is_active: true, created_at: '', updated_at: '' },
    { id: '10', title: 'Agricultural Commodities', slug: 'agricultural-commodities', description: null, image_url: null, icon_name: 'Sprout', display_order: 10, is_active: true, created_at: '', updated_at: '' },
    { id: '11', title: 'Professional Services', slug: 'professional-services', description: null, image_url: null, icon_name: 'Briefcase', display_order: 11, is_active: true, created_at: '', updated_at: '' },
    { id: '12', title: 'NBFC & Co-operative Societies', slug: 'nbfc-and-cooperative-societies', description: null, image_url: null, icon_name: 'Landmark', display_order: 12, is_active: true, created_at: '', updated_at: '' },
  ];
  const items = industries && industries.length > 0 ? industries : defaultIndustries;

  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-14 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-4">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase mb-1 block">
              SECTOR EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deepNavy tracking-tight leading-tight mb-2">
              Industries We Work With
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
              Delivering tailored compliance and advisory solutions across sectors.
            </p>
          </div>

          {/* Right Column: 4 Columns x 3 Rows Pill Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {items.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries#${ind.slug}`}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-blue-50/60 border border-gray-200/80 hover:border-blue-300 transition-all duration-150 group shadow-2xs"
              >
                <div className="text-blue-600 flex-shrink-0">
                  <DynamicIcon name={ind.icon_name} className="w-4 h-4" />
                </div>

                <span className="text-[11px] sm:text-xs font-bold text-brand-deepNavy group-hover:text-blue-600 transition-colors leading-tight truncate">
                  {ind.title}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

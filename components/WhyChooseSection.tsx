import React from 'react';
import { WhyChooseItem } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface WhyChooseSectionProps {
  items: WhyChooseItem[];
}

export function WhyChooseSection({ items }: WhyChooseSectionProps) {
  const defaultItems: WhyChooseItem[] = [
    { id: '1', title: 'Direct access to senior professionals', description: null, icon_name: 'Headphones', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', title: 'Real-time financial tracking and reporting', description: null, icon_name: 'Clock', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', title: 'End-to-end compliance management', description: null, icon_name: 'ShieldCheck', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', title: 'Personalised advisory for your business', description: null, icon_name: 'UserCheck', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', title: 'Transparent billing with no hidden fees', description: null, icon_name: 'CreditCard', display_order: 5, is_active: true, created_at: '', updated_at: '' },
    { id: '6', title: 'Multi-domain expertise under one roof', description: null, icon_name: 'Award', display_order: 6, is_active: true, created_at: '', updated_at: '' },
  ];
  const list = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="w-full bg-[#08152E] text-white py-10 sm:py-12 lg:py-14 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Philosophy */}
          <div className="lg:col-span-5">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-brand-gold uppercase block mb-1.5">
              WHY CHOOSE H&amp;S
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight leading-tight mb-3">
              Built on Precision.{' '}
              <span className="text-brand-gold block">
                Trusted by Hundreds.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
              The H&amp;S difference is our commitment to clarity, accuracy and personal attention — so you can focus on running your business while we manage the compliance.
            </p>
          </div>

          {/* Right Column: 2 columns on mobile and desktop of 6 Distinctive Feature Items */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-2 sm:gap-3.5 lg:gap-4">
            {list.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl bg-white/[0.06] border border-white/10 hover:border-brand-gold/40 transition-all duration-200"
              >
                {/* Circular Gold Outlined Icon container */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brand-gold/70 flex items-center justify-center flex-shrink-0 text-brand-gold bg-brand-gold/5">
                  <DynamicIcon name={item.icon_name} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <h3 className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

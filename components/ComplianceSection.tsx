import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ComplianceDeadline } from '@/types';

interface ComplianceSectionProps {
  deadlines?: ComplianceDeadline[];
}

export function ComplianceSection({ deadlines = [] }: ComplianceSectionProps) {
  const activeDeadlines = (deadlines || []).filter((d) => d.is_active !== false);

  if (activeDeadlines.length === 0) {
    return null;
  }

  const items = activeDeadlines;

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-row items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#2b2d54]/80 uppercase block">
                STATUTORY DUE DATES
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#2b2d54] tracking-tight">
              Key Compliance Calendar
            </h2>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2b2d54] hover:opacity-80 transition-colors group"
            >
              <span className="hidden sm:inline">Request Calendar Filing Support</span>
              <span className="sm:hidden">Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2b2d54] transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Content Grid: Table on Left + Calendar Promo Card on Right (matched heights) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Left: Table Container */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="bg-[#2b2d54]/5 text-[#2b2d54] font-bold uppercase text-[9.5px] sm:text-[11px] tracking-wider">
                    <th scope="col" className="py-3 px-3 sm:py-3.5 sm:px-5">Compliance Event</th>
                    <th scope="col" className="py-3 px-3 sm:py-3.5 sm:px-5">Form / Return</th>
                    <th scope="col" className="py-3 px-3 sm:py-3.5 sm:px-5">Statutory Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-slate-700">
                  {items.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#fcdd5e]/10 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                      }`}
                    >
                      <td className="py-2.5 px-3 sm:py-3 sm:px-5 font-semibold text-[#2b2d54] text-[11px] sm:text-[13px]">
                        {item.compliance}
                      </td>
                      <td className="py-2.5 px-3 sm:py-3 sm:px-5 font-semibold text-[#2b2d54] text-[11px] sm:text-[13px]">
                        {item.form}
                      </td>
                      <td className="py-2.5 px-3 sm:py-3 sm:px-5 font-semibold text-[#2b2d54] text-[11px] sm:text-[13px]">
                        {item.due_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Bespoke Dark Obsidian Calendar Card with matching height */}
          <div className="lg:col-span-4 bg-[#2b2d54] text-white rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between h-full">
            <div className="relative w-full flex-1 min-h-[200px] lg:min-h-[220px] bg-slate-900">
              <Image
                src="/images/compliance-calendar.jpg"
                alt="Compliance Calendar Reminder"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d54] via-transparent to-transparent" />
            </div>

            <div className="p-5 sm:p-6 flex flex-col justify-between flex-shrink-0">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#fcdd5e] uppercase font-bold block mb-1">
                  ZERO PENALTY GUARANTEE
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  Never miss an Indian tax deadline again.
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-5 font-normal">
                  Our statutory audit and tax advisory partners keep your filing calendar fully organised and penalty-free.
                </p>
              </div>

              <button
                type="button"
                data-open-consultation="true"
                data-subject="Statutory Compliance Review"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#fcdd5e] hover:bg-[#ebd04f] text-[#2b2d54] font-bold py-3 px-4 rounded-xl transition-all text-xs sm:text-sm shadow-sm group cursor-pointer"
              >
                <span>Book a Statutory Review</span>
                <ArrowRight className="w-4 h-4 text-[#2b2d54] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

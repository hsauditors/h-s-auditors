import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { ComplianceDeadline } from '@/types';

interface ComplianceSectionProps {
  deadlines: ComplianceDeadline[];
}

export function ComplianceSection({ deadlines }: ComplianceSectionProps) {
  const defaultDeadlines: ComplianceDeadline[] = [
    { id: '1', compliance: 'GST outward supplies', form: 'GSTR-1', due_date: '11th of the following month', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', compliance: 'GST summary return & payment', form: 'GSTR-3B', due_date: '20th of the following month', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', compliance: 'TDS payment', form: 'Challan ITNS-281', due_date: '7th of the following month', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', compliance: 'Quarterly TDS return', form: '24Q / 26Q', due_date: '31st of the month after each quarter', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', compliance: 'Advance tax instalments', form: 'Challan 280', due_date: '15 Jun, 15 Sep, 15 Dec, 15 Mar', display_order: 5, is_active: true, created_at: '', updated_at: '' },
    { id: '6', compliance: 'Income tax return (non-audit)', form: 'ITR', due_date: '31 July', display_order: 6, is_active: true, created_at: '', updated_at: '' },
    { id: '7', compliance: 'Tax audit report', form: 'Form 3CA/3CB+3CD', due_date: '30 September', display_order: 7, is_active: true, created_at: '', updated_at: '' },
    { id: '8', compliance: 'GST annual return', form: 'GSTR-9 / 9C', due_date: '31 December', display_order: 8, is_active: true, created_at: '', updated_at: '' },
    { id: '9', compliance: 'ROC annual filings', form: 'AOC-4 / MGT-7', due_date: '30 Oct / 29 Nov', display_order: 9, is_active: true, created_at: '', updated_at: '' },
  ];
  const items = deadlines && deadlines.length > 0 ? deadlines : defaultDeadlines;

  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-14 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase mb-1 block">
              STAY AHEAD OF DUE DATES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deepNavy tracking-tight">
              Key Indian compliance deadlines
            </h2>
          </div>

          <div className="mt-3 sm:mt-0 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 group transition-colors"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Content Grid: Responsive Table on Left + Calendar Promo Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* Left: Table Container */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-brand-deepNavy font-bold uppercase text-[10px] sm:text-[11px] tracking-wider">
                    <th scope="col" className="py-2.5 px-4 sm:px-5">Compliance</th>
                    <th scope="col" className="py-2.5 px-4 sm:px-5">Form</th>
                    <th scope="col" className="py-2.5 px-4 sm:px-5">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-brand-text">
                  {items.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50/40 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                      }`}
                    >
                      <td className="py-2.5 px-4 sm:px-5 font-semibold text-brand-deepNavy">
                        {item.compliance}
                      </td>
                      <td className="py-2.5 px-4 sm:px-5 text-gray-500 font-medium">
                        <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-[11px] text-gray-600">
                          {item.form}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 sm:px-5 font-semibold text-blue-600">
                        {item.due_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Never miss a deadline card */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative w-full aspect-[16/11] bg-slate-900">
              <Image
                src="/images/compliance-calendar.jpg"
                alt="Compliance Calendar Reminder"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-deepNavy mb-1.5 leading-snug">
                  Never miss a deadline again.
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mb-4">
                  Let our experts keep your compliance calendar on track.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full bg-brand-deepNavy hover:bg-brand-navy text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-xs sm:text-sm shadow-xs group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 text-brand-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

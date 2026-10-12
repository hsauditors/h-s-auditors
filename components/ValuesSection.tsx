import React from 'react';
import { FileCheck, Lock, Clock } from 'lucide-react';

export function ValuesSection() {
  const values = [
    {
      title: 'Integrity',
      description: "Every opinion, certificate and return is issued on merit and in line with ICAI's Code of Ethics.",
      icon: FileCheck,
    },
    {
      title: 'Confidentiality',
      description: 'Client records, ROI and GSTIN details are protected with the highest level of data security.',
      icon: Lock,
    },
    {
      title: 'Timely',
      description: 'Filings are prepared ahead of statutory deadlines, so you avoid late fees and penalties.',
      icon: Clock,
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-5 sm:py-10 lg:py-12 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-3xl font-extrabold text-brand-deepNavy tracking-tight">
            Integrity · Confidentiality · Timely
          </h2>
        </div>

        {/* 3 Horizontal Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200/80 shadow-xs flex items-start gap-3 hover:shadow-sm transition-shadow"
              >
                {/* Icon Container with soft blue background */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-brand-deepNavy mb-0.5 sm:mb-1 leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface ContactSectionProps {
  settings?: SiteSettings | null;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone || '+91 97461 35644';
  const email = settings?.email || 'info@hsauditors.com';
  const locationTitle = settings?.office_address
    ? settings.office_address.split(',').slice(-2).join(',').trim() || 'Ottapalam, Palakkad'
    : 'Ottapalam, Palakkad';

  return (
    <section className="w-full bg-[#FAF7F2] py-12 sm:py-16 lg:py-20 border-b border-[#ECE6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, text, and warm gold CTA button */}
          <div data-animate="slide-left" className="lg:col-span-7">
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2b2d54]/80">
                BEGIN A CONVERSATION
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#2b2d54] tracking-tight leading-[1.2] mb-3 sm:mb-4 max-w-xl">
              Let&apos;s make your next financial decision clearer.
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-lg mb-6 sm:mb-8 font-normal">
              Speak directly with our Chartered Accountants and tax consultants for a confidential, merit-based discussion.
            </p>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#fcdd5e] hover:bg-[#ebd04f] text-[#2b2d54] font-bold px-6 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(252,221,94,0.3)] hover:shadow-goldGlow hover:-translate-y-0.5 transition-all text-xs sm:text-sm group"
            >
              <span>Talk to our partners</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1 text-[#2b2d54]" />
            </Link>
          </div>

          {/* Right Column: Clean White Contact Info Card */}
          <div data-animate="slide-right" className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-shadow duration-300 divide-y divide-stone-100">
              
              {/* Phone */}
              <div className="group flex items-start gap-3.5 pb-4 sm:pb-5">
                <div className="w-10 h-10 rounded-xl bg-[#fcdd5e]/25 group-hover:bg-[#fcdd5e]/40 flex items-center justify-center flex-shrink-0 text-[#2b2d54] group-hover:scale-105 transition-all duration-200">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.9]" />
                </div>
                <div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base font-bold text-[#2b2d54] hover:opacity-80 transition-colors block leading-snug"
                  >
                    {phone}
                  </a>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">
                    Mon - Sat, 9:30 AM - 6:00 PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 py-4 sm:py-5">
                <div className="w-10 h-10 rounded-xl bg-[#fcdd5e]/25 flex items-center justify-center flex-shrink-0 text-[#2b2d54]">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.9]" />
                </div>
                <div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-bold text-[#2b2d54] hover:opacity-80 transition-colors block leading-snug"
                  >
                    {email}
                  </a>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">
                    Online queries answered within 24 hours
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 pt-4 sm:pt-5">
                <div className="w-10 h-10 rounded-xl bg-[#fcdd5e]/25 flex items-center justify-center flex-shrink-0 text-[#2b2d54]">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.9]" />
                </div>
                <div>
                  <span className="text-sm sm:text-base font-bold text-[#2b2d54] block leading-snug">
                    {locationTitle}
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">
                    Harisree Square, Kerala
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

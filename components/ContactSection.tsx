import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface ContactSectionProps {
  settings?: SiteSettings | null;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone || '+91 98765 43210';
  const email = settings?.email || 'info@hsauditors.com';
  const locationTitle = settings?.office_address
    ? settings.office_address.split(',').slice(-2).join(',').trim() || 'Mumbai, Maharashtra'
    : 'Mumbai, Maharashtra';

  return (
    <section className="w-full bg-[#FAF7F2] py-10 sm:py-14 lg:py-20 border-b border-[#ECE6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, text, and amber CTA button */}
          <div className="lg:col-span-7">
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706]">
                GET IN TOUCH
              </span>
              <span className="w-7 sm:w-10 h-[1.5px] bg-[#D97706]" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#071A3D] font-serif tracking-tight leading-[1.2] mb-3 sm:mb-4 max-w-xl">
              Let&apos;s make your next financial decision clearer.
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-gray-600 leading-relaxed max-w-lg mb-6 sm:mb-8 font-normal">
              Speak with our team for a personalised consultation and take the
              next step with confidence.
            </p>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#071A3D] font-bold px-6 py-3.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm group"
            >
              <span>Talk to our team</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Clean White Contact Info Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D6] shadow-sm divide-y divide-gray-100">
              
              {/* Phone */}
              <div className="flex items-start gap-3.5 pb-4 sm:pb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-[#D97706] shadow-2xs">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.9]" />
                </div>
                <div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base font-bold text-[#071A3D] hover:text-blue-600 transition-colors block leading-snug"
                  >
                    {phone}
                  </a>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                    Mon - Sat, 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 py-4 sm:py-5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-[#D97706] shadow-2xs">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.9]" />
                </div>
                <div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-bold text-[#071A3D] hover:text-blue-600 transition-colors block leading-snug"
                  >
                    {email}
                  </a>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 pt-4 sm:pt-5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-[#D97706] shadow-2xs">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.9]" />
                </div>
                <div>
                  <span className="text-sm sm:text-base font-bold text-[#071A3D] block leading-snug">
                    {locationTitle}
                  </span>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">
                    Serving clients across India
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

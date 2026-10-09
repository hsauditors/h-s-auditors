import React from 'react';
import { Phone, Mail, MapPin, Building } from 'lucide-react';
import { SiteSettings } from '@/types';
import { ContactForm } from './ContactForm';

interface ContactSectionProps {
  settings: SiteSettings | null;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone || '+91 97461 35644';
  const landline = settings?.landline || '0466 - 221 0164';
  const email = settings?.email || 'info@hsauditors.com';
  const address =
    settings?.office_address ||
    'Room No.48, Harisree Square, Ottapalam, Palakkad, Kerala - 679101';

  return (
    <section className="w-full bg-[#F8FAFC] py-10 sm:py-12 lg:py-14 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Contact Details */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deepNavy tracking-tight mb-1.5">
              Get in Touch
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-5 leading-relaxed">
              <span className="font-semibold text-amber-600">Call</span>, write or visit our office — we respond to every enquiry within one working day.
            </p>

            {/* 4 Contact Information Blocks (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">Phone</div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-xs font-bold text-brand-deepNavy hover:text-blue-600 transition-colors block mt-0.5"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Landline */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">Landline</div>
                  <a
                    href={`tel:${landline.replace(/\s+/g, '')}`}
                    className="text-xs font-bold text-brand-deepNavy hover:text-blue-600 transition-colors block mt-0.5"
                  >
                    {landline}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs font-bold text-brand-deepNavy hover:text-blue-600 transition-colors block mt-0.5 truncate max-w-[150px]"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">Office</div>
                  <address className="not-italic text-[11px] sm:text-xs font-semibold text-brand-deepNavy leading-tight mt-0.5">
                    {address}
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getSiteSettings, getNavigationItems } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | H&S Auditors',
  description:
    'Reach out by phone, email, or visit our office. Our accounting and taxation specialists respond within one business day.',
};

export const revalidate = 0; // Live database updates

export default async function ContactPage() {
  const [settings, navItems] = await Promise.all([
    getSiteSettings(),
    getNavigationItems(),
  ]);

  const phone = settings?.phone || '+91 97461 35644';
  const landline = settings?.landline || '0466 – 221 0144';
  const email = settings?.email || 'info@hsauditors.com';
  const address =
    settings?.office_address ||
    'Room No. 48, Harisree Square,\nOttapalam, Palakkad, Kerala – 679101';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow relative overflow-hidden">


        {/* Content Container */}
        <section className="relative z-10 pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#F59E0B] uppercase block mb-3">
              WE ARE HERE TO HELP
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-[#0B192C]">
              Get in Touch with{' '}
              <span className="text-[#2563EB]">H&amp;S Auditors</span>
            </h1>

            {/* Gold Divider Accent Line */}
            <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto my-4" />

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
              Reach out by phone, email, or visit our office. Our accounting and taxation specialists respond within one business day.
            </p>
          </div>

          {/* Two-Column Grid: Contact Information & Send Us a Message */}
          <div className="mt-10 sm:mt-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
            
            {/* Left Column: Office & Helpdesk Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-8 md:p-9 border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6 sm:space-y-7">
              <div>
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#2563EB] block mb-1.5">
                  CONTACT INFORMATION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C]">
                  Office &amp; Helpdesk
                </h2>
              </div>

              {/* Mobile & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                  <Phone className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                    Mobile &amp; WhatsApp
                  </div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base font-bold text-[#0B192C] hover:text-[#2563EB] transition-colors block"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Office Landline */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                  {/* Phone with Keypad Device SVG matching screenshot */}
                  <svg
                    className="w-5 h-5 stroke-[1.8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2.5" strokeWidth="1.8" />
                    <line x1="8.5" y1="6" x2="15.5" y2="6" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="8.5" cy="10.5" r="0.9" fill="currentColor" />
                    <circle cx="12" cy="10.5" r="0.9" fill="currentColor" />
                    <circle cx="15.5" cy="10.5" r="0.9" fill="currentColor" />
                    <circle cx="8.5" cy="13.5" r="0.9" fill="currentColor" />
                    <circle cx="12" cy="13.5" r="0.9" fill="currentColor" />
                    <circle cx="15.5" cy="13.5" r="0.9" fill="currentColor" />
                    <circle cx="8.5" cy="16.5" r="0.9" fill="currentColor" />
                    <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
                    <circle cx="15.5" cy="16.5" r="0.9" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                    Office Landline
                  </div>
                  <a
                    href={`tel:${landline.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base font-bold text-[#0B192C] hover:text-[#2563EB] transition-colors block"
                  >
                    {landline}
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                    Email Address
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-bold text-[#0B192C] hover:text-[#2563EB] transition-colors block"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Headquarters Office */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                    Headquarters Office
                  </div>
                  <div className="text-sm font-semibold text-[#0B192C] leading-snug">
                    Room No. 48, Harisree Square,
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
                    Ottapalam, Palakkad, Kerala – 679101
                  </div>
                </div>
              </div>

              {/* Business Working Hours */}
              <div className="flex items-start gap-4 pt-5 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7]/70 border border-[#FDE68A] flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <Clock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                    Business Working Hours
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0B192C]">
                    Monday – Saturday: 9:30 AM to 6:00 PM
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Closed on Sundays &amp; Public Holidays
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us a Message Card */}
            <div className="lg:col-span-7">
              <ContactForm
                showCardWrapper={true}
                eyebrow="SEND US A MESSAGE"
                title="We'd Love to Hear From You"
                subtitle="Have a question or need professional advice? Send us a message and our team will get back to you shortly."
              />
            </div>

          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

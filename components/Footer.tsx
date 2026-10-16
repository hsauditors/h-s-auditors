'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Building, Mail, MapPin, Linkedin, Instagram, Youtube, ChevronDown } from 'lucide-react';
import { SiteSettings } from '@/types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  settings: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    quickLinks: false,
    services: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const phone = settings?.phone || '+91 97461 35644';
  const landline = settings?.landline || '0466 - 221 0144';
  const email = settings?.email || 'info@hsauditors.com';
  const address =
    settings?.office_address ||
    'Room No.48, Harisree Square, Ottapalam, Palakkad, Kerala - 679101';
  const linkedinUrl = settings?.linkedin_url || 'https://www.linkedin.com';
  const instagramUrl = settings?.instagram_url || 'https://www.instagram.com';
  const youtubeUrl = settings?.youtube_url || 'https://www.youtube.com';

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Our Team', href: '/our-team' },
    { label: 'Industries', href: '/industries' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const servicesLinks = [
    { label: 'GST Filing', href: '/services' },
    { label: 'Income Tax', href: '/services' },
    { label: 'Bookkeeping & Accounting', href: '/services' },
    { label: 'Business Registration', href: '/services' },
    { label: 'Audit & Assurance', href: '/services' },
    { label: 'Company Secretarial', href: '/services' },
    { label: 'Advisory', href: '/contact' },
  ];

  return (
    <footer className="w-full bg-[#2b2d54] text-white pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 pb-8">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 pb-4 md:pb-0">
            <BrandLogo variant="dark" logoSrc="/logo/logo.png" className="mb-3" />

            <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mt-3 max-w-sm font-normal">
              A premier Accounting &amp; Tax consultancy firm in India, delivering accurate, compliant and business-focused financial solutions for individuals, startups and established businesses.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#222443] hover:bg-[#fcdd5e] hover:text-[#2b2d54] flex items-center justify-center text-slate-300 transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#222443] hover:bg-[#fcdd5e] hover:text-[#2b2d54] flex items-center justify-center text-slate-300 transition-all duration-200"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-[#222443] hover:bg-[#fcdd5e] hover:text-[#2b2d54] flex items-center justify-center text-slate-300 transition-all duration-200"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none mb-0 md:mb-3 py-1.5 md:py-0 select-none group"
              aria-expanded={openSections.quickLinks}
            >
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fcdd5e] group-hover:text-amber-200 md:group-hover:text-[#fcdd5e] transition-colors">
                Quick Links
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#fcdd5e]/80 transition-transform duration-200 md:hidden ${
                  openSections.quickLinks ? 'rotate-180 text-[#fcdd5e]' : ''
                }`}
              />
            </button>
            <div className={`${openSections.quickLinks ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-[#EAE3D2] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Our Services (3 cols) */}
          <div className="lg:col-span-3 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none mb-0 md:mb-3 py-1.5 md:py-0 select-none group"
              aria-expanded={openSections.services}
            >
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fcdd5e] group-hover:text-amber-200 md:group-hover:text-[#fcdd5e] transition-colors">
                Our Services
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#fcdd5e]/80 transition-transform duration-200 md:hidden ${
                  openSections.services ? 'rotate-180 text-[#fcdd5e]' : ''
                }`}
              />
            </button>
            <div className={`${openSections.services ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <ul className="space-y-2">
                {servicesLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-[#EAE3D2] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Information (3 cols) */}
          <div className="lg:col-span-3 pb-2 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none mb-0 md:mb-3 py-1.5 md:py-0 select-none group"
              aria-expanded={openSections.contact}
            >
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fcdd5e] group-hover:text-amber-200 md:group-hover:text-[#fcdd5e] transition-colors">
                Contact Information
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-[#fcdd5e]/80 transition-transform duration-200 md:hidden ${
                  openSections.contact ? 'rotate-180 text-[#fcdd5e]' : ''
                }`}
              />
            </button>
            <div className={`${openSections.contact ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <div className="space-y-2.5 text-xs sm:text-[13px] text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#fcdd5e] flex-shrink-0 mt-0.5" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#EAE3D2] transition-colors">
                    {phone}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building className="w-3.5 h-3.5 text-[#fcdd5e] flex-shrink-0 mt-0.5" />
                  <a href={`tel:${landline.replace(/\s+/g, '')}`} className="hover:text-[#EAE3D2] transition-colors">
                    {landline}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#fcdd5e] flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="hover:text-[#EAE3D2] transition-colors">
                    {email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#fcdd5e] flex-shrink-0 mt-0.5" />
                  <address className="not-italic leading-relaxed text-slate-300/90">
                    {address}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} H&amp;S Auditors. All rights reserved.
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link href="/privacy-policy" className="hover:text-[#EAE3D2] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-of-service" className="hover:text-[#EAE3D2] transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">
              Crafted by{' '}
              <a
                href="https://ekodrix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fcdd5e] hover:text-white font-medium transition-colors"
              >
                ekodrix
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

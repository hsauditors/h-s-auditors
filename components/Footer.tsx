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
    <footer className="w-full bg-[#07152E] text-white pt-10 pb-8 border-t border-brand-gold/30 relative overflow-hidden">
      {/* Subtle background watermark / logo imprint on right */}
      <div className="absolute right-4 -bottom-4 opacity-[0.10] pointer-events-none select-none w-56 h-36 sm:w-64 sm:h-44">
        <Image
          src="/images/H&S Auditors logo3.png"
          alt="H&S Auditors Watermark"
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-8 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 pb-4 md:pb-0 border-b border-white/10 md:border-b-0">
            <BrandLogo variant="dark" className="mb-3" />
            
            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed mt-3 max-w-sm">
              A premier Accounting &amp; Tax consultancy firm in India, delivering accurate, compliant and business-focused financial solutions for individuals, startups and established businesses.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 border-b border-white/10 md:border-b-0 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none mb-0 md:mb-3 py-1.5 md:py-0 select-none group"
              aria-expanded={openSections.quickLinks}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-gold group-hover:text-yellow-400 md:group-hover:text-brand-gold transition-colors">
                Quick Links
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-brand-gold/80 transition-transform duration-200 md:hidden ${
                  openSections.quickLinks ? 'rotate-180 text-brand-gold' : ''
                }`}
              />
            </button>
            <div className={`${openSections.quickLinks ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-gray-300 hover:text-white transition-colors hover:underline block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Our Services (3 cols) */}
          <div className="lg:col-span-3 border-b border-white/10 md:border-b-0 pb-3 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none mb-0 md:mb-3 py-1.5 md:py-0 select-none group"
              aria-expanded={openSections.services}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-gold group-hover:text-yellow-400 md:group-hover:text-brand-gold transition-colors">
                Our Services
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-brand-gold/80 transition-transform duration-200 md:hidden ${
                  openSections.services ? 'rotate-180 text-brand-gold' : ''
                }`}
              />
            </button>
            <div className={`${openSections.services ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <ul className="space-y-2">
                {servicesLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-gray-300 hover:text-white transition-colors hover:underline block py-0.5"
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
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-gold group-hover:text-yellow-400 md:group-hover:text-brand-gold transition-colors">
                Contact Information
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-brand-gold/80 transition-transform duration-200 md:hidden ${
                  openSections.contact ? 'rotate-180 text-brand-gold' : ''
                }`}
              />
            </button>
            <div className={`${openSections.contact ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
              <div className="space-y-2.5 text-xs sm:text-[13px] text-gray-300">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <a href={`tel:${landline.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {landline}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <address className="not-italic leading-relaxed">
                    {address}
                  </address>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} H&amp;S Auditors. All rights reserved.
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

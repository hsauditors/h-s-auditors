'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { NavigationItem, SiteSettings } from '@/types';
import { openConsultationModal } from './ConsultationModal';

interface MobileMenuProps {
  navItems: NavigationItem[];
  settings: SiteSettings | null;
}

export function MobileMenu({ navItems, settings }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const regularLinks = navItems.filter((i) => !i.is_cta);
  const ctaItem = navItems.find((i) => i.is_cta);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-brand-deepNavy hover:bg-stone-100 focus:outline-none"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[68px] sm:top-[72px] z-50 bg-[#2b2d54]/70 backdrop-blur-sm transition-opacity">
          <div className="bg-white px-5 py-5 sm:px-6 sm:py-6 shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-y-auto rounded-b-2xl">
            <nav className="flex flex-col space-y-1.5">
              {regularLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-slate-800 hover:text-[#2b2d54] hover:bg-stone-50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openConsultationModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#2b2d54] hover:bg-[#222443] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow transition-colors cursor-pointer"
              >
                <span>{ctaItem?.label || 'Book a Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-[#fcdd5e]" />
              </button>
            </div>

            {/* Quick Contact snippet */}
            {settings && (
              <div className="pt-3 text-xs text-slate-500 space-y-1.5 bg-stone-50 p-3 rounded-xl">
                {settings.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#fcdd5e]" />
                    <span>{settings.phone}</span>
                  </div>
                )}
                {settings.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#fcdd5e]" />
                    <span>{settings.email}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

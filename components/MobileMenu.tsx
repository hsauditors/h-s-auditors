'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { NavigationItem, SiteSettings } from '@/types';
import { BrandLogo } from './BrandLogo';

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
        className="p-2 rounded-lg text-brand-deepNavy hover:bg-brand-softBlue focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[68px] sm:top-[72px] z-50 bg-brand-deepNavy/70 backdrop-blur-sm transition-opacity">
          <div className="bg-white border-b border-brand-border px-5 py-5 sm:px-6 sm:py-6 shadow-xl flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <BrandLogo size="sm" />
            </div>

            <nav className="flex flex-col space-y-1.5">
              {regularLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-brand-text hover:text-brand-blue hover:bg-brand-softBlue rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-brand-border">
              <Link
                href={ctaItem?.href || '/contact'}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white px-5 py-3 rounded-md font-semibold text-sm shadow transition-colors"
              >
                <span>{ctaItem?.label || 'Talk to an Expert'}</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </Link>
            </div>

            {/* Quick Contact snippet */}
            {settings && (
              <div className="pt-3 text-xs text-brand-muted space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{settings.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

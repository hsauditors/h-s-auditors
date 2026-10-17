'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { NavigationItem, SiteSettings } from '@/types';
import { BrandLogo } from './BrandLogo';
import { MobileMenu } from './MobileMenu';
import { openConsultationModal } from './ConsultationModal';

interface NavbarProps {
  navItems: NavigationItem[];
  settings: SiteSettings | null;
}

export function Navbar({ navItems = [], settings }: NavbarProps) {
  const pathname = usePathname();

  const regularLinks = (navItems || []).filter((i) => !i.is_cta && i.is_active !== false);
  const ctaItem = (navItems || []).find((i) => i.is_cta && i.is_active !== false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(10,19,34,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] sm:h-[80px]">
          {/* Left: Brand Logo Lockup */}
          <div className="flex-shrink-0">
            <BrandLogo size="md" logoSrc="/logo/logo.png" />
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {regularLinks.map((item) => {
              const itemPath = (item.href || '/').replace(/\/+$/, '') || '/';
              const currentPath = (pathname || '/').replace(/\/+$/, '') || '/';
              const isActive =
                itemPath === '/'
                  ? currentPath === '/'
                  : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-1.5 text-[13px] sm:text-[13.5px] tracking-tight transition-all duration-150 relative rounded-lg ${
                    isActive
                      ? 'text-[#2b2d54] font-bold bg-[#2b2d54]/5 after:absolute after:-bottom-1 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#fcdd5e] after:rounded-full'
                      : 'text-slate-600 font-medium hover:text-[#2b2d54] hover:bg-stone-100/60'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Bespoke CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => openConsultationModal()}
              className="inline-flex items-center gap-2 bg-[#2b2d54] hover:bg-[#222443] text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-[13px] tracking-wide shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <span>{ctaItem?.label || 'Book a Consultation'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#fcdd5e] transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu trigger */}
          <MobileMenu navItems={navItems} settings={settings} />
        </div>
      </div>
    </header>
  );
}

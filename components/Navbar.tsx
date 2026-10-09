'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { NavigationItem, SiteSettings } from '@/types';
import { BrandLogo } from './BrandLogo';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  navItems: NavigationItem[];
  settings: SiteSettings | null;
}

export function Navbar({ navItems, settings }: NavbarProps) {
  const pathname = usePathname();

  const defaultNavItems: NavigationItem[] = [
    { id: '1', label: 'Home', href: '/', display_order: 1, is_active: true, is_cta: false, created_at: '' },
    { id: '2', label: 'Services', href: '/services', display_order: 2, is_active: true, is_cta: false, created_at: '' },
    { id: '3', label: 'About', href: '/about', display_order: 3, is_active: true, is_cta: false, created_at: '' },
    { id: '4', label: 'Our Team', href: '/our-team', display_order: 4, is_active: true, is_cta: false, created_at: '' },
    { id: '5', label: 'Industries', href: '/industries', display_order: 5, is_active: true, is_cta: false, created_at: '' },
    { id: '6', label: 'Careers', href: '/careers', display_order: 6, is_active: true, is_cta: false, created_at: '' },
    { id: '7', label: 'Contact', href: '/contact', display_order: 7, is_active: true, is_cta: false, created_at: '' },
    { id: '8', label: 'Talk to an Expert', href: '/contact', display_order: 8, is_active: true, is_cta: true, created_at: '' },
  ];
  const items = navItems && navItems.length > 0 ? navItems : defaultNavItems;
  const regularLinks = items.filter((i) => !i.is_cta);
  const ctaItem = items.find((i) => i.is_cta);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/70 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] sm:h-[72px]">
          {/* Left: Brand Logo Lockup */}
          <div className="flex-shrink-0">
            <BrandLogo size="md" />
          </div>

          {/* Center: Dynamic Desktop Nav Links with Pill Hover & Active States */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {regularLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1 text-[13px] sm:text-[13.5px] font-semibold transition-all duration-150 relative ${
                    isActive
                      ? 'text-blue-600 font-bold after:absolute after:-bottom-1 after:left-2 after:right-2 after:h-[2.5px] after:bg-[#F59E0B] after:rounded-full'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/70 rounded-full'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Premium Pill CTA Button with Gold Arrow */}
          <div className="hidden lg:flex items-center">
            <Link
              href={ctaItem?.href || '/contact'}
              className="inline-flex items-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md transition-all duration-150 group border border-white/10"
            >
              <span>{ctaItem?.label || 'Talk to an Expert'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu trigger */}
          <MobileMenu navItems={navItems} settings={settings} />
        </div>
      </div>
    </header>
  );
}

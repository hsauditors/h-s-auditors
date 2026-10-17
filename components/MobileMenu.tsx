'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NavigationItem, SiteSettings } from '@/types';
import { openConsultationModal } from './ConsultationModal';

interface MobileMenuProps {
  navItems: NavigationItem[];
  settings: SiteSettings | null;
}

export function MobileMenu({ navItems = [], settings }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const regularLinks = (navItems || []).filter((i) => !i.is_cta && i.is_active !== false);
  const ctaItem = (navItems || []).find((i) => i.is_cta && i.is_active !== false);

  const normalizePath = (p: string) => (p || '/').replace(/\/+$/, '') || '/';
  const currentPath = normalizePath(pathname || '/');

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-brand-deepNavy hover:bg-stone-100 active:scale-95 focus:outline-none transition-all duration-200 cursor-pointer"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`w-6 h-6 absolute inset-0 transition-all duration-300 transform ${
              isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            className={`w-6 h-6 absolute inset-0 transition-all duration-300 transform ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
            }`}
          />
        </div>
      </button>

      {/* Mobile Drawer with Smooth Animations */}
      <div
        className={`fixed inset-0 top-[68px] sm:top-[72px] z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop Overlay */}
        <div
          className={`absolute inset-0 bg-[#2b2d54]/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Panel Sliding Smoothly */}
        <div
          className={`relative z-10 bg-white px-5 py-5 sm:px-6 sm:py-6 shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-y-auto rounded-b-2xl transition-all duration-300 ease-out transform ${
            isOpen
              ? 'translate-y-0 opacity-100 scale-100'
              : '-translate-y-4 opacity-0 scale-[0.98]'
          }`}
        >
          <nav className="flex flex-col space-y-1">
            {regularLinks.map((item) => {
              const itemPath = normalizePath(item.href || '/');
              const isActive =
                itemPath === '/'
                  ? currentPath === '/'
                  : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center px-3.5 py-2.5 text-base transition-all duration-150 ${
                    isActive
                      ? 'bg-[#2b2d54]/8 text-[#2b2d54] font-bold border-l-4 border-[#fcdd5e] pl-3 rounded-r-xl rounded-l-none'
                      : 'text-slate-700 font-medium hover:text-[#2b2d54] hover:bg-stone-50 rounded-xl'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
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
              <span>{ctaItem?.label || 'Talk to an Expert'}</span>
              <ArrowRight className="w-4 h-4 text-[#fcdd5e]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  FileText,
  Calendar,
  ShieldCheck,
  Building,
  Factory,
  Briefcase,
  Mail,
  Settings,
  ExternalLink,
  X,
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Hero Section', href: '/admin/hero', icon: Sparkles },
    { label: 'Homepage Stats', href: '/admin/stats', icon: BarChart3 },
    { label: 'Services', href: '/admin/services', icon: FileText },
    { label: 'Compliance Deadlines', href: '/admin/compliance', icon: Calendar },
    { label: 'Why Choose Us', href: '/admin/why-choose', icon: ShieldCheck },
    { label: 'About Content', href: '/admin/about', icon: Building },
    { label: 'Industries', href: '/admin/industries', icon: Factory },
    { label: 'Careers', href: '/admin/careers', icon: Briefcase },
    { label: 'Enquiries', href: '/admin/enquiries', icon: Mail },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <aside className="w-64 bg-[#071A3D] text-white flex flex-col h-full border-r border-[#1E293B] select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <BrandLogo variant="dark" size="sm" href="/admin" />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links with Smooth Independent Scroll */}
      <nav className="flex-1 px-3 py-3.5 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Content Management
        </div>

        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0 text-brand-gold" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer link to public website */}
      <div className="p-3.5 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
        </Link>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Fixed Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 w-64 z-30 shadow-lg">
        {sidebarContent}
      </div>

      {/* Mobile Drawer with Animated Slide-In & Backdrop */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
        {/* Drawer Panel */}
        <div
          className={`relative z-10 w-72 max-w-[85vw] h-full shadow-2xl transition-transform duration-300 ease-in-out transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}

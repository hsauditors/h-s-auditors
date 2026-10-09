'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, User, Menu } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface AdminHeaderProps {
  userEmail?: string;
  onOpenMobileMenu?: () => void;
}

export function AdminHeader({ userEmail, onOpenMobileMenu }: AdminHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-brand-border px-4 sm:px-6 flex items-center justify-between shadow-xs sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-deepNavy hover:bg-gray-100 transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#071A3D] flex items-center justify-center p-1 flex-shrink-0 md:hidden shadow-xs">
            <Image
              src="/images/H&S Auditors logo3.png"
              alt="H&S Auditors Logo"
              width={28}
              height={18}
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-brand-deepNavy leading-tight">
              H&amp;S Auditors CMS
            </h1>
            <p className="text-[11px] sm:text-xs text-brand-muted hidden xs:block">
              Control Center
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {userEmail && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-softBlue border border-blue-100 text-xs font-semibold text-brand-blue">
            <User className="w-3.5 h-3.5" />
            <span className="max-w-[150px] truncate">{userEmail}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

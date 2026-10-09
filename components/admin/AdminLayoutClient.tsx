'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  userEmail: string;
}

export function AdminLayoutClient({ children, userEmail }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Responsive Fixed Admin Sidebar */}
      <AdminSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area: Offset by md:pl-64 on desktop so it never overlaps the fixed sidebar */}
      <div className="md:pl-64 flex flex-col min-h-screen min-w-0 transition-all duration-200">
        <AdminHeader
          userEmail={userEmail}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

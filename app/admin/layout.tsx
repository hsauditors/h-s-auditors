import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export const metadata = {
  title: 'H&S Auditors CMS Admin Panel',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let userEmail = '';

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      userEmail = user.email;
    }
  } catch {
    // Development or local session fallback
  }

  return (
    <AdminLayoutClient userEmail={userEmail}>
      {children}
    </AdminLayoutClient>
  );
}

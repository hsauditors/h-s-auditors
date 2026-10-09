import React from 'react';
import fs from 'fs';
import path from 'path';
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
  // Ensure the dark logo file is copied to public/images/hs-logo2.png for safe URL resolution
  try {
    const src2 = path.join(process.cwd(), 'public', 'images', 'H&S Auditors logo2.png');
    const dst2 = path.join(process.cwd(), 'public', 'images', 'hs-logo2.png');
    if (fs.existsSync(src2) && !fs.existsSync(dst2)) {
      fs.copyFileSync(src2, dst2);
    }

    const src3 = path.join(process.cwd(), 'public', 'images', 'H&S Auditors logo3.png');
    const dst3 = path.join(process.cwd(), 'public', 'images', 'hs-logo3.png');
    if (fs.existsSync(src3) && !fs.existsSync(dst3)) {
      fs.copyFileSync(src3, dst3);
    }
  } catch {
    // Ignore error
  }

  let userEmail = 'admin@hsauditors.com';

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

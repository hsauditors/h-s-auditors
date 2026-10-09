import React from 'react';
import { Metadata } from 'next';
import { getNavigationItems, getSiteSettings } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OurTeamClient } from '@/components/OurTeamClient';

export const metadata: Metadata = {
  title: 'Our Team | Leadership & Practice Specialists | H&S Auditors',
  description:
    'Every engagement at H&S Auditors is led by a qualified chartered accountant and supported by specialists in taxation, audit and corporate law.',
};

export const revalidate = 0; // Live database updates

export default async function OurTeamPage() {
  const [navItems, settings] = await Promise.all([
    getNavigationItems(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow">
        {/* Client Interactive Section */}
        <OurTeamClient settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}

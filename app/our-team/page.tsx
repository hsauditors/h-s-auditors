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
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow relative overflow-hidden">
        {/* Background Decorative Tech Waves & Dot Matrix */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <svg
            className="w-full h-full min-h-[850px] object-cover"
            viewBox="0 0 1440 850"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Top-Left Tech Node Connection */}
            <line
              x1="105"
              y1="0"
              x2="105"
              y2="185"
              stroke="#93C5FD"
              strokeWidth="1.2"
            />
            <circle cx="105" cy="185" r="4.5" fill="#2563EB" />

            {/* Tech Waves swooping across canvas */}
            <path
              d="M 0,25 C 160,85 240,240 105,185"
              stroke="#BFDBFE"
              strokeWidth="1.2"
            />
            <path
              d="M 105,185 C 0,195 -30,290 380,270 C 820,245 1120,110 1440,230"
              stroke="#93C5FD"
              strokeWidth="1.2"
            />
            <path
              d="M 125,0 C 230,170 540,430 1440,160"
              stroke="#BFDBFE"
              strokeWidth="1.1"
            />
            <path
              d="M 1080,440 C 1220,320 1340,240 1440,210"
              stroke="#BFDBFE"
              strokeWidth="1"
            />

            {/* 5x5 Dot Matrix Grid on Upper-Right */}
            <g transform="translate(1130, 65)" fill="#60A5FA" opacity="0.85">
              <circle cx="0" cy="0" r="2.2" />
              <circle cx="18" cy="0" r="2.2" />
              <circle cx="36" cy="0" r="2.2" />
              <circle cx="54" cy="0" r="2.2" />
              <circle cx="72" cy="0" r="2.2" />

              <circle cx="0" cy="18" r="2.2" />
              <circle cx="18" cy="18" r="2.2" />
              <circle cx="36" cy="18" r="2.2" />
              <circle cx="54" cy="18" r="2.2" />
              <circle cx="72" cy="18" r="2.2" />

              <circle cx="0" cy="36" r="2.2" />
              <circle cx="18" cy="36" r="2.2" />
              <circle cx="36" cy="36" r="2.2" />
              <circle cx="54" cy="36" r="2.2" />
              <circle cx="72" cy="36" r="2.2" />

              <circle cx="0" cy="54" r="2.2" />
              <circle cx="18" cy="54" r="2.2" />
              <circle cx="36" cy="54" r="2.2" />
              <circle cx="54" cy="54" r="2.2" />
              <circle cx="72" cy="54" r="2.2" />

              <circle cx="0" cy="72" r="2.2" />
              <circle cx="18" cy="72" r="2.2" />
              <circle cx="36" cy="72" r="2.2" />
              <circle cx="54" cy="72" r="2.2" />
              <circle cx="72" cy="72" r="2.2" />
            </g>
          </svg>
        </div>

        {/* Client Interactive Section */}
        <OurTeamClient settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}

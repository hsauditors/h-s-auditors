import React from 'react';
import {
  getSiteSettings,
  getNavigationItems,
  getHomepageSection,
  getHomepageStats,
  getServices,
  getComplianceDeadlines,
  getWhyChooseItems,
  getAboutContent,
  getAboutFeatures,
  getIndustries,
} from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { StatsBar } from '@/components/StatsBar';
import { ServicesSection } from '@/components/ServicesSection';
import { ComplianceSection } from '@/components/ComplianceSection';
import { WhyChooseSection } from '@/components/WhyChooseSection';
import { AboutSection } from '@/components/AboutSection';
import { ValuesSection } from '@/components/ValuesSection';
import { IndustriesSection } from '@/components/IndustriesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

// Force dynamic rendering so all CMS changes appear instantly on refresh
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Fetch live CMS data in parallel
  const [
    settings,
    navItems,
    heroData,
    stats,
    services,
    deadlines,
    whyChooseItems,
    aboutContent,
    aboutFeatures,
    industries,
  ] = await Promise.all([
    getSiteSettings(),
    getNavigationItems(),
    getHomepageSection('hero'),
    getHomepageStats(),
    getServices(),
    getComplianceDeadlines(),
    getWhyChooseItems(),
    getAboutContent(),
    getAboutFeatures(),
    getIndustries(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Navigation */}
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow">
        {/* 2. Full-Width Hero Section */}
        <HeroSection heroData={heroData} />

        {/* 3. Statistics Strip */}
        <StatsBar stats={stats} />

        {/* 4. Core Services */}
        <ServicesSection services={services} />

        {/* 5. Key Indian Compliance Deadlines */}
        <ComplianceSection deadlines={deadlines} />

        {/* 6. Why Choose H&S (Dark Navy Section) */}
        <WhyChooseSection items={whyChooseItems} />

        {/* 7. About The Firm Split Layout */}
        <AboutSection about={aboutContent} features={aboutFeatures} />

        {/* 8. Core Values (Integrity, Confidentiality, Timely) */}
        <ValuesSection />

        {/* 9. Sector Experience / Industries */}
        <IndustriesSection industries={industries} />

        {/* 10. Contact Information & Message Form */}
        <ContactSection settings={settings} />
      </main>

      {/* 11. Large Corporate Dark Navy Footer */}
      <Footer settings={settings} />
    </div>
  );
}

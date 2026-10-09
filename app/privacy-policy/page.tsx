import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings, getNavigationItems } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | H&S Auditors',
  description: 'Privacy policy and data protection standards at H&S Auditors.',
};

export default async function PrivacyPolicyPage() {
  const [settings, navItems] = await Promise.all([
    getSiteSettings(),
    getNavigationItems(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 border border-brand-border shadow-sm">
          <h1 className="text-3xl font-extrabold text-brand-deepNavy mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-brand-muted mb-8">
            Last Updated: January 2025
          </p>

          <div className="space-y-6 text-sm text-brand-text/90 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">1. Client Confidentiality Commitment</h2>
              <p>
                At H&amp;S Auditors, we maintain the highest standards of professional ethics, privacy, and confidentiality in accordance with the guidelines of the Institute of Chartered Accountants of India (ICAI) and applicable Indian laws. All books of account, GST credentials, ITR records, bank details, and business documents shared with us are treated with strict confidentiality.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">2. Information Collection</h2>
              <p>
                We collect personal and corporate information solely for the purpose of executing engagement contracts, preparing tax filings, performing statutory or tax audits, and communicating with statutory bodies such as the GST Network (GSTN), Income Tax Department, and Ministry of Corporate Affairs (MCA).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">3. Data Security</h2>
              <p>
                Electronic documents and communication are safeguarded via industry-grade encryption, secure servers, and restricted internal access controls. We never sell, lease, or monetize your information to any third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">4. Contact Inquiries</h2>
              <p>
                For questions regarding data handling, reach out to our privacy officer at{' '}
                <a href={`mailto:${settings?.email || 'info@hsauditors.com'}`} className="text-brand-blue underline">
                  {settings?.email || 'info@hsauditors.com'}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

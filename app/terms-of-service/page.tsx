import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings, getNavigationItems } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | H&S Auditors',
  description: 'Terms of professional service and advisory engagement at H&S Auditors.',
};

export default async function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-xs text-brand-muted mb-8">
            Last Updated: January 2025
          </p>

          <div className="space-y-6 text-sm text-brand-text/90 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">1. Scope of Advisory Engagements</h2>
              <p>
                All services delivered by H&amp;S Auditors—including GST filing, Income Tax advisory, Bookkeeping, Corporate Incorporation, and Statutory Audits—are governed by signed engagement letters and statutory requirements under Indian law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">2. Client Representations and Records</h2>
              <p>
                Clients are responsible for ensuring that all financial records, vouchers, transaction data, bank accounts, and declarations furnished to H&amp;S Auditors are true, complete, and accurate. Statutory calculations and returns rely entirely upon genuine business records provided by the client.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">3. Compliance Timelines and Deadlines</h2>
              <p>
                While H&amp;S Auditors exercises due diligence to advise clients ahead of statutory due dates (GSTR-1, GSTR-3B, TDS, Advance Tax, ITR, MCA ROC), timely filing is dependent upon the prompt submission of requisite supporting documents by the client prior to internal cut-off dates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-deepNavy mb-2">4. Governing Law and Jurisdiction</h2>
              <p>
                Any matters arising out of professional services rendered shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Palakkad District, Kerala.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

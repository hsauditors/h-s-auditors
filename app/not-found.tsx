import React from 'react';
import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <div className="mb-6">
        <BrandLogo />
      </div>

      <div className="max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-brand-border shadow-card">
        <span className="text-5xl sm:text-6xl font-black text-brand-blue tracking-tight block mb-2">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-brand-deepNavy mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed mb-6">
          The requested page or statutory advisory resource does not exist or has moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-brand-gold" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-softBlue text-brand-deepNavy border border-brand-border text-xs font-bold py-2.5 px-5 rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-blue" />
            <span>Contact Helpdesk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <div className="mb-6">
        <BrandLogo />
      </div>

      <div className="max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-brand-border shadow-card">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-brand-deepNavy mb-2">
          Something went wrong
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
          We encountered a temporary system error. Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-brand-gold" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-softBlue text-brand-deepNavy border border-brand-border text-xs font-bold py-2.5 px-5 rounded-lg transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-brand-blue" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

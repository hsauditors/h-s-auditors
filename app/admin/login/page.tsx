'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { BrandLogo } from '@/components/BrandLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl border border-brand-border shadow-card">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <BrandLogo />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-deepNavy">
          Sign In to Admin CMS
        </h1>
        <p className="text-xs text-brand-muted mt-1">
          H&amp;S Auditors Enterprise Content Management
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase tracking-wider mb-1.5">
            Admin Email
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hsauditors.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm text-brand-text placeholder-gray-400"
            />
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm text-brand-text placeholder-gray-400"
            />
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-deepNavy hover:bg-brand-navy disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow group mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-brand-gold transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  showCardWrapper?: boolean;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function ContactForm({
  showCardWrapper = true,
  className = '',
  eyebrow = 'SEND US A MESSAGE',
  title = "We'd Love to Hear From You",
  subtitle = 'Have a question or need professional advice? Send us a message and our team will get back to you shortly.',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <>
      {eyebrow && (
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#2b2d54]/80 block mb-1.5">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2b2d54] mb-2">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
          {subtitle}
        </p>
      )}

      {success ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#fcdd5e]/15 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#fcdd5e]/30 text-[#2b2d54] flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#2b2d54] mb-1">
            Message Sent Successfully
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. Our accounting and taxation specialists will review your message and respond within one business day.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-4 text-xs font-bold text-[#2b2d54] hover:underline inline-flex items-center gap-1"
          >
            Send another message &rarr;
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name & Email 2-column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact_name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact_name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl bg-stone-100/70 focus:bg-white focus:ring-2 focus:ring-[#fcdd5e]/40 outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all shadow-none border-0"
              />
            </div>

            <div>
              <label htmlFor="contact_email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="contact_email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@company.com"
                className="w-full px-4 py-3 rounded-xl bg-stone-100/70 focus:bg-white focus:ring-2 focus:ring-[#fcdd5e]/40 outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all shadow-none border-0"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="contact_phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="contact_phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl bg-stone-100/70 focus:bg-white focus:ring-2 focus:ring-[#fcdd5e]/40 outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all shadow-none border-0"
            />
          </div>

          {/* How can we help you? */}
          <div>
            <label htmlFor="contact_message" className="block text-xs font-semibold text-slate-700 mb-1.5">
              How can we help you? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact_message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your requirements..."
              className="w-full px-4 py-3 rounded-xl bg-stone-100/70 focus:bg-white focus:ring-2 focus:ring-[#fcdd5e]/40 outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all shadow-none resize-none border-0"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2b2d54] hover:bg-[#222443] disabled:bg-gray-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all text-xs sm:text-sm shadow-sm group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 text-[#fcdd5e] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );

  if (!showCardWrapper) {
    return <div className={className}>{formContent}</div>;
  }

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(10,19,34,0.04)] ${className}`}
    >
      {formContent}
    </div>
  );
}

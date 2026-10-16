'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function openConsultationModal(initialSubject?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-consultation-modal', {
        detail: { subject: initialSubject || '' },
      })
    );
  }
}

const COUNTRY_CODES = [
  { code: '+91', label: '+91 India' },
  { code: '+971', label: '+971 UAE' },
  { code: '+1', label: '+1 USA / Canada' },
  { code: '+44', label: '+44 UK' },
  { code: '+65', label: '+65 Singapore' },
  { code: '+966', label: '+966 Saudi Arabia' },
  { code: '+974', label: '+974 Qatar' },
  { code: '+968', label: '+968 Oman' },
  { code: '+973', label: '+973 Bahrain' },
  { code: '+965', label: '+965 Kuwait' },
  { code: '+61', label: '+61 Australia' },
  { code: '+49', label: '+49 Germany' },
];

export function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Listen for custom trigger event & global click delegations
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ subject?: string }>;
      if (customEvent.detail?.subject) {
        setFormData((prev) => ({
          ...prev,
          subject: customEvent.detail.subject || prev.subject,
        }));
      }
      setSuccess(false);
      setErrorMsg(null);
      setIsOpen(true);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        '[data-open-consultation], a[href="#consultation"], a[href="/contact?consultation=true"]'
      );
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const subject = target.getAttribute('data-subject') || '';
        openConsultationModal(subject);
        return;
      }

      // Intercept any link or button with text "Book a Consultation"
      const clickable = (e.target as HTMLElement)?.closest('a, button');
      if (clickable) {
        const text = clickable.textContent?.trim().toLowerCase() || '';
        if (text.includes('book a consultation') || text.includes('book a statutory review')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openConsultationModal();
          return;
        }
      }
    };

    window.addEventListener('open-consultation-modal', handleOpen);
    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      window.removeEventListener('open-consultation-modal', handleOpen);
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  // Prevent background scrolling while modal is open & support Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

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
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+91',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="relative w-full max-w-[540px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl my-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8 mb-6">
          <h2
            id="consultation-modal-title"
            className="text-2xl sm:text-[26px] font-bold text-[#2b2d54] tracking-tight leading-snug"
          >
            Book a consultation
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed font-normal">
            Tell us a little about your requirement and we will get back to you within one working day.
          </p>
        </div>

        {success ? (
          /* Success Screen */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-[#2b2d54] mb-2">
              Enquiry Received!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-6 leading-relaxed">
              Thank you for reaching out. One of our qualified consultants will review your requirement and get in touch with you shortly.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-[#2b2d54] hover:bg-[#222443] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form Screen matching user screenshot */
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                  First name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#272B4D] focus:ring-1 focus:ring-[#272B4D] transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#272B4D] focus:ring-1 focus:ring-[#272B4D] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#272B4D] focus:ring-1 focus:ring-[#272B4D] transition-all shadow-2xs"
              />
            </div>

            {/* Row 3: Country Code & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                  Country code
                </label>
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#272B4D] focus:ring-1 focus:ring-[#272B4D] transition-all shadow-2xs cursor-pointer"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-7">
                <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                  Mobile number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#272B4D] focus:ring-1 focus:ring-[#272B4D] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Row 4: Subject */}
            <div>
              <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#272B4D] focus:ring-1 focus:ring-[#272B4D] transition-all shadow-2xs"
              />
            </div>

            {/* Row 5: Message */}
            <div>
              <label className="block text-xs font-semibold text-[#1E2243] mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={3}
                placeholder="Enter your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2b2d54] focus:ring-1 focus:ring-[#2b2d54] transition-all resize-y shadow-2xs"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2b2d54] hover:bg-[#222443] active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all text-xs sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#fcdd5e]" />
                    <span>Submitting enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 -rotate-12 text-[#fcdd5e]" />
                    <span>Submit enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

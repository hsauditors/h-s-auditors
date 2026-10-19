import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  BarChart3,
  Users,
  Lock,
  Clock,
} from 'lucide-react';
import {
  getAboutContent,
  getAboutFeatures,
  getValues,
  getWhyChooseItems,
  getNavigationItems,
  getSiteSettings,
} from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { ValueItem } from '@/types';

export const metadata: Metadata = {
  title: 'About Us | Premier Accounting & Tax Consultancy Firm',
  description:
    'Committed to clarity, accuracy, and personal attention for enterprises across India. Learn about H&S Auditors, our values and expertise.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getValueImage(val: ValueItem, index: number): string {
  const title = (val.title || '').toLowerCase();
  if (title.includes('integrity')) return '/images/value-integrity.jpg';
  if (title.includes('confidential')) return '/images/value-confidentiality.jpg';
  if (title.includes('time') || title.includes('punctual')) return '/images/value-timely.jpg';
  const defaultImages = [
    '/images/value-integrity.jpg',
    '/images/value-confidentiality.jpg',
    '/images/value-timely.jpg',
  ];
  return defaultImages[index % defaultImages.length];
}

function getValueIcon(val: ValueItem) {
  const title = (val.title || '').toLowerCase();
  if (title.includes('integrity')) return ShieldCheck;
  if (title.includes('confidential')) return Lock;
  return Clock;
}

export default async function AboutPage() {
  const [about, features, values, whyChoose, navItems, settings] = await Promise.all([
    getAboutContent(),
    getAboutFeatures(),
    getValues(),
    getWhyChooseItems(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  const officeImage = about?.image_url?.trim() || '';
  const hasImage = Boolean(officeImage);
  const activeFeatures = (features || []).filter((f) => f.is_active !== false);
  const activeValues = (values || []).filter((v) => v.is_active !== false);
  const activeWhyChoose = (whyChoose || []).filter((w) => w.is_active !== false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header / Navbar */}
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow">
        {/* 2. Hero Banner: Dark Navy with Architectural Skyscraper Facade & Wave Curves */}
        <section className="relative w-full bg-[#2b2d54] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-[#fcdd5e]/10 blur-3xl pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-25 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 hidden md:block opacity-30 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 600 500" fill="none">
                <defs>
                  <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcdd5e" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#2b2d54" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2b2d54" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path d="M150,0 L600,0 L600,500 L320,500 Z" fill="url(#glassGrad)" />
                <line x1="220" y1="0" x2="380" y2="500" stroke="#fcdd5e" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="310" y1="0" x2="470" y2="500" stroke="#fcdd5e" strokeWidth="2" strokeOpacity="0.5" />
                <line x1="410" y1="0" x2="570" y2="500" stroke="#fcdd5e" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="160" y1="110" x2="600" y2="90" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.25" />
                <line x1="200" y1="230" x2="600" y2="200" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.25" />
                <line x1="250" y1="350" x2="600" y2="320" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.25" />
              </svg>
            </div>

            <svg
              className="absolute -left-16 bottom-0 h-full w-[540px] text-white/5 pointer-events-none"
              viewBox="0 0 540 500"
              fill="none"
            >
              <path
                d="M-40,80 C120,180 80,420 360,480 C440,500 500,440 540,480"
                stroke="currentColor"
                strokeWidth="45"
                strokeLinecap="round"
              />
              <path
                d="M-80,220 C80,300 160,390 420,440"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#fcdd5e] uppercase block mb-3">
                  ABOUT OUR FIRM
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.15] text-white mb-4">
                  Premier Accounting &amp;{' '}
                  <span className="text-[#fcdd5e] block">Tax Consultancy</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg font-normal">
                  Committed to clarity, accuracy, and personal attention for enterprises across India.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 max-w-md lg:ml-auto w-full">
                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.08] backdrop-blur-md transition-all shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">Trusted Expertise</h3>
                    <p className="text-xs text-blue-200/75 mt-0.5">Professional and reliable</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.08] backdrop-blur-md transition-all shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">Client Focused</h3>
                    <p className="text-xs text-blue-200/75 mt-0.5">Tailored financial solutions</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.08] backdrop-blur-md transition-all shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">Long-Term Partnership</h3>
                    <p className="text-xs text-blue-200/75 mt-0.5">Your growth is our priority</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. "WHO WE ARE" Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {hasImage && (
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/3.4] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  <Image
                    src={officeImage}
                    alt={about?.image_alt || 'H&S Auditors Corporate Reception'}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

                <div className="absolute -bottom-4 left-4 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-2xl max-w-[210px]">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#2b2d54] leading-none mb-1">
                    10+
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-gray-700 leading-snug">
                    Years of Professional Excellence
                  </div>
                </div>
              </div>
            )}

            <div className={`${hasImage ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl'}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold tracking-widest text-[#2b2d54] uppercase block">
                  WHO WE ARE
                </span>
                {!hasImage && (
                  <div className="inline-flex items-center gap-2 bg-[#FAF9F6] border border-stone-200/60 rounded-full px-3 py-1 shadow-2xs">
                    <span className="text-xs font-extrabold text-[#2b2d54]">10+ Years</span>
                    <span className="text-[11px] font-medium text-gray-700">of Professional Excellence</span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2b2d54] tracking-tight leading-tight mb-4">
                Your Reliable Partner in{' '}
                <span className="text-[#2b2d54] block">Financial Growth &amp; Compliance</span>
              </h2>
                {about?.paragraph_1 && (
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                    {about.paragraph_1}
                  </p>
                )}
                {about?.paragraph_2 && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {about.paragraph_2}
                  </p>
                )}

                {/* Core Capabilities from Database */}
                {activeFeatures.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-7">
                    {activeFeatures.map((feat) => (
                      <div key={feat.id} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#fcdd5e] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#2b2d54] stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                          {feat.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#2b2d54] hover:bg-[#222443] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all group w-full sm:w-auto"
                  >
                    <span>Connect With Our Team</span>
                    <ArrowRight className="w-4 h-4 text-[#fcdd5e] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Values Section from Database */}
        {activeValues.length > 0 && (
          <section className="w-full bg-[#FAF9F6] py-10 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-10 lg:mb-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2b2d54] tracking-tight leading-tight">
                  Integrity · Confidentiality · Timely Delivery
                </h2>
              </div>

              {/* Mobile View */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:hidden">
                {activeValues.map((val, idx) => {
                  const Icon = getValueIcon(val);
                  return (
                    <div
                      key={val.id || idx}
                      className="bg-white rounded-xl p-2 sm:p-3 shadow-[0_2px_12px_rgba(43,45,84,0.06)] flex flex-col items-center text-center justify-start min-h-[128px]"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fcdd5e]/25 flex items-center justify-center text-[#2b2d54] mb-1.5 flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 stroke-[2]" />
                      </div>

                      <h3 className="text-[11px] sm:text-xs font-bold text-[#2b2d54] leading-tight mb-1">
                        {val.title}
                      </h3>

                      <p className="text-[9px] sm:text-[10px] text-gray-500 leading-snug line-clamp-3 font-normal">
                        {val.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Desktop View */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                {activeValues.map((val, idx) => {
                  const number = String(idx + 1).padStart(2, '0');
                  const imageUrl = getValueImage(val, idx);

                  return (
                    <div
                      key={val.id || idx}
                      className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(7,26,61,0.06)] hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                    >
                      <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={val.title}
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />

                        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
                          <svg
                            viewBox="0 0 500 24"
                            preserveAspectRatio="none"
                            className="relative block w-full h-4 sm:h-5 text-white fill-current"
                          >
                            <path d="M0,24 Q250,2 500,24 L500,24 L0,24 Z" />
                          </svg>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pt-3 pb-6 sm:pb-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                          <span className="text-2xl sm:text-3xl font-extrabold text-[#fcdd5e] tracking-tight font-sans select-none">
                            {number}
                          </span>
                          <span className="w-[1.5px] h-6 sm:h-7 bg-[#fcdd5e] flex-shrink-0" />
                          <h3 className="text-base sm:text-lg font-bold text-[#2b2d54] tracking-tight">
                            {val.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                          {val.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 5. "WHY CHOOSE H&S" Section from Database */}
        {activeWhyChoose.length > 0 && (
          <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5">
                  <span className="text-xs font-bold tracking-widest text-[#2b2d54]/80 uppercase mb-2 block">
                    WHY CHOOSE H&amp;S
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2b2d54] tracking-tight leading-tight mb-4">
                    Built on Precision.{' '}
                    <span className="text-[#2b2d54] block">Trusted by Hundreds.</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                    We deliver more than just compliance — we deliver peace of mind. Our commitment to accuracy, professional integrity and client-first approach make us a trusted partner for businesses of all sizes.
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {activeWhyChoose.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#FAF9F6] hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#fcdd5e]/25 text-[#2b2d54] flex items-center justify-center flex-shrink-0">
                        <DynamicIcon name={item.icon_name || 'FileText'} className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. CTA Banner */}
        <section className="w-full bg-[#2b2d54] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
              <path
                d="M0,160 C320,300 420,0 720,160 C1020,320 1120,60 1440,160 L1440,320 L0,320 Z"
                fill="#fcdd5e"
              />
              <path
                d="M0,96 C240,224 480,32 720,128 C960,224 1200,64 1440,96"
                stroke="#fcdd5e"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Need a tailored financial or tax solution?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
              Our certified consultants will understand your business needs and provide a customised solution that ensures compliance and long term growth.
            </p>
            <button
              type="button"
              data-open-consultation="true"
              className="inline-flex items-center justify-center gap-2 bg-[#fcdd5e] hover:bg-[#ebd04f] text-[#2b2d54] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md transition-all group w-full sm:w-auto cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#2b2d54] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <Footer settings={settings} />
    </div>
  );
}

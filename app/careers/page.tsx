import React from 'react';
import { Metadata } from 'next';
import { Briefcase, MapPin, Clock, ArrowRight, Mail } from 'lucide-react';
import { getCareers, getCareerSettings, getNavigationItems, getSiteSettings } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Careers & Opportunities | H&S Auditors',
  description:
    'Grow your career alongside experienced Chartered Accountants and tax consultants in a culture built on precision and merit.',
};

export const revalidate = 0; // Live database updates

export default async function CareersPage() {
  const [careers, careerSettings, navItems, settings] = await Promise.all([
    getCareers(),
    getCareerSettings(),
    getNavigationItems(),
    getSiteSettings(),
  ]);

  const email = careerSettings.email || settings?.email || 'info@hsauditors.com';

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow relative overflow-hidden">
        {/* Content Container */}
        <section className="relative z-10 pt-6 sm:pt-20 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-left sm:text-center">
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#2b2d54]/80 uppercase block mb-2 sm:mb-3">
              JOIN OUR PRACTICE
            </span>

            {/* Main Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2b2d54]">
              Careers &amp;{' '}
              <span className="text-[#2b2d54]">Opportunities</span>
            </h1>

            {/* Gold Divider Accent Line */}
            <div className="w-12 h-1 bg-[#fcdd5e] rounded-full my-3 sm:my-4 sm:mx-auto" />

            {/* Subtitle */}
            <p className="max-w-2xl sm:mx-auto text-xs xs:text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Grow your career alongside experienced Chartered Accountants and tax consultants in a culture built on precision and merit.
            </p>
          </div>

          {/* Job Openings Grid or Fallback Card */}
          <div className="mt-6 sm:mt-12 max-w-5xl mx-auto">
            {careers && careers.length > 0 ? (
              <div className="space-y-8">
                {/* 2-Column Responsive Card Grid for Aligned Job Openings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                  {careers.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(43,45,84,0.03)] hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Title & Department */}
                        <div className="mb-3">
                          <h2 className="text-lg sm:text-xl font-bold text-[#2b2d54] group-hover:opacity-80 transition-colors leading-snug">
                            {job.job_title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-500 mt-2">
                            <span className="inline-flex items-center gap-1 text-[#2b2d54] bg-[#fcdd5e]/25 px-2.5 py-1 rounded-md font-semibold">
                              <Briefcase className="w-3.5 h-3.5" />
                              {job.department}
                            </span>
                            <span className="inline-flex items-center gap-1 text-slate-500 bg-stone-100/70 px-2.5 py-1 rounded-md">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1 text-slate-500 bg-stone-100/70 px-2.5 py-1 rounded-md">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {job.employment_type}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3 line-clamp-3">
                          {job.description}
                        </p>

                        {/* Requirements */}
                        {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
                          <div className="pt-3 mb-3 bg-[#FAF7F2] p-3 rounded-xl">
                            <div className="text-[10.5px] font-bold text-[#2b2d54] uppercase tracking-wider mb-1.5">
                              Key Requirements:
                            </div>
                            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="line-clamp-2">{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Footer with Apply CTA */}
                      <div className="pt-3.5 flex items-center justify-between mt-auto">
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#2b2d54] transition-colors">
                          Immediate Vacancy
                        </span>
                        <a
                          href={`mailto:${email}?subject=Application for ${encodeURIComponent(job.job_title)}`}
                          className="inline-flex items-center gap-1.5 bg-[#2b2d54] hover:bg-[#222443] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all group-hover:translate-x-0.5"
                        >
                          <span>Apply via Email</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#fcdd5e]" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Editable Bottom Talent Pool Box below job postings */}
                <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 text-center shadow-[0_4px_24px_rgba(43,45,84,0.03)]">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2b2d54] mb-2">
                    {careerSettings.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-5 leading-relaxed font-normal">
                    {careerSettings.description}
                  </p>
                  <a
                    href={`mailto:${email}?subject=General%20Career%20Enquiry%20-%20H%26S%20Auditors`}
                    className="inline-flex items-center gap-2.5 bg-[#2b2d54] hover:bg-[#222443] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl shadow transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#fcdd5e]" />
                    <span>{careerSettings.button_text}</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Reference Design Card when No Current Openings */
              <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-center relative z-10 transition-all max-w-2xl mx-auto">
                {/* Briefcase Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#fcdd5e]/25 flex items-center justify-center text-[#2b2d54] mx-auto mb-6 shadow-xs">
                  <Briefcase className="w-7 h-7 stroke-[1.8]" />
                </div>

                {/* Card Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2b2d54] mb-3.5 tracking-tight">
                  No Current Openings
                </h2>

                {/* Card Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-normal">
                  {careerSettings.description ||
                    'We are not actively hiring for published roles at this moment. However, we always welcome profiles from talented CA finalists, semi-qualified accountants, and tax associates for future openings.'}
                </p>

                {/* CTA Button */}
                <a
                  href={`mailto:${email}?subject=General%20Career%20Enquiry%20-%20H%26S%20Auditors`}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#2b2d54] hover:bg-[#222443] text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 group w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 text-[#fcdd5e] group-hover:scale-110 transition-transform" />
                  <span>{careerSettings.button_text || `Send Your CV to ${email}`}</span>
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

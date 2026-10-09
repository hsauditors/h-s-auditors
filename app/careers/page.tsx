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
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar navItems={navItems} settings={settings} />

      <main className="flex-grow relative overflow-hidden">


        {/* Content Container */}
        <section className="relative z-10 pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#F59E0B] uppercase block mb-3">
              JOIN OUR PRACTICE
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-[#0B192C]">
              Careers &amp;{' '}
              <span className="text-[#2563EB]">Opportunities</span>
            </h1>

            {/* Gold Divider Accent Line */}
            <div className="w-12 h-1 bg-[#F59E0B] rounded-full mx-auto my-4" />

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
              Grow your career alongside experienced Chartered Accountants and tax consultants in a culture built on precision and merit.
            </p>
          </div>

          {/* Job Openings Grid or Fallback Card */}
          <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
            {careers && careers.length > 0 ? (
              <div className="space-y-8">
                {/* 2-Column Responsive Card Grid for Aligned Job Openings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                  {careers.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-blue-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-cardHover hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Title & Department */}
                        <div className="mb-3">
                          <h2 className="text-lg sm:text-xl font-bold text-[#0B192C] font-serif group-hover:text-[#2563EB] transition-colors leading-snug">
                            {job.job_title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-gray-500 mt-2">
                            <span className="inline-flex items-center gap-1 text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                              <Briefcase className="w-3.5 h-3.5" />
                              {job.department}
                            </span>
                            <span className="inline-flex items-center gap-1 text-gray-500">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1 text-gray-500">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              {job.employment_type}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-3 line-clamp-3">
                          {job.description}
                        </p>

                        {/* Requirements */}
                        {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
                          <div className="pt-3 border-t border-slate-100 mb-3">
                            <div className="text-[10.5px] font-bold text-[#0B192C] uppercase tracking-wider mb-1.5">
                              Key Requirements:
                            </div>
                            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="line-clamp-2">{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Footer with Apply CTA */}
                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <span className="text-[11px] font-semibold text-gray-400 group-hover:text-[#2563EB] transition-colors">
                          Immediate Vacancy
                        </span>
                        <a
                          href={`mailto:${email}?subject=Application for ${encodeURIComponent(job.job_title)}`}
                          className="inline-flex items-center gap-1.5 bg-[#07152E] hover:bg-[#0E2A5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all group-hover:translate-x-0.5"
                        >
                          <span>Apply via Email</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Editable Bottom Talent Pool Box below job postings */}
                <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-blue-100 text-center shadow-subtle">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B192C] mb-2">
                    {careerSettings.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mb-5 leading-relaxed">
                    {careerSettings.description}
                  </p>
                  <a
                    href={`mailto:${email}?subject=General%20Career%20Enquiry%20-%20H%26S%20Auditors`}
                    className="inline-flex items-center gap-2.5 bg-[#07152E] hover:bg-[#0E2A5C] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#F59E0B]" />
                    <span>{careerSettings.button_text}</span>
                  </a>
                </div>
              </div>
            ) : (
              /* EXACT Reference Design Card when No Current Openings */
              <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-center relative z-10 transition-all max-w-2xl mx-auto">
                {/* Briefcase Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] mx-auto mb-6 shadow-sm">
                  <Briefcase className="w-7 h-7 stroke-[1.8]" />
                </div>

                {/* Card Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] mb-3.5 tracking-tight">
                  No Current Openings
                </h2>

                {/* Card Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-normal">
                  {careerSettings.description ||
                    'We are not actively hiring for published roles at this moment. However, we always welcome profiles from talented CA finalists, semi-qualified accountants, and tax associates for future openings.'}
                </p>

                {/* CTA Button */}
                <a
                  href={`mailto:${email}?subject=General%20Career%20Enquiry%20-%20H%26S%20Auditors`}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#07152E] hover:bg-[#0E2A5C] text-white px-5 sm:px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 group w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B] group-hover:scale-110 transition-transform" />
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

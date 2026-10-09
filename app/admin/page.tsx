import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Factory,
  Users,
  Mail,
  Briefcase,
  ArrowRight,
  Clock,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Calendar,
  ShieldCheck,
  Building,
  Award,
  Settings,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getAllEnquiries } from '@/lib/enquiries';
import { getServices, getIndustries, getComplianceDeadlines, getCareers } from '@/lib/data';

export const revalidate = 0; // Live admin data

export default async function AdminDashboardPage() {
  const [
    services,
    industries,
    compliance,
    careers,
    allEnquiries,
  ] = await Promise.all([
    getServices().catch(() => []),
    getIndustries().catch(() => []),
    getComplianceDeadlines().catch(() => []),
    getCareers().catch(() => []),
    getAllEnquiries().catch(() => []),
  ]);

  const servicesCount = services?.length ?? 6;
  const industriesCount = industries?.length ?? 9;
  const complianceCount = compliance?.length ?? 9;
  const careersCount = careers?.length ?? 0;
  const enquiriesCount = allEnquiries.length;
  const recentEnquiries = allEnquiries.slice(0, 6);

  const statsCards = [
    {
      label: 'Services',
      count: servicesCount ?? 0,
      icon: FileText,
      href: '/admin/services',
      color: 'text-brand-blue bg-blue-50 border-blue-200',
    },
    {
      label: 'Compliance Deadlines',
      count: complianceCount ?? 0,
      icon: Clock,
      href: '/admin/compliance',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      label: 'Industries',
      count: industriesCount ?? 0,
      icon: Factory,
      href: '/admin/industries',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      label: 'Careers',
      count: careersCount ?? 0,
      icon: Briefcase,
      href: '/admin/careers',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      label: 'Enquiries',
      count: enquiriesCount ?? 0,
      icon: Mail,
      href: '/admin/enquiries',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  const sectionEditors = [
    {
      title: 'Hero Section',
      description: 'Banner headline, description, CTAs, trust points & hero team visuals',
      href: '/admin/hero',
      icon: Sparkles,
      color: 'bg-blue-50 text-brand-blue border-blue-200',
    },
    {
      title: 'Core Practice Areas',
      description: 'GST, Income Tax, Bookkeeping, Audit, Incorporation & Payroll services',
      href: '/admin/services',
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      title: 'Compliance Deadlines',
      description: 'Statutory calendar due dates for TDS, GSTR-1, GSTR-3B & Advance Tax',
      href: '/admin/compliance',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      title: 'Why Choose Us',
      description: '6 core value pillars, partner accessibility & quality guarantees',
      href: '/admin/why-choose',
      icon: ShieldCheck,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      title: 'About The Firm',
      description: 'Firm background narrative, 5 core features checklist & office photo',
      href: '/admin/about',
      icon: Building,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      title: 'Industry Verticals',
      description: '12 economic sectors served with tailored tax and audit solutions',
      href: '/admin/industries',
      icon: Factory,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
    },
    {
      title: 'Homepage Statistics',
      description: 'Live performance metrics (500+ Clients, 15+ Years, 100% Accuracy)',
      href: '/admin/stats',
      icon: BarChart3,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    },
    {
      title: 'Careers & Vacancies',
      description: 'Job openings, requirements, CA articleship positions & hiring status',
      href: '/admin/careers',
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      title: 'Site Settings & Contact',
      description: 'Phone numbers, emails, Harisree Square office address & SEO metadata',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-slate-100 text-slate-700 border-slate-300',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-brand-deepNavy to-brand-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
            Enterprise CMS Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            H&amp;S Auditors Control Center
          </h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Live database records are synchronized across the public website and Supabase storage.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-goldHover text-brand-deepNavy text-xs font-bold px-4 py-2.5 rounded-lg shadow transition-colors whitespace-nowrap"
        >
          <span>View Live Site</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="bg-white rounded-xl p-4 border border-brand-border/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-2xl font-black text-brand-deepNavy leading-tight">
                  {card.count}
                </div>
                <div className="text-xs font-semibold text-brand-muted mt-0.5">
                  {card.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Website Sections & Editors Hub */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-brand-deepNavy">
              Website Content &amp; Section Editors
            </h3>
            <p className="text-xs text-brand-muted">
              Select any section below or use the left sidebar to edit live website content
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sectionEditors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                href={sec.href}
                className="bg-white rounded-xl p-5 border border-brand-border/80 shadow-subtle hover:shadow-card hover:border-brand-blue/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${sec.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Edit <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-brand-deepNavy group-hover:text-brand-blue transition-colors">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-brand-deepNavy">
              Recent Client Enquiries
            </h3>
            <p className="text-xs text-brand-muted">
              Inquiries submitted through the public website contact form
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentEnquiries && recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-brand-border text-brand-deepNavy font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-5">Client Name</th>
                  <th className="py-3 px-5">Contact Details</th>
                  <th className="py-3 px-5">Message Snippet</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Received At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {((recentEnquiries as any[]) || []).map((enq: any) => (
                  <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5 font-bold text-brand-deepNavy">
                      {enq.name}
                    </td>
                    <td className="py-3 px-5 text-brand-text">
                      <div>{enq.email}</div>
                      <div className="text-brand-muted">{enq.phone}</div>
                    </td>
                    <td className="py-3 px-5 text-brand-muted max-w-xs truncate">
                      {enq.message}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === 'new'
                            ? 'bg-blue-100 text-blue-700'
                            : enq.status === 'contacted'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-brand-muted">
                      {formatDate(enq.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-brand-muted">
            No client enquiries received yet. Forms submitted on the public website will appear here in real time.
          </div>
        )}
      </div>
    </div>
  );
}

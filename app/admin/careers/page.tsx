'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Save,
  CheckCircle,
  AlertCircle,
  X,
  Briefcase,
  MapPin,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  ChevronDown,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Career } from '@/types';

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Career | null>(null);
  const [requirementsInput, setRequirementsInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Department Dropdown state populated from Services
  const [serviceDepartments, setServiceDepartments] = useState<string[]>([
    'Audit & Assurance',
    'GST Filing & Compliance',
    'Income Tax & Advisory',
    'Bookkeeping & Accounting',
    'Business Registration & Corporate Law',
    'Company Secretarial & ROC',
  ]);
  const [isCustomDept, setIsCustomDept] = useState(false);

  // Bottom "Talent Pool" Card state
  const [talentPoolSettings, setTalentPoolSettings] = useState({
    heading: "Don't see your role above?",
    description:
      'We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool.',
    button_text: 'Send Your CV to info@hsauditors.com',
    email: 'info@hsauditors.com',
  });
  const [savingTalentPool, setSavingTalentPool] = useState(false);

  useEffect(() => {
    fetchCareers();
    fetchServicesForDepartments();
    fetchTalentPoolSettings();
  }, []);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/save?table=careers');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCareers(data);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API fetch careers fallback:', err);
    }

    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('careers')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) setCareers(data as Career[]);
    } catch (err) {
      console.error('Supabase fetch careers error:', err);
    }
    setLoading(false);
  };

  const fetchServicesForDepartments = async () => {
    try {
      const res = await fetch('/api/admin/content/save?table=services');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const titles: string[] = [];
          data.forEach((s: any) => {
            if (s.title && !titles.includes(s.title)) {
              titles.push(s.title);
            }
            if (Array.isArray(s.sub_services)) {
              s.sub_services.forEach((sub: any) => {
                if (sub.title && !titles.includes(sub.title)) {
                  titles.push(sub.title);
                }
              });
            }
          });
          if (titles.length > 0) {
            setServiceDepartments((prev) => Array.from(new Set([...prev, ...titles])));
          }
        }
      }
    } catch (err) {
      console.warn('Error fetching services for department dropdown:', err);
    }
  };

  const fetchTalentPoolSettings = async () => {
    try {
      const res = await fetch('/api/admin/content/save?table=career_settings');
      if (res.ok) {
        const data = await res.json();
        if (data && data.talent_pool) {
          setTalentPoolSettings({
            heading: data.talent_pool.heading || "Don't see your role above?",
            description:
              data.talent_pool.description ||
              'We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool.',
            button_text: data.talent_pool.button_text || 'Send Your CV to info@hsauditors.com',
            email: data.talent_pool.email || 'info@hsauditors.com',
          });
        }
      }
    } catch (err) {
      console.warn('Error fetching talent pool card settings:', err);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem({
      id: '',
      job_title: '',
      department: serviceDepartments[0] || 'Audit & Assurance',
      location: 'Ottapalam, Kerala',
      employment_type: 'Full-time',
      description: '',
      requirements: [],
      display_order: careers.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsCustomDept(false);
    setRequirementsInput('');
    setIsModalOpen(true);
  };

  const handleEdit = (item: Career) => {
    setEditingItem({ ...item });
    const isCustom = !serviceDepartments.includes(item.department);
    setIsCustomDept(isCustom);

    const reqs = Array.isArray(item.requirements)
      ? item.requirements.join('\n')
      : typeof item.requirements === 'string'
      ? item.requirements
      : '';
    setRequirementsInput(reqs);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (item: Career) => {
    const updated = {
      ...item,
      is_active: !item.is_active,
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'careers',
          matchKey: 'id',
          matchValue: item.id,
          data: updated,
        }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setCareers((prev) => prev.map((c) => (c.id === item.id ? updated : c)));
      setMessage({
        type: 'success',
        text: `Job status changed to ${updated.is_active ? 'Active (Published)' : 'Closed'}`,
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating status' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently remove this career opening?')) return;

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'careers',
          id,
        }),
      });

      if (!res.ok) throw new Error('Failed to delete job');

      setMessage({ type: 'success', text: 'Career position removed successfully' });
      fetchCareers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting job' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setMessage(null);

    const careerId = editingItem.id || `career_${Date.now()}`;
    const parsedRequirements = requirementsInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const payload: Career = {
      ...editingItem,
      id: careerId,
      requirements: parsedRequirements,
      display_order: editingItem.display_order ?? careers.length + 1,
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'careers',
          matchKey: 'id',
          matchValue: careerId,
          data: payload,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save job opening');

      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Career opening saved & published!' });
      fetchCareers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving career opening' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTalentPool = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTalentPool(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'career_settings',
          matchKey: 'talent_pool',
          matchValue: 'talent_pool',
          data: {
            talent_pool: talentPoolSettings,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to save bottom card settings');

      setMessage({
        type: 'success',
        text: 'Bottom "Talent Pool" card saved and updated on live careers page!',
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving bottom card' });
    } finally {
      setSavingTalentPool(false);
    }
  };

  const activeCount = careers.filter((c) => c.is_active).length;
  const closedCount = careers.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Careers &amp; Opportunities
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-deepNavy">
            Careers CMS &amp; Open Positions
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Manage vacancies, article trainee positions, and spontaneous application settings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/careers"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
          >
            <span>Preview Public Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 text-brand-gold" />
            <span>Post New Opening</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border border-brand-border">
          <div className="text-xs font-semibold text-brand-muted">Total Positions</div>
          <div className="text-2xl font-black text-brand-deepNavy mt-1">{careers.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-brand-border">
          <div className="text-xs font-semibold text-green-600">Active (Live)</div>
          <div className="text-2xl font-black text-green-700 mt-1">{activeCount}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-brand-border">
          <div className="text-xs font-semibold text-gray-500">Closed / Draft</div>
          <div className="text-2xl font-black text-gray-700 mt-1">{closedCount}</div>
        </div>
      </div>

      {/* Notification banner */}
      {message && (
        <div
          className={`p-3.5 rounded-lg flex items-center justify-between gap-2 text-xs font-semibold ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Careers List */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-[#F8FAFC] flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-deepNavy">
            Published &amp; Draft Openings
          </h2>
          <span className="text-xs text-brand-muted">
            {activeCount === 0
              ? 'Public page currently displays the "No Current Openings" card.'
              : `${activeCount} opening${activeCount > 1 ? 's' : ''} currently live on website.`}
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-blue mx-auto" />
            <p className="text-xs text-brand-muted mt-2">Loading career openings...</p>
          </div>
        ) : careers.length > 0 ? (
          <div className="divide-y divide-brand-border/60">
            {careers.map((c) => (
              <div
                key={c.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-brand-deepNavy text-base">{c.job_title}</h3>
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        c.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.is_active ? 'Active' : 'Closed'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-brand-muted">
                    <span className="flex items-center gap-1 text-brand-blue">
                      <Briefcase className="w-3.5 h-3.5" />
                      {c.department || 'General'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {c.location || 'Ottapalam, Kerala'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {c.employment_type || 'Full-time'}
                    </span>
                  </div>

                  <p className="text-xs text-brand-text/80 line-clamp-2 max-w-2xl pt-1">
                    {c.description}
                  </p>

                  {Array.isArray(c.requirements) && c.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.requirements.slice(0, 3).map((req, rIdx) => (
                        <span
                          key={rIdx}
                          className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium"
                        >
                          {req}
                        </span>
                      ))}
                      {c.requirements.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-semibold self-center">
                          +{c.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(c)}
                    title={c.is_active ? 'Deactivate (Hide)' : 'Activate (Publish)'}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      c.is_active
                        ? 'border-gray-200 text-gray-600 hover:bg-gray-100'
                        : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {c.is_active ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Publish</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(c)}
                    className="p-2 text-brand-blue hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                    title="Edit Opening"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                    title="Delete Position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-brand-muted">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-3 border border-blue-100">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-brand-deepNavy mb-1">
              No Current Openings Posted
            </h3>
            <p className="max-w-md mx-auto mb-4">
              The public careers page is currently showcasing the official &ldquo;No Current Openings&rdquo; spontaneous application card.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 bg-brand-deepNavy hover:bg-brand-navy text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5 text-brand-gold" />
              <span>Create First Job Opening</span>
            </button>
          </div>
        )}
      </div>

      {/* Editable Bottom Talent Pool Card */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-deepNavy">
                Bottom Talent Pool Card (Spontaneous Applications)
              </h2>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Edit the card displayed at the bottom of the public careers page (&ldquo;Don&apos;t see your role above?&rdquo;)
            </p>
          </div>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full w-fit">
            Public Careers Footer Box
          </span>
        </div>

        <form onSubmit={handleSaveTalentPool} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                Card Heading
              </label>
              <input
                type="text"
                required
                value={talentPoolSettings.heading}
                onChange={(e) =>
                  setTalentPoolSettings({ ...talentPoolSettings, heading: e.target.value })
                }
                placeholder="Don't see your role above?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                Contact Email for CV Submissions
              </label>
              <input
                type="email"
                required
                value={talentPoolSettings.email}
                onChange={(e) =>
                  setTalentPoolSettings({ ...talentPoolSettings, email: e.target.value })
                }
                placeholder="info@hsauditors.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
              Card Description / Subtitle
            </label>
            <textarea
              rows={2}
              required
              value={talentPoolSettings.description}
              onChange={(e) =>
                setTalentPoolSettings({ ...talentPoolSettings, description: e.target.value })
              }
              placeholder="We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool."
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
              Button Label Text
            </label>
            <input
              type="text"
              required
              value={talentPoolSettings.button_text}
              onChange={(e) =>
                setTalentPoolSettings({ ...talentPoolSettings, button_text: e.target.value })
              }
              placeholder="Send Your CV to info@hsauditors.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue font-medium"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingTalentPool}
              className="px-5 py-2.5 rounded-lg bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              {savingTalentPool ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5 text-brand-gold" />
              )}
              <span>Save Bottom Card Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl p-6 sm:p-7 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h2 className="text-base font-bold text-brand-deepNavy">
                  {editingItem.id ? 'Edit Job Opening' : 'Post New Job Opening'}
                </h2>
                <p className="text-xs text-brand-muted">
                  Fill in the details to publish or update this career opportunity
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.job_title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, job_title: e.target.value })
                  }
                  placeholder="e.g. Semi-Qualified CA / Audit Senior"
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Department Arrow Dropdown populated from current Services */}
                <div>
                  <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1 flex items-center justify-between">
                    <span>Department *</span>
                  </label>
                  <div className="relative">
                    <select
                      value={
                        isCustomDept
                          ? '__custom__'
                          : serviceDepartments.includes(editingItem.department)
                          ? editingItem.department
                          : '__custom__'
                      }
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomDept(true);
                        } else {
                          setIsCustomDept(false);
                          setEditingItem({ ...editingItem, department: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue bg-white appearance-none pr-8 cursor-pointer font-medium"
                    >
                      <option value="">Choose Service / Department...</option>
                      {serviceDepartments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                      <option value="__custom__">+ Other / Custom Department...</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {isCustomDept && (
                    <input
                      type="text"
                      required
                      value={editingItem.department}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, department: e.target.value })
                      }
                      placeholder="Type custom department..."
                      className="w-full px-3 py-2 mt-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
                      autoFocus
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, location: e.target.value })
                    }
                    placeholder="Ottapalam, Kerala"
                    className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                    Employment Type
                  </label>
                  <div className="relative">
                    <select
                      value={editingItem.employment_type}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, employment_type: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue bg-white appearance-none pr-8 cursor-pointer"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Articleship / Trainee">Articleship / Trainee</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Job Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Describe key responsibilities and expectations for this role..."
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Key Requirements (One requirement per line)
                </label>
                <textarea
                  rows={3}
                  value={requirementsInput}
                  onChange={(e) => setRequirementsInput(e.target.value)}
                  placeholder="CA Inter / Semi-Qualified&#10;1-2 years experience in Statutory Audit&#10;Proficiency in Tally Prime and MS Excel"
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue resize-none font-mono"
                />
                <span className="text-[11px] text-brand-muted">
                  Enter each requirement on a new line; they will be displayed as neat checklist points.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  id="job_active"
                  type="checkbox"
                  checked={editingItem.is_active}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, is_active: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-blue rounded border-brand-border cursor-pointer"
                />
                <label
                  htmlFor="job_active"
                  className="text-xs font-bold text-brand-deepNavy cursor-pointer"
                >
                  Publish Job Opening immediately to live website
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-brand-border text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  {saving ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5 text-brand-gold" />
                  )}
                  <span>{editingItem.id ? 'Save Changes' : 'Publish Job'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

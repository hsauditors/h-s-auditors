'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Clock,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Enquiry } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setEnquiries(data as Enquiry[]);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Error fetching /api/admin/enquiries:', err);
    }

    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setEnquiries(data as Enquiry[]);
    } catch {}
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      setMessage({ type: 'success', text: `Status updated to ${newStatus}` });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update status' });
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete enquiry');
      }

      setMessage({ type: 'success', text: 'Enquiry deleted' });
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete enquiry' });
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const matchesSearch =
      search === '' ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-brand-deepNavy">
            Client Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-brand-muted">
            Incoming consultation requests from the public contact form
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'new', 'contacted', 'closed'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                filter === st
                  ? 'bg-brand-deepNavy text-white'
                  : 'bg-white border border-brand-border text-brand-muted hover:text-brand-deepNavy'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client name, email, phone or message..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-brand-border bg-white text-xs sm:text-sm text-brand-text placeholder-gray-400 outline-none focus:border-brand-blue"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-lg flex items-center gap-2 text-xs font-semibold ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Enquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-brand-border">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-blue mx-auto" />
          </div>
        ) : filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-border/80 shadow-subtle hover:shadow-card transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-brand-deepNavy">
                    {enq.name}
                  </h3>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      enq.status === 'new'
                        ? 'bg-blue-100 text-blue-700'
                        : enq.status === 'contacted'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(enq.created_at)}</span>
                </div>
              </div>

              {/* Contact info row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-text">
                <a
                  href={`mailto:${enq.email}`}
                  className="flex items-center gap-1.5 text-brand-blue hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{enq.email}</span>
                </a>
                <a
                  href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 text-brand-deepNavy hover:text-brand-blue"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{enq.phone}</span>
                </a>
              </div>

              {/* Message */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-brand-border/60 text-xs sm:text-sm text-brand-text leading-relaxed whitespace-pre-wrap">
                {enq.message}
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-brand-muted uppercase">
                    Update Status:
                  </span>
                  {(['new', 'contacted', 'closed'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={enq.status === st}
                      onClick={() => updateStatus(enq.id, st)}
                      className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-colors ${
                        enq.status === st
                          ? 'bg-gray-100 text-gray-400 cursor-default'
                          : 'bg-white border border-brand-border hover:bg-brand-softBlue text-brand-deepNavy'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => deleteEnquiry(enq.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-brand-border text-xs text-brand-muted">
            No enquiries matching this criteria.
          </div>
        )}
      </div>
    </div>
  );
}

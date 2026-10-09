'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Save,
  CheckCircle,
  AlertCircle,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ComplianceDeadline } from '@/types';

export default function AdminCompliancePage() {
  const [deadlines, setDeadlines] = useState<ComplianceDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ComplianceDeadline | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const fetchDeadlines = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/save?table=compliance_deadlines');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setDeadlines(data);
          setLoading(false);
          return;
        }
      }
    } catch {}

    const supabase = createClient();
    const { data } = await supabase
      .from('compliance_deadlines')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) setDeadlines(data as ComplianceDeadline[]);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingItem({
      id: '',
      compliance: '',
      form: '',
      due_date: '',
      display_order: deadlines.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: ComplianceDeadline) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this compliance deadline?')) return;

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'compliance_deadlines',
          id: id,
        }),
      });

      if (!res.ok) throw new Error('Failed to delete deadline');
      setMessage({ type: 'success', text: 'Deadline removed successfully' });
      fetchDeadlines();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting deadline' });
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= deadlines.length) return;

    const newItems = [...deadlines];
    const current = newItems[index];
    const target = newItems[targetIndex];

    const tempOrder = current.display_order;
    current.display_order = target.display_order;
    target.display_order = tempOrder;

    newItems[index] = target;
    newItems[targetIndex] = current;

    setDeadlines(newItems);

    try {
      await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'compliance_deadlines',
          items: newItems.map((d, idx) => ({ id: d.id, display_order: idx + 1 })),
        }),
      });
      setMessage({ type: 'success', text: 'Display order updated' });
    } catch (err) {
      console.error('Reorder error:', err);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'compliance_deadlines',
          matchKey: 'id',
          matchValue: editingItem.id || undefined,
          data: {
            ...editingItem,
            id: editingItem.id || `deadline_${Date.now()}`,
            updated_at: new Date().toISOString(),
          },
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save compliance deadline');

      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Deadline saved successfully!' });
      fetchDeadlines();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving deadline' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-brand-deepNavy">
            Compliance Deadlines CMS
          </h1>
          <p className="text-xs text-brand-muted">
            Configure statutory Indian tax &amp; ROC calendar dates shown on the homepage
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Add Deadline</span>
        </button>
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

      {/* Deadlines Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-blue mx-auto" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-brand-border text-brand-deepNavy font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Compliance Obligation</th>
                  <th className="py-3 px-4">Statutory Form</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center w-24">Reorder</th>
                  <th className="py-3 px-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {deadlines.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-gray-400">
                      {item.display_order}
                    </td>
                    <td className="py-3 px-4 font-bold text-brand-deepNavy text-sm">
                      {item.compliance}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700 font-medium">
                        {item.form}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand-blue">
                      {item.due_date}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMove(index, 'up')}
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === deadlines.length - 1}
                          onClick={() => handleMove(index, 'down')}
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="p-1.5 text-brand-blue hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-brand-border">
              <h2 className="text-base font-bold text-brand-deepNavy">
                {editingItem.id ? 'Edit Compliance Deadline' : 'Add Compliance Deadline'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Compliance Description *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.compliance}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, compliance: e.target.value })
                  }
                  placeholder="e.g. GST outward supplies"
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Statutory Form *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.form}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, form: e.target.value })
                  }
                  placeholder="e.g. GSTR-1"
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Due Date *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.due_date}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, due_date: e.target.value })
                  }
                  placeholder="e.g. 11th of the following month"
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  id="dead_active"
                  type="checkbox"
                  checked={editingItem.is_active}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, is_active: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-blue rounded border-brand-border"
                />
                <label htmlFor="dead_active" className="text-xs font-bold text-brand-deepNavy">
                  Show on Homepage Calendar Table
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
                  className="px-5 py-2 rounded-lg bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold flex items-center gap-1.5"
                >
                  {saving ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5 text-brand-gold" />
                  )}
                  <span>Save Deadline</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

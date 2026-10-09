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
import { ValueItem } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export default function AdminValuesPage() {
  const [values, setValues] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ValueItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('values')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) setValues(data as ValueItem[]);
    setLoading(false);
  };

  const handleEdit = (item: ValueItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('values')
        .update({
          title: editingItem.title,
          description: editingItem.description,
          icon_name: editingItem.icon_name,
          is_active: editingItem.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingItem.id);

      if (error) throw error;
      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Value card saved successfully!' });
      fetchValues();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving value' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-brand-deepNavy">
          Core Values CMS
        </h1>
        <p className="text-xs text-brand-muted">
          Integrity · Confidentiality · Timely foundational firm standards
        </p>
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((val) => (
          <div
            key={val.id}
            className="bg-white rounded-2xl p-6 border border-brand-border shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-softBlue text-brand-blue flex items-center justify-center mb-4">
                <DynamicIcon name={val.icon_name} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-deepNavy mb-2">
                {val.title}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                {val.description}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  val.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {val.is_active ? 'Active' : 'Disabled'}
              </span>

              <button
                type="button"
                onClick={() => handleEdit(val)}
                className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-brand-border">
              <h2 className="text-base font-bold text-brand-deepNavy">
                Edit Value Card: {editingItem.title}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Lucide Icon Name
                </label>
                <input
                  type="text"
                  value={editingItem.icon_name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, icon_name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  id="val_active"
                  type="checkbox"
                  checked={editingItem.is_active}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, is_active: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-blue rounded border-brand-border"
                />
                <label htmlFor="val_active" className="text-xs font-bold text-brand-deepNavy">
                  Visible on Homepage
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
                  <span>Save Value</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

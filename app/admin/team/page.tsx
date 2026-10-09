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
  Users,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { TeamMember } from '@/types';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) setMembers(data as TeamMember[]);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingItem({
      id: '',
      name: '',
      designation: '',
      image_url: null,
      biography: '',
      linkedin_url: '',
      email: '',
      display_order: members.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: TeamMember) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('team_members').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Team member removed' });
      fetchTeam();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'team_members',
          matchKey: 'id',
          matchValue: editingItem.id || undefined,
          data: {
            name: editingItem.name,
            designation: editingItem.designation,
            image_url: editingItem.image_url,
            biography: editingItem.biography,
            linkedin_url: editingItem.linkedin_url,
            email: editingItem.email,
            display_order: editingItem.display_order,
            is_active: editingItem.is_active,
            id: editingItem.id || undefined,
          },
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save team member');

      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Team member and photo saved successfully!' });
      fetchTeam();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving team member' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-brand-deepNavy">
            Team Members CMS
          </h1>
          <p className="text-xs text-brand-muted">
            Add real partners, chartered accountants, and practice associates
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Add Team Member</span>
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

      {/* Team List */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-blue mx-auto" />
          </div>
        ) : members.length > 0 ? (
          <div className="divide-y divide-brand-border/60">
            {members.map((m) => (
              <div key={m.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-brand-deepNavy text-sm">{m.name}</h3>
                  <div className="text-xs text-brand-blue font-medium">{m.designation}</div>
                  {m.email && <div className="text-xs text-brand-muted">{m.email}</div>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(m)}
                    className="p-1.5 text-brand-blue hover:bg-blue-50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-brand-muted">
            <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            No team members added yet. Click &quot;Add Team Member&quot; above to publish your leadership profiles.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-brand-border">
              <h2 className="text-base font-bold text-brand-deepNavy">
                {editingItem.id ? 'Edit Team Member' : 'Add Team Member'}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.designation}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, designation: e.target.value })
                  }
                  placeholder="e.g. Senior Partner & Chartered Accountant"
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                  Biography
                </label>
                <textarea
                  rows={2}
                  value={editingItem.biography || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, biography: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
                />
              </div>

              <ImageUploader
                label="Profile Photo (Cloudinary)"
                aspectRatioLabel="Square (1:1)"
                currentImageUrl={editingItem.image_url}
                onImageUploaded={(url) =>
                  setEditingItem({ ...editingItem, image_url: url })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={editingItem.linkedin_url || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, linkedin_url: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingItem.email || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, email: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
                  />
                </div>
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
                  <span>Save Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, AlertCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AboutContent, AboutFeature } from '@/types';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    eyebrow: '',
    heading: '',
    paragraph_1: '',
    paragraph_2: '',
    image_url: '',
    image_alt: '',
    cta_text: '',
    cta_link: '',
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    setLoading(true);
    let aboutItem = null;
    let featuresList: AboutFeature[] = [];

    try {
      const supabase = createClient();
      const [{ data: aboutData }, { data: featuresData }] = await Promise.all([
        supabase.from('about_content').select('*').limit(1).single(),
        supabase.from('about_features').select('*').order('display_order', { ascending: true }),
      ]);
      if (aboutData) aboutItem = aboutData;
      if (featuresData) featuresList = featuresData as AboutFeature[];
    } catch {}

    try {
      const res = await fetch('/api/admin/content/save?table=about_content');
      if (res.ok) {
        const overrides = await res.json();
        const firstOverride = Object.values(overrides)[0] as any;
        if (firstOverride) {
          aboutItem = { ...(aboutItem || {}), ...firstOverride };
        }
      }
    } catch {}

    if (aboutItem) {
      setAbout(aboutItem);
      setFormData({
        eyebrow: aboutItem.eyebrow || '',
        heading: aboutItem.heading || '',
        paragraph_1: aboutItem.paragraph_1 || '',
        paragraph_2: aboutItem.paragraph_2 || '',
        image_url: aboutItem.image_url || '',
        image_alt: aboutItem.image_alt || '',
        cta_text: aboutItem.cta_text || '',
        cta_link: aboutItem.cta_link || '',
      });
    }

    if (featuresList.length > 0) {
      setFeatures(featuresList);
    }

    setLoading(false);
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'about_content',
          matchKey: 'id',
          matchValue: about?.id || 'default',
          data: {
            ...formData,
            id: about?.id,
          },
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save about content');

      setMessage({ type: 'success', text: 'About firm content and image saved successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving about content' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureTitle.trim()) return;

    const supabase = createClient();
    const { error } = await supabase.from('about_features').insert([
      {
        title: newFeatureTitle.trim(),
        display_order: features.length + 1,
        is_active: true,
      },
    ]);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setNewFeatureTitle('');
      fetchAboutData();
    }
  };

  const handleDeleteFeature = async (id: string) => {
    const supabase = createClient();
    await supabase.from('about_features').delete().eq('id', id);
    fetchAboutData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-brand-deepNavy">
            About Firm CMS &amp; Capabilities
          </h1>
          <p className="text-xs text-brand-muted">
            Manage the About The Firm narrative, office imagery, and checklist deliverables
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAbout}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          {saving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 text-brand-gold" />
          )}
          <span>Save About Section</span>
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

      {/* Main Narrative Form */}
      <form onSubmit={handleSaveAbout} className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={formData.eyebrow}
              onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
            Paragraph 1 (Primary Firm Introduction)
          </label>
          <textarea
            rows={3}
            value={formData.paragraph_1}
            onChange={(e) => setFormData({ ...formData, paragraph_1: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1">
            Paragraph 2 (Commitment to Integrity &amp; Timeliness)
          </label>
          <textarea
            rows={3}
            value={formData.paragraph_2}
            onChange={(e) => setFormData({ ...formData, paragraph_2: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
          />
        </div>

        {/* Office Photo Uploader */}
        <div className="border-t border-brand-border pt-4 space-y-4">
          <ImageUploader
            label="Corporate Office Reception Photo"
            currentImageUrl={formData.image_url}
            onImageUploaded={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
          />

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg shadow transition-all"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin text-brand-gold" />
              ) : (
                <Save className="w-4 h-4 text-brand-gold" />
              )}
              <span>Save About Section</span>
            </button>
          </div>
        </div>
      </form>

      {/* About Checklist Features */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-brand-deepNavy uppercase">
          About Checklist Capabilities (5 Items)
        </h2>

        <form onSubmit={handleAddFeature} className="flex gap-2">
          <input
            type="text"
            required
            value={newFeatureTitle}
            onChange={(e) => setNewFeatureTitle(e.target.value)}
            placeholder="Add new checklist capability..."
            className="flex-1 px-3 py-2 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
          />
          <button
            type="submit"
            className="bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 text-brand-gold" />
            <span>Add</span>
          </button>
        </form>

        <div className="divide-y divide-brand-border/60">
          {features.map((feat) => (
            <div key={feat.id} className="py-2.5 flex items-center justify-between text-xs sm:text-sm text-brand-text">
              <span>{feat.title}</span>
              <button
                type="button"
                onClick={() => handleDeleteFeature(feat.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

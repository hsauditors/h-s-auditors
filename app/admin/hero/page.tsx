'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { HomepageSection } from '@/types';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminHeroPage() {
  const [heroData, setHeroData] = useState<HomepageSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    eyebrow: '',
    headline: '',
    description: '',
    primary_cta_text: '',
    primary_cta_link: '',
    secondary_cta_text: '',
    secondary_cta_link: '',
    trust_badge_value: '',
    trust_badge_label: '',
    desktop_image_url: '',
    mobile_image_url: '',
    image_alt: '',
    is_active: true,
  });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    setLoading(true);
    let hero = null;

    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('homepage_sections')
        .select('*')
        .eq('section_key', 'hero')
        .single();
      if (data) hero = data;
    } catch {}

    try {
      const res = await fetch('/api/admin/content/save?table=homepage_sections');
      if (res.ok) {
        const overrides = await res.json();
        if (overrides.hero) {
          hero = { ...(hero || {}), ...overrides.hero };
        }
      }
    } catch {}

    if (hero) {
      setHeroData(hero);
      setFormData({
        eyebrow: hero.eyebrow || '',
        headline: hero.headline || '',
        description: hero.description || '',
        primary_cta_text: hero.primary_cta_text || '',
        primary_cta_link: hero.primary_cta_link || '',
        secondary_cta_text: hero.secondary_cta_text || '',
        secondary_cta_link: hero.secondary_cta_link || '',
        trust_badge_value: hero.trust_badge_value || '',
        trust_badge_label: hero.trust_badge_label || '',
        desktop_image_url: hero.desktop_image_url || '',
        mobile_image_url: hero.mobile_image_url || '',
        image_alt: hero.image_alt || '',
        is_active: hero.is_active ?? true,
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'homepage_sections',
          matchKey: 'section_key',
          matchValue: 'hero',
          data: {
            ...formData,
            section_key: 'hero',
          },
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to update hero section');

      setMessage({ type: 'success', text: 'Hero section and images updated successfully!' });
      fetchHeroData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update hero section' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-brand-deepNavy">
            Hero Section CMS
          </h1>
          <p className="text-xs text-brand-muted">
            Manage the full-width homepage hero content, CTAs, and Cloudinary media
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          {saving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 text-brand-gold" />
          )}
          <span>Save Changes</span>
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

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Eyebrow */}
        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
            Eyebrow Label
          </label>
          <input
            type="text"
            value={formData.eyebrow}
            onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
            Main Headline
          </label>
          <textarea
            rows={2}
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
            Hero Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
          />
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Primary CTA Text
            </label>
            <input
              type="text"
              value={formData.primary_cta_text}
              onChange={(e) => setFormData({ ...formData, primary_cta_text: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Primary CTA Link
            </label>
            <input
              type="text"
              value={formData.primary_cta_link}
              onChange={(e) => setFormData({ ...formData, primary_cta_link: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Secondary CTA Text
            </label>
            <input
              type="text"
              value={formData.secondary_cta_text}
              onChange={(e) => setFormData({ ...formData, secondary_cta_text: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Secondary CTA Link
            </label>
            <input
              type="text"
              value={formData.secondary_cta_link}
              onChange={(e) => setFormData({ ...formData, secondary_cta_link: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Trust Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Trust Badge Value
            </label>
            <input
              type="text"
              value={formData.trust_badge_value}
              onChange={(e) => setFormData({ ...formData, trust_badge_value: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Trust Badge Label
            </label>
            <input
              type="text"
              value={formData.trust_badge_label}
              onChange={(e) => setFormData({ ...formData, trust_badge_label: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Media Management - Desktop & Mobile Separate Uploaders */}
        <div className="border-t border-brand-border pt-6 space-y-6">
          <h3 className="text-sm font-bold text-brand-deepNavy uppercase">
            Hero Visual Media
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUploader
              label="Desktop Hero Image"
              aspectRatioLabel="Landscape (16:9 or 16:10)"
              currentImageUrl={formData.desktop_image_url}
              onImageUploaded={(url) => setFormData((prev) => ({ ...prev, desktop_image_url: url }))}
            />

            <ImageUploader
              label="Mobile Hero Image"
              aspectRatioLabel="Portrait or Square (4:3)"
              currentImageUrl={formData.mobile_image_url}
              onImageUploaded={(url) => setFormData((prev) => ({ ...prev, mobile_image_url: url }))}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Image Alt Description (SEO &amp; Accessibility)
            </label>
            <input
              type="text"
              value={formData.image_alt}
              onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Section Active toggle */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              id="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-brand-blue rounded border-brand-border focus:ring-brand-blue"
            />
            <label htmlFor="is_active" className="text-xs font-bold text-brand-deepNavy">
              Publish &amp; display hero section on homepage
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-brand-deepNavy hover:bg-brand-navy text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin text-brand-gold" />
            ) : (
              <Save className="w-4 h-4 text-brand-gold" />
            )}
            <span>Save All Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

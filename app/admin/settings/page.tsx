'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, AlertCircle, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { SiteSettings } from '@/types';
import { AdminToast } from '@/components/admin/AdminToast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    company_name: '',
    tagline: '',
    logo_url: '/logo.png',
    phone: '',
    landline: '',
    email: '',
    office_address: '',
    linkedin_url: '',
    instagram_url: '',
    youtube_url: '',
    default_seo_title: '',
    default_seo_description: '',
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    let sData: any = null;
    try {
      const res = await fetch('/api/admin/content/save?table=site_settings');
      if (res.ok) {
        const json = await res.json();
        sData = json.default || json.settings || (Object.values(json)[0] as any);
      }
    } catch {}

    if (!sData) {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('site_settings').select('*').limit(1).single();
        if (data) sData = data;
      } catch {}
    }

    if (sData) {
      setSettings(sData);
      setFormData({
        company_name: sData.company_name || '',
        tagline: sData.tagline || '',
        logo_url: sData.logo_url || '/logo.png',
        phone: sData.phone || '',
        landline: sData.landline || '',
        email: sData.email || '',
        office_address: sData.office_address || '',
        linkedin_url: sData.linkedin_url || '',
        instagram_url: sData.instagram_url || '',
        youtube_url: sData.youtube_url || '',
        default_seo_title: sData.default_seo_title || '',
        default_seo_description: sData.default_seo_description || '',
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const settingId = settings?.id || '00000000-0000-0000-0000-000000000001';

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'site_settings',
          matchKey: 'id',
          matchValue: settingId,
          data: {
            ...formData,
            id: settingId,
            updated_at: new Date().toISOString(),
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || 'Failed to save settings');
      setMessage({ type: 'success', text: 'Site settings and contact info saved successfully!' });
      fetchSettings();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setMessage(null);

    const body = new FormData();
    body.append('file', file);
    body.append('folder', 'hs_auditors/logo');

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Upload failed');
      setFormData((prev) => ({ ...prev, logo_url: data.url }));
      setMessage({ type: 'success', text: 'New logo uploaded! Click "Save Settings" to publish site-wide.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to upload logo' });
    } finally {
      setUploadingLogo(false);
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
            Site Settings &amp; Corporate Identity
          </h1>
          <p className="text-xs text-brand-muted">
            Update firm contact details, addresses, social channels, and global SEO metadata
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
          <span>Save Settings</span>
        </button>
      </div>

      <AdminToast message={message} onClose={() => setMessage(null)} />

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Brand Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Firm Name
            </label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Corporate Brand Logo Configuration */}
        <div className="border-t border-brand-border pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-brand-deepNavy uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-brand-blue" />
                <span>Firm Logo Asset</span>
              </h3>
              <p className="text-[11px] text-brand-muted mt-0.5">
                Primary logo displayed across Header, Footer, Admin, and Browser Favicon
              </p>
            </div>
            <label className="inline-flex items-center gap-2 bg-brand-lightBlue hover:bg-blue-100 text-brand-blue px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm">
              {uploadingLogo ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{uploadingLogo ? 'Uploading...' : 'Upload New Logo'}</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoUpload}
                disabled={uploadingLogo}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-brand-muted mb-1">
                Logo URL or Path (Default: /logo.png)
              </label>
              <input
                type="text"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="/logo.png"
                className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
              />
            </div>

            {/* Live Dual Preview */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2.5 flex flex-col items-center justify-center min-h-[64px]">
                <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Header (Light)</span>
                <div className="relative h-9 w-full flex items-center justify-center">
                  <Image
                    src={formData.logo_url || '/logo.png'}
                    alt="Logo Preview Light"
                    width={180}
                    height={40}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 bg-[#2b2d54] border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center min-h-[64px]">
                <span className="text-[10px] uppercase font-bold text-gray-300 mb-1">Footer/Admin (Dark)</span>
                <div className="relative h-9 w-full flex items-center justify-center">
                  <Image
                    src={formData.logo_url && formData.logo_url !== '/logo.png' ? formData.logo_url : '/images/hs-logo-dark.svg'}
                    alt="Logo Preview Dark"
                    width={180}
                    height={40}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Numbers & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-brand-border pt-6">
          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Mobile Phone
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Landline
            </label>
            <input
              type="text"
              value={formData.landline}
              onChange={(e) => setFormData({ ...formData, landline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Office Address */}
        <div>
          <label className="block text-xs font-bold text-brand-deepNavy uppercase mb-1.5">
            Office Headquarters Address
          </label>
          <textarea
            rows={2}
            required
            value={formData.office_address}
            onChange={(e) => setFormData({ ...formData, office_address: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-xs sm:text-sm text-brand-text outline-none focus:border-brand-blue resize-none"
          />
        </div>

        {/* Social Media Links */}
        <div className="border-t border-brand-border pt-6 space-y-4">
          <h3 className="text-xs font-bold text-brand-deepNavy uppercase tracking-wider">
            Social Media Profiles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-brand-muted mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-brand-muted mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-brand-muted mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={formData.youtube_url}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="border-t border-brand-border pt-6 space-y-4">
          <h3 className="text-xs font-bold text-brand-deepNavy uppercase tracking-wider">
            Default Search Engine Optimization (SEO)
          </h3>
          <div>
            <label className="block text-[11px] font-semibold text-brand-muted mb-1">
              Default Meta Title
            </label>
            <input
              type="text"
              value={formData.default_seo_title}
              onChange={(e) => setFormData({ ...formData, default_seo_title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-brand-muted mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.default_seo_description}
              onChange={(e) => setFormData({ ...formData, default_seo_description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text outline-none focus:border-brand-blue resize-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

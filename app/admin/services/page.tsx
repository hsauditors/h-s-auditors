'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  FileCheck,
  Receipt,
  Calculator,
  BookOpen,
  Landmark,
  Award,
  ShieldCheck,
  FileText,
  TrendingUp,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { SubService } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon?: string;
  display_order: number;
  is_active: boolean;
  sub_services?: SubService[];
  [key: string]: any;
}

interface ServicesBannerState {
  eyebrow: string;
  headline: string;
  description: string;
  image_url: string;
}

const COMMON_ICONS = [
  'FileText',
  'TrendingUp',
  'Calculator',
  'ShieldCheck',
  'FileCheck',
  'Receipt',
  'BookOpen',
  'Landmark',
  'Award',
  'Users',
];

export default function AdminServicesPage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Banner State
  const [bannerOpen, setBannerOpen] = useState(true);
  const [bannerData, setBannerData] = useState<ServicesBannerState>({
    eyebrow: 'OUR SERVICES',
    headline: 'Accounting, Audit & Advisory Services',
    description:
      'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.',
    image_url: '/images/service-accounting.jpg',
  });
  const [bannerSaving, setBannerSaving] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [isDraggingBanner, setIsDraggingBanner] = useState(false);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  // Sub-Card Modal State
  const [isSubCardModalOpen, setIsSubCardModalOpen] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);
  const [editingSubCard, setEditingSubCard] = useState<SubService | null>(null);
  const [subCardUploading, setSubCardUploading] = useState(false);
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const subCardFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [srvRes, bannerRes] = await Promise.all([
        fetch('/api/admin/content/save?table=services'),
        fetch('/api/admin/content/save?table=services_banner'),
      ]);

      if (srvRes.ok) {
        const data = await srvRes.json();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      }

      if (bannerRes.ok) {
        const bData = await bannerRes.json();
        if (bData && bData.headline) {
          setBannerData({
            eyebrow: bData.eyebrow || 'OUR SERVICES',
            headline: bData.headline || 'Accounting, Audit & Advisory Services',
            description: bData.description || '',
            image_url: bData.image_url || '/images/service-accounting.jpg',
          });
        }
      }
    } catch (err) {
      console.warn('Error fetching services CMS data:', err);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/content/save?table=services');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      }
    } catch (err) {
      console.warn('Error refetching services:', err);
    }
  };

  // =========================================================================
  // Banner Handlers
  // =========================================================================

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services_banner',
          matchKey: 'id',
          matchValue: 'banner',
          data: {
            id: 'banner',
            ...bannerData,
          },
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to save services banner');
      }

      setMessage({ type: 'success', text: 'Services banner updated successfully! Live on public page.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving services banner' });
    } finally {
      setBannerSaving(false);
    }
  };

  const handleUploadBannerFile = async (file: File) => {
    setBannerUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'hs_auditors/services');

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Upload failed');

      const uploadedUrl = resData.media?.secure_url;
      if (uploadedUrl) {
        setBannerData((prev) => ({ ...prev, image_url: uploadedUrl }));
        setMessage({ type: 'success', text: 'Banner image uploaded! Click "Save Banner Settings" to apply.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error uploading image' });
    } finally {
      setBannerUploading(false);
      if (bannerFileInputRef.current) bannerFileInputRef.current.value = '';
    }
  };

  const handleBannerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleUploadBannerFile(file);
  };

  // =========================================================================
  // Category Handlers
  // =========================================================================

  const handleOpenCreateCategory = () => {
    setEditingCategory({
      id: '',
      title: '',
      slug: '',
      short_description: '',
      icon: 'FileText',
      display_order: categories.length + 1,
      is_active: true,
      sub_services: [],
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: ServiceCategory) => {
    setEditingCategory({ ...cat });
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service category and all its cards?')) {
      return;
    }

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services',
          id: id,
        }),
      });

      if (!res.ok) throw new Error('Failed to delete category');
      setMessage({ type: 'success', text: 'Category removed successfully' });
      fetchServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting category' });
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setSaving(true);
    setMessage(null);

    const catId = editingCategory.id || `cat_${Date.now()}`;
    const slug =
      editingCategory.slug ||
      editingCategory.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload = {
      ...editingCategory,
      id: catId,
      slug,
      sub_services: editingCategory.sub_services || [],
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services',
          matchKey: 'id',
          matchValue: catId,
          data: payload,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save category');

      setIsCategoryModalOpen(false);
      setMessage({ type: 'success', text: 'Category saved successfully!' });
      fetchServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving category' });
    } finally {
      setSaving(false);
    }
  };

  const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newCats = [...categories];
    const current = newCats[index];
    const target = newCats[targetIndex];

    const tempOrder = current.display_order;
    current.display_order = target.display_order;
    target.display_order = tempOrder;

    newCats[index] = target;
    newCats[targetIndex] = current;

    setCategories(newCats);

    try {
      await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services',
          items: newCats.map((c, idx) => ({ id: c.id, display_order: idx + 1 })),
        }),
      });
      setMessage({ type: 'success', text: 'Category order updated' });
    } catch (err) {
      console.error('Reorder error:', err);
    }
  };

  // =========================================================================
  // Sub-Card Handlers (With Image Support)
  // =========================================================================

  const handleOpenAddSubCard = (categoryId: string) => {
    setParentCategoryId(categoryId);
    setEditingSubCard({
      id: `sub_${Date.now()}`,
      title: '',
      description: '',
      image_url: '',
    });
    setIsSubCardModalOpen(true);
  };

  const handleOpenEditSubCard = (categoryId: string, sub: SubService) => {
    setParentCategoryId(categoryId);
    setEditingSubCard({
      ...sub,
      image_url: sub.image_url || '',
    });
    setIsSubCardModalOpen(true);
  };

  const handleUploadCardFile = async (file: File) => {
    if (!editingSubCard) return;
    setSubCardUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'hs_auditors/services');

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Upload failed');

      const uploadedUrl = resData.media?.secure_url;
      if (uploadedUrl) {
        setEditingSubCard((prev) => (prev ? { ...prev, image_url: uploadedUrl } : null));
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error uploading card image' });
    } finally {
      setSubCardUploading(false);
      if (subCardFileInputRef.current) subCardFileInputRef.current.value = '';
    }
  };

  const handleSubCardFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleUploadCardFile(file);
  };

  const handleDeleteSubCard = async (categoryId: string, subId: string) => {
    if (!confirm('Are you sure you want to remove this service card?')) return;

    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;

    const updatedSubServices = (cat.sub_services || []).filter((s) => s.id !== subId);
    const updatedCategory = { ...cat, sub_services: updatedSubServices };

    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? updatedCategory : c))
    );

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services',
          matchKey: 'id',
          matchValue: cat.id,
          data: updatedCategory,
        }),
      });
      if (!res.ok) throw new Error('Failed to delete card');
      setMessage({ type: 'success', text: 'Service card deleted successfully' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting card' });
      fetchServices();
    }
  };

  const handleSaveSubCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubCard || !parentCategoryId) return;
    setSaving(true);
    setMessage(null);

    const cat = categories.find((c) => c.id === parentCategoryId);
    if (!cat) return;

    const currentSubs = cat.sub_services || [];
    const existingIndex = currentSubs.findIndex((s) => s.id === editingSubCard.id);

    let updatedSubs: SubService[];
    if (existingIndex >= 0) {
      updatedSubs = [...currentSubs];
      updatedSubs[existingIndex] = editingSubCard;
    } else {
      updatedSubs = [...currentSubs, editingSubCard];
    }

    const updatedCategory = {
      ...cat,
      sub_services: updatedSubs,
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services',
          matchKey: 'id',
          matchValue: cat.id,
          data: updatedCategory,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to save sub-card');

      setIsSubCardModalOpen(false);
      setMessage({ type: 'success', text: 'Service card saved successfully!' });
      fetchServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving service card' });
    } finally {
      setSaving(false);
    }
  };

  const handleMoveSubCard = async (categoryId: string, subIndex: number, direction: 'up' | 'down') => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat || !cat.sub_services) return;

    const targetIndex = direction === 'up' ? subIndex - 1 : subIndex + 1;
    if (targetIndex < 0 || targetIndex >= cat.sub_services.length) return;

    const newSubs = [...cat.sub_services];
    const temp = newSubs[subIndex];
    newSubs[subIndex] = newSubs[targetIndex];
    newSubs[targetIndex] = temp;

    const updatedCategory = { ...cat, sub_services: newSubs };

    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? updatedCategory : c))
    );

    try {
      await fetch('/api/admin/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'services',
          matchKey: 'id',
          matchValue: cat.id,
          data: updatedCategory,
        }),
      });
      setMessage({ type: 'success', text: 'Cards reordered successfully' });
    } catch (err) {
      console.error('Error reordering cards:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  const parentCat = categories.find((c) => c.id === parentCategoryId);

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-extrabold text-[#0B192C]">
              Services &amp; Categories CMS
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Customize the public Services page banner, categories, and service cards with custom images.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Preview Services Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={handleOpenCreateCategory}
            className="inline-flex items-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Status Alert Notification */}
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. SERVICES PAGE HERO BANNER SETTINGS CARD */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-xs overflow-hidden">
        <div
          onClick={() => setBannerOpen(!bannerOpen)}
          className="p-5 bg-gradient-to-r from-blue-50/60 to-white border-b border-blue-100 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#07152E] text-white flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0B192C]">
                Services Page Hero Banner Settings
              </h2>
              <p className="text-[11px] text-gray-500">
                Edit the top dark navy hero banner title, eyebrow, text description, and background image.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            {bannerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {bannerOpen && (
          <form onSubmit={handleSaveBanner} className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Eyebrow Tag (Gold)
                </label>
                <input
                  type="text"
                  value={bannerData.eyebrow}
                  onChange={(e) => setBannerData({ ...bannerData, eyebrow: e.target.value })}
                  placeholder="e.g. OUR SERVICES"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Headline Title
                </label>
                <input
                  type="text"
                  value={bannerData.headline}
                  onChange={(e) => setBannerData({ ...bannerData, headline: e.target.value })}
                  placeholder="e.g. Accounting, Audit & Advisory Services"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Tip: Word &apos;Advisory&apos; is automatically highlighted with a light sky-blue hue.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Banner Description Text
              </label>
              <textarea
                rows={2}
                value={bannerData.description}
                onChange={(e) => setBannerData({ ...bannerData, description: e.target.value })}
                placeholder="Explore our core domains below..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none"
              />
            </div>

            {/* Banner Background Image (Drag & Drop Zone + URL) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-800">
                  Banner Background Image (Full-Width Header)
                </label>
                {bannerData.image_url && (
                  <button
                    type="button"
                    onClick={() => setBannerData({ ...bannerData, image_url: '' })}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-800"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Drag & Drop Box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDraggingBanner(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDraggingBanner(false);
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDraggingBanner(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) await handleUploadBannerFile(file);
                }}
                onClick={() => bannerFileInputRef.current?.click()}
                className={`relative rounded-2xl border-2 border-dashed p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group ${
                  isDraggingBanner
                    ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/20 bg-gray-50/60'
                }`}
              >
                <input
                  type="file"
                  ref={bannerFileInputRef}
                  onChange={handleBannerFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {bannerUploading ? (
                  <div className="py-4 flex flex-col items-center">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                    <p className="text-xs font-bold text-blue-600">Uploading banner image...</p>
                  </div>
                ) : bannerData.image_url ? (
                  <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex-shrink-0 relative group/img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bannerData.image_url}
                        alt="Banner Background Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold">
                        Click / Drop to Replace
                      </div>
                    </div>
                    <div className="text-left flex-grow">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-gray-900">Banner Background Active</span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate max-w-md mt-1">{bannerData.image_url}</p>
                      <p className="text-[11px] text-blue-600 font-semibold mt-2 group-hover:underline">
                        Drag a new image here or click to replace
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100/70 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">
                      Drag &amp; drop banner background image here
                    </p>
                    <p className="text-[11px] text-gray-500">
                      or click to browse from your computer (PNG, JPG, WEBP)
                    </p>
                  </div>
                )}
              </div>

              {/* Alternative: Direct URL input */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-gray-400 whitespace-nowrap">Or URL:</span>
                <input
                  type="text"
                  value={bannerData.image_url}
                  onChange={(e) => setBannerData({ ...bannerData, image_url: e.target.value })}
                  placeholder="https://... or /images/service-accounting.jpg"
                  className="flex-grow text-xs px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 outline-none bg-white text-gray-700"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={bannerSaving}
                className="inline-flex items-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors disabled:opacity-50"
              >
                {bannerSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-[#F59E0B]" />}
                <span>Save Banner Settings</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. CATEGORIES AND CARDS LIST */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        {categories.map((category, catIndex) => {
          const subServices = category.sub_services || [];

          return (
            <div
              key={category.id || catIndex}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:border-blue-200"
            >
              {/* Category Card Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-gray-50/80 via-white to-white border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {/* Category Order Buttons */}
                  <div className="flex flex-col gap-1 mt-0.5">
                    <button
                      type="button"
                      disabled={catIndex === 0}
                      onClick={() => handleMoveCategory(catIndex, 'up')}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
                      title="Move Category Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={catIndex === categories.length - 1}
                      onClick={() => handleMoveCategory(catIndex, 'down')}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
                      title="Move Category Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Icon Preview */}
                  <div className="w-10 h-10 rounded-xl bg-[#07152E] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <DynamicIcon name={category.icon || 'FileText'} className="w-5 h-5 text-[#93C5FD]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#0B192C]">
                        {category.title}
                      </h2>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {subServices.length} Cards
                      </span>
                    </div>
                    {category.short_description && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-xl">
                        {category.short_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={() => handleOpenAddSubCard(category.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEditCategory(category)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                    title="Edit Category Info"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-gray-200"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category Sub-Cards Grid (Inside Category Card) */}
              <div className="p-5 sm:p-6 bg-white">
                {subServices.length === 0 ? (
                  <div className="p-6 rounded-xl border border-dashed border-gray-200 text-center bg-gray-50/50">
                    <p className="text-xs text-gray-400">
                      No service cards added to this category yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenAddSubCard(category.id)}
                      className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      + Add the first service card
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {subServices.map((sub, subIdx) => (
                      <div
                        key={sub.id || subIdx}
                        className="bg-white rounded-xl border border-gray-200/90 shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all flex flex-col justify-between group overflow-hidden"
                      >
                        {/* Card Image Thumbnail */}
                        <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden border-b border-gray-100">
                          {sub.image_url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={sub.image_url}
                              alt={sub.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-slate-50/70 p-2 text-center">
                              <ImageIcon className="w-5 h-5 mb-1 text-gray-300" />
                              <span className="text-[10px] text-gray-400">No Image</span>
                            </div>
                          )}

                          {/* Order buttons overlay */}
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              disabled={subIdx === 0}
                              onClick={() => handleMoveSubCard(category.id, subIdx, 'up')}
                              className="p-0.5 text-gray-600 hover:text-blue-600 disabled:opacity-30"
                              title="Move left/up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={subIdx === subServices.length - 1}
                              onClick={() => handleMoveSubCard(category.id, subIdx, 'down')}
                              className="p-0.5 text-gray-600 hover:text-blue-600 disabled:opacity-30"
                              title="Move right/down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Sub-Card Content */}
                        <div className="p-3.5 flex flex-col flex-grow justify-between">
                          <div>
                            <h3 className="text-xs sm:text-[13px] font-bold text-[#0B192C] leading-snug mb-1">
                              {sub.title}
                            </h3>
                            <p className="text-[11px] text-gray-500 leading-relaxed font-normal line-clamp-3">
                              {sub.description}
                            </p>
                          </div>

                          {/* Sub-Card Actions */}
                          <div className="pt-2.5 mt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#2563EB]">
                              Learn More →
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditSubCard(category.id, sub)}
                                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Edit card & image"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSubCard(category.id, sub.id)}
                                className="p-1 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                title="Delete card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. CATEGORY MODAL (Create / Edit Category Heading) */}
      {/* ========================================================================= */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#0B192C]">
                {editingCategory.id ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taxation Services"
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, title: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. taxation-services (auto-generated if empty)"
                  value={editingCategory.slug || ''}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, slug: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Short Subtitle Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Comprehensive direct and indirect tax solutions for individuals, businesses and corporates."
                  value={editingCategory.short_description || ''}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, short_description: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category Icon
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {COMMON_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() =>
                        setEditingCategory({ ...editingCategory, icon })
                      }
                      className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1.5 transition-colors ${
                        editingCategory.icon === icon
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <DynamicIcon name={icon} className="w-3.5 h-3.5" />
                      <span>{icon}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Custom Lucide icon name (e.g. FileText)"
                  value={editingCategory.icon || ''}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, icon: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2 rounded-lg border border-gray-300 focus:border-blue-600 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#07152E] hover:bg-[#0E2A5C] text-white rounded-xl shadow-xs disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-CARD MODAL (Add / Edit Card WITH Custom Image) */}
      {/* ========================================================================= */}
      {isSubCardModalOpen && editingSubCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-[#0B192C]">
                  {editingSubCard.id && editingSubCard.title ? 'Edit Service Card' : 'Add Service Card'}
                </h3>
                {parentCat && (
                  <p className="text-[11px] text-blue-600 font-semibold mt-0.5">
                    Category: {parentCat.title}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsSubCardModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubCard} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Card Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GST Filing"
                  value={editingSubCard.title}
                  onChange={(e) =>
                    setEditingSubCard({ ...editingSubCard, title: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Card Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Accurate, hassle-free GST registration, monthly returns and reconciliation."
                  value={editingSubCard.description}
                  onChange={(e) =>
                    setEditingSubCard({ ...editingSubCard, description: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none"
                />
              </div>

              {/* CARD IMAGE SECTION (Drag & Drop + URL) */}
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-800">
                    Card Image (Optional)
                  </label>
                  {editingSubCard.image_url && (
                    <button
                      type="button"
                      onClick={() => setEditingSubCard({ ...editingSubCard, image_url: '' })}
                      className="text-[11px] font-semibold text-rose-600 hover:text-rose-800"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Drag and Drop Card Image Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDraggingCard(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDraggingCard(false);
                  }}
                  onDrop={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDraggingCard(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) await handleUploadCardFile(file);
                  }}
                  onClick={() => subCardFileInputRef.current?.click()}
                  className={`relative rounded-xl border-2 border-dashed p-4 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center ${
                    isDraggingCard
                      ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/20 bg-white'
                  }`}
                >
                  <input
                    type="file"
                    ref={subCardFileInputRef}
                    onChange={handleSubCardFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {subCardUploading ? (
                    <div className="py-2 flex flex-col items-center">
                      <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mb-1" />
                      <p className="text-xs font-bold text-blue-600">Uploading card image...</p>
                    </div>
                  ) : editingSubCard.image_url ? (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 flex-shrink-0 relative group/cimg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={editingSubCard.image_url}
                          alt="Card Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cimg:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold">
                          Replace
                        </div>
                      </div>
                      <div className="text-left flex-grow">
                        <span className="text-xs font-bold text-gray-900 block">Image Selected</span>
                        <p className="text-[10px] text-gray-400 truncate max-w-[220px]">{editingSubCard.image_url}</p>
                        <p className="text-[10px] text-blue-600 font-semibold mt-1">Drop image or click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center">
                      <Upload className="w-6 h-6 text-blue-600 mb-1" />
                      <p className="text-xs font-bold text-gray-800">
                        Drag &amp; drop card image here
                      </p>
                      <p className="text-[10px] text-gray-500">
                        or click to browse from device
                      </p>
                    </div>
                  )}
                </div>

                {/* Direct URL input alternative */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">Or URL:</span>
                  <input
                    type="text"
                    placeholder="Paste image URL (https://...)"
                    value={editingSubCard.image_url || ''}
                    onChange={(e) =>
                      setEditingSubCard({ ...editingSubCard, image_url: e.target.value })
                    }
                    className="flex-grow text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-blue-600 outline-none w-full bg-white text-gray-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsSubCardModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Service Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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
  Layers,
  FileCheck,
  Receipt,
  Calculator,
  BookOpen,
  Landmark,
  Award,
  ShieldCheck,
  FileText,
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

const COMMON_ICONS = [
  'FileCheck',
  'Receipt',
  'Calculator',
  'BookOpen',
  'Landmark',
  'Award',
  'ShieldCheck',
  'FileText',
  'TrendingUp',
  'Users',
];

export default function AdminServicesPage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  // Sub-Card Modal State
  const [isSubCardModalOpen, setIsSubCardModalOpen] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);
  const [editingSubCard, setEditingSubCard] = useState<SubService | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/save?table=services');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Error fetching services:', err);
    }
    setLoading(false);
  };

  // =========================================================================
  // Category Management Handlers
  // =========================================================================

  const handleOpenCreateCategory = () => {
    setEditingCategory({
      id: '',
      title: '',
      slug: '',
      short_description: '',
      icon: 'FileCheck',
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
    if (!confirm('Are you sure you want to delete this service category and all its sub-cards?')) {
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
  // Sub-Card Management Handlers (Without Images)
  // =========================================================================

  const handleOpenAddSubCard = (categoryId: string) => {
    setParentCategoryId(categoryId);
    setEditingSubCard({
      id: `sub_${Date.now()}`,
      title: '',
      description: '',
    });
    setIsSubCardModalOpen(true);
  };

  const handleOpenEditSubCard = (categoryId: string, sub: SubService) => {
    setParentCategoryId(categoryId);
    setEditingSubCard({ ...sub });
    setIsSubCardModalOpen(true);
  };

  const handleDeleteSubCard = async (categoryId: string, subId: string) => {
    if (!confirm('Are you sure you want to remove this sub-service card?')) return;

    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;

    const updatedSubServices = (cat.sub_services || []).filter((s) => s.id !== subId);
    const updatedCategory = { ...cat, sub_services: updatedSubServices };

    // Update in UI immediately
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? updatedCategory : c))
    );

    // Persist via save API
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
      if (!res.ok) throw new Error('Failed to delete sub-card');
      setMessage({ type: 'success', text: 'Sub-card deleted' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting sub-card' });
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
      setMessage({ type: 'success', text: 'Sub-card saved successfully!' });
      fetchServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving sub-card' });
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
      setMessage({ type: 'success', text: 'Sub-cards reordered' });
    } catch (err) {
      console.error('Error reordering sub-cards:', err);
    }
  };

  // =========================================================================
  // Render
  // =========================================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  const parentCat = categories.find((c) => c.id === parentCategoryId);

  return (
    <div className="space-y-6 max-w-6xl">
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
            Manage your service categories (headings) and their sub-cards without images.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateCategory}
          className="inline-flex items-center gap-2 bg-[#07152E] hover:bg-[#0E2A5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
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

      {/* Category Cards List */}
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

                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-[#07152E] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <DynamicIcon name={category.icon || 'FileCheck'} className="w-5 h-5 text-white" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-base sm:text-lg font-bold text-[#0B192C]">
                        {category.title}
                      </h2>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {subServices.length} Sub-cards
                      </span>
                    </div>
                    {category.short_description && (
                      <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
                        {category.short_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category Actions Bar */}
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleOpenAddSubCard(category.id)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Sub-Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditCategory(category)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                    title="Edit Category Heading"
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
                      No sub-cards added to this category yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenAddSubCard(category.id)}
                      className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      + Add the first sub-card
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subServices.map((sub, subIdx) => (
                      <div
                        key={sub.id || subIdx}
                        className="bg-white rounded-xl p-4 border border-gray-200/90 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all flex flex-col justify-between group"
                      >
                        {/* Sub-Card Content */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3 className="text-sm font-bold text-[#0B192C] leading-snug">
                              {sub.title}
                            </h3>

                            {/* Sub-Card Reorder within Category */}
                            <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                disabled={subIdx === 0}
                                onClick={() => handleMoveSubCard(category.id, subIdx, 'up')}
                                className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-20"
                                title="Move up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={subIdx === subServices.length - 1}
                                onClick={() => handleMoveSubCard(category.id, subIdx, 'down')}
                                className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-20"
                                title="Move down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed font-normal">
                            {sub.description}
                          </p>
                        </div>

                        {/* Sub-Card Actions */}
                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditSubCard(category.id, sub)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSubCard(category.id, sub.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
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
      {/* Category Modal (Create / Edit Category Heading) */}
      {/* ========================================================================= */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#0B192C]">
                {editingCategory.id ? 'Edit Category Heading' : 'Add New Category'}
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
                  placeholder="e.g. Audit & Assurance"
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, title: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="A systematic scrutiny of books of account and statutory records..."
                  value={editingCategory.short_description || ''}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      short_description: e.target.value,
                    })
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
                  placeholder="Custom Lucide icon name (e.g. FileCheck)"
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
      {/* Sub-Card Modal (Add / Edit Sub-Card - NO IMAGE) */}
      {/* ========================================================================= */}
      {isSubCardModalOpen && editingSubCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-[#0B192C]">
                  {editingSubCard.id && editingSubCard.title ? 'Edit Sub-Card' : 'Add Sub-Card'}
                </h3>
                {parentCat && (
                  <p className="text-[11px] text-blue-600 font-semibold mt-0.5">
                    Adding to: {parentCat.title}
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
                  Sub-Card Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Statutory Audit"
                  value={editingSubCard.title}
                  onChange={(e) =>
                    setEditingSubCard({ ...editingSubCard, title: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sub-Card Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Mandatory audit of companies under Section 139 of the Companies Act, 2013..."
                  value={editingSubCard.description}
                  onChange={(e) =>
                    setEditingSubCard({ ...editingSubCard, description: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none"
                />
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
                  <span>Save Sub-Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Trash2,
  Copy,
  Check,
  Search,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { MediaItem } from '@/types';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setMedia(data as MediaItem[]);
    setLoading(false);
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (public_id: string) => {
    if (!confirm('Are you sure you want to delete this media asset from Cloudinary and Supabase?')) {
      return;
    }

    try {
      const res = await fetch('/api/admin/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id }),
      });

      if (!res.ok) throw new Error('Deletion failed');

      setMessage({ type: 'success', text: 'Media asset deleted successfully' });
      setMedia((prev) => prev.filter((m) => m.public_id !== public_id));
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete asset' });
    }
  };

  const filteredMedia = media.filter(
    (m) =>
      m.public_id.toLowerCase().includes(search.toLowerCase()) ||
      (m.alt_text && m.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-brand-deepNavy">
            Cloudinary Media Library
          </h1>
          <p className="text-xs text-brand-muted">
            Upload, browse, copy URLs, and manage all site media stored on Cloudinary
          </p>
        </div>
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

      {/* Upload Zone */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
        <h2 className="text-sm font-bold text-brand-deepNavy mb-4 uppercase">
          Quick Upload to Cloudinary
        </h2>
        <ImageUploader
          label="Select File"
          onImageUploaded={(url, publicId) => {
            fetchMedia();
            setMessage({ type: 'success', text: 'Image uploaded and saved to Media Library!' });
          }}
        />
      </div>

      {/* Search and Media Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets by file name or alt text..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-brand-border bg-white text-xs sm:text-sm text-brand-text placeholder-gray-400 outline-none focus:border-brand-blue"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <div className="text-xs text-brand-muted">
            {filteredMedia.length} asset{filteredMedia.length === 1 ? '' : 's'}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-brand-border">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-blue mx-auto" />
          </div>
        ) : filteredMedia.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-subtle group flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-slate-100">
                  <Image
                    src={asset.secure_url}
                    alt={asset.alt_text || 'Media preview'}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>

                <div className="p-3 space-y-2">
                  <div className="text-[11px] font-bold text-brand-deepNavy truncate" title={asset.public_id}>
                    {asset.public_id.split('/').pop()}
                  </div>
                  {asset.width && asset.height && (
                    <div className="text-[10px] text-brand-muted">
                      {asset.width} × {asset.height} px
                    </div>
                  )}

                  <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(asset.secure_url, asset.id)}
                      className="p-1.5 text-xs text-brand-blue hover:bg-blue-50 rounded flex items-center gap-1 font-semibold"
                      title="Copy Secure URL"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-[10px] text-green-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(asset.public_id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-brand-border text-xs text-brand-muted">
            No media assets found. Upload your first image above to store it in Cloudinary.
          </div>
        )}
      </div>
    </div>
  );
}

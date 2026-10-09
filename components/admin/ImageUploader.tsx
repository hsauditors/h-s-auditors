'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl?: string | null;
  onImageUploaded: (url: string, publicId?: string) => void;
  folder?: string;
  label?: string;
  aspectRatioLabel?: string;
}

export function ImageUploader({
  currentImageUrl,
  onImageUploaded,
  folder = 'hs_auditors',
  label = 'Upload Image',
  aspectRatioLabel = 'Recommended: 16:9 or 4:3 (JPG, PNG, WEBP)',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, WEBP, SVG).');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB.');
      return;
    }

    // Create local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // Start upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setPreview(data.media.secure_url);
      onImageUploaded(data.media.secure_url, data.media.public_id);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUploaded('', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-brand-deepNavy uppercase tracking-wider">
          {label}
        </label>
        <span className="text-[11px] text-brand-muted">{aspectRatioLabel}</span>
      </div>

      {preview ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-brand-border bg-slate-100 flex items-center justify-center group shadow-sm">
          <Image
            src={preview}
            alt="Uploaded Preview"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {uploading && (
            <div className="absolute inset-0 bg-brand-deepNavy/70 flex flex-col items-center justify-center text-white z-10 backdrop-blur-xs">
              <RefreshCw className="w-6 h-6 animate-spin text-brand-gold mb-2" />
              <span className="text-xs font-semibold">Uploading to Cloudinary...</span>
            </div>
          )}

          {/* Action overlay */}
          {!uploading && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-brand-deepNavy hover:bg-gray-100 px-3 py-1.5 rounded-md text-xs font-bold shadow flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-brand-blue" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors ${
            isDragOver
              ? 'border-brand-blue bg-blue-50/50'
              : 'border-brand-border hover:border-brand-blue/50 bg-[#F8FAFC]'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center text-brand-blue">
              <RefreshCw className="w-8 h-8 animate-spin mb-2" />
              <span className="text-xs font-semibold">Uploading to Cloudinary...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-brand-softBlue text-brand-blue flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-brand-deepNavy mb-1">
                Drag and drop image here, or browse
              </div>
              <div className="text-[11px] text-brand-muted">
                Supports JPG, PNG, WEBP up to 10MB
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-red-50 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Direct URL input fallback */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={preview || ''}
          placeholder="Or paste direct image URL (https://... or /uploads/...)"
          onChange={(e) => {
            const val = e.target.value;
            setPreview(val || null);
            onImageUploaded(val, '');
          }}
          className="w-full px-3 py-1.5 text-xs rounded-lg border border-brand-border bg-white text-brand-text placeholder-gray-400 outline-none focus:border-brand-blue"
        />
        {preview && (
          <span className="text-[11px] font-bold text-green-600 flex items-center gap-1 whitespace-nowrap">
            <CheckCircle className="w-3.5 h-3.5" />
            Active
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}

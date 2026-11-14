'use client';

import * as React from 'react';
import {
  Folder,
  UploadCloud,
  File,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  HardDrive,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const BUCKETS = [
  { id: 'public-assets', label: 'Public Assets', desc: 'Brand assets, logos, site banners' },
  { id: 'project-media', label: 'Project Media', desc: 'Hardware photography & diagrams' },
  { id: 'gallery', label: 'Gallery Archive', desc: 'Campus & workbench photo albums' },
  { id: 'application-attachments', label: 'Attachments (Private)', desc: 'Candidate resumes & docs' },
];

export default function AdminMediaPage() {
  const [activeBucket, setActiveBucket] = React.useState('public-assets');
  const [files, setFiles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const fetchFiles = React.useCallback(async (b = activeBucket) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?bucket=${b}`);
      const data = await res.json();
      if (data.success) {
        setFiles(data.files || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [activeBucket]);

  React.useEffect(() => {
    fetchFiles(activeBucket);
  }, [activeBucket, fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', activeBucket);

        const res = await fetch('/api/admin/media', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!data.success) {
          alert(`Error uploading ${file.name}: ${data.message}`);
        }
      }
      fetchFiles(activeBucket);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (path: string) => {
    if (!confirm(`Are you sure you want to delete ${path}?`)) return;

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket: activeBucket, path }),
      });
      const data = await res.json();
      if (data.success) {
        setFiles((prev) => prev.filter((f) => f.path !== path));
      } else {
        alert(data.message || 'Delete error');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete error');
    }
  };

  const copyToClipboard = (url: string, path: string) => {
    navigator.clipboard.writeText(url);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const filteredFiles = search.trim()
    ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Supabase Cloud Storage
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Media Library
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Browse buckets, upload high-resolution photography, and copy CDN URLs into pages or courses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            multiple
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchFiles(activeBucket)}
            className="h-9 w-9 p-0"
            title="Refresh Files"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="gap-2 text-xs"
          >
            <UploadCloud className="h-4 w-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
          </Button>
        </div>
      </div>

      {/* Bucket Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {BUCKETS.map((b) => {
          const isActive = activeBucket === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setActiveBucket(b.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-brand-primary bg-brand-primary/10 shadow-xs'
                  : 'border-theme-border bg-theme-surface hover:border-theme-border/80 hover:bg-theme-bg'
              }`}
            >
              <div className="flex items-center gap-2">
                <Folder className={`h-4 w-4 ${isActive ? 'text-brand-primary' : 'text-theme-muted'}`} />
                <span className="text-xs font-bold font-heading text-theme-heading">
                  {b.label}
                </span>
              </div>
              <p className="text-[11px] text-theme-muted mt-1 truncate">{b.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter files in current bucket..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-theme-surface border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
        />
      </div>

      {/* Files Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-theme-muted">Loading files from storage...</div>
      ) : filteredFiles.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-theme-border p-8">
          <HardDrive className="h-10 w-10 text-theme-muted mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-theme-heading">No files found in {activeBucket}</h3>
          <p className="text-xs text-theme-muted mt-1">
            Upload images, PDFs, or datasheets using the &ldquo;Upload Media&rdquo; button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);
            const isCopied = copiedPath === file.path;

            return (
              <div
                key={file.id || file.path}
                className="group relative rounded-xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs hover:border-brand-primary/50 transition-all flex flex-col"
              >
                {/* Thumbnail / Icon */}
                <div className="aspect-square bg-theme-bg relative flex items-center justify-center overflow-hidden">
                  {isImage && file.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <File className="h-10 w-10 text-theme-muted" />
                  )}

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    {file.url && (
                      <button
                        onClick={() => copyToClipboard(file.url, file.path)}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                        title="Copy CDN URL"
                      >
                        {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    )}
                    {file.url && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(file.path)}
                      className="p-2 rounded-lg bg-red-600/80 hover:bg-red-700 text-white transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* File info */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div className="truncate text-xs font-semibold text-theme-heading" title={file.name}>
                    {file.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-theme-muted font-mono mt-1">
                    <span>
                      {file.metadata?.size
                        ? `${(file.metadata.size / 1024).toFixed(1)} KB`
                        : file.size
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : '—'}
                    </span>
                    {isCopied && <span className="text-emerald-400 font-bold">Copied!</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


'use client';

import * as React from 'react';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GalleryItemRow } from '@/lib/supabase/types';

export default function AdminGalleryPage() {
  const [items, setItems] = React.useState<GalleryItemRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // New item form state
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('Laboratory');
  const [imageUrl, setImageUrl] = React.useState('');
  const [caption, setCaption] = React.useState('');
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchItems = React.useCallback(async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          image_url: imageUrl,
          caption,
          display_order: Number(displayOrder),
          is_published: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setImageUrl('');
        setCaption('');
        setShowAddModal(false);
        fetchItems();
      } else {
        alert(data.message || 'Error creating gallery item');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this gallery image?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const categories = ['all', 'Laboratory', 'Workshops', 'Campus Sessions', 'Hardware Prototypes'];
  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Visual Media &amp; Campus Archive
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Gallery Management ({items.length})
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Curate workbench photos, oscilloscope measurements, and campus workshop photo archives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a href="/gallery" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Eye className="h-3.5 w-3.5" />
              <span>View Public Gallery</span>
            </Button>
          </a>
          <Button onClick={() => setShowAddModal(true)} size="sm" className="gap-1.5 text-xs">
            <Plus className="h-4 w-4" />
            <span>Add Photo</span>
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 border-b border-theme-border pb-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-brand-primary text-white'
                : 'text-theme-muted hover:text-theme-heading hover:bg-theme-bg'
            }`}
          >
            {cat === 'all' ? 'All Images' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-theme-muted">Loading gallery archive...</div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-theme-border p-8">
          <ImageIcon className="h-10 w-10 text-theme-muted mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-theme-heading">No gallery media in this category</h3>
          <p className="text-xs text-theme-muted mt-1">
            Click &ldquo;Add Photo&rdquo; to add laboratory photographs or workshop captures.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs hover:border-brand-primary/40 transition-all flex flex-col"
            >
              <div className="relative aspect-video w-full bg-theme-bg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur-xs">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all"
                  title="Delete image"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-theme-heading line-clamp-1">{item.title}</h4>
                  {item.caption && (
                    <p className="text-[11px] text-theme-muted line-clamp-2 mt-1">{item.caption}</p>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-theme-border/60 flex items-center justify-between text-[10px] text-theme-muted font-mono">
                  <span>Order: #{item.display_order}</span>
                  <a
                    href={item.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary inline-flex items-center gap-0.5"
                  >
                    <span>CDN</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for adding photo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-theme-surface border border-theme-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-heading text-theme-heading">Add Photo to Gallery</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Rigol Oscilloscope Signal Bring-Up"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                >
                  <option value="Laboratory">Laboratory</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Campus Sessions">Campus Sessions</option>
                  <option value="Hardware Prototypes">Hardware Prototypes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Image CDN URL or Path *
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /gallery/photo-1.jpg"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Students analyzing SPI bus waveforms during masterclass."
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-theme-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Image'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


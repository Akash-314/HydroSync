import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { ImageIcon } from 'lucide-react';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { GalleryItemRow } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Hardware & Lab Gallery',
  description: 'Visual gallery of our electronics laboratories, student workshop deliveries, and campus events.',
};

export const revalidate = 60;

async function fetchGalleryItems(): Promise<GalleryItemRow[]> {
  const client = getActiveServerClient();
  if (!client) return [];

  try {
    const { data } = await client
      .from('gallery_items')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    return (data || []) as GalleryItemRow[];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const galleryItems = await fetchGalleryItems();

  return (
    <div>
      <PageHero
        eyebrow="Visual Showcase"
        title="Hardware Laboratories &amp; Campus Sessions"
        subtitle="Inside our electronics workbenches, testing instruments, and on-site engineering workshops."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary">FACILITY 01</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mt-1">Electronics Prototyping Bench</h3>
              <p className="text-xs text-theme-muted mt-2">Oscilloscopes, SMD soldering stations, and variable power supplies.</p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary">FACILITY 02</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mt-1">IoT Telemetry Test Station</h3>
              <p className="text-xs text-theme-muted mt-2">LoRaWAN gateway nodes, spectrum analyzers, and sensor calibration rigs.</p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="text-xs font-mono font-bold text-brand-secondary">FACILITY 03</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mt-1">Robotics &amp; ATL Arena</h3>
              <p className="text-xs text-theme-muted mt-2">Mobile robotics test tracks, 3D printing bay, and motor dynamometers.</p>
            </div>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-theme-border bg-theme-surface overflow-hidden shadow-xs hover:border-brand-primary/40 transition-all flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-theme-bg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-theme-heading">{item.title}</h4>
                      {item.caption && (
                        <p className="text-xs text-theme-muted mt-1">{item.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="High-Resolution Photoshoot in Progress"
              description="Our official laboratory and campus workshop high-definition photo archive is being cataloged and optimized for web delivery."
              icon={<ImageIcon className="h-6 w-6" />}
              actionLabel="Schedule Physical Lab Tour"
              actionHref="/contact"
            />
          )}
        </Container>
      </section>
    </div>
  );
}

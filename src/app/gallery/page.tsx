import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { ImageIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hardware & Lab Gallery',
  description: 'Visual gallery of our electronics laboratories, student workshop deliveries, and campus events.',
};

export default function GalleryPage() {
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

          <EmptyState
            title="High-Resolution Photoshoot in Progress"
            description="Our official laboratory and campus workshop high-definition photo archive is being cataloged and optimized for web delivery."
            icon={<ImageIcon className="h-6 w-6" />}
            actionLabel="Schedule Physical Lab Tour"
            actionHref="/contact"
          />
        </Container>
      </section>
    </div>
  );
}


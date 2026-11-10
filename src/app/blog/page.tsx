import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { BookOpen, Cpu, Radio, Binary, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Engineering Blog & Technical Resources',
  description: 'Technical articles, hardware pinout tutorials, and embedded firmware architecture guides from HydroSync Innovations LLP.',
};

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Knowledge Base"
        title="Engineering Blog &amp; Technical Resources"
        subtitle="Practical engineering insights, firmware debugging guides, and system design tutorials written by our architects."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          {/* Editorial Pillars (Authentic Topic Coverage) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Embedded &amp; RTOS Firmware
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                In-depth tutorials covering ARM Cortex-M register maps, FreeRTOS task synchronization, DMA configurations, and bare-metal peripheral drivers.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Wireless Protocols &amp; Telemetry
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Practical guides on LoRaWAN range budgeting, MQTT payload compression, TLS 1.3 edge encryption, and cloud time-series data pipelines.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Binary className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Edge AI &amp; TinyML
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Step-by-step INT8 model quantization workflows, SRAM memory optimization, and camera sensor inference pipelines on microcontrollers.
              </p>
            </div>
          </div>

          {/* Authentic Editorial Notice */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/60 dark:bg-brand-dark-surface/60 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Technical Editorial Archive
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-lg mx-auto">
              Our engineering team is actively authoring production-grade firmware deep-dives and system architecture case studies. Subscribe to our newsletter or connect with our editorial desk to receive technical updates.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact?category=General" size="sm" variant="secondary">
                <span>Contact Editorial Desk</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

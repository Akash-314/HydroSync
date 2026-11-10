import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Calendar, MonitorPlay, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Live Masterclasses & Workshops',
  description: 'Interactive weekend masterclasses and live code-along sessions with HydroSync engineering architects.',
};

export default function LiveClassesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Real-Time Learning"
        title="Live Masterclasses &amp; Bootcamps"
        subtitle="Engage directly with senior firmware architects and IoT developers in interactive code-along sessions."
        breadcrumbs={[{ label: 'Live Classes' }]}
        actions={
          <Button href="/contact?category=Course" variant="primary">
            Enquire About Upcoming Batches
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          {/* Masterclass Formats (Authentic Educational Scope) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <MonitorPlay className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Weekend Deep-Dives
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Focused 4 to 8-hour live sessions addressing specific hardware challenges like STM32 clock tree configuration, I2C bus debugging, or LoRa packet parsing.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Live Interactive Code-Along
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Small student cohorts with two-way audio, shared terminal outputs, and live oscilloscope telemetry streams directly from our hardware workbench.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Cohort Schedule Delivery
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Announced with verified syllabi, prerequisite hardware checklists, and confirmed session timings prior to seat intake.
              </p>
            </div>
          </div>

          {/* Transparent Live Schedule Notice */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/60 dark:bg-brand-dark-surface/60 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Batch Calendar in Preparation
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-lg mx-auto">
              Our upcoming live masterclass sessions are scheduled periodically based on mentor availability and student demand. To receive notifications when the next masterclass cohort opens for registration, submit an advance enquiry.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact?category=Course" size="sm" variant="secondary">
                <span>Register Advance Interest</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

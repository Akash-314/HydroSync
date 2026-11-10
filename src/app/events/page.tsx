import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Calendar, Building2, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Technical Events & Workshops',
  description: 'Hands-on hardware hackathons, campus buildathons, and firmware debugging workshops at HydroSync Innovations LLP.',
};

export default function EventsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Hands-On Gatherings"
        title="Technical Events &amp; Workshops"
        subtitle="Hardware buildathons, campus workshops, and technical symposia organized with partner engineering colleges and schools."
        breadcrumbs={[{ label: 'Events' }]}
        actions={
          <Button href="/contact?category=College" variant="primary">
            Request an On-Campus Workshop
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          {/* Workshop Formats Overview (Authentic Service Capabilities) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Campus Buildathons (24-48 Hours)
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Intensive hardware hackathons where interdisciplinary student teams design, assemble, and demonstrate functional IoT prototypes solving actual problem statements.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Firmware Bring-Up Clinics
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Full-day specialized workbench sessions on oscilloscope signal integrity, hardware breakpoint debugging, and RTOS task scheduling.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Institutional Symposia &amp; FDPs
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Faculty development programs and keynote sessions on Edge AI trends, LoRaWAN standards, and modern microcontroller curriculum design.
              </p>
            </div>
          </div>

          {/* Authentic Current Scheduling State */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/60 dark:bg-brand-dark-surface/60 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Upcoming Event Schedule
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-lg mx-auto">
              Our upcoming calendar of public hackathons and university clinics is currently being finalized with academic partner institutions. Verified venue logistics and registration dates are published as institutional MoUs are signed.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact?category=College" size="sm" variant="secondary">
                <span>Partner for a Campus Event</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

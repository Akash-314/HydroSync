import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Users, ShieldCheck, Mail, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Engineering Team & Leadership',
  description: 'Technical leadership, engineering leads, and academic advisors at HydroSync Innovations LLP.',
};

export default function TeamPage() {
  return (
    <div>
      <PageHero
        eyebrow="Leadership &amp; Faculty"
        title="Our Technical Leadership &amp; Mentors"
        subtitle="Driven by engineering practitioners passionate about bare-metal hardware systems, firmware integrity, and hands-on workforce enablement."
        breadcrumbs={[{ label: 'Team' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          {/* Engineering Domain Structure (Authentic Operational Structure) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Embedded &amp; Firmware Division
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Directing low-level peripheral driver development, FreeRTOS kernel porting, and industrial microcontroller evaluation for commercial prototypes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                IoT Systems &amp; Telemetry Division
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Architecting encrypted MQTT streaming, LoRaWAN sensor nodes, edge gateways, and time-series cloud ingestion topologies.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Academic &amp; Institutional Enablement
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Managing college Centers of Excellence, Faculty Development Programs (FDPs), and school Atal Tinkering Lab robotics curricula.
              </p>
            </div>
          </div>

          {/* Transparent Corporate Disclosure Notice */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/60 dark:bg-brand-dark-surface/60 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Faculty &amp; Leadership Directory
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-lg mx-auto">
              Individual biographies, research publications, and corporate disclosures for our founding partners, domain architects, and adjunct trainers are being compiled for official release.
            </p>
            <div className="mt-6">
              <Button href="/contact?category=General" size="sm" variant="secondary">
                <Mail className="mr-2 h-4 w-4" />
                <span>Contact Engineering Leadership</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

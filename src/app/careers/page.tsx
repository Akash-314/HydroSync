import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Briefcase, Cpu, Users, Mail, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Careers & Talent Opportunities',
  description: 'Join HydroSync Innovations LLP as an embedded firmware engineer, IoT developer, or technical lab mentor.',
};

export default function CareersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Join Our Team"
        title="Careers &amp; Engineering Opportunities"
        subtitle="Collaborate on core hardware systems, IoT cloud telemetry, and hands-on workforce enablement."
        breadcrumbs={[{ label: 'Careers' }]}
        actions={
          <Button href="/contact?category=Other" variant="primary">
            Submit General Resume
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          {/* Engineering Disciplines We Hire For */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Embedded Firmware Engineers
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Practitioners proficient in C/C++, ARM Cortex-M architecture, RTOS task management, peripheral driver writing, and hardware debugging.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                IoT &amp; Cloud Telemetry Leads
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Engineers experienced in MQTT protocol brokers, LoRaWAN gateways, embedded Wi-Fi/BLE stacks, and time-series cloud telemetry dashboards.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-1.5">
                Technical Trainers &amp; Lab Mentors
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed">
                Passionate educators to conduct intensive hands-on hardware clinics, student project reviews, and institutional faculty development sessions.
              </p>
            </div>
          </div>

          {/* Authentic Talent Intake Protocol */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/60 dark:bg-brand-dark-surface/60 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Talent Acquisition &amp; Application Protocol
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-lg mx-auto">
              We welcome speculative applications from passionate hardware and IoT engineers. Send your resume, GitHub profile, or portfolio of hardware projects to our hiring team for review against upcoming project engagements.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href={`mailto:${siteConfig.contact.email}?subject=Career%20Application%20-%20HydroSync`} size="sm" variant="cta">
                <Mail className="mr-2 h-4 w-4" />
                <span>Email Resume to Hiring Team</span>
              </Button>
              <Button href="/contact?category=Other" size="sm" variant="secondary">
                <span>Submit General Enquiry</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

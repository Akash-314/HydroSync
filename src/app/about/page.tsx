import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about HydroSync Innovations LLP, our engineering mission, leadership vision, and technical training infrastructure.',
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Corporate Journey"
        title="About HydroSync Innovations LLP"
        subtitle="Pioneering industrial IoT engineering, custom embedded firmware development, and hands-on workforce enablement."
        breadcrumbs={[{ label: 'About Us' }]}
        actions={
          <Button href="/contact" variant="primary">
            Connect with Leadership
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Our Mission"
            title="Bridging Theoretical Academia & Industrial Hardware Engineering"
            subtitle="HydroSync was founded to address the critical industry gap between software abstraction and physical hardware systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Technical Rigor</h3>
              <p className="text-sm text-theme-body">We train engineers on actual microcontrollers, logic analyzers, and RTOS kernels, not just simulated sandboxes.</p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Institutional Enablement</h3>
              <p className="text-sm text-theme-body">Partnering with K-12 schools for Atal Tinkering Labs and universities for Centers of Excellence.</p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Commercial Innovation</h3>
              <p className="text-sm text-theme-body">Delivering end-to-end IoT product prototyping, custom PCB layout, and cloud telemetry for enterprises.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


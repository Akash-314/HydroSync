import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Academic & Industry Partners',
  description: 'University tie-ups, school networks, and technology alliances collaborating with HydroSync Innovations LLP.',
};

export default function PartnersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Alliances"
        title="Institutional &amp; Industry Partners"
        subtitle="Collaborating with progressive engineering colleges, school networks, and industrial hardware innovators."
        breadcrumbs={[{ label: 'Partners' }]}
        actions={
          <Button href="/contact?subject=Partnership%20Enquiry" variant="primary">
            Become an Academic Partner
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Our Collaboration Network"
            title="Active Educational &amp; Technical Alliances"
            subtitle="Engaging through formal MoUs, student hardware sponsorships, and joint curriculum development."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="font-mono text-xs font-bold text-brand-secondary">ALLIANCE CATEGORY 01</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mt-2">Autonomous Engineering Colleges</h3>
              <p className="text-xs text-theme-muted mt-2">Centers of Excellence, hands-on faculty training, and student semester project credits.</p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="font-mono text-xs font-bold text-brand-secondary">ALLIANCE CATEGORY 02</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mt-2">K-12 School Groups</h3>
              <p className="text-xs text-theme-muted mt-2">Atal Tinkering Labs, robotics challenges, and experiential science education.</p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface text-center">
              <span className="font-mono text-xs font-bold text-brand-secondary">ALLIANCE CATEGORY 03</span>
              <h3 className="text-base font-bold font-heading text-theme-heading mt-2">Industrial IoT Enterprises</h3>
              <p className="text-xs text-theme-muted mt-2">Collaborative prototyping, firmware verification, and hardware talent recruitment pipelines.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


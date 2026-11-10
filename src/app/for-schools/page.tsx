import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Schools - STEM & Atal Tinkering Labs',
  description: 'Atal Tinkering Lab (ATL) setup, robotics curriculum for grades 6-12, and hands-on science innovation.',
};

export default function ForSchoolsPage() {
  return (
    <div>
      <PageHero
        eyebrow="K-12 STEM Innovation"
        title="Experiential STEM &amp; Atal Tinkering Labs"
        subtitle="Turnkey laboratory setup, teacher training, and age-graded robotics curriculum aligned with national innovation guidelines."
        breadcrumbs={[{ label: 'For Schools' }]}
        actions={
          <Button href="/contact?subject=School%20ATL%20Collaboration" variant="primary">
            Request School Consultation
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="ATL Lab Deliverables"
            title="Complete School Robotics &amp; Maker Infrastructure"
            subtitle="Everything required to establish and run an active, award-winning school tinkering laboratory."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Equipment &amp; Hardware</h3>
              <p className="text-sm text-theme-body mb-4">3D printers, soldering stations, electronic toolkits, and modular robotics kits.</p>
              <ul className="text-xs space-y-2 text-theme-body">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> NITI Aayog Compliant Packages</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Safe Low-Voltage Electronics</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Curriculum Grades 6–12</h3>
              <p className="text-sm text-theme-body mb-4">Graded lesson plans starting from block coding to Python and microcontrollers.</p>
              <ul className="text-xs space-y-2 text-theme-body">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Teacher Handbooks &amp; Worksheets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Annual Project Milestones</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Teacher Training &amp; Mentorship</h3>
              <p className="text-sm text-theme-body mb-4">Continuous faculty empowerment so internal educators can confidently guide students.</p>
              <ul className="text-xs space-y-2 text-theme-body">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> On-campus Master Trainers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Inter-school Science Fair Prep</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


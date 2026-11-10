import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Colleges - MoUs & Centers of Excellence',
  description: 'Institutional partnerships, IoT Center of Excellence setup, Faculty Development Programs (FDPs), and on-campus hackathons.',
};

export default function ForCollegesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Higher Education Partnerships"
        title="College MoUs &amp; Centers of Excellence"
        subtitle="Empower your engineering departments with an industry-grade IoT and Embedded Systems lab, verified student internships, and faculty development."
        breadcrumbs={[{ label: 'For Colleges' }]}
        actions={
          <Button href="/contact?subject=College%20MoU%20Enquiry" variant="primary">
            Initiate Institutional MoU
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Partnership Pillars"
            title="Comprehensive Academic Enablement"
            subtitle="Bridging the gap between engineering university curricula and actual core industry hiring expectations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Center of Excellence (CoE)</h3>
              <p className="text-sm text-theme-body mb-4">Dedicated IoT &amp; Embedded workbench setup with professional test instruments.</p>
              <ul className="text-xs space-y-2 text-theme-body">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Oscilloscopes &amp; Logic Analyzers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> STM32 / ESP32 Hardware Benches</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Faculty Development (FDP)</h3>
              <p className="text-sm text-theme-body mb-4">Upgrading professors and lecturers on modern FreeRTOS, TinyML, and edge computing.</p>
              <ul className="text-xs space-y-2 text-theme-body">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Hands-on Register-Level Labs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Joint Certification Programs</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">Student Internships &amp; Credits</h3>
              <p className="text-sm text-theme-body mb-4">Structured semester internship approvals, major project guides, and placement mentoring.</p>
              <ul className="text-xs space-y-2 text-theme-body">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Approved College NOC Process</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-innovation-green" /> Industry Capstone Mentorship</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


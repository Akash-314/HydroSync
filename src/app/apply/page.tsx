import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { ApplyForm } from '@/components/forms/apply-form';

export const metadata: Metadata = {
  title: 'Apply for Programs & Admissions',
  description:
    'Submit your application for Technical Internships, Core Training Courses, or Live Masterclasses at HydroSync Innovations LLP.',
};

export default function ApplyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Admissions &amp; Registrations"
        title="Application Portal: V1 Intake"
        subtitle="Submit your application for Technical Internships, Core Training Courses, or Live Masterclasses."
        breadcrumbs={[{ label: 'Apply Now' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 sm:p-10 shadow-sm">
            <ApplyForm />
          </div>
        </Container>
      </section>
    </div>
  );
}

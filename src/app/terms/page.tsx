import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Official terms and conditions governing the use of HydroSync Innovations LLP services and website.',
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal Agreement"
        title="Terms and Conditions"
        subtitle="Standard terms governing website access, student program enrollments, and intellectual property."
        breadcrumbs={[{ label: 'Terms and Conditions' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl text-theme-body text-sm leading-relaxed space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing the HydroSync Innovations LLP website, applying for training programs, or interacting with our hardware laboratories, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">2. Intellectual Property Rights</h2>
            <p>
              All course syllabi, lab exercise manuals, proprietary firmware code examples, schematic diagrams, and brand assets remain the exclusive intellectual property of HydroSync Innovations LLP unless explicitly stated under open-source licenses.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">3. Student Code of Conduct</h2>
            <p>
              Students and interns are expected to maintain professional integrity during lab sessions, treat hardware equipment with reasonable care, and adhere to anti-plagiarism guidelines in submitted project deliverables.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">4. Limitation of Liability</h2>
            <p>
              HydroSync Innovations LLP is not liable for indirect, punitive, or consequential damages resulting from improper handling of high-voltage electronic components outside guided laboratory safety procedures.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}


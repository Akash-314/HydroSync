import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Official data privacy declaration for HydroSync Innovations LLP.',
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Compliance &amp; Governance"
        title="Privacy Policy"
        subtitle="How HydroSync Innovations LLP collects, stores, and protects personal and institutional information."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl prose prose-slate dark:prose-invert text-theme-body text-sm leading-relaxed space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">1. Information We Collect</h2>
            <p>
              When you submit enquiries, apply for internships, register for courses, or subscribe to our newsletter, we collect personal information such as your full name, email address, phone number, college/organization affiliation, and graduation year.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">2. Use of Information</h2>
            <p>
              Your information is utilized solely to process admissions, deliver hardware kits, issue course certificates, respond to corporate enquiries, and share relevant technical updates. We do not sell or rent user data to third-party marketing entities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">3. Data Security &amp; Retention</h2>
            <p>
              All data transmitted through our web portal is encrypted in transit using industry-standard Transport Layer Security (TLS). Data is retained only for the duration necessary to satisfy educational accreditation and legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">4. Contact Privacy Grievances</h2>
            <p>
              For privacy-related inquiries or data deletion requests, contact our Compliance Officer at <a href="mailto:privacy@hydrosync.in" className="text-brand-secondary hover:underline">privacy@hydrosync.in</a>.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}


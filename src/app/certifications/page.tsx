import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certifications & Credentials',
  description: 'HydroSync credentialing standards, industry curriculum rigor, and sample certificate specifications.',
};

export default function CertificationsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Academic &amp; Industry Standards"
        title="Certification &amp; Credential Rigor"
        subtitle="Every HydroSync completion credential reflects verified hands-on laboratory work, code reviews, and physical hardware demonstration."
        breadcrumbs={[{ label: 'Certifications' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Verification Benchmarks"
            title="How HydroSync Credentials Differ"
            subtitle="Unlike superficial video-watching certificates, our credentials require tangible proof of hardware competence."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <Award className="h-8 w-8 text-brand-secondary mb-3" />
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Hardware Milestone Defense</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Candidates must present and defend their working hardware circuit, firmware code repository, and oscilloscope traces before mentors.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <ShieldCheck className="h-8 w-8 text-brand-primary dark:text-brand-midnight-azure mb-3" />
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">Unique Certificate ID</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Every certificate issued features a unique serial identification number archived in our permanent registry for institutional background checks.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-theme-border bg-theme-surface">
              <CheckCircle2 className="h-8 w-8 text-brand-innovation-green mb-3" />
              <h3 className="text-base font-bold font-heading text-theme-heading mb-2">College Accreditation Alignment</h3>
              <p className="text-xs text-theme-body leading-relaxed">
                Structured to meet AICTE, NBA, and university autonomous evaluation rubrics for industrial training and semester capstone credits.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


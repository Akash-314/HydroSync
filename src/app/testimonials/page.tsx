import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { MessageSquareQuote, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Testimonials & Reviews Policy',
  description: 'Verified participant feedback policy and institutional reviews for HydroSync Innovations LLP.',
};

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Participant Feedback"
        title="Verified Feedback &amp; Institutional Endorsements"
        subtitle="Our commitment to authentic, verifiable reviews from engineering students, academic departments, and institutional partners."
        breadcrumbs={[{ label: 'Testimonials' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface text-center shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <MessageSquareQuote className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Feedback Verification in Progress
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-lg mx-auto">
              Authentic participant reviews, alumni placement records, and formal department head feedback are currently being compiled following our active program cohorts. HydroSync adheres to a strict transparency policy: zero fabricated reviews, random identity cards, or artificial ratings are presented on this platform.
            </p>

            <div className="mt-6 pt-6 border-t border-theme-border dark:border-brand-dark-border flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/contact" variant="secondary" size="sm">
                <span>Contact Admissions Desk</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

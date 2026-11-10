import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { TestimonialCard } from '@/components/shared/testimonial-card';
import { TESTIMONIALS } from '@/data/mock-data';

export const metadata: Metadata = {
  title: 'Testimonials & Student Reviews',
  description: 'Verified reviews from alumni, engineering professors, and institutional partners.',
};

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Verified Feedback"
        title="Alumni &amp; Partner Testimonials"
        subtitle="Read firsthand experiences from engineering students, department heads, and school ATL coordinators."
        breadcrumbs={[{ label: 'Testimonials' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


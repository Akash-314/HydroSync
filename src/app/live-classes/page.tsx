import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { EventCard } from '@/components/shared/event-card';
import { UPCOMING_EVENTS } from '@/data/mock-data';

export const metadata: Metadata = {
  title: 'Live Classes & Masterclasses',
  description: 'Interactive weekend masterclasses and instructor-led live technical bootcamps.',
};

export default function LiveClassesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Real-Time Learning"
        title="Live Masterclasses &amp; Bootcamps"
        subtitle="Engage directly with senior firmware architects and IoT developers in interactive code-along sessions."
        breadcrumbs={[{ label: 'Live Classes' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="space-y-4 max-w-4xl mx-auto">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


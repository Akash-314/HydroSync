import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { EventCard } from '@/components/shared/event-card';
import { UPCOMING_EVENTS } from '@/data/mock-data';

export const metadata: Metadata = {
  title: 'Workshops, Hackathons & Events',
  description: 'Upcoming hands-on hardware hackathons, expos, and firmware debugging workshops.',
};

export default function EventsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Hands-On Gatherings"
        title="Technical Events &amp; Hackathons"
        subtitle="Participate in hardware buildathons, campus workshops, and technical symposia."
        breadcrumbs={[{ label: 'Events' }]}
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


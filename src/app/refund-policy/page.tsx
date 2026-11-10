import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'Policy governing program enrollment cancellations, fee refunds, and hardware kit returns.',
};

export default function RefundPolicyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Commercial Terms"
        title="Refund &amp; Cancellation Policy"
        subtitle="Transparent policies on course registrations, workshop seat cancellations, and kit returns."
        breadcrumbs={[{ label: 'Refund Policy' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl text-theme-body text-sm leading-relaxed space-y-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">1. Course &amp; Internship Cancellations</h2>
            <p>
              Students who withdraw from a course or internship program at least 7 calendar days prior to the published batch start date are eligible for a 100% refund of course tuition (less nominal payment processing fees).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">2. Hardware Kit Deductions</h2>
            <p>
              If a physical hardware development kit (ESP32, STM32, sensor package) has already been dispatched via courier prior to a cancellation request, the replacement cost of the hardware kit is non-refundable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">3. Workshop &amp; Event Registrations</h2>
            <p>
              Due to limited seat capacity in physical laboratory sessions, weekend workshop tickets and hackathon registration fees are non-refundable within 48 hours of the event start time. Registrations may be transferred to an upcoming batch upon written request.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-theme-heading mb-2">4. Refund Processing Window</h2>
            <p>
              Approved refunds are processed via the original payment method within 5 to 7 business banking days. For refund assistance, email <a href="mailto:finance@hydrosync.in" className="text-brand-secondary hover:underline">finance@hydrosync.in</a>.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}


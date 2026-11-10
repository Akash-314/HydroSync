import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { FAQS } from '@/data/mock-data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Common questions regarding hardware kits, internship eligibility, college MoUs, and course schedules.',
};

export default function FAQPage() {
  return (
    <div>
      <PageHero
        eyebrow="Knowledge Base"
        title="Frequently Asked Questions"
        subtitle="Quick answers to technical requirements, kit shipments, college credits, and payment questions."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <Accordion>
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                title={faq.question}
                defaultOpen={index === 0}
              >
                {faq.answer}
              </AccordionItem>
            ))}
            <AccordionItem
              id="faq-extra-1"
              title="What are the prerequisites for the Embedded Systems course?"
              defaultOpen={false}
            >
              Basic knowledge of C programming is helpful. We cover microcontroller fundamentals, register manipulation, and digital electronics from foundational principles up to RTOS task management.
            </AccordionItem>
            <AccordionItem
              id="faq-extra-2"
              title="How does HydroSync handle hardware kit delivery for online batches?"
              defaultOpen={false}
            >
              Enrolled students in online and hybrid batches receive a physical hardware kit shipped directly to their registered residential address prior to the batch kickoff date.
            </AccordionItem>
          </Accordion>
        </Container>
      </section>
    </div>
  );
}


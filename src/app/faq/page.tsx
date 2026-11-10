import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Accordion, AccordionItem } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Common questions regarding hardware kits, internship eligibility, college MoUs, and course schedules.',
};

const VERIFIED_FAQS = [
  {
    id: 'faq-kits',
    question: 'Are hardware kits provided for hands-on courses and internships?',
    answer:
      'Yes. All physical and hybrid hardware courses and internship tracks include dedicated development boards (such as ESP32 or STM32), custom breakout boards, sensors, and connecting cables delivered to enrolled students.',
  },
  {
    id: 'faq-college-credits',
    question: 'Can college students receive formal academic credit or an MoU sign-off?',
    answer:
      'Yes. HydroSync provides verified internship completion documentation, formal evaluation reports, and sign-offs for college minor/major capstone projects as part of our institutional collaboration framework.',
  },
  {
    id: 'faq-school-atl',
    question: 'How do schools partner with HydroSync for Atal Tinkering Labs (ATL)?',
    answer:
      'We offer turnkey lab setup, equipment calibration, teacher training workshops, and a graded robotics curriculum mapped to national innovation guidelines for Grades 6 through 12.',
  },
  {
    id: 'faq-prerequisites',
    question: 'What are the prerequisites for the Embedded Systems and IoT programs?',
    answer:
      'Basic familiarity with C programming and introductory electronics is recommended. Our programs start with core microcontroller register architecture and progress to FreeRTOS task scheduling and cloud telemetry.',
  },
  {
    id: 'faq-delivery',
    question: 'How does HydroSync handle hardware kit delivery for remote or online batches?',
    answer:
      'Enrolled candidates in online and hybrid tracks receive their physical hardware toolkit dispatched to their residential address prior to the batch kickoff date.',
  },
];

export default function FAQPage() {
  return (
    <div>
      <PageHero
        eyebrow="Knowledge Base"
        title="Frequently Asked Questions"
        subtitle="Answers to common questions regarding hardware toolkits, internship eligibility, college credits, and institutional MoUs."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <Accordion>
            {VERIFIED_FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                title={faq.question}
                defaultOpen={index === 0}
              >
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </div>
  );
}

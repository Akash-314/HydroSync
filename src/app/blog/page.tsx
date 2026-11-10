import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Blog & Technical Resources',
  description: 'Technical articles, hardware pinout tutorials, and embedded firmware architecture deep-dives.',
};

const ARTICLES = [
  {
    title: 'Configuring FreeRTOS Task Priorities on STM32 Microcontrollers',
    category: 'Embedded',
    readTime: '6 min read',
    summary: 'A deep-dive into mutexes, semaphore deadlocks, and deterministic priority inversion avoidance on ARM Cortex-M.',
    date: '04 Nov 2026',
  },
  {
    title: 'Deploying Low-Power MQTT Telemetry over LoRaWAN Gateways',
    category: 'IoT',
    readTime: '8 min read',
    summary: 'Strategies for payload compression, duty cycle compliance, and sleep modes in remote environmental monitoring.',
    date: '22 Oct 2026',
  },
  {
    title: 'Quantizing Convolutional Models for Edge TinyML with TFLite Micro',
    category: 'AI',
    readTime: '10 min read',
    summary: 'Converting 32-bit floating-point weights to INT8 precision for direct execution on microcontrollers with 128KB SRAM.',
    date: '15 Oct 2026',
  },
];

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Knowledge Base"
        title="Technical Blog &amp; Resources"
        subtitle="Practical engineering insights, firmware debugging guides, and system design tutorials written by our architects."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((article) => (
              <div
                key={article.title}
                className="rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm hover:border-brand-secondary/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={article.category === 'IoT' ? 'iot' : article.category === 'AI' ? 'ai' : 'embedded'}>
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-theme-muted">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-theme-heading mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-theme-body leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-theme-border/60 flex items-center justify-between text-xs text-theme-muted">
                  <span>{article.date}</span>
                  <span className="text-brand-secondary font-semibold inline-flex items-center gap-1">
                    Read Article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


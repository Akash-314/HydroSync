import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Internships',
  description: 'Hands-on technical internships in Embedded Systems, IoT, Edge AI, and Robotics with physical hardware kits.',
};

const TRACKS = [
  {
    title: 'Embedded Firmware & Bare-Metal C/C++',
    domain: 'Embedded',
    duration: '1 / 3 / 6 Months',
    mode: 'Hybrid / On-site Lab',
    desc: 'Work directly with STM32 and ARM Cortex-M microcontrollers, register-level peripheral drivers, and FreeRTOS task scheduling.',
    perks: ['Hardware Dev Kit Provided', 'College Major Project Support', 'Performance Certificate'],
  },
  {
    title: 'Industrial IoT Systems & Edge Gateways',
    domain: 'IoT',
    duration: '1 / 3 / 6 Months',
    mode: 'Hybrid / Remote',
    desc: 'Design sensor nodes, implement MQTT / LoRaWAN communication, and stream real-time telemetry to AWS IoT and custom dashboards.',
    perks: ['ESP32 Starter Hardware', 'Cloud Infrastructure Access', 'Industry Mentor Guidance'],
  },
  {
    title: 'Edge AI, Computer Vision & TinyML',
    domain: 'AI',
    duration: '3 / 6 Months',
    mode: 'Hybrid',
    desc: 'Train and quantize computer vision models for edge inference on resource-constrained embedded systems and Raspberry Pi.',
    perks: ['Real-time Vision Dataset', 'TinyML Deployment Practice', 'GitHub Portfolio Code'],
  },
];

export default function InternshipsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Workforce Enablement"
        title="Technical Engineering Internships"
        subtitle="Rigorous, hands-on development tracks built around actual hardware kits, real industrial problem statements, and academic project approvals."
        breadcrumbs={[{ label: 'Internships' }]}
        actions={
          <Button href="/apply?track=internship" variant="primary">
            Apply for Next Batch
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Available Tracks"
            title="Choose Your Engineering Specialization"
            subtitle="Each track is structured with modular milestones, code reviews, and physical hardware deliverables."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRACKS.map((track) => (
              <div
                key={track.title}
                className="flex flex-col justify-between rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm hover:border-brand-secondary/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={track.domain === 'IoT' ? 'iot' : track.domain === 'AI' ? 'ai' : 'embedded'}>
                      {track.domain}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-theme-muted font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {track.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-theme-heading mb-2">
                    {track.title}
                  </h3>
                  <p className="text-sm text-theme-body leading-relaxed mb-4">
                    {track.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-theme-border/60 text-xs text-theme-body mb-6">
                    {track.perks.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-innovation-green shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  href={`/apply?track=${encodeURIComponent(track.title)}`}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Apply for Track
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers & Opportunities',
  description: 'Join HydroSync Innovations LLP as a firmware engineer, IoT developer, or adjunct technical trainer.',
};

const OPEN_ROLES = [
  {
    title: 'Embedded Firmware Engineer (STM32 / FreeRTOS)',
    type: 'Full-time',
    location: 'Bengaluru / Hybrid',
    exp: '2-4 Years',
    desc: 'Develop bare-metal peripheral drivers, RTOS task management, and communication stacks for industrial customer devices.',
  },
  {
    title: 'IoT Cloud Telemetry Specialist',
    type: 'Full-time',
    location: 'Bengaluru / Remote',
    exp: '2-5 Years',
    desc: 'Architect secure MQTT broker infrastructure, device shadows, and time-series sensor ingestion pipelines on AWS IoT Core.',
  },
  {
    title: 'Technical Trainer & Lab Mentor (Hardware)',
    type: 'Full-time / Adjunct',
    location: 'Bengaluru Lab',
    exp: '1-3 Years',
    desc: 'Guide engineering interns through hands-on electronics wiring, microcontroller debugging, and capstone project design.',
  },
];

export default function CareersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Join Our Team"
        title="Careers &amp; Engineering Roles"
        subtitle="Help us build the next generation of industrial IoT systems and empower thousands of aspiring core engineers."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="space-y-4 max-w-4xl mx-auto">
            {OPEN_ROLES.map((role) => (
              <div
                key={role.title}
                className="p-6 rounded-xl border border-theme-border bg-theme-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-brand-secondary/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="iot">{role.type}</Badge>
                    <span className="flex items-center gap-1 text-xs text-theme-muted">
                      <MapPin className="h-3 w-3" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-theme-muted">
                      <Briefcase className="h-3 w-3" />
                      {role.exp}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-theme-heading">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-xs text-theme-body leading-relaxed max-w-xl">
                    {role.desc}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button
                    href={`/contact?subject=Application:%20${encodeURIComponent(role.title)}`}
                    variant="primary"
                    size="sm"
                  >
                    Apply for Position
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


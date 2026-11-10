import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { ServiceCard } from '@/components/shared/service-card';
import { ServiceItem } from '@/types';

export const metadata: Metadata = {
  title: 'Engineering & Industrial Services',
  description: 'Industrial IoT architectures, embedded firmware engineering, edge AI solutions, and institutional consulting.',
};

const SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Custom Embedded Firmware & PCB Engineering',
    category: 'Embedded',
    description: 'Bare-metal and RTOS firmware architecture for ARM Cortex-M, STM32, and ESP32 with low-power optimizations.',
    deliverables: ['Custom schematic & PCB layout', 'FreeRTOS / Bare-metal C/C++', 'Hardware bring-up & debugging'],
    href: '/contact',
  },
  {
    id: 'serv-2',
    title: 'Industrial IoT Architecture & Sensor Gateways',
    category: 'IoT',
    description: 'Secure edge-to-cloud connectivity utilizing MQTT, LoRaWAN, and cellular modems with cloud dashboard integration.',
    deliverables: ['Telemetry node design', 'Encrypted MQTT broker setup', 'Industrial sensor calibration'],
    href: '/contact',
  },
  {
    id: 'serv-3',
    title: 'Edge AI Inferencing & Computer Vision',
    category: 'AI',
    description: 'Deploying quantized deep learning models and TinyML classifiers directly on edge gateways and microcontrollers.',
    deliverables: ['TensorFlow Lite for Microcontrollers', 'Industrial visual inspection', 'Real-time telemetry inference'],
    href: '/contact',
  },
  {
    id: 'serv-4',
    title: 'Academic Center of Excellence (CoE) Setup',
    category: 'Consulting',
    description: 'Turnkey institutional laboratory setup for engineering colleges, complete with equipment, syllabus, and faculty training.',
    deliverables: ['Lab workbench architecture', 'Hardware kit procurement', 'Faculty Development Programs (FDPs)'],
    href: '/for-colleges',
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Commercial Solutions"
        title="Industrial Engineering &amp; IoT Services"
        subtitle="End-to-end electronic hardware design, embedded firmware architectures, and academic innovation lab setup."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


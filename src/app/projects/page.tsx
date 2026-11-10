import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { Cpu, Radio, Binary, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Projects & Prototyping Capabilities',
  description: 'Industrial IoT engineering, embedded firmware development, and rapid prototyping capabilities at HydroSync Innovations LLP.',
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        eyebrow="R&amp;D Capabilities"
        title="Engineering Projects &amp; Prototyping Scope"
        subtitle="End-to-end electronic hardware design, custom PCB layouts, embedded firmware bring-up, and industrial sensor telemetry."
        breadcrumbs={[{ label: 'Projects' }]}
        actions={
          <Button href="/contact?category=Enterprise" variant="primary">
            Discuss a Prototyping Requirement
          </Button>
        }
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Technical Scope"
            title="Our R&amp;D &amp; Prototyping Domains"
            subtitle="Verified engineering competencies across silicon bring-up, wireless telemetry, and real-time inference."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-2">
                Industrial Telemetry &amp; Gateway Nodes
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed mb-4">
                Custom low-power sensor arrays, LoRaWAN point-to-multipoint topologies, and encrypted MQTT ingestion into enterprise cloud brokers.
              </p>
              <span className="text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                HARDWARE • LORAWAN • MQTT • ESP32
              </span>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-2">
                Motor Dynamics &amp; Embedded Firmware
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed mb-4">
                Bare-metal peripheral drivers on ARM Cortex-M, FreeRTOS multi-threading, closed-loop PID controllers, and deterministic bus diagnostics.
              </p>
              <span className="text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                ARM CORTEX-M • FREERTOS • CAN BUS • STM32
              </span>
            </div>

            <div className="p-6 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border dark:border-brand-dark-border flex items-center justify-center text-brand-secondary dark:text-brand-midnight-azure mb-4">
                <Binary className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-theme-heading dark:text-brand-dark-heading mb-2">
                Edge AI &amp; Microcontroller TinyML
              </h3>
              <p className="text-xs text-theme-body dark:text-brand-dark-body leading-relaxed mb-4">
                Quantized neural network execution, real-time vibration anomaly detection, and embedded computer vision pipelines within sub-50mW power budgets.
              </p>
              <span className="text-[11px] font-mono font-semibold text-brand-secondary dark:text-brand-midnight-azure">
                TENSORFLOW LITE MICRO • OPENCV • EDGE AI
              </span>
            </div>
          </div>

          {/* Authentic Portfolio Notice */}
          <div className="max-w-3xl mx-auto p-8 rounded-2xl border border-dashed border-theme-border dark:border-brand-dark-border bg-theme-surface/60 dark:bg-brand-dark-surface/60 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated text-brand-secondary dark:text-brand-midnight-azure mx-auto mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
              Case Study Portfolio &amp; NDA Disclosures
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-theme-body dark:text-brand-dark-body leading-relaxed max-w-xl mx-auto">
              Commercial client project records and student capstone design dossiers are currently subject to non-disclosure review before public presentation. To evaluate detailed architecture blueprints or inspect sample schematic designs under NDA, contact our engineering desk.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact?category=Enterprise" size="sm" variant="secondary">
                <span>Request Technical Brief</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

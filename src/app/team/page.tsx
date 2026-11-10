import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { TeamMemberCard } from '@/components/shared/team-member-card';
import { TeamMemberItem } from '@/types';

export const metadata: Metadata = {
  title: 'Engineering Team & Leadership',
  description: 'Meet the engineers, instructors, and technical advisors at HydroSync Innovations LLP.',
};

const TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 'team-1',
    name: 'Kiran Shenoy',
    role: 'Principal Firmware Architect',
    department: 'Embedded & Hardware R&D',
    bio: 'Specialist in ARM Cortex-M microcontrollers, RTOS kernel porting, and industrial fieldbus architectures.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'team-2',
    name: 'Vikas Deshmukh',
    role: 'Lead IoT Systems Engineer',
    department: 'Cloud Telemetry & Gateways',
    bio: 'Experienced in large-scale LoRaWAN sensor networks, encrypted MQTT streaming, and cloud edge runtime engines.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'team-3',
    name: 'Pooja Hegde',
    role: 'Technical Training Director',
    department: 'Academic Partnerships',
    bio: 'Leads curriculum standards, mentor evaluation, and institutional MoUs with technical universities.',
    linkedinUrl: 'https://linkedin.com',
  },
];

export default function TeamPage() {
  return (
    <div>
      <PageHero
        eyebrow="Leadership &amp; Faculty"
        title="Our Technical Team &amp; Mentors"
        subtitle="Driven by seasoned engineers passionate about hardware systems, firmware integrity, and student mentorship."
        breadcrumbs={[{ label: 'Team' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


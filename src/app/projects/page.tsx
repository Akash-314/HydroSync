import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { ProjectCard } from '@/components/shared/project-card';
import { FEATURED_PROJECTS } from '@/data/mock-data';

export const metadata: Metadata = {
  title: 'Engineering Projects Showcase',
  description: 'Industrial IoT deployments, embedded firmware case studies, and student innovation prototypes.',
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        eyebrow="R&amp;D Portfolio"
        title="Industrial &amp; Academic Projects"
        subtitle="A verified showcase of telemetry gateways, firmware motor controllers, and edge computer vision solutions."
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


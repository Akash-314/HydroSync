import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { Container } from '@/components/ui/container';
import { CourseCard } from '@/components/shared/course-card';
import { FEATURED_COURSES } from '@/data/mock-data';

export const metadata: Metadata = {
  title: 'Technical Training & Courses',
  description: 'Industrial courses in IoT, Embedded Systems, ARM Cortex, and Edge AI with hardware kits included.',
};

export default function CoursesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Practical Curriculum"
        title="Technical Courses &amp; Skill Acceleration"
        subtitle="Master bare-metal firmware, sensor protocols, RTOS, and cloud architectures through structured lab sessions."
        breadcrumbs={[{ label: 'Courses' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


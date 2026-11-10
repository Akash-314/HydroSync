export type ThemeMode = 'light' | 'dark' | 'system';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
    badge?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'IoT' | 'Embedded' | 'AI' | 'Consulting';
  description: string;
  iconName?: string;
  deliverables?: string[];
  href?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Industrial IoT' | 'Embedded Firmware' | 'Edge AI' | 'Academic Innovation';
  description: string;
  technologies: string[];
  scope: string;
  impactMetric?: string;
  imageUrl?: string;
  href?: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'IoT' | 'Embedded' | 'AI' | 'Robotics' | 'FullStack';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  mode: 'Online Live' | 'Hands-on Classroom' | 'Hybrid';
  summary: string;
  hardwareKitIncluded?: boolean;
  featured?: boolean;
  href?: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Hackathon' | 'Workshop' | 'Masterclass' | 'Webinar' | 'Industrial Expo';
  date: string;
  time?: string;
  location: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  seatsAvailable?: number;
  totalSeats?: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  href?: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  organization: string;
  quote: string;
  rating?: number;
  category: 'Student' | 'College' | 'School' | 'Enterprise';
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}


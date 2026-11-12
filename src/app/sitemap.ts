import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hydrosync.in';
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/internships', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/courses', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/events', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/projects', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/team', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/for-colleges', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/for-schools', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/live-classes', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/certifications', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/partners', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/apply', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/testimonials', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

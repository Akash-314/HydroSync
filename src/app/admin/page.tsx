import * as React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Users2,
  Calendar,
  FolderGit2,
  Inbox,
  BookOpen,
  PlusCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileEdit,
  HardDrive,
} from 'lucide-react';
import { getDashboardMetrics, getRecentSubmissions } from '@/lib/supabase/services/admin-dashboard';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();
  const recentSubmissions = await getRecentSubmissions();

  const statCards = [
    {
      title: 'Active Internships',
      count: metrics.totalInternships,
      subtext: `${metrics.pendingApplications} pending reviews`,
      href: '/admin/internships',
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Published Courses',
      count: metrics.totalCourses,
      subtext: 'Catalog programs',
      href: '/admin/courses',
      icon: GraduationCap,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Total Applications',
      count: metrics.totalApplications,
      subtext: 'Candidate pipeline',
      href: '/admin/internships/applications',
      icon: Users2,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Upcoming Events',
      count: metrics.upcomingEvents,
      subtext: 'Workshops & webinars',
      href: '/admin/events',
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'R&D Projects',
      count: metrics.totalProjects,
      subtext: 'Portfolio case studies',
      href: '/admin/projects',
      icon: FolderGit2,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: 'Direct Inquiries',
      count: metrics.totalEnquiries,
      subtext: 'Corporate & student',
      href: '/admin/submissions',
      icon: Inbox,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Newsletter Readers',
      count: metrics.totalSubscribers,
      subtext: 'Engineering dispatch',
      href: '/admin/submissions',
      icon: Users2,
      color: 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20',
    },
    {
      title: 'Technical Articles',
      count: metrics.totalBlogPosts,
      subtext: 'Blog & resources',
      href: '/admin/blog',
      icon: BookOpen,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Banner with Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface shadow-xs">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-secondary dark:text-brand-midnight-yellow">
            Operations &amp; Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-theme-heading dark:text-brand-dark-heading tracking-tight mt-1">
            HydroSync Management Portal
          </h1>
          <p className="text-xs text-theme-muted dark:text-brand-dark-muted mt-1 max-w-2xl">
            Live database management for programs, candidate applications, dynamic page content, and media assets.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/courses/new">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <PlusCircle className="h-3.5 w-3.5 text-emerald-500" />
              <span>New Course</span>
            </Button>
          </Link>
          <Link href="/admin/internships/new">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <PlusCircle className="h-3.5 w-3.5 text-blue-500" />
              <span>New Internship</span>
            </Button>
          </Link>
          <Link href="/admin/events/new">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <PlusCircle className="h-3.5 w-3.5 text-purple-500" />
              <span>New Event</span>
            </Button>
          </Link>
          <Link href="/admin/pages/home">
            <Button size="sm" className="gap-1.5 text-xs">
              <FileEdit className="h-3.5 w-3.5" />
              <span>Edit Homepage</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-theme-muted font-heading">
            Live Database Metrics
          </h2>
          <span className="text-xs text-theme-muted">
            Aggregated from Supabase PostgreSQL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group p-5 rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface hover:border-brand-secondary/60 dark:hover:border-brand-midnight-azure transition-all duration-200 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-theme-muted group-hover:text-theme-heading transition-colors">
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-lg border ${card.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold font-heading text-theme-heading dark:text-brand-dark-heading tracking-tight">
                    {card.count}
                  </span>
                  <span className="block text-[11px] text-theme-muted mt-0.5">
                    {card.subtext}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Operational Feeds & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Recent Inquiries & Applications */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-theme-heading dark:text-brand-dark-heading font-heading">
              Recent Submissions &amp; Applicants
            </h2>
            <Link
              href="/admin/submissions"
              className="text-xs font-semibold text-brand-secondary hover:underline flex items-center gap-1"
            >
              <span>View All Submissions</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface divide-y divide-theme-border/60 overflow-hidden shadow-xs">
            {recentSubmissions.length === 0 ? (
              <div className="p-8 text-center text-theme-muted text-xs">
                <Clock className="h-8 w-8 mx-auto mb-2 text-theme-muted/50" />
                <p>No recent submissions recorded in the database yet.</p>
                <p className="text-[11px] text-theme-muted/70 mt-1">
                  New submissions via public forms will appear here in real-time.
                </p>
              </div>
            ) : (
              recentSubmissions.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.url}
                  className="p-4 flex items-center justify-between hover:bg-theme-bg dark:hover:bg-brand-dark-elevated/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary dark:bg-brand-midnight-azure/20 dark:text-brand-midnight-azure flex items-center justify-center font-bold text-xs shrink-0">
                      {sub.type === 'internship' ? 'INT' : 'ENQ'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-theme-heading group-hover:text-brand-secondary transition-colors block">
                        {sub.title}
                      </span>
                      <span className="text-[11px] text-theme-muted block">
                        {sub.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-theme-bg border border-theme-border text-theme-body">
                      {sub.status}
                    </span>
                    <span className="text-[11px] text-theme-muted/70 hidden sm:inline">
                      {new Date(sub.timestamp).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-theme-muted group-hover:text-theme-heading group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right 4 Cols: System Architecture & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Management Panel */}
          <div className="rounded-xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-theme-heading dark:text-brand-dark-heading font-heading">
              Management Modules
            </h3>
            <div className="space-y-1.5 text-xs">
              <Link
                href="/admin/pages"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-bg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4 text-brand-secondary" />
                  <span className="font-semibold text-theme-heading">Page CMS (22 Pages)</span>
                </div>
                <span className="text-[10px] text-theme-muted">Manage</span>
              </Link>
              <Link
                href="/admin/internships/applications"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-bg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Users2 className="h-4 w-4 text-emerald-500" />
                  <span className="font-semibold text-theme-heading">Candidate Pipeline</span>
                </div>
                <span className="text-[10px] text-theme-muted">Review</span>
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-bg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-purple-500" />
                  <span className="font-semibold text-theme-heading">Media Library (CDN)</span>
                </div>
                <span className="text-[10px] text-theme-muted">Explore</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-bg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-500" />
                  <span className="font-semibold text-theme-heading">Platform Settings</span>
                </div>
                <span className="text-[10px] text-theme-muted">Config</span>
              </Link>
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Supabase Engine Connected</span>
            </div>
            <p className="text-[11px] text-theme-muted leading-relaxed">
              Row Level Security active on 26 tables and 4 storage buckets. Public frontend queries are cached and isolated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


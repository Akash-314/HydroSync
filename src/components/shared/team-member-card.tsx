import * as React from 'react';
import { User, Linkedin, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMemberItem } from '@/types';

export interface TeamMemberCardProps {
  member: TeamMemberItem;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card hoverable className="h-full text-center">
      <CardContent className="p-6 flex flex-col items-center">
        {/* Avatar / Placeholder */}
        <div className="h-24 w-24 rounded-full bg-brand-light-bg dark:bg-brand-dark-elevated border-2 border-theme-border dark:border-brand-dark-border flex items-center justify-center text-theme-muted mb-4 overflow-hidden">
          <User className="h-10 w-10 text-brand-secondary dark:text-brand-midnight-azure" />
        </div>

        <h3 className="text-lg font-bold font-heading text-theme-heading dark:text-brand-dark-heading">
          {member.name}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-midnight-azure mt-0.5">
          {member.role}
        </p>
        <span className="text-[11px] text-theme-muted dark:text-brand-dark-muted font-medium mt-0.5">
          {member.department}
        </span>

        <p className="mt-3 text-xs text-theme-body dark:text-brand-dark-body leading-relaxed line-clamp-3">
          {member.bio}
        </p>

        {/* Social Links */}
        <div className="mt-5 flex items-center gap-3 pt-3 border-t border-theme-border/60 dark:border-brand-dark-border/60 w-full justify-center">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-theme-muted dark:text-brand-dark-muted hover:text-brand-primary dark:hover:text-brand-midnight-yellow transition-colors"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-theme-muted dark:text-brand-dark-muted hover:text-theme-heading dark:hover:text-brand-dark-heading transition-colors"
              aria-label={`${member.name}'s GitHub profile`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

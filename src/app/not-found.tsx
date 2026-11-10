import * as React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 sm:py-32">
      <Container className="text-center max-w-lg">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light-bg text-brand-secondary dark:bg-brand-dark-surface dark:text-brand-dark-blue-accent mx-auto mb-6">
          <FileQuestion className="h-8 w-8" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-secondary">
          Error 404
        </span>
        <h1 className="mt-2 text-3xl font-extrabold font-heading text-theme-heading sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm text-theme-body leading-relaxed">
          The requested engineering module, course URL, or technical resource does not exist or may have been relocated.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home className="mr-2 h-4 w-4" />
            <span>Return to Home</span>
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Contact Support</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}


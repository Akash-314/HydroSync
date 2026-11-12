'use client';

import * as React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterStatus, setNewsletterStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, sourcePage: 'footer' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Subscription failed. Please try again.');
      }
      setNewsletterStatus('success');
      setFeedbackMessage(data.message || 'Thank you for subscribing to HydroSync technical insights!');
      setNewsletterEmail('');
    } catch (err: unknown) {
      setNewsletterStatus('error');
      const msg = err instanceof Error ? err.message : 'Unable to complete subscription.';
      setFeedbackMessage(msg);
    }
  };

  if (newsletterStatus === 'success') {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg border border-brand-innovation-green/40 bg-brand-innovation-green/10 text-xs font-medium text-brand-innovation-green">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span>{feedbackMessage}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleNewsletterSubmit} className="space-y-2">
      <div className="flex w-full items-center gap-2">
        <input
          type="email"
          value={newsletterEmail}
          onChange={(e) => {
            setNewsletterEmail(e.target.value);
            if (newsletterStatus === 'error') setNewsletterStatus('idle');
          }}
          placeholder="Enter corporate or academic email"
          aria-label="Email address for technical newsletter"
          required
          disabled={newsletterStatus === 'loading'}
          className="h-11 w-full sm:w-72 rounded-md border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface px-4 text-xs sm:text-sm text-theme-heading dark:text-brand-dark-heading placeholder:text-theme-muted dark:placeholder:text-brand-dark-muted focus:border-brand-secondary dark:focus:border-brand-midnight-yellow focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 dark:focus:ring-brand-midnight-yellow/20"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={newsletterStatus === 'loading'}
          className="shrink-0 text-xs sm:text-sm"
        >
          <span>Subscribe</span>
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
      {newsletterStatus === 'error' && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}
    </form>
  );
}


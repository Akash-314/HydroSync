'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [forgotModal, setForgotModal] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');
  const [resetMessage, setResetMessage] = React.useState<string | null>(null);
  const [resetLoading, setResetLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrator credentials.');
      }

      router.push(data.redirect || '/admin');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage(null);

    try {
      const res = await fetch('/api/admin/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      setResetMessage(data.message || 'If registered, a password reset link has been dispatched.');
    } catch {
      setResetMessage('Error dispatching reset instructions.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-theme-bg text-theme-body">
      {/* Top Bar with Logo & Theme Toggle */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-theme-border/60">
        <Link href="/" className="flex items-center gap-2.5 text-xs font-semibold text-theme-muted hover:text-theme-heading transition-colors">
          <span>&larr; Return to Public Website</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="rounded-2xl border border-theme-border dark:border-brand-dark-border bg-theme-surface dark:bg-brand-dark-surface p-8 shadow-xl">
            {/* Logo & Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light-bg dark:bg-brand-dark-elevated border border-theme-border/80 shadow-sm p-1.5 mx-auto">
                <Image
                  src="/images/logo/hydrosync-logo-mark.png"
                  alt="HydroSync Logo Mark"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-theme-heading dark:text-brand-dark-heading tracking-tight">
                  HydroSync Portal
                </h1>
                <p className="text-xs text-theme-muted dark:text-brand-dark-muted mt-1">
                  Enterprise Management &amp; Content Administration
                </p>
              </div>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-theme-heading dark:text-brand-dark-heading uppercase tracking-wider mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@hydrosync.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-bg text-theme-heading text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-theme-heading dark:text-brand-dark-heading uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModal(true)}
                    className="text-xs text-brand-secondary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-theme-border dark:border-brand-dark-border bg-theme-bg dark:bg-brand-dark-bg text-theme-heading text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-heading"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 justify-center py-2.5 gap-2"
                size="lg"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Management Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 pt-5 border-t border-theme-border/60 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-theme-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-innovation-green" />
                <span>Protected by Server-Side Role-Based Access Control</span>
              </div>
              <p className="text-[10px] text-theme-muted/70 mt-1">
                Access is restricted to authorized personnel. Public registration is disabled.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-theme-border/60 text-center text-xs text-theme-muted">
        &copy; {new Date().getFullYear()} HydroSync Innovations LLP. All rights reserved.
      </footer>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-theme-border bg-theme-surface p-6 shadow-2xl">
            <h3 className="text-lg font-bold font-heading text-theme-heading mb-1">
              Reset Administrator Password
            </h3>
            <p className="text-xs text-theme-muted mb-4">
              Enter your authorized email. A password recovery link will be dispatched.
            </p>

            {resetMessage && (
              <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{resetMessage}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="manager@hydrosync.in"
                className="w-full px-3.5 py-2 rounded-lg border border-theme-border bg-theme-bg text-theme-heading text-xs focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setForgotModal(false);
                    setResetMessage(null);
                  }}
                >
                  Close
                </Button>
                <Button type="submit" size="sm" disabled={resetLoading}>
                  {resetLoading ? 'Dispatching...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


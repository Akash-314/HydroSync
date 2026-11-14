'use client';

import * as React from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
  Phone,
  Share2,
  Megaphone,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  const [tab, setTab] = React.useState<'general' | 'contact' | 'socials' | 'announcement' | 'seo'>('general');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // General
  const [name, setName] = React.useState('HydroSync Innovations LLP');
  const [tagline, setTagline] = React.useState('Technology • IoT • Embedded Systems • AI');
  const [motto, setMotto] = React.useState('Innovation for a Healthier Tomorrow');
  const [description, setDescription] = React.useState('');
  const [llpNumber, setLlpNumber] = React.useState('AAL-0000');

  // Contact
  const [email, setEmail] = React.useState('contact@hydrosync.in');
  const [phone, setPhone] = React.useState('+91 98765 43210');
  const [whatsapp, setWhatsapp] = React.useState('+91 98765 43210');
  const [city, setCity] = React.useState('Bengaluru');
  const [address, setAddress] = React.useState('Bengaluru, Karnataka, India');
  const [workingHours, setWorkingHours] = React.useState('Monday - Saturday: 9:00 AM - 6:30 PM IST');

  // Socials
  const [linkedin, setLinkedin] = React.useState('https://linkedin.com/company/hydrosync-innovations');
  const [youtube, setYoutube] = React.useState('https://youtube.com/@hydrosync-innovations');
  const [instagram, setInstagram] = React.useState('https://instagram.com/hydrosync.in');
  const [facebook, setFacebook] = React.useState('https://facebook.com/hydrosyncinnovations');

  // Announcement
  const [bannerEnabled, setBannerEnabled] = React.useState(false);
  const [bannerText, setBannerText] = React.useState('');
  const [bannerLinkUrl, setBannerLinkUrl] = React.useState('/internships');
  const [bannerLinkText, setBannerLinkText] = React.useState('Apply Now →');

  // SEO
  const [defaultTitle, setDefaultTitle] = React.useState('');
  const [defaultDescription, setDefaultDescription] = React.useState('');
  const [keywords, setKeywords] = React.useState('');

  React.useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.settings) {
          const s = data.settings;
          if (s.general) {
            setName(s.general.name || '');
            setTagline(s.general.tagline || '');
            setMotto(s.general.motto || '');
            setDescription(s.general.description || '');
            setLlpNumber(s.general.llpNumber || '');
          }
          if (s.contact) {
            setEmail(s.contact.email || '');
            setPhone(s.contact.phone || '');
            setWhatsapp(s.contact.whatsapp || '');
            setCity(s.contact.city || '');
            setAddress(s.contact.address || '');
            setWorkingHours(s.contact.workingHours || '');
          }
          if (s.socials) {
            setLinkedin(s.socials.linkedin || '');
            setYoutube(s.socials.youtube || '');
            setInstagram(s.socials.instagram || '');
            setFacebook(s.socials.facebook || '');
          }
          if (s.announcement) {
            setBannerEnabled(!!s.announcement.enabled);
            setBannerText(s.announcement.text || '');
            setBannerLinkUrl(s.announcement.linkUrl || '');
            setBannerLinkText(s.announcement.linkText || '');
          }
          if (s.seo) {
            setDefaultTitle(s.seo.defaultTitle || '');
            setDefaultDescription(s.seo.defaultDescription || '');
            setKeywords(s.seo.keywords || '');
          }
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      general: { name, tagline, motto, description, llpNumber },
      contact: { email, phone, whatsapp, city, address, workingHours },
      socials: { linkedin, youtube, instagram, facebook },
      announcement: {
        enabled: bannerEnabled,
        text: bannerText,
        linkUrl: bannerLinkUrl,
        linkText: bannerLinkText,
      },
      seo: { defaultTitle, defaultDescription, keywords },
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save settings');
      }
      setMessage({ text: 'Site settings updated and published globally!', type: 'success' });
    } catch (err: unknown) {
      setMessage({ text: err instanceof Error ? err.message : 'Save error', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'Company Identity', icon: Building2 },
    { id: 'contact', label: 'Contact & Ops', icon: Phone },
    { id: 'socials', label: 'Social Profiles', icon: Share2 },
    { id: 'announcement', label: 'Global Banner', icon: Megaphone },
    { id: 'seo', label: 'SEO & Metadata', icon: Globe },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-secondary">
            Global Site Configuration
          </span>
          <h1 className="text-2xl font-bold font-heading text-theme-heading tracking-tight mt-0.5">
            Website Settings
          </h1>
          <p className="text-xs text-theme-muted mt-1">
            Configure company branding, corporate registration, contact channels, announcements, and default SEO.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving || loading} className="gap-2 text-xs">
          <Save className="h-3.5 w-3.5" />
          <span>{saving ? 'Publishing...' : 'Save Settings'}</span>
        </Button>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-theme-border pb-3 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-theme-muted hover:text-theme-heading hover:bg-theme-bg'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs text-theme-muted">Loading settings...</div>
      ) : (
        <form onSubmit={handleSave} className="max-w-3xl space-y-6">
          {tab === 'general' && (
            <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
              <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
                Company Brand &amp; Identity
              </h2>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Full Company Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Corporate Motto
                  </label>
                  <input
                    type="text"
                    value={motto}
                    onChange={(e) => setMotto(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  LLP Identification Number (LLPIN)
                </label>
                <input
                  type="text"
                  value={llpNumber}
                  onChange={(e) => setLlpNumber(e.target.value)}
                  placeholder="e.g. AAL-0000"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Official Entity Overview
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>
          )}

          {tab === 'contact' && (
            <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
              <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
                Contact &amp; Operations Directory
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Primary Contact Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Admissions &amp; Support Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    WhatsApp Support Number
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Headquarters City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Full Physical Lab Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Working / Support Hours
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>
          )}

          {tab === 'socials' && (
            <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
              <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
                Official Social Media Channels
              </h2>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  LinkedIn Page URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>
          )}

          {tab === 'announcement' && (
            <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
              <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
                Top Announcement Bar
              </h2>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-theme-border bg-theme-bg/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bannerEnabled}
                  onChange={(e) => setBannerEnabled(e.target.checked)}
                  className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4"
                />
                <div>
                  <span className="text-xs font-semibold text-theme-heading block">
                    Show Top Announcement Bar
                  </span>
                  <span className="text-[11px] text-theme-muted">
                    Displays high-priority admissions alerts at the very top of the public website.
                  </span>
                </div>
              </label>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Announcement Message
                </label>
                <input
                  type="text"
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  placeholder="e.g. Summer 2026 Embedded Systems & IoT Cohort applications now open!"
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Target Route / URL
                  </label>
                  <input
                    type="text"
                    value={bannerLinkUrl}
                    onChange={(e) => setBannerLinkUrl(e.target.value)}
                    placeholder="/internships or /courses"
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs font-mono focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-theme-heading mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={bannerLinkText}
                    onChange={(e) => setBannerLinkText(e.target.value)}
                    placeholder="Apply Now →"
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="rounded-2xl border border-theme-border bg-theme-surface p-6 space-y-4">
              <h2 className="text-sm font-bold text-theme-heading border-b border-theme-border pb-2">
                Default Search Engine Optimization (SEO)
              </h2>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Default Browser Title Template
                </label>
                <input
                  type="text"
                  value={defaultTitle}
                  onChange={(e) => setDefaultTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Default Meta Description
                </label>
                <textarea
                  rows={3}
                  value={defaultDescription}
                  onChange={(e) => setDefaultDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-theme-heading mb-1">
                  Target Meta Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-border text-theme-heading text-xs focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving} className="gap-2 text-xs">
              <Save className="h-3.5 w-3.5" />
              <span>{saving ? 'Publishing...' : 'Save Settings'}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

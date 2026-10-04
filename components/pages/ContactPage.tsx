'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2, MessageCircle, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const inputClass =
  'w-full min-h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-100 ' +
  'placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';
const labelClass = 'block mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Tech Architecture Consulting',
    message: '',
    website: '', // honeypot - must stay empty
  });

  const whatsappLink = siteConfig.contact.whatsapp.link;
  const hasWhatsapp = whatsappLink.startsWith('http');
  const email = siteConfig.contact.email;

  // Load reCAPTCHA v3 only if a site key is configured
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.getElementById('recaptcha-script')) return;
    const s = document.createElement('script');
    s.id = 'recaptcha-script';
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  const getRecaptchaToken = (): Promise<string> =>
    new Promise((resolve) => {
      if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return resolve('');
      window.grecaptcha.ready(() => {
        window.grecaptcha!
          .execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
          .then(resolve)
          .catch(() => resolve(''));
      });
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `${formData.topic}: ${formData.name}`,
          message: `Area of inquiry: ${formData.topic}\n\n${formData.message}`,
          website: formData.website,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', topic: 'Tech Architecture Consulting', message: '', website: '' });
      } else {
        const errorData = await response.json().catch(() => null);
        const detail = typeof errorData?.detail === 'string' ? errorData.detail : null;
        setErrorMessage(detail || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact error:', error);
      setErrorMessage(
        (error as Error)?.name === 'AbortError'
          ? 'The server took too long to respond. Please try again.'
          : 'Unable to connect. Please check your connection.'
      );
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Home</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Mail className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Let&apos;s Work Together</h1>
          <p className="max-w-2xl text-base text-zinc-400 sm:text-lg">
            Tell me about your project: web apps, data analytics, healthcare automation or AI integration.
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* Quick contact: shown first on mobile so it is one tap away */}
          <aside className="space-y-3 md:order-2 md:col-span-5">
            {hasWhatsapp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-base font-bold text-zinc-950 transition-colors hover:bg-emerald-400"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-base font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 break-all"
            >
              <Mail className="h-5 w-5 shrink-0" />
              {email}
            </a>
          </aside>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-8 md:order-1 md:col-span-7">
            {submitted ? (
              <div className="space-y-4 py-10 text-center" role="status">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold">Message sent!</h2>
                <p className="text-sm text-zinc-400">Thank you. I&apos;ll reply to your email soon.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="min-h-12 rounded-xl border border-zinc-700 bg-zinc-800 px-5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-sm text-red-400"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot: hidden from people and screen readers, bots fill it */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="name" className={labelClass}>Your Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="topic" className={labelClass}>Area of Inquiry</label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className={inputClass}
                  >
                    <option value="Tech Architecture Consulting">Full-Stack & Cloud Architecture</option>
                    <option value="Healthcare Informatics & FHIR">Healthcare & FHIR/HIPAA Engineering</option>
                    <option value="AI Reasoning & RAG Systems">Enterprise AI Agents & RAG</option>
                    <option value="General Collaboration">General Technical Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Project Scope & Timeline *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} leading-relaxed`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-base font-bold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {RECAPTCHA_SITE_KEY && (
                  <p className="text-center text-xs text-zinc-600">
                    Protected by reCAPTCHA. Google&apos;s{' '}
                    <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>{' '}
                    and{' '}
                    <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>{' '}
                    apply.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

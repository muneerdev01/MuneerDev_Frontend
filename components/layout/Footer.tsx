'use client';

import React from 'react';
import Link from 'next/link';
import {
  Terminal,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  Calendar,
  Mail,
  ArrowUpRight,
  Heart,
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  // Safe fallback values from siteConfig
  const brandName = siteConfig?.name || 'MuneerDev';
  const githubUrl = siteConfig?.socials?.github;
  const twitterUrl = siteConfig?.socials?.twitter;
  const linkedinUrl = siteConfig?.socials?.linkedin;
  const facebookUrl = siteConfig?.socials?.facebook;
  const instagramUrl = siteConfig?.socials?.instagram;
  const whatsappLink = siteConfig?.contact?.whatsapp?.link;
  const whatsappFormatted = siteConfig?.contact?.whatsapp?.formatted || 'WhatsApp';
  const emailAddress = siteConfig?.contact?.email || 'contact@muneer.dev';
  const bookingLink = siteConfig?.contact?.booking?.link;
  const bookingLabel = siteConfig?.contact?.booking?.label || 'Schedule a Meeting';

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/60 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-zinc-100"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Terminal className="h-4 w-4" />
              </div>
              <span>
                {brandName} <span className="text-emerald-400 font-mono text-xs">(muneer.dev)</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Software Engineer, Data Analyst &amp; Healthcare Automation Expert. Category A Registered Pharmacist with 19+ years of clinical &amp; pharmaceutical operations experience. Specializing in Next.js 15 architectures and microservices.
            </p>

            {/* Social & Contact Icons */}
            <div className="flex flex-wrap items-center gap-2.5 text-zinc-400">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}

              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label="X / Twitter"
                  title="X / Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}

              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}

              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label={`WhatsApp (${whatsappFormatted})`}
                  title={`WhatsApp (${whatsappFormatted})`}
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}

              {emailAddress && (
                <a
                  href={`mailto:${emailAddress}`}
                  className="p-2 rounded-lg hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
                  aria-label="Email"
                  title={`Email: ${emailAddress}`}
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Quick Booking Callout */}
            {bookingLink && (
              <div className="pt-2">
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all"
                >
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{bookingLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                </a>
              </div>
            )}
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Pages
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>
                <Link
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={(e) => handleLinkClick(e, '/blog')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={(e) => handleLinkClick(e, '/projects')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Projects &amp; Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={(e) => handleLinkClick(e, '/services')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Services &amp; Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Status */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Infrastructure
            </h3>
            <div className="mt-4 space-y-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Frontend: Next.js 15 App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <span>Backend: Render Microservices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Styling: Tailwind CSS v4</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  onClick={(e) => handleLinkClick(e, '/admin')}
                  className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  → Staff Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline-block" />
            <span>using Next.js 15 &amp; React 19</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
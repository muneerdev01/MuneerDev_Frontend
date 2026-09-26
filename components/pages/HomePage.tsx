'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Sparkles,
  BookOpen,
  Layers,
  ExternalLink,
  Calendar,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';
import { SAMPLE_ARTICLES } from '@/lib/api';
import { siteConfig } from '@/lib/siteConfig';

interface HomePageProps {
  onNavigate?: (path: string) => void;
  onArticleClick?: (slug: string) => void;
}

export function HomePage({ onNavigate, onArticleClick }: HomePageProps) {
  const latestArticles = SAMPLE_ARTICLES.slice(0, 2);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleArticle = (slug: string) => {
    if (onArticleClick) {
      onArticleClick(slug);
    }
  };

  // Safe fallbacks for contact and booking links from siteConfig
  const bookingLink = siteConfig?.contact?.booking?.link;
  const bookingLabel = siteConfig?.contact?.booking?.label || 'Book Call';
  const whatsappLink = siteConfig?.contact?.whatsapp?.link;
  const authorName = siteConfig?.name || 'Ghulam Muneer Uddin';

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Category A Registered Pharmacist &amp; Technology Consultant
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-tight">
                {authorName}
              </h1>

              <h2 className="hero-subtitle text-base md:text-lg font-medium text-zinc-400 flex flex-wrap items-center gap-4 sm:gap-6 mt-3">
                <span>Software Engineer</span>
                <span>Data Analyst</span>
                <span className="text-sky-400 font-semibold highlight">
                  Healthcare Automation Expert
                </span>
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                Category A Registered Pharmacist with 19+ years of clinical and pharmaceutical operations experience, specializing in full-stack software development, automated web scraping pipelines, data analytics, AI integration, and medical writing.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {bookingLink && (
                  <a
                    href={bookingLink}
                    target={siteConfig.contact.booking.label === 'Contact' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{bookingLabel}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}

                <Link
                  href="/projects"
                  onClick={() => handleNav('/projects')}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </Link>

                <Link
                  href="/blog"
                  onClick={() => handleNav('/blog')}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>Read Articles</span>
                </Link>

                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target={siteConfig.contact.whatsapp.label === 'Contact' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-900/40 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    <span>{siteConfig.contact.whatsapp.label}</span>
                  </a>
                )}

                <Link
                  href="/contact"
                  onClick={() => handleNav('/contact')}
                  className="inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <span>Inquiry</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Profile Picture Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-[350px] max-w-full">
                <div className="relative p-[2.5px] rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[14px] bg-zinc-900">
                    <Image
                      src="/profile.png"
                      alt={`${authorName} - Software Engineer, Data Analyst & Healthcare Automation Expert`}
                      width={350}
                      height={350}
                      priority
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover rounded-[14px] transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Specialties */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mt-1">
              Engineering Disciplines
            </h2>
          </div>
          <Link
            href="/services"
            onClick={() => handleNav('/services')}
            className="text-xs font-mono text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1"
          >
            <span>Explore all services</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Next.js 15 & React 19</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Leveraging React Server Components, server actions, dynamic routing, and fine-grained data caching for instantaneous load times.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Render Cloud Microservices</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Architecting isolated backend APIs on Render with PostgreSQL, Redis caching, job workers, and automated deployment pipelines.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Supabase & Database Layer</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Row Level Security (RLS), real-time pub/sub subscriptions, auth management, and relational schema migrations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Publications
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mt-1">
              Recent Technical Notes
            </h2>
          </div>
          <Link
            href="/blog"
            onClick={() => handleNav('/blog')}
            className="text-xs font-mono text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1"
          >
            <span>View all articles</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => handleArticle(article.slug)}
              className="group cursor-pointer rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-emerald-500/40 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                    {article.category}
                  </span>
                  <span className="text-xs text-zinc-500">•</span>
                  <span className="text-xs text-zinc-400">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.publishedAt}</span>
                <span className="inline-flex items-center gap-1 font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  Read article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="rounded-full bg-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Explore Production Systems & Open Source Work
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              From enterprise SaaS dashboards to open-source developer tooling and distributed microservices.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/projects"
                onClick={() => handleNav('/projects')}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
              >
                <span>Browse Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
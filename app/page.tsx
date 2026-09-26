'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Article } from '@/types/blog';
import { fetchPublishedArticles } from '@/lib/api';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { MUNEERDEV_PROJECTS, MUNEERDEV_SERVICES } from '@/data/muneerdev-portfolio';
import { siteConfig } from '@/lib/siteConfig';
import {
  ArrowRight, BookOpen, Cpu, Stethoscope, Terminal,
  Layers, Code2, Sparkles, FolderGit2, Wrench, CheckCircle2,
  ExternalLink, Github, BarChart3, Database, FileText, Bot, ArrowUpRight,
  Calendar, MessageCircle
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeBlogTab, setActiveBlogTab] = useState<'ALL' | 'TECH' | 'HEALTHCARE_MEDICINE'>('ALL');
  const [loading, setLoading] = useState(true);
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPublishedArticles({
      blog_type: activeBlogTab === 'ALL' ? undefined : activeBlogTab,
      limit: 6
    })
      .then(res => setArticles(res.articles))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeBlogTab]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/15 to-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Bio & Calls to Action */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Category A Registered Pharmacist &amp; Technology Consultant</span>
              </div>

              {/* Headline & Value Proposition */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.15]">
                  {siteConfig.name}
                </h1>
                <h2 className="hero-subtitle text-base md:text-lg font-medium text-zinc-400 flex flex-wrap items-center gap-4 sm:gap-6 mt-3">
                  <span>Software Engineer</span>
                  <span>Data Analyst</span>
                  <span className="text-sky-400 font-semibold highlight">Healthcare Automation Expert</span>
                </h2>
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-normal">
                  Category A Registered Pharmacist with 19+ years of clinical and pharmaceutical operations experience, specializing in full-stack software development, high-throughput cloud backends, automated web scraping and data pipelines, data analytics, deterministic AI/RAG workflows, healthcare informatics, and medical writing.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={siteConfig.contact.booking.link}
                  target={siteConfig.contact.booking.label === 'Contact' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{siteConfig.contact.booking.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                  <FolderGit2 className="h-4 w-4 text-emerald-400" />
                  <span>Projects &amp; Deployments ({MUNEERDEV_PROJECTS.length})</span>
                </Link>

                <a
                  href={siteConfig.contact.whatsapp.link}
                  target={siteConfig.contact.whatsapp.label === 'Contact' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 transition-colors"
                  title={siteConfig.contact.whatsapp.label === 'Contact' ? 'Contact' : `WhatsApp: ${siteConfig.contact.whatsapp.formatted}`}
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>{siteConfig.contact.whatsapp.label}</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <span>Inquiry</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Profile Picture (350px wide, subtle emerald-to-cyan gradient border, rounded-2xl, soft shadow) */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-[350px] max-w-full">
                {/* Subtle emerald-to-cyan gradient border with soft shadow */}
                <div className="relative p-[2.5px] rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[14px] bg-zinc-900">
                    {profileImageFailed ? (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-5xl font-semibold text-zinc-500" role="img" aria-label={`${siteConfig.name} profile image fallback`}>
                        GM
                      </div>
                    ) : (
                      <Image
                        src="/profile.png"
                        alt={`${siteConfig.name} - Software Engineer, Data Analyst & Healthcare Automation Expert`}
                        width={350}
                        height={350}
                        priority
                        referrerPolicy="no-referrer"
                        onError={() => setProfileImageFailed(true)}
                        className="h-full w-full object-cover rounded-[14px] transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Service Badges & Capabilities (6 items) */}
          <div className="pt-6 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              Core Capabilities &amp; Specialized Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
                <Code2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">Next.js 15 &amp; React 19 Web Engineering</span>
                  <span className="text-[11px] text-zinc-400">High-performance App Router architectures &amp; modern UI</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
                <BarChart3 className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">Data Analytics &amp; Business Intelligence</span>
                  <span className="text-[11px] text-zinc-400">Python, Streamlit, Pandas EDA &amp; interactive KPI dashboards</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
                <Bot className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">Web Scraping &amp; Automated Data Pipelines</span>
                  <span className="text-[11px] text-zinc-400">Playwright, BeautifulSoup, structured extraction &amp; ETL</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
                <Stethoscope className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">Healthcare Informatics &amp; HIPAA-Aware Design</span>
                  <span className="text-[11px] text-zinc-400">Clinical workflow automation &amp; privacy-first best practices</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
                <FileText className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">Medical Writing &amp; Clinical Documentation</span>
                  <span className="text-[11px] text-zinc-400">19+ years clinical expertise, protocols &amp; scientific communication</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
                <Cpu className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">AI Agents &amp; RAG-Driven Automation Pipelines</span>
                  <span className="text-[11px] text-zinc-400">Autonomous workflow agents, vector search &amp; deterministic guardrails</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Engineering Competency Pills from File B */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>React 19 &amp; Next.js SSR</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Node.js / Express Concurrency</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
              <span>HL7 / FHIR Clinical Data</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
              <span>HIPAA Compliance &amp; Security</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>RAG &amp; Deterministic Agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section className="py-16 sm:py-24 border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Publications &amp; Clinical Analysis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                Technical Articles, Healthcare Data Engineering Notes &amp; Clinical Workflows
              </h2>
              <p className="text-sm sm:text-base text-zinc-400">
                Practical engineering deep dives, clinical data workflow analysis, and notes from production deployments.
              </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
              <button
                type="button"
                onClick={() => setActiveBlogTab('ALL')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${activeBlogTab === 'ALL'
                  ? 'bg-zinc-800 text-zinc-100 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveBlogTab('TECH')}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${activeBlogTab === 'TECH'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'text-zinc-400 hover:text-emerald-300'
                  }`}
              >
                <Cpu className="h-3 w-3" />
                <span>Tech</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBlogTab('HEALTHCARE_MEDICINE')}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${activeBlogTab === 'HEALTHCARE_MEDICINE'
                  ? 'bg-teal-950 text-teal-300 border border-teal-500/40'
                  : 'text-zinc-400 hover:text-teal-300'
                  }`}
              >
                <Stethoscope className="h-3 w-3" />
                <span>Healthcare</span>
              </button>
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="py-16 text-center text-zinc-500 text-xs">Loading latest articles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={(slug) => router.push(`/blog/${slug}`)}
                />
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-emerald-500 hover:text-emerald-300 transition-all"
            >
              <span>Explore All Publications &amp; Search Archives</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Showcase - Verified Live Deployments */}
      <section className="py-16 sm:py-24 border-b border-zinc-800/80 bg-zinc-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>Selected Projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                Featured Projects
              </h2>
              <p className="text-sm sm:text-base text-zinc-400">
                Healthcare, AI, cloud, and data projects with demo and repository links from the portfolio data.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View all {MUNEERDEV_PROJECTS.length} projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUNEERDEV_PROJECTS.slice(0, 6).map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-zinc-900/80 transition-all shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-semibold uppercase text-emerald-400">
                      {project.category}
                    </span>
                    <span className="rounded bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-semibold">
                      Demo URL
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-zinc-300 border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Action Links to Live Demo and GitHub */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Open Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-700/80 hover:text-zinc-100 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub Repo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                <Wrench className="h-3.5 w-3.5" />
                <span>Advisory &amp; Engineering Offerings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                Specialized Services &amp; Consulting
              </h2>
              <p className="text-sm sm:text-base text-zinc-400">
                High-leverage engineering, healthcare informatics consulting, and data automation.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>View full service details</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUNEERDEV_SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4 hover:border-teal-500/50 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{serv.name}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {serv.description}
                  </p>
                  {serv.bullets && serv.bullets.length > 0 && (
                    <ul className="space-y-1.5 pt-2 text-xs text-zinc-400">
                      {serv.bullets.slice(0, 3).map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-800/80">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <span>Request consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Zap, ArrowRight, Layers, Shield, Cpu, Code2, Server } from 'lucide-react';

interface ServicesPageProps {
  onBack?: () => void;
  onContactClick?: () => void;
}

const SERVICES = [
  {
    id: 'nextjs-migration',
    icon: Code2,
    title: 'Next.js 15 & React 19 Migration',
    badge: 'Popular',
    description: 'Upgrade legacy Vite/CRA single-page applications to Next.js 15 App Router. Eliminate bundle bloat and achieve instant routing transitions.',
    deliverables: [
      'App Router architecture setup & route restructuring',
      'React Server Components & Server Actions adoption',
      'Zero-config Tailwind CSS v4 styling setup',
      'SEO optimization & OpenGraph social meta cards',
    ],
  },
  {
    id: 'render-microservices',
    icon: Server,
    title: 'Decoupled Render Cloud Architecture',
    badge: 'Fullstack',
    description: 'Design and deploy robust backend microservices, job runners, and PostgreSQL/Redis instances on Render, connected to Next.js via secured APIs.',
    deliverables: [
      'Render Web Services & Background Workers provisioning',
      'Bearer JWT & API gateway security enforcement',
      'Database connection pooling & schema migrations',
      'Automated preview environments & CI/CD deployment pipelines',
    ],
  },
  {
    id: 'performance-audit',
    icon: Zap,
    title: 'Performance Optimization & Core Web Vitals',
    badge: 'Performance',
    description: 'Comprehensive profiling of slow initial render times, hydration mismatches, layout shifts (CLS), and heavy client bundles.',
    deliverables: [
      'Streaming SSR & dynamic boundary audits',
      'Image optimization with Next.js image components',
      'Edge CDN caching & header configurations',
      'Core Web Vitals scores > 95 audit report',
    ],
  },
];

export function ServicesPage({ onBack, onContactClick }: ServicesPageProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else router.push('/');
  };

  const handleContact = () => {
    if (onContactClick) onContactClick();
    else router.push('/contact');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <Zap className="h-4 w-4" />
          <span>Consulting & Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Specialized Technical Services
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          High-impact engineering solutions tailored for scaling startups and engineering teams modernizing their web systems.
        </p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider bg-zinc-800 px-2.5 py-1 rounded-md">
                    {service.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-zinc-100">{service.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>

                <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                  <span className="font-mono text-xs text-zinc-300 font-semibold block mb-2">
                    Scope & Deliverables:
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400 leading-normal">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleContact}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                >
                  <span>Inquire for Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engagement Workflow */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-6">
        <h2 className="text-xl font-bold text-zinc-100">Engagement Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-sm">
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-1">
            <span className="font-mono text-xs text-emerald-400 font-bold">Phase 1</span>
            <h3 className="font-semibold text-zinc-200">Architecture Review</h3>
            <p className="text-xs text-zinc-400 mt-1">Audit of codebase, Render configuration, and bottlenecks.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-1">
            <span className="font-mono text-xs text-emerald-400 font-bold">Phase 2</span>
            <h3 className="font-semibold text-zinc-200">Migration Roadmap</h3>
            <p className="text-xs text-zinc-400 mt-1">Staged migration plan with zero customer downtime.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-1">
            <span className="font-mono text-xs text-emerald-400 font-bold">Phase 3</span>
            <h3 className="font-semibold text-zinc-200">Hands-on Execution</h3>
            <p className="text-xs text-zinc-400 mt-1">Component refactoring, server action wiring, and testing.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-1">
            <span className="font-mono text-xs text-emerald-400 font-bold">Phase 4</span>
            <h3 className="font-semibold text-zinc-200">Handoff & Docs</h3>
            <p className="text-xs text-zinc-400 mt-1">Comprehensive system documentation and team training.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

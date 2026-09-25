'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ArrowRight,
  Terminal,
  FolderGit2,
  Cpu,
  Layers,
  Globe
} from 'lucide-react';
import { MUNEERDEV_PROJECTS } from '@/data/muneerdev-portfolio';

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  liveDemo?: string;
  githubUrl?: string;
  highlight?: string;
}

interface ProjectsPageProps {
  onBack?: () => void;
  onNavigateBlog?: (tag?: string) => void;
  onContactClick?: () => void;
}

// Fallback internal projects dataset if import is empty or undefined
const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    name: 'CloudPulse: Real-Time Telemetry Dashboard',
    description: 'A distributed observability platform collecting streaming health metrics from microservices with sub-second WebSocket updates.',
    tags: ['Next.js 15', 'React 19', 'Tailwind CSS v4', 'Render', 'WebSockets'],
    category: 'Full-Stack System',
    liveDemo: '#',
    githubUrl: 'https://github.com',
    highlight: 'Handles 10k+ concurrent metrics events/sec with edge rendering',
  },
  {
    id: '2',
    name: 'ApexCMS: Decoupled Headless Publisher',
    description: 'Modern Markdown publishing pipeline with Supabase storage, authenticated staff roles, and on-demand static revalidation.',
    tags: ['Next.js App Router', 'Supabase', 'TypeScript', 'PostgreSQL'],
    category: 'Architecture & CMS',
    liveDemo: '#',
    githubUrl: 'https://github.com',
    highlight: 'Sub-50ms TTFB on global edge CDN caches',
  },
  {
    id: '3',
    name: 'RenderDeploy CLI & Orchestrator',
    description: 'Developer tooling CLI for coordinating zero-downtime blue/green rollouts and automated environment variable synchronization.',
    tags: ['TypeScript', 'Node.js', 'Docker', 'Render API'],
    category: 'DevOps & Tooling',
    liveDemo: '#',
    githubUrl: 'https://github.com',
    highlight: 'Integrated with GitHub Actions & Render Webhooks',
  },
];

export function ProjectsPage({ onBack, onNavigateBlog, onContactClick }: ProjectsPageProps) {
  const router = useRouter();

  // Unified data source resolution
  const projectsToDisplay: ProjectItem[] = (MUNEERDEV_PROJECTS && MUNEERDEV_PROJECTS.length > 0)
    ? MUNEERDEV_PROJECTS.map((proj: any) => ({
      id: proj.id || String(proj.name),
      name: proj.name || proj.title || 'Untitled Project',
      description: proj.description || '',
      tags: proj.tags || proj.technologies || [],
      category: proj.category || 'Engineering',
      liveDemo: proj.liveDemo || proj.demoUrl,
      githubUrl: proj.githubUrl,
      highlight: proj.highlight,
    }))
    : FALLBACK_PROJECTS;

  const handleBack = () => {
    if (onBack) onBack();
    else router.push('/');
  };

  const handleBlogTag = (tech: string) => {
    if (onNavigateBlog) onNavigateBlog(tech);
    else router.push(`/blog?search=${encodeURIComponent(tech)}`);
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
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Page Header */}
      <header className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <FolderGit2 className="h-4 w-4" />
          <span>Engineering Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Architected &amp; Deployed Systems
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A verified record of live production deployments across healthcare informatics, autonomous web automation pipelines, custom dashboards, and web architectures.
        </p>
      </header>

      {/* Projects List */}
      <div className="space-y-8">
        {projectsToDisplay.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 hover:border-emerald-500/40 transition-all space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
                  {project.name}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Description */}
            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {/* Key Metric Highlight (File B feature merged) */}
            {project.highlight && (
              <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-3.5 text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">Key Metric:</span>
                <span>{project.highlight}</span>
              </div>
            )}

            {/* Interactive Tech Tags (Merged File A & B feature) */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 mr-1">Stack:</span>
              {project.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleBlogTag(tag)}
                  className="rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer Section */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-zinc-100">
            Need Custom Engineering or Data Analytics?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
            I partner directly with technology teams to engineer modern web systems, automated scraping pipelines, and clinical data solutions.
          </p>
        </div>
        <button
          type="button"
          onClick={handleContact}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors shrink-0 cursor-pointer"
        >
          <span>Schedule Project Discussion</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MUNEERDEV_PROJECTS } from '@/data/muneerdev-portfolio';
import { FolderGit2, ArrowUpRight, ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Derive unique categories dynamically while retaining 'ALL' as first option
  const categories = [
    'ALL',
    ...Array.from(
      new Set(MUNEERDEV_PROJECTS.map((p) => p.category).filter((c): c is string => Boolean(c)))
    ),
  ];

  const filtered = selectedCategory === 'ALL'
    ? MUNEERDEV_PROJECTS
    : MUNEERDEV_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Engineering Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            Project Portfolio
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Healthcare, AI, cloud, and data projects drawn from the portfolio data, with demo and repository links where configured.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${selectedCategory === cat
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
            >
              {cat === 'ALL' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-emerald-500/40 hover:bg-zinc-900/80 transition-all shadow-xl space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
                    {proj.category}
                  </span>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                    Portfolio entry
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100">{proj.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {proj.description}
                </p>

                {/* Placeholder Tags */}
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium text-zinc-300 border border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                {/* Action Buttons: Live Demo and GitHub Repo */}
                <div className="flex items-center gap-2 pt-2">
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Open Demo</span>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-700/80 hover:text-zinc-100 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub Repo</span>
                    </a>
                  )}
                </div>

                <div className="border-t border-zinc-800/80 pt-3 flex items-center justify-between text-xs">
                  <Link
                    href={`/blog?search=${encodeURIComponent(proj.name)}`}
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Related Articles</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    Discuss Tech
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

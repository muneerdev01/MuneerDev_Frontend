'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  LogOut,
  Plus,
  FileText,
  Server,
  Activity,
  CheckCircle,
  ExternalLink,
  Trash2,
  Edit3,
  RefreshCw,
} from 'lucide-react';
import { SAMPLE_ARTICLES, BlogPost, removeAdminToken } from '@/lib/api';

interface AdminDashboardProps {
  onLogout: () => void;
  onPreviewArticle?: (slug: string) => void;
}

export function AdminDashboard({ onLogout, onPreviewArticle }: AdminDashboardProps) {
  const [articles, setArticles] = useState<BlogPost[]>(SAMPLE_ARTICLES);
  const [activeTab, setActiveTab] = useState<'articles' | 'backend' | 'supabase'>('articles');
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState('Engineering');
  const [isCreating, setIsCreating] = useState(false);

  const handleLogout = () => {
    removeAdminToken();
    onLogout();
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArt: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: newTitle,
      summary: newSummary || 'A technical review of modern systems design.',
      content: `# ${newTitle}\n\nDraft content written via Admin Console.\n`,
      category: newCategory,
      type: 'Architecture',
      tags: ['Next.js', 'System Design'],
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '3 min read',
      author: {
        name: 'Muneer',
        role: 'Full-Stack Software Engineer',
      },
    };

    setArticles([newArt, ...articles]);
    setNewTitle('');
    setNewSummary('');
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Authenticated Session
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 mt-1">
            Admin Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-mono text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${activeTab === 'articles'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
            }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Articles ({articles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('backend')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${activeTab === 'backend'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
            }`}
        >
          <Server className="h-3.5 w-3.5" />
          <span>Render Microservices</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('supabase')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${activeTab === 'supabase'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
            }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>Supabase Status</span>
        </button>
      </div>

      {/* Tab 1: Articles Management */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-100">Publication Repository</h2>
            <button
              type="button"
              onClick={() => setIsCreating(!isCreating)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Article</span>
            </button>
          </div>

          {/* New article form */}
          {isCreating && (
            <form onSubmit={handleAddArticle} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400">Quick Draft Publisher</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Article Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Understanding Next.js 15 Streaming SSR"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-hidden"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Architecture">Architecture</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Design Systems">Design Systems</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Summary</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Short description of the technical insight..."
                  rows={2}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="rounded-xl border border-zinc-800 px-4 py-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
                >
                  Publish Draft
                </button>
              </div>
            </form>
          )}

          {/* Articles list table */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-900/80 font-mono text-xs text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-3.5">Title</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Published</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-zinc-900/40">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-zinc-100">{art.title}</div>
                        <div className="text-xs text-zinc-500 font-mono">/blog/{art.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                          {art.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-zinc-400">
                        {art.publishedAt}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onPreviewArticle && onPreviewArticle(art.slug)}
                            className="p-1.5 rounded-lg border border-zinc-800 hover:text-emerald-400 hover:border-zinc-700 transition-colors"
                            title="Preview article"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(art.id)}
                            className="p-1.5 rounded-lg border border-zinc-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors"
                            title="Delete article"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Render Microservices status */}
      {activeTab === 'backend' && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">Render Cloud Connection</h2>
              <p className="text-xs text-zinc-400 mt-1">Configured endpoint for external APIs & auth verification.</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Target: Render Web Service</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500">ENV VARIABLE</span>
              <div className="text-zinc-200 mt-1">NEXT_PUBLIC_RENDER_BACKEND_URL</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500">RESOLVED ENDPOINT</span>
              <div className="text-emerald-400 mt-1 truncate">
                {process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://your-backend.onrender.com'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500">HEALTH PROTOCOL</span>
              <div className="text-zinc-200 mt-1">HTTP / JSON POST / Bearer JWT</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Supabase status */}
      {activeTab === 'supabase' && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">Supabase Client Integration</h2>
              <p className="text-xs text-zinc-400 mt-1">Database, Auth, and Storage initialized via @supabase/supabase-js.</p>
            </div>
            <div className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/30">
              Client Library Active
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-2">
            <div className="text-zinc-400">Database Connection Target:</div>
            <div className="text-emerald-400">
              {process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'}
            </div>
            <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-900">
              Authentication and persistent storage available through lib/supabase.ts
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
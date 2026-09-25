'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Tag, Filter, ArrowRight, Calendar, Clock, BookOpen, X } from 'lucide-react';
import { SAMPLE_ARTICLES, BlogPost } from '@/lib/api';

interface PublicBlogPageProps {
  onArticleClick?: (slug: string) => void;
  initialType?: string;
  initialCategory?: string;
  initialTag?: string;
  initialSearch?: string;
}

export function PublicBlogPage({
  onArticleClick,
  initialType,
  initialCategory,
  initialTag,
  initialSearch,
}: PublicBlogPageProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag || null);
  const [selectedType, setSelectedType] = useState<string | null>(initialType || null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_ARTICLES.forEach((a) => set.add(a.category));
    return ['All', ...Array.from(set)];
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_ARTICLES.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const filteredArticles = useMemo(() => {
    return SAMPLE_ARTICLES.filter((article) => {
      const matchesSearch =
        !searchTerm ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const matchesTag = !selectedTag || article.tags.includes(selectedTag);

      const matchesType = !selectedType || article.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesCategory && matchesTag && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedTag, selectedType]);

  const handleArticleClick = (slug: string) => {
    if (onArticleClick) {
      onArticleClick(slug);
    } else {
      router.push(`/blog/${slug}`);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTag(null);
    setSelectedType(null);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedTag || selectedType;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Technical Journal</span>
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Technical Articles, Full-Stack Architecture, Healthcare Data Engineering & Clinical Workflows
        </h1>
        <p className="mt-3 text-base text-zinc-400 max-w-2xl">
          Practical notes and architectural deep-dives on full-stack web engineering, Python data analytics, automated scraping pipelines, Next.js 15, cloud deployments, healthcare automation, and clinical informatics.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by title, keyword, or concept..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${selectedCategory === cat
                  ? 'bg-emerald-500 text-zinc-950 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
            <Tag className="h-3 w-3" /> Filter by tag:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${selectedTag === tag
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                }`}
            >
              #{tag}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-mono text-rose-400 hover:text-rose-300 ml-2 underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
            <p className="text-zinc-400 text-sm">No articles matched your current search filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="group cursor-pointer rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-emerald-500/40 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-sm text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
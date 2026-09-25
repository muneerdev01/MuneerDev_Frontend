'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Sparkles, ArrowRight, User } from 'lucide-react';
import { SAMPLE_ARTICLES, BlogPost } from '@/lib/api';
import { marked } from 'marked';

interface ArticleDetailPageProps {
  slug: string;
  onBack?: () => void;
  onNavigateArticle?: (slug: string) => void;
  onContactClick?: () => void;
}

export function ArticleDetailPage({
  slug,
  onBack,
  onNavigateArticle,
  onContactClick,
}: ArticleDetailPageProps) {
  const router = useRouter();

  const article = useMemo(() => {
    return SAMPLE_ARTICLES.find((a) => a.slug === slug) || SAMPLE_ARTICLES[0];
  }, [slug]);

  const relatedArticles = useMemo(() => {
    return SAMPLE_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);
  }, [article.slug]);

  const htmlContent = useMemo(() => {
    try {
      return marked.parse(article.content || '') as string;
    } catch {
      return article.content;
    }
  }, [article.content]);

  const handleBack = () => {
    if (onBack) onBack();
    else router.push('/blog');
  };

  const handleArticleNav = (targetSlug: string) => {
    if (onNavigateArticle) onNavigateArticle(targetSlug);
    else router.push(`/blog/${targetSlug}`);
  };

  const handleContact = () => {
    if (onContactClick) onContactClick();
    else router.push('/contact');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Articles</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400 border border-emerald-500/30">
            {article.category}
          </span>
          <span className="text-xs text-zinc-500">•</span>
          <span className="text-xs font-mono text-zinc-400">{article.type}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <User className="h-3.5 w-3.5 text-emerald-400" />
              {article.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 hover:text-emerald-400 hover:border-zinc-700 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-invert prose-emerald max-w-none space-y-6 text-zinc-300 leading-relaxed">
        <p className="text-lg text-zinc-200 font-medium leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1">
          {article.summary}
        </p>

        <div
          className="markdown-body space-y-4 text-zinc-300 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-zinc-100 [&>h1]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-zinc-100 [&>h2]:mt-6 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* Tags */}
      <div className="border-t border-zinc-800 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-zinc-400 mr-2 flex items-center gap-1">
            <Tag className="h-3 w-3" /> Tags:
          </span>
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300 hover:text-emerald-400 hover:border-zinc-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Author Card & Call to Action */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs font-semibold text-emerald-400">Written by Muneer</span>
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Need help migrating or scaling your stack?</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            I help engineering teams transition to Next.js 15 App Router, React 19, and decoupled Render microservices with minimal friction.
          </p>
        </div>

        <button
          type="button"
          onClick={handleContact}
          className="shrink-0 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
        >
          Book a Consultation
        </button>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-zinc-800 pt-10 space-y-6">
          <h2 className="text-xl font-bold text-zinc-100">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => handleArticleNav(rel.slug)}
                className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all"
              >
                <span className="font-mono text-[11px] text-emerald-400">{rel.category}</span>
                <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors mt-1">
                  {rel.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>{rel.readTime}</span>
                  <span className="text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
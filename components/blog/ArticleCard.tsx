'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';
import { Calendar, Clock, ArrowRight, Tag, Stethoscope, Cpu } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick?: (slug: string) => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(article.slug);
    }
  };

  const isHealthcare = article.blog_type === 'HEALTHCARE_MEDICINE';

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all shadow-lg hover:shadow-emerald-500/5">
      <div className="space-y-4">
        {/* Type & Category Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {isHealthcare ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-teal-500/30 bg-teal-950/40 px-2 py-0.5 text-[11px] font-semibold text-teal-300">
                <Stethoscope className="h-3 w-3" />
                <span>Healthcare</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                <Cpu className="h-3 w-3" />
                <span>Tech</span>
              </span>
            )}
            {article.category && (
              <span className="font-mono text-[11px] text-zinc-400">
                {article.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <Clock className="h-3 w-3" />
            <span>
              {article.read_time
                ? article.read_time
                : article.reading_time_minutes
                  ? `${article.reading_time_minutes} min`
                  : '5 min read'}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/blog/${article.slug}`}
          onClick={handleClick}
          className="block"
        >
          <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt / Summary */}
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
          {article.summary || article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400"
              >
                <Tag className="h-2.5 w-2.5 text-zinc-500" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar className="h-3 w-3 text-zinc-500" />
          <span>{article.published_at || article.created_at || 'Recent'}</span>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          onClick={handleClick}
          className="inline-flex items-center gap-1 font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>Read Deep Dive</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
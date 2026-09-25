'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PublicBlogPage } from '@/components/blog/PublicBlogPage';

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialBlogType = searchParams.get('type') || undefined;
  const initialCategory = searchParams.get('category') || undefined;
  const initialTag = searchParams.get('tag') || undefined;
  const initialSearch = searchParams.get('search') || undefined;

  return (
    <PublicBlogPage
      onArticleClick={(slug) => router.push(`/blog/${slug}`)}
      initialType={initialBlogType}
      initialCategory={initialCategory}
      initialTag={initialTag}
      initialSearch={initialSearch}
    />
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-zinc-500">
          Loading articles...
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}

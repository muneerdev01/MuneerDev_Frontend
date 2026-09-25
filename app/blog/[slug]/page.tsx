import { ArticleDetailPage } from '@/components/blog/ArticleDetailPage';
import { SAMPLE_ARTICLES } from '@/lib/api';

export function generateStaticParams() {
  return SAMPLE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}

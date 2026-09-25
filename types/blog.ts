export interface Article {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  excerpt?: string;
  content?: string;
  blog_type?: 'TECH' | 'HEALTHCARE_MEDICINE' | string;
  category?: string;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  read_time?: string;
  reading_time_minutes?: number;
  cover_image?: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface FetchArticlesParams {
  blog_type?: 'TECH' | 'HEALTHCARE_MEDICINE' | string;
  category?: string;
  tag?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface FetchArticlesResponse {
  articles: Article[];
  total: number;
}

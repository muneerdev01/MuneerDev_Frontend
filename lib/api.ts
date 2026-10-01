// API client for muneerdev_frontend
// Backend hosted on Render (NEXT_PUBLIC_RENDER_BACKEND_URL)

import { Article, FetchArticlesParams, FetchArticlesResponse } from '@/types/blog';

const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://muneerdev-backend-v2-1.onrender.com';
const ADMIN_TOKEN_KEY = 'muneerdev_admin_token';

/**
 * Retrieve the admin JWT/Session token from localStorage
 */
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

/**
 * Set the admin JWT/Session token in localStorage
 */
export function setAdminToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

/**
 * Remove the admin JWT/Session token from localStorage
 */
export function removeAdminToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

/**
 * Verify current admin token with backend
 * UPDATED: Uses /api/v1/auth/me (GET with Bearer token)
 */
export async function verifyAdmin(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch(`${RENDER_BACKEND_URL}/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Authenticate admin with credentials against backend
 * Backend expects 'email' field
 */
export async function adminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${RENDER_BACKEND_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Backend returns: { token: { access_token, token_type, expires_in }, user: {...} }
      const token = data.token?.access_token || data.access_token || data.token;
      if (token) {
        setAdminToken(token);
        return { success: true, token };
      }
    }

    if (!res.ok) {
      try {
        const errorData = await res.json();
        return { success: false, error: errorData.detail || 'Invalid admin credentials' };
      } catch {
        return { success: false, error: 'Invalid admin credentials' };
      }
    }
  } catch (err) {
    console.warn('Backend login endpoint unavailable', err);
    return { success: false, error: 'Authentication service is unavailable. Please try again later.' };
  }

  return { success: false, error: 'Invalid admin credentials' };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  type: string;
  blog_type?: 'TECH' | 'HEALTHCARE_MEDICINE' | string;
  tags: string[];
  publishedAt: string;
  published_at?: string;
  readTime: string;
  read_time?: string;
  author: {
    name: string;
    role: string;
  };
}

export const SAMPLE_ARTICLES: (BlogPost & Article)[] = [
  {
    id: '1',
    slug: 'migrating-to-nextjs-15-app-router',
    title: 'Architecting High-Performance Web Apps with Next.js 15 & React 19',
    summary: 'A deep architectural dive into server components, streaming SSR, and zero-bundle-size optimizations on Next.js 15.',
    content: `# Architecting High-Performance Web Apps with Next.js 15 & React 19

Next.js 15 introduces game-changing primitives for frontend engineering.`,
    category: 'Engineering',
    type: 'Architecture',
    blog_type: 'TECH',
    tags: ['Next.js', 'React 19', 'Fullstack', 'TypeScript'],
    publishedAt: '2026-03-15',
    published_at: '2026-03-15',
    readTime: '6 min read',
    read_time: '6 min read',
    author: { name: 'Muneer', role: 'Full-Stack Software Engineer' },
  },
  {
    id: '2',
    slug: 'fhir-clinical-data-modeling',
    title: 'HL7 FHIR R4 Ingestion: Real-Time Stream Architecture for EHR Systems',
    summary: 'Building high-throughput, HIPAA-compliant event pipelines.',
    content: `# HL7 FHIR R4 Ingestion`,
    category: 'Clinical Informatics',
    type: 'Healthcare',
    blog_type: 'HEALTHCARE_MEDICINE',
    tags: ['FHIR', 'HL7', 'HIPAA', 'Healthcare'],
    publishedAt: '2026-03-02',
    published_at: '2026-03-02',
    readTime: '8 min read',
    read_time: '8 min read',
    author: { name: 'Muneer', role: 'Clinical Informatics Engineer' },
  },
];

/**
 * Fetch published articles from backend
 * UPDATED: Route changed to /public/articles/ (no /api/ prefix)
 */
export async function fetchPublishedArticles(
  params?: FetchArticlesParams
): Promise<FetchArticlesResponse> {
  try {
    const query = new URLSearchParams();
    if (params?.blog_type) query.set('blog_type', params.blog_type);
    if (params?.category) query.set('category', params.category);
    if (params?.tag) query.set('tag', params.tag);
    if (params?.search) query.set('search', params.search);
    if (params?.limit) query.set('limit', String(params.limit));

    // ⚠️ FIXED: /api/ hata diya
    const res = await fetch(`${RENDER_BACKEND_URL}/public/articles/?${query.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.articles)) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend articles API offline, utilizing fallback local dataset', err);
  }

  // Offline fallback
  let filtered = [...SAMPLE_ARTICLES];

  if (params?.blog_type && params.blog_type !== 'ALL') {
    filtered = filtered.filter(
      (a) => a.blog_type?.toLowerCase() === params.blog_type?.toLowerCase()
    );
  }

  if (params?.category) {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  if (params?.tag) {
    filtered = filtered.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === params.tag?.toLowerCase())
    );
  }

  if (params?.search) {
    const searchTerm = params.search.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(searchTerm) ||
        a.summary.toLowerCase().includes(searchTerm) ||
        a.tags.some((t) => t.toLowerCase().includes(searchTerm))
    );
  }

  if (params?.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return {
    articles: filtered,
    total: filtered.length,
  };
}
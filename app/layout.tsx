import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/siteConfig';

const siteDomain = siteConfig?.domain || 'https://muneerdev.com';
const siteName = siteConfig?.name || 'Ghulam Muneer Uddin';

export const metadata: Metadata = {
  metadataBase: new URL(siteDomain),
  title: {
    default: `${siteName} | Software Engineer | Data Analyst | Healthcare Automation Expert`,
    template: `%s | ${siteName}`,
  },
  description:
    'Category A Registered Pharmacist with 19+ years of clinical and pharmaceutical operations experience, specializing in full-stack software development, automated web scraping pipelines, data analytics, AI integration, and medical writing.',
  authors: [{ name: siteName, url: siteDomain }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteDomain,
    title: `${siteName} | Software Engineer | Data Analyst | Healthcare Automation Expert`,
    description:
      'Category A Registered Pharmacist with 19+ years of clinical and pharmaceutical operations experience, specializing in full-stack software development, automated web scraping pipelines, data analytics, AI integration, and medical writing.',
    siteName: siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Software Engineer | Next.js 15 & React 19`,
    description: 'Category A Registered Pharmacist & Technology Consultant',
    creator: '@DevMuneerAi',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950 font-sans">
        <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
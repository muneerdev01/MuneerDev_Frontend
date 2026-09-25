'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Shield, Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { getAdminToken, verifyAdmin } from '@/lib/api';
import { siteConfig } from '@/lib/siteConfig';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isAdminAuthenticated?: boolean;
}

export function Header({ currentPath: propPath, onNavigate, isAdminAuthenticated: propAuth }: HeaderProps) {
  const pathname = usePathname();
  const current = propPath || pathname || '/';
  const [isAdmin, setIsAdmin] = useState<boolean>(propAuth ?? false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (propAuth !== undefined) {
      setIsAdmin(propAuth);
    } else if (getAdminToken()) {
      verifyAdmin().then(setIsAdmin);
    }
  }, [propAuth]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return current === '/';
    return current.startsWith(href);
  };

  // Safe fallback check for booking link
  const bookingLink = siteConfig?.contact?.booking?.link;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-zinc-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="flex items-center gap-1">
            muneer<span className="text-emerald-400">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${active
                    ? 'bg-zinc-800/80 text-emerald-400 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls / Admin Badge */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            onClick={(e) => handleLinkClick(e, '/admin')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${isActive('/admin')
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin</span>
            {isAdmin && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
          </Link>

          {bookingLink && (
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              <span>Book Call</span>
            </a>
          )}

          <Link
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${active
                    ? 'bg-zinc-800/80 text-emerald-400 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2">
            <Link
              href="/admin"
              onClick={(e) => handleLinkClick(e, '/admin')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin Console {isAdmin ? '(Logged in)' : ''}</span>
            </Link>
            <div className="flex items-center gap-2">
              {bookingLink && (
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-300"
                >
                  <Calendar className="h-3 w-3 text-emerald-400" />
                  <span>Book Call</span>
                </a>
              )}
              <Link
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-zinc-950"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
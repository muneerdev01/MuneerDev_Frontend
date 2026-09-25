'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';
import { verifyAdmin, getAdminToken } from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Check admin session on mount
  useEffect(() => {
    if (getAdminToken()) {
      verifyAdmin().then((authed) => {
        setIsAdminAuthenticated(authed);
        setCheckingAuth(false);
      });
    } else {
      setCheckingAuth(false);
    }
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Verifying credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAdminAuthenticated ? (
        <AdminDashboard
          onLogout={() => {
            setIsAdminAuthenticated(false);
            router.push('/');
          }}
          onPreviewArticle={(slug) => router.push(`/blog/${slug}`)}
        />
      ) : (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <AdminLoginModal
            onSuccess={() => {
              setIsAdminAuthenticated(true);
            }}
            onCancel={() => router.push('/')}
          />
        </div>
      )}
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { Shield, Key, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { adminLogin } from '@/lib/api';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AdminLoginModal({ onSuccess, onCancel }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the administrative key.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await adminLogin(password);
    setLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Shield className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs text-zinc-500">MuneerDev Staff Console</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-100">
          Admin Authentication
        </h2>
        <p className="text-xs text-zinc-400">
          Enter your administrative passcode to manage publications, review server health, and inspect deployment logs.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 font-mono">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center justify-between">
            <span>Passcode / Bearer Token</span>
            <span className="text-[10px] text-zinc-500">Default demo: admin123</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-hidden"
              autoFocus
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-zinc-800 py-2.5 text-xs font-mono text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <>
                <span>Access Console</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
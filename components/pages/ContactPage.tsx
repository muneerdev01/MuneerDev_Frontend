'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Send, CheckCircle2, MessageSquare, Terminal, MapPin } from 'lucide-react';

interface ContactPageProps {
  onBack?: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Next.js 15 Migration & Architecture');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleBack = () => {
    if (onBack) onBack();
    else router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');
    // Emulate sending to Render backend contact API endpoint
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
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
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <MessageSquare className="h-4 w-4" />
          <span>Communication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Get in Touch
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          Whether you need advisory on Next.js 15 App Router architecture, assistance migrating from Vite, or microservice engineering on Render, let&apos;s connect.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Direct Contact
            </h2>
            <div className="space-y-3 text-sm text-zinc-300">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs text-zinc-300">muneer.dev01@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Terminal className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs text-zinc-300">MuneerDev.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-zinc-500" />
                <span className="text-xs text-zinc-400">Available Globally (Remote)</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Expected Response
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              I typically review incoming engineering inquiries and respond within 24 hours Monday through Friday.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          {status === 'success' ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-zinc-100">Message Delivered Successfully</h2>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Thank you for reaching out. I have received your note and will review your project requirements shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Topic / Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-hidden"
                >
                  <option value="Next.js 15 Migration & Architecture">Next.js 15 Migration & Architecture</option>
                  <option value="Render Backend Engineering">Render Backend Microservices</option>
                  <option value="Consulting & Code Audit">Consulting & Architecture Audit</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Project Details or Inquiry</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your existing stack, goals, timelines, or questions..."
                  rows={5}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

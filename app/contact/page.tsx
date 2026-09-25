'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle2, MessageSquare, Terminal, Stethoscope } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Tech Architecture Consulting',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Home</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Mail className="h-3.5 w-3.5" />
            <span>Consulting & Technical Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            Let&apos;s Discuss Your Project
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Have a technical challenge in distributed web systems, AI reasoning agents, or clinical healthcare informatics? Send a message to schedule an introductory engineering discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Form */}
          <div className="md:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">Message Received</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. I typically review and reply to engineering inquiries within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Sarah Chen"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Area of Inquiry
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Tech Architecture Consulting">Full-Stack & Cloud Architecture</option>
                    <option value="Healthcare Informatics & FHIR">Healthcare & FHIR/HIPAA Engineering</option>
                    <option value="AI Reasoning & RAG Systems">Enterprise AI Agents & RAG</option>
                    <option value="General Collaboration">General Technical Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Project Scope & Timeline
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your architecture requirements, data volume, compliance standards, or project timeline..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Consulting Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
                Direct Contact
              </h3>
              <p className="text-xs text-zinc-400">
                You can also email directly for urgent enterprise advisory or security assessments:
              </p>
              <a
                href="mailto:contact@muneerdev.com"
                className="inline-block font-mono text-sm font-semibold text-emerald-400 hover:underline"
              >
                contact@muneerdev.com
              </a>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3 text-xs text-zinc-400">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
                Engagement Model
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Architectural reviews and code audits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Hands-on implementation and core system builds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span>Clinical FHIR / HIPAA compliance roadmaps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

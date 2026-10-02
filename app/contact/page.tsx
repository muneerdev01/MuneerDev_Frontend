'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Tech Architecture Consulting',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://muneerdev-backend-v2-1.onrender.com';

    // 30 seconds timeout controller for Render free tier spin-up
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch(`${API_BASE}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `${formData.topic}: ${formData.name}`,
          message: `Area of inquiry: ${formData.topic}\n\n${formData.message}`,
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          topic: 'Tech Architecture Consulting',
          message: ''
        });
      } else {
        const errorData = await response.json().catch(() => null);
        setErrorMessage(errorData?.detail || `Server returned status: ${response.status}. Please try again.`);
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('API Error:', error);
      if (error.name === 'AbortError') {
        setErrorMessage('Server is waking up (Render Free Tier). Please click "Send" once more.');
      } else {
        setErrorMessage('Connection failed. Backend server might be waking up or blocked. Please retry.');
      }
    } finally {
      setLoading(false);
    }
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">Message Delivered Successfully!</h3>
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
                {errorMessage && (
                  <div className="flex items-start gap-2 p-3 rounded-xl border border-amber-500/30 bg-amber-950/40 text-amber-300 text-xs">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Transmitting Inquiry (Waking Backend)...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Consulting Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
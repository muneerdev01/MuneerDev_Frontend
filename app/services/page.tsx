'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MUNEERDEV_SERVICES } from '@/data/muneerdev-portfolio';
import { Wrench, ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';

export default function ServicesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-3 py-1 text-xs font-semibold text-teal-400">
            <Wrench className="h-3.5 w-3.5" />
            <span>Engineering & Advisory Offerings</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            Full-Stack & Clinical Informatics Consulting
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            I partner directly with technology founders, engineering executives, and health-tech teams to design, audit, and build high-performance software systems.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MUNEERDEV_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-teal-500/50 hover:bg-zinc-900/80 transition-all shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-zinc-100">{service.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-zinc-800/80 text-xs text-zinc-300">
                  {service.bullets && service.bullets.length > 0 ? (
                    service.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                        <span>Production Architecture & Code Implementation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                        <span>Type-Safe TypeScript & Test Coverage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                        <span>Documentation & Knowledge Transfer</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-500 py-3 text-xs font-bold text-zinc-950 hover:bg-teal-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Discuss This Service</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

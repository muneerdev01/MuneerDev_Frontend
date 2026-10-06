"use client";

/**
 * Public: Secure Download Page
 * Path: app/download/[token]/page.tsx
 */
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Download, Clock, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import { API_URL } from "../../../lib/api";

export default function DownloadPage() {
  const { token } = useParams<{ token: string }>();
  const [state, setState] = useState<"idle" | "fetching" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const startDownload = async () => {
    setState("fetching"); setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/download/${token}`);
      if (res.redirected) {
        window.location.href = res.url; // Supabase signed URL
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Download failed");
      }
      // Fallback: blob download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "pattern"; a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setErrorMsg(err.message);
      setState("error");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center py-16 px-6">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
        <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Your Purchase is Complete!</h1>
        <p className="text-neutral-400 text-sm mb-6">Your download link is ready. The link expires 24 hours after purchase.</p>

        <button onClick={startDownload} disabled={state === "fetching"} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 mb-4">
          <Download size={18} /> {state === "fetching" ? "Preparing..." : "Download Your File"}
        </button>

        {state === "error" && (
          <div className="flex items-start gap-2 text-red-400 text-sm bg-red-950/50 border border-red-900 rounded-lg p-3 text-left">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg || "Invalid or expired link. Please contact support."}</span>
          </div>
        )}

        <p className="flex items-center justify-center gap-1.5 text-neutral-500 text-xs mt-5">
          <Clock size={12} /> Link expires 24 hours after purchase
        </p>
        <Link href="/shop" className="inline-flex items-center gap-1 text-neutral-400 hover:text-emerald-400 text-sm mt-6">
          <ArrowLeft size={14} /> Back to shop
        </Link>
      </div>
    </main>
  );
}

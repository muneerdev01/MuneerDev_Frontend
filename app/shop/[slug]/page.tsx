"use client";

/**
 * Public: Product Detail + Stripe Checkout
 * Path: app/shop/[slug]/page.tsx
 */
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, Mail } from "lucide-react";
import { API_URL } from "../../../lib/api";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  preview_images: string[];
  file_size: number | null;
  sales_count: number;
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/products/${slug}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => setProduct(d))
      .catch(() => setProduct(null));
  }, [slug]);

  const buy = async () => {
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setBuying(true); setError("");
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_slug: slug, buyer_email: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Checkout failed");
      window.location.href = data.checkout_url; // Redirect to Stripe
    } catch (err: any) {
      setError(err.message);
      setBuying(false);
    }
  };

  if (product === null) return <main className="min-h-screen bg-neutral-950 text-neutral-500 flex items-center justify-center font-mono text-sm">Loading... or product not found.</main>;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/shop" className="flex items-center gap-1 text-neutral-400 hover:text-emerald-400 text-sm mb-6"><ArrowLeft size={15} /> Back to shop</Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div>
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-square">
              {product.preview_images[activeImg]
                ? <img src={product.preview_images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-xs">NO PREVIEW IMAGE</div>}
            </div>
            {product.preview_images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.preview_images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`h-16 w-16 rounded border overflow-hidden ${i === activeImg ? "border-emerald-500" : "border-neutral-800"}`}>
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info + Buy */}
          <div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-xs px-2 py-1 rounded font-mono uppercase">{product.category}</span>
            <h1 className="text-3xl font-bold text-white mt-3">{product.title}</h1>
            <p className="text-neutral-400 mt-4 leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl font-mono font-bold text-emerald-400">${product.price}</span>
              <span className="text-neutral-500 text-sm">{product.sales_count} sold</span>
            </div>

            <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
              <label className="flex items-center gap-2 text-sm text-neutral-400"><Mail size={15} className="text-emerald-400" /> Email for download link</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button onClick={buy} disabled={buying} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold py-3 rounded-lg">
                {buying ? "Redirecting to Stripe..." : "Buy Now — Instant Download"}
              </button>
            </div>

            <div className="flex gap-6 mt-6 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-emerald-400" /> Instant delivery</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

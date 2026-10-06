"use client";

/**
 * Public: Shop (Etsy-style digital patterns grid)
 * Path: app/shop/page.tsx
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { API_URL } from "../../lib/api";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  preview_images: string[];
  sales_count: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(r => r.ok ? r.json() : [])
      .then(d => setProducts(d.filter((p: any) => p.is_active)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="text-emerald-400" />
          <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest">Digital Store</p>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Patterns & Digital Products</h1>
        <p className="text-neutral-400 mb-10">Instant download after purchase. Crafted with care.</p>

        {loading && <p className="text-neutral-500 font-mono text-sm">Loading...</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Link key={p.id} href={`/shop/${p.slug}`} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-emerald-900 transition group">
              <div className="h-48 overflow-hidden bg-neutral-800">
                {p.preview_images[0]
                  ? <img src={p.preview_images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  : <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-xs">NO PREVIEW</div>}
              </div>
              <div className="p-4">
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-[10px] px-2 py-0.5 rounded font-mono uppercase">{p.category}</span>
                <h3 className="text-white font-medium mt-2 line-clamp-1">{p.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-emerald-400 font-mono font-semibold">${p.price}</span>
                  <span className="text-neutral-500 text-xs">{p.sales_count} sold</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!loading && products.length === 0 && <p className="text-center text-neutral-500 py-20">No products available yet.</p>}
      </div>
    </main>
  );
}

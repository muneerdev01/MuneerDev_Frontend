"use client";

/**
 * Admin: Products Manager (Etsy-style digital patterns)
 * Path: app/admin/products/page.tsx
 */
import React, { useEffect, useState } from "react";
import { ShoppingBag, Plus, Trash2, Edit, UploadCloud, X, FileCheck } from "lucide-react";
import { API_URL, authHeaders, uploadFile } from "../../../lib/api";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  category: "PATTERNS" | "TEMPLATES" | "EBOOKS";
  preview_images: string[];
  file_path: string | null;
  file_size: number | null;
  is_active: boolean;
  sales_count: number;
  created_at: string;
}

const empty = { title: "", slug: "", description: "", price: "", category: "PATTERNS", preview_images: [] as string[], file_path: "", file_size: 0, is_active: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    if (res.ok) setProducts(await res.json());
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); setError(""); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, description: p.description, price: p.price, category: p.category, preview_images: p.preview_images, file_path: p.file_path || "", file_size: p.file_size || 0, is_active: p.is_active });
    setShowForm(true); setError("");
  };

  const handlePreviewUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const up = await uploadFile(f, "image");
      setForm({ ...form, preview_images: [...form.preview_images, up.public_url || up.file_path] });
    } catch (err: any) { setError(err.message); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const up = await uploadFile(f, "product_file");
      setForm({ ...form, file_path: up.file_path, file_size: up.file_size });
    } catch (err: any) { setError(err.message); }
  };

  const save = async () => {
    setBusy(true); setError("");
    const body = { ...form, price: form.price, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
    const res = await fetch(`${API_URL}/api/products${editing ? `/${editing.slug}` : ""}`, {
      method: editing ? "PUT" : "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.detail || "Save failed"); setBusy(false); return; }
    setShowForm(false); setBusy(false); load();
  };

  const remove = async (slug: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API_URL}/api/products/${slug}`, { method: "DELETE", headers: authHeaders() });
    load();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1">Admin / Digital Store</p>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2"><ShoppingBag /> Products ({products.length})</h1>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold px-4 py-2 rounded-lg text-sm">
            <Plus size={16} /> New Product
          </button>
        </div>

        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400 text-left">
              <tr>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Title</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Sales</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Active</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-neutral-900/50">
                  <td className="px-5 py-4">
                    <p className="text-white font-medium">{p.title}</p>
                    <p className="text-neutral-500 text-xs">/{p.slug}</p>
                  </td>
                  <td className="px-5 py-4"><span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-xs px-2 py-1 rounded font-mono">{p.category}</span></td>
                  <td className="px-5 py-4 text-white font-mono">${p.price}</td>
                  <td className="px-5 py-4 text-neutral-400">{p.sales_count}</td>
                  <td className="px-5 py-4">{p.is_active ? <span className="text-emerald-400 text-xs font-mono">LIVE</span> : <span className="text-neutral-600 text-xs font-mono">OFF</span>}</td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="text-neutral-400 hover:text-white inline-block"><Edit size={15} /></button>
                    <button onClick={() => remove(p.slug)} className="text-red-400 hover:text-red-300 inline-block"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-neutral-500">No products yet. Click "+ New Product".</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">{editing ? "Edit Product" : "New Product"}</h2>
              <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-white"><X size={20} /></button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4 bg-red-950/50 border border-red-900 rounded p-2">{error}</p>}
            <div className="space-y-4">
              <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="Product title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <div className="flex gap-3">
                <input className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="Price (e.g. 9.99)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                <select className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 outline-none" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })}>
                  <option value="PATTERNS">Patterns</option>
                  <option value="TEMPLATES">Templates</option>
                  <option value="EBOOKS">eBooks</option>
                </select>
              </div>
              <textarea className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none h-28" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer border border-dashed border-neutral-700 rounded-lg p-4 hover:border-emerald-500">
                  <UploadCloud size={18} className="text-emerald-400" /> Upload preview images
                  <input type="file" accept="image/*" className="hidden" onChange={handlePreviewUpload} />
                </label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {form.preview_images.map((img, i) => <img key={i} src={img} className="h-14 w-14 object-cover rounded border border-neutral-800" />)}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer border border-dashed border-neutral-700 rounded-lg p-4 hover:border-emerald-500">
                  <FileCheck size={18} className="text-emerald-400" /> {form.file_path ? `File: ${form.file_path.split("/").pop()}` : "Upload pattern file (ZIP / PDF, max 100MB)"}
                  <input type="file" accept=".zip,.pdf" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-emerald-500" /> Active (visible in shop)
              </label>
              <button onClick={save} disabled={busy} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-semibold py-2.5 rounded-lg">
                {busy ? "Saving..." : editing ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

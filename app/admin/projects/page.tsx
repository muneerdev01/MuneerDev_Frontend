"use client";

/**
 * Admin: Projects Manager
 * Path: app/admin/projects/page.tsx
 * Matches your existing dark admin theme.
 */
import React, { useEffect, useState } from "react";
import { FolderGit2, Plus, Trash2, Edit, ExternalLink, Github, UploadCloud, X } from "lucide-react";
import { API_URL, authHeaders, uploadFile } from "../../../lib/api";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  images: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
}

const empty = { title: "", slug: "", description: "", tech_stack: "", images: [] as string[], github_url: "", live_url: "", featured: false };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch(`${API_URL}/api/projects`);
    if (res.ok) setProjects(await res.json());
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); setError(""); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, description: p.description, tech_stack: p.tech_stack.join(", "), images: p.images, github_url: p.github_url || "", live_url: p.live_url || "", featured: p.featured });
    setShowForm(true); setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const up = await uploadFile(f, "image");
      setForm({ ...form, images: [...form.images, up.public_url || up.file_path] });
    } catch (err: any) { setError(err.message); }
  };

  const save = async () => {
    setBusy(true); setError("");
    const body = { ...form, tech_stack: form.tech_stack.split(",").map(s => s.trim()).filter(Boolean), slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
    const res = await fetch(`${API_URL}/api/projects${editing ? `/${editing.slug}` : ""}`, {
      method: editing ? "PUT" : "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.detail || "Save failed"); setBusy(false); return; }
    setShowForm(false); setBusy(false); load();
  };

  const remove = async (slug: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`${API_URL}/api/projects/${slug}`, { method: "DELETE", headers: authHeaders() });
    load();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1">Admin / Portfolio</p>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2"><FolderGit2 /> Projects ({projects.length})</h1>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold px-4 py-2 rounded-lg text-sm">
            <Plus size={16} /> New Project
          </button>
        </div>

        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400 text-left">
              <tr>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Title</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Tech Stack</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider">Featured</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-neutral-900/50">
                  <td className="px-5 py-4">
                    <p className="text-white font-medium">{p.title}</p>
                    <p className="text-neutral-500 text-xs">/{p.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-neutral-400 text-xs">{p.tech_stack.join(", ")}</td>
                  <td className="px-5 py-4">{p.featured ? <span className="text-emerald-400 text-xs font-mono">YES</span> : <span className="text-neutral-600 text-xs font-mono">NO</span>}</td>
                  <td className="px-5 py-4 text-right space-x-2">
                    {p.github_url && <a href={p.github_url} target="_blank" className="text-neutral-400 hover:text-white inline-block"><Github size={15} /></a>}
                    {p.live_url && <a href={p.live_url} target="_blank" className="text-neutral-400 hover:text-white inline-block"><ExternalLink size={15} /></a>}
                    <button onClick={() => openEdit(p)} className="text-neutral-400 hover:text-white inline-block"><Edit size={15} /></button>
                    <button onClick={() => remove(p.slug)} className="text-red-400 hover:text-red-300 inline-block"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && <tr><td colSpan={4} className="px-5 py-10 text-center text-neutral-500">No projects yet. Click "+ New Project".</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">{editing ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-white"><X size={20} /></button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4 bg-red-950/50 border border-red-900 rounded p-2">{error}</p>}
            <div className="space-y-4">
              <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="Project title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="slug-auto-generated" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
              <textarea className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none h-28" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <input className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="Tech stack (comma separated: Next.js, FastAPI, Tailwind)" value={form.tech_stack} onChange={e => setForm({ ...form, tech_stack: e.target.value })} />
              <div className="flex gap-3">
                <input className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="GitHub URL" value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} />
                <input className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:border-emerald-500 outline-none" placeholder="Live URL" value={form.live_url} onChange={e => setForm({ ...form, live_url: e.target.value })} />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer border border-dashed border-neutral-700 rounded-lg p-4 hover:border-emerald-500">
                  <UploadCloud size={18} className="text-emerald-400" /> Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {form.images.map((img, i) => <img key={i} src={img} className="h-14 w-14 object-cover rounded border border-neutral-800" />)}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-emerald-500" /> Featured project
              </label>
              <button onClick={save} disabled={busy} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-semibold py-2.5 rounded-lg">
                {busy ? "Saving..." : editing ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

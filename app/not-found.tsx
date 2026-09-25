import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <div className="space-y-4 max-w-md">
        <div className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-xs text-emerald-400">
          404 Error
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-100">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          The requested URL does not exist on <span className="font-semibold text-zinc-300">MuneerDev.com</span>. It may have been moved or removed.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

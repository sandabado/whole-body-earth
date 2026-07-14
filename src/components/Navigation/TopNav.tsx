import Link from "next/link";

export default function TopNav() {
  return (
    <div className="border-b border-mercury bg-void">
      <nav className="mx-auto flex h-9 max-w-[1200px] items-center justify-end gap-4 px-6" aria-label="Utility navigation">
        <Link href="/catalog" className={linkClass}>Library</Link>
        <Link href="/login" className={linkClass}>Login</Link>
      </nav>
    </div>
  );
}

const linkClass = "font-mono text-[10px] uppercase tracking-[0.14em] text-ghost transition-colors hover:text-water focus-visible:text-water";

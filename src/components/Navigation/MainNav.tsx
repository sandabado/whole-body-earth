"use client";

import Link from "next/link";
import ProductSwitcher from "@/components/ProductSwitcher/ProductSwitcher";

type MainNavProps = {
  onMenuOpen: () => void;
};

export default function MainNav({ onMenuOpen }: MainNavProps) {
  return (
    <div className="border-b border-mercury bg-carbon">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6" aria-label="Main navigation">
        <ProductSwitcher />
        <div className="hidden items-center gap-7 md:flex">
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/catalog" className={linkClass}>Catalog</Link>
          <Link href="/#events" className={linkClass}>Events</Link>
          <Link href="/apply" className="border border-water bg-water px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-void transition-colors hover:bg-transparent hover:text-water focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water">Apply →</Link>
        </div>
        <button type="button" onClick={onMenuOpen} className="flex min-h-11 min-w-11 items-center justify-center text-bone transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water md:hidden" aria-label="Open navigation">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="square" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </nav>
    </div>
  );
}

const linkClass = "font-mono text-[10px] uppercase tracking-[0.14em] text-ghost transition-colors hover:text-water focus-visible:text-water";

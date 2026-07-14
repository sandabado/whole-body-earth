"use client";

import { useState } from "react";
import Link from "next/link";
import AppLauncherModal from "./AppLauncherModal";

export default function ProductSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onPointerDown={(event) => event.stopPropagation()}>
      <div className="flex items-center gap-2">
        <Link href="/" className="alchemical-glyph text-2xl text-water transition-opacity hover:opacity-80" aria-label="Go to homepage">🜄</Link>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:text-water focus:outline-none sm:text-base"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className="hidden sm:inline">Whole Body Studios</span><span className="sm:hidden">Studios</span>
          <span className={`font-mono text-ghost transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
        </button>
      </div>
      <AppLauncherModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

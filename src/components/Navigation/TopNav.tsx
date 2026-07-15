"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import AnnouncementTicker from "./AnnouncementTicker";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="border-b border-mercury bg-void/95 backdrop-blur-md">
      <nav className={`mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-5 transition-[height] duration-300 sm:px-6 ${scrolled ? "h-9" : "h-11"}`} aria-label="Whole Body Earth navigation">
        <div className="flex min-w-0 justify-start">
          <AnnouncementTicker />
        </div>
        <Link href="/" className={`flex shrink-0 items-center gap-2 font-display text-lg font-semibold tracking-wide transition duration-300 hover:opacity-80 sm:text-xl ${scrolled ? "scale-[.78]" : "scale-100"}`}><span className="earth-portal-mark alchemical-glyph text-3xl">♁</span><span className="earth-portal-wordmark">Whole Body Earth</span></Link>
        <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-5">
          <Link href="/about" className={`${linkClass} hidden sm:inline`}>About</Link>
          <Link href="/store" className={`${linkClass} hidden sm:inline`}>Store</Link>
          <Link href="/calendar" className={`${linkClass} hidden sm:inline`}>Calendar</Link>
          <Link href="/careers" className={`${linkClass} hidden sm:inline`}>Careers</Link>
          <AccountMenu />
        </div>
      </nav>
    </div>
  );
}

const linkClass = "font-mono text-[10px] uppercase tracking-[0.1em] text-ghost transition-colors hover:text-bone focus-visible:text-bone";

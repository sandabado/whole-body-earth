"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import MainNav from "./MainNav";
import PillarNav, { PILLAR_LINKS } from "./PillarNav";

const mainLinks = [
  { href: "/about", label: "About" },
  { href: "/catalog", label: "Catalog" },
  { href: "/#events", label: "Events" },
];

export default function NavStack() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isStudiosPillar = pathname === "/studios" || pathname.startsWith("/studios/");

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[90]">
      <div className="hidden md:block"><TopNav /></div>
      <MainNav onMenuOpen={() => setMenuOpen(true)} />
      {isStudiosPillar && <div className="hidden md:block"><PillarNav /></div>}
      {menuOpen && <MobileDrawer showPillarLinks={isStudiosPillar} onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function MobileDrawer({ showPillarLinks, onClose }: { showPillarLinks: boolean; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-void/80 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="ml-auto flex h-full w-[min(22rem,88vw)] flex-col border-l border-mercury bg-carbon p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-mercury pb-4">
          <span className="font-display text-lg text-bone">🜄</span>
          <button type="button" onClick={onClose} className="flex min-h-11 min-w-11 items-center justify-center text-bone transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water" aria-label="Close navigation"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="square" strokeWidth="2" d="M6 6l12 12M18 6 6 18" /></svg></button>
        </div>
        <nav className="divide-y divide-mercury" aria-label="Mobile navigation">
          <div className="py-3"><DrawerLink href="/catalog" onClose={onClose}>Library</DrawerLink><DrawerLink href="/login" onClose={onClose}>Login</DrawerLink></div>
          <div className="py-3">{mainLinks.map((link) => <DrawerLink key={link.label} href={link.href} onClose={onClose}>{link.label}</DrawerLink>)}<Link href="/apply" onClick={onClose} className="mt-3 block border border-water bg-water px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-void">Apply →</Link></div>
          {showPillarLinks && <div className="py-3">{PILLAR_LINKS.studios.map((label) => <span key={label} className="block px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ghost">{label}</span>)}</div>}
          <button type="button" className="w-full px-3 py-5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-water">Switch Pillar ▾</button>
        </nav>
      </div>
    </div>
  );
}

function DrawerLink({ href, children, onClose }: { href: string; children: React.ReactNode; onClose: () => void }) {
  return <Link href={href} onClick={onClose} className="block px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ghost transition-colors hover:text-water">{children}</Link>;
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import MainNav from "./MainNav";

const mainLinks = [
  { href: "/about", label: "About" },
  { href: "/catalog", label: "Catalog" },
  { href: "/calendar", label: "Calendar" },
];

export default function NavStack() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

  if (pathname === "/") return <EarthNavigation />;

  return (
    <header className="sticky top-0 z-[90]">
      <TopNav />
      <MainNav onMenuOpen={() => setMenuOpen(true)} />
      {menuOpen && <MobileDrawer onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function EarthNavigation() {
  const pillars = [
    { href: "#presence", mark: "🜂", label: "Presence", element: "Fire", color: "text-fire hover:bg-fire/10" },
    { href: "#press", mark: "🜁", label: "Press", element: "Air", color: "text-press hover:bg-press/10" },
    { href: "#studios", mark: "🜄", label: "Studios", element: "Water", color: "text-water hover:bg-water/10" },
    { href: "#foundation", mark: "🜃", label: "Foundation", element: "Earth", color: "text-earth hover:bg-earth/10" },
    { href: "#guardian", mark: "☉", label: "Guardian", element: "Ether", color: "text-guardian hover:bg-guardian/10" },
  ] as const;

  return <header className="sticky top-0 z-[90] bg-void/95 backdrop-blur-md">
    <TopNav />
    <nav aria-label="The five pillars" className="bg-carbon/85">
      <div className="mx-auto flex min-h-14 max-w-[1200px] overflow-x-auto">
        {pillars.map((pillar) => <Link key={pillar.label} href={pillar.href} className={`group relative flex min-w-[8.5rem] flex-1 items-center justify-center gap-2 border-r border-mercury/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors first:border-l ${pillar.color}`}>
          <span className="alchemical-glyph text-base leading-none">{pillar.mark}</span>
          <span>{pillar.label}</span>
          <span className="hidden text-[9px] text-ghost/75 lg:inline">{pillar.element}</span>
          <span className="absolute right-4 bottom-0 left-4 h-px origin-center scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100" />
        </Link>)}
      </div>
    </nav>
  </header>;
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
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
          <button type="button" className="w-full px-3 py-5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-water">Switch Pillar ▾</button>
        </nav>
      </div>
    </div>
  );
}

function DrawerLink({ href, children, onClose }: { href: string; children: React.ReactNode; onClose: () => void }) {
  return <Link href={href} onClick={onClose} className="block px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ghost transition-colors hover:text-water">{children}</Link>;
}

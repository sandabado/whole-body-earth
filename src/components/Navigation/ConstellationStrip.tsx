"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { PILLARS } from "@/lib/pillars";

const FOOTER_CONSTELLATION = [
  { id: "presence", footerStatus: "★ Current" }, { id: "foundation", footerStatus: "Q1 2027" }, { id: "press", footerStatus: "★ Current" }, { id: "studios", footerStatus: "★ Current" }, { id: "guardian", footerStatus: "Soon" },
] as const;

export default function ConstellationStrip() {
  return <footer className="relative z-10 mt-auto border-t border-mercury bg-carbon">
    <div className="border-b border-mercury px-6 py-2 text-center">
      <Link href="/" className="footer-system-status font-mono text-xs tracking-widest text-water">SYSTEM STATUS: ONLINE</Link>
    </div>
    <div className="mx-auto max-w-[1200px] px-6 py-6">
      <div className="flex flex-wrap items-stretch justify-center gap-x-3 gap-y-3 sm:gap-x-5">
        {FOOTER_CONSTELLATION.map((item) => { const pillar = PILLARS[item.id]; return <Link key={item.id} href={pillar.href} className="footer-constellation-link group flex min-w-[6.8rem] flex-col items-center justify-center gap-1 border border-transparent px-4 py-3 text-center" style={{ "--constellation-color": pillar.color } as CSSProperties}>
          <span className="alchemical-glyph text-2xl leading-none" aria-hidden="true">{pillar.symbol}</span>
          <span className="font-display text-xs">{pillar.name}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest">{item.footerStatus}</span>
          <span className="sr-only">Visit Whole Body {pillar.name}</span>
        </Link>; })}
      </div>
    </div>
    <div className="border-t border-mercury px-6 py-4"><div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs text-ghost"><span>wholebody.earth · Copyright © 2026 Whole Body Guild LLC</span><Link href="/legal/privacy" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">Privacy</Link><Link href="/legal/terms" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">Terms</Link><a href="https://wholebody.studio" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">wholebody.studio</a><a href="https://wholebody.press" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">wholebody.press</a></div></div>
    <p className="border-t border-mercury bg-void px-6 py-4 text-center font-mono text-xs tracking-widest text-ghost"><span className="block">So It Is Built. So It Holds. So It Is. 🍀</span><span className="mt-2 block text-[10px] tracking-normal">This site does not track you. We do not sell your data. We protect it.</span></p>
  </footer>;
}

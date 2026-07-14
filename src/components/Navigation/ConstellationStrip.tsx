"use client";

import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";

export default function ConstellationStrip() {
  const { constellation, getNavigationTarget } = useNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-mercury bg-carbon">
      <div className="border-b border-mercury px-6 py-2 text-center"><span className="font-mono text-xs tracking-widest text-water">SYSTEM STATUS: ONLINE ●</span></div>
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="flex flex-wrap items-start justify-center gap-x-7 gap-y-5">
          {constellation.map((item) => {
            const body = <><span className="alchemical-glyph text-2xl leading-none" aria-hidden="true">{item.icon}</span><span className="font-display text-xs text-current">{item.name}</span><span className="font-mono text-[10px] uppercase tracking-widest">{item.status === "HERE" ? "★ Current" : item.subtitle}</span></>;
            if (item.status === "ACTIVE") return <Link key={item.name} href={getNavigationTarget(item)} className="flex min-w-16 flex-col items-center gap-1 text-ghost transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">{body}</Link>;
            return <div key={item.name} className={`flex min-w-16 flex-col items-center gap-1 ${item.status === "HERE" ? "text-water" : "text-ghost opacity-40"}`}>{body}</div>;
          })}
        </div>
      </div>
      <div className="border-t border-mercury px-6 py-4"><div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs text-ghost"><span>wholebody.studio · © {currentYear} Whole Body Guild LLC</span><Link href="/legal/privacy" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">Privacy</Link><Link href="/legal/terms" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">Terms</Link><a href="https://wholebody.earth" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">wholebody.earth ↗</a></div></div>
      <p className="border-t border-mercury bg-void px-6 py-4 text-center font-mono text-xs tracking-widest text-ghost">So It Is Built. So It Holds. So It Is. 🍀</p>
    </footer>
  );
}

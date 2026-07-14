import type { ReactNode } from "react";

export function PressSectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return <div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-press">{eyebrow}</p><h1 className="mt-4 font-display text-4xl leading-[1.06] font-bold text-bone md:text-6xl">{title}</h1>{children && <div className="mt-6 max-w-2xl leading-relaxed text-ghost">{children}</div>}</div>;
}

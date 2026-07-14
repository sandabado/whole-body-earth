"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/catalog", label: "Catalog" },
  { href: "/apply", label: "Apply" },
  { href: "/about", label: "About" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { constellation, getNavigationTarget } = useNavigation();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-sm animate-[overlay-fade_200ms_ease-out_forwards]" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title" onClick={onClose}>
      <div ref={menuRef} className="min-h-full px-6 pt-24 pb-10 animate-[modal-rise_200ms_ease-out_forwards]" onClick={(event) => event.stopPropagation()}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex items-center justify-between">
            <h2 id="mobile-navigation-title" className="font-display text-xl uppercase tracking-wider text-bone">Navigation</h2>
            <button type="button" onClick={onClose} className="min-h-11 min-w-11 font-mono text-xl text-water focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water" aria-label="Close navigation">×</button>
          </div>
          <nav className="mb-10 border-y border-mercury py-3" aria-label="Mobile primary navigation">
            {links.map(({ href, label }) => <Link key={href} href={href} onClick={onClose} className="block border-l-2 border-transparent py-3 pl-3 font-display text-lg text-bone transition-all hover:border-water hover:pl-5 focus-visible:border-water focus-visible:outline-none">{label}</Link>)}
          </nav>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-water">Constellation</h3>
          <div className="space-y-3">
            {constellation.map((item) => {
              const content = <><span className="alchemical-glyph text-xl" aria-hidden="true">{item.icon}</span><span className="font-mono text-xs uppercase tracking-widest">{item.name}{item.status === "HERE" ? " ★ Current" : item.status === "LOCKED" ? ` · ${item.subtitle}` : ""}</span></>;
              return item.status === "ACTIVE" ? <Link key={item.name} href={getNavigationTarget(item)} onClick={onClose} className="flex items-center gap-4 text-ghost transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-water">{content}</Link> : <div key={item.name} className={`flex items-center gap-4 ${item.status === "HERE" ? "text-water" : "text-ghost opacity-40"}`}>{content}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

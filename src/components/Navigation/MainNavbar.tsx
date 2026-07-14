"use client";

import { useState } from "react";
import Link from "next/link";
import ProductSwitcher from "@/components/ProductSwitcher/ProductSwitcher";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/services", label: "Services" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
];

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[90] border-b border-mercury bg-void/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4" aria-label="Main navigation">
          <ProductSwitcher />
          <div className="hidden items-center gap-7 md:flex">
            {links.map(({ href, label }) => <Link key={href} href={href} className="font-mono text-xs uppercase tracking-widest text-ghost transition-colors hover:text-water focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water">{label}</Link>)}
            <Link href="/apply" className="border border-water px-4 py-2 font-mono text-xs uppercase tracking-widest text-water transition-colors hover:bg-water hover:text-void focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water">Apply</Link>
          </div>
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center text-water focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation" aria-expanded={mobileMenuOpen}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </nav>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

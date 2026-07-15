import Link from "next/link";
import { HomePlatonicLayer } from "@/components/home/HomePlatonicLayer";
import { HomeAmbientField } from "@/components/home/HomeAmbientField";
import { PillarPortalSection } from "@/components/home/PillarPortalSection";
import { ApplySection, FiveBodies } from "@/components/home/PortalSections";
import { PILLAR_SECTIONS } from "@/components/home/data/pillar-section-data";
import { StarSky } from "@/components/home/StarSky";

export default function WholeBodyEarthHome() {
  return <><HomePlatonicLayer /><main id="main-content" className="home-portal relative z-10 isolate"><StarSky /><HomeAmbientField />
    <section id="hero" className="relative flex min-h-[calc(100svh-4rem)] items-center px-5 py-28 sm:px-6"><div className="relative z-10 mx-auto max-w-5xl text-center [text-shadow:0_2px_28px_rgba(0,0,0,.96)]"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-press">The Whole Body Constellation</p><h1 className="mt-5 font-display text-5xl font-medium leading-[.94] text-bone sm:text-6xl lg:text-7xl">The Whole Body Constellation</h1><p className="mt-4 font-display text-2xl text-press sm:text-3xl">Five Pillars. One Whole Body.</p><p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-bone/80 sm:text-lg">You have five bodies. Mental. Physical. Emotional. Spiritual. Ethereal. Each maps to an element. Each element maps to a geometric solid. Each solid is a pillar of work.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/reading" className="bg-[#d4af37] px-5 py-3 font-mono text-xs uppercase tracking-[.12em] text-void transition hover:bg-[#f3d26e]">Get Your Reading in 60 Seconds →</Link></div><p className="mt-8 font-mono text-[10px] uppercase tracking-[.13em] text-bone/75">🟢 Presence · 🟢 Press · 🟢 Studios · 🟡 Foundation · 🔒 Guardian</p></div></section>
    <FiveBodies />
    {PILLAR_SECTIONS.map((item) => <PillarPortalSection key={item.id} item={item} />)}
    <ApplySection />
  </main></>;
}

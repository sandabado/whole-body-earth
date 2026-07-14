import Link from "next/link";
import type { CSSProperties } from "react";
import { HomePlatonicLayer } from "@/components/home/HomePlatonicLayer";

const SECTION_SHELL = "relative flex min-h-[calc(100svh-7rem)] items-center overflow-hidden px-6 py-20 sm:py-24";

const PILLARS = [
  { id: "presence", mark: "🜂", name: "Presence", body: "Physical body", element: "Fire", solid: "Tetrahedron", tone: "#d16b45", color: "text-fire", description: "Embodiment, voice, and the physical practice of arriving.", feature: { label: "The embodied voice", title: "Somatic practice for the signal you carry.", text: "Breath, grounding, vocal activation, and a return to the physical vessel." }, tagline: "The shape of ignition.", paragraphs: ["Presence is the physical pillar: breath, movement, voice, boundaries, and the grounded intelligence of the body.", "Start with what is here. Feel your feet. Let the body lead."] },
  { id: "press", mark: "🜁", name: "Press", body: "Mental body", element: "Air", solid: "Octahedron", tone: "#d4af37", color: "text-press", description: "Publishing, communication, and a signal that carries.", feature: { label: "Signal architecture", title: "A practice for your message.", text: "Clarify the idea, edit the noise, and make the work easy to find." }, tagline: "The shape that carries.", paragraphs: ["Press is the mental pillar: writing, speaking, publishing, and shaping a signal that travels without losing its source.", "Your mind does not need more noise. It needs a clear channel."] },
  { id: "studios", mark: "🜄", name: "Studios", body: "Emotional body", element: "Water", solid: "Icosahedron", tone: "#2ba8a0", color: "text-water", description: "Creative flow, emotional intelligence, and relational art.", feature: { label: "Emotional cartography", title: "Creative work that lets feeling move.", text: "Colour mapping, relational practice, free creation, and a path into flow." }, tagline: "The shape that remembers.", paragraphs: ["Studios is the emotional pillar: art, feeling, relationship, and the creative current that makes a life feel alive.", "Make room for the feeling. Then make something with it."] },
  { id: "foundation", mark: "🜃", name: "Foundation", body: "Spiritual body", element: "Earth", solid: "Cube", tone: "#4a6741", color: "text-earth", description: "Structure, systems, ritual, and the architecture of legacy.", feature: { label: "The root practice", title: "Structure that can hold your work.", text: "Build rituals, map your systems, and create the conditions for a lasting legacy." }, tagline: "The shape that endures.", paragraphs: ["Foundation is the spiritual pillar: systems, ritual, roots, and the durable structures that allow meaningful work to remain.", "Without a container, even a true vision spills away."] },
  { id: "guardian", mark: "☉", name: "Guardian", body: "Ethereal body", element: "Ether", solid: "Dodecahedron", tone: "#8f5bff", color: "text-guardian", description: "The central axis: synthesis, facilitation, and holding space.", feature: { label: "The Guardian’s circle", title: "Integration for those who hold the whole.", text: "Facilitation, pattern recognition, integration, and practices for a centered presence." }, tagline: "The shape that holds.", paragraphs: ["Guardian is the ethereal center. It appears when your four outer bodies are in uncommon balance and you are called to hold a whole pattern.", "The center does not dominate. It makes coherence possible."] },
] as const;

export default function WholeBodyEarthHome() {
  return <>
    <HomePlatonicLayer />
    <main id="main-content" className="relative z-10 isolate">
      <div aria-hidden="true" className="home-gradient-flow pointer-events-none absolute inset-0 -z-10" />

      <section id="hero" className={SECTION_SHELL}>
        <div className="relative mx-auto max-w-6xl text-center [text-shadow:0_2px_28px_rgba(0,0,0,.96)]">
          <p className="font-mono text-[10px] uppercase tracking-[.32em] text-press sm:text-xs">The Whole Body Constellation</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl leading-[.94] font-semibold text-bone sm:text-6xl lg:text-7xl">Five Pillars. One Whole Body.</h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-7 text-bone/78 sm:text-lg">
            <p>Your birth chart reveals your design. Whole Body Earth maps you to one of five pillars — Presence, Press, Studios, Foundation, Guardian — then guides you to the practice, community, and work that fits your architecture.</p>
            <p className="text-bone/72">A network for sovereign creators.</p>
          </div>
          <Link href="/reading" className="mt-8 inline-block bg-fire px-6 py-3 font-mono text-xs uppercase tracking-[.14em] text-void shadow-[0_0_24px_rgba(209,107,69,.38)] transition hover:bg-fire/85">Get your reading →</Link>
          <a href="#quincunx" className="hero-scroll-cue mx-auto mt-10 flex w-fit flex-col items-center gap-2 text-press">
            <span className="font-mono text-[10px] uppercase tracking-[.24em]">Follow the constellation</span>
            <span className="hero-scroll-cue-arrow flex h-10 w-6 items-center justify-center border border-press/55 text-xl">↓</span>
          </a>
        </div>
      </section>

      <section id="quincunx" className={SECTION_SHELL}>
        <div className="relative mx-auto max-w-3xl text-center [text-shadow:0_2px_20px_rgba(0,0,0,.9)]">
          <div className="mx-auto h-px w-16 bg-press/35" />
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[.28em] text-press">The Quincunx</p>
          <h2 className="mt-4 font-display text-4xl text-press sm:text-5xl">You are made of the elements.</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-bone/80">
            <p>Physical, mental, emotional, and spiritual bodies move around an ethereal center. Your chart shows their relative weight — and the center illuminates when your system holds in balance.</p>
            <p>Whole Body turns that pattern into a real practice: embodiment, signal, creative flow, structure, or synthesis.</p>
          </div>
          <Link href="/reading" className="mt-9 inline-block bg-fire px-6 py-3 font-mono text-xs uppercase tracking-[.14em] text-void shadow-[0_0_24px_rgba(209,107,69,.38)] transition hover:bg-fire/85">Get your Whole Body Reading →</Link>
        </div>
      </section>

      {PILLARS.map((pillar) => <PillarSection key={pillar.id} pillar={pillar} />)}

      <section id="reading" className={`${SECTION_SHELL} min-h-[70svh]`}>
        <div className="relative mx-auto max-w-3xl text-center [text-shadow:0_2px_24px_rgba(0,0,0,.96)]">
          <div className="mx-auto h-px w-16 bg-press/35" />
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[.3em] text-press">Your design is waiting</p>
          <h2 className="mt-4 font-display text-4xl text-press sm:text-5xl">Find the pillar that is asking for you.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-bone/85">Enter your birth data. See your weighted Quincunx. Begin with a practice that meets you where you are.</p>
          <Link href="/reading" className="mt-9 inline-block bg-fire px-7 py-4 font-display text-lg text-void shadow-[0_0_28px_rgba(209,107,69,.42)] transition hover:bg-fire/85">Begin your reading →</Link>
        </div>
      </section>

      <section id="paths" className="relative border-t border-mercury bg-carbon/45 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-center font-mono text-[10px] uppercase tracking-[.3em] text-press">The five paths</p>
          <h2 className="mt-4 text-center font-display text-4xl text-bone sm:text-5xl">Find the door that is calling.</h2>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar) => <PillarCard key={pillar.id} pillar={pillar} />)}
          </div>
        </div>
      </section>
    </main>
  </>;
}

type Pillar = (typeof PILLARS)[number];

function PillarCard({ pillar }: { pillar: Pillar }) {
  return <Link href={`/pillars/${pillar.id}`} className="pillar-card group min-h-72 border border-transparent bg-carbon/90 p-5 shadow-[0_16px_38px_rgba(0,0,0,.32)] backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-steel/95" style={{ "--pillar": pillar.tone, boxShadow: `0 16px 38px rgba(0,0,0,.32), 0 0 24px ${pillar.tone}20` } as CSSProperties}>
    <div className={`flex h-24 items-center justify-center overflow-hidden border border-current/20 bg-void/50 font-display text-5xl ${pillar.color}`}>{pillar.mark}</div>
    <p className={`mt-5 font-mono text-[10px] uppercase tracking-[.16em] ${pillar.color}`}>{pillar.mark} {pillar.body}</p>
    <p className="mt-1 font-mono text-[9px] uppercase tracking-[.12em] text-ghost">{pillar.element} · {pillar.solid}</p>
    <h2 className="mt-3 font-display text-2xl text-bone transition group-hover:text-[var(--pillar)]">{pillar.name}</h2>
    <p className="mt-3 text-sm leading-6 text-bone/72">{pillar.description}</p>
    <span className={`mt-5 block font-mono text-[10px] uppercase tracking-[.12em] ${pillar.color}`}>Explore {pillar.name} →</span>
  </Link>;
}

function PillarSection({ pillar }: { pillar: Pillar }) {
  return <section id={pillar.id} className={SECTION_SHELL}>
    <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
      <div className="[text-shadow:0_2px_18px_rgba(0,0,0,.88)]">
        <p className={`font-mono text-[10px] uppercase tracking-[.24em] ${pillar.color}`}>{pillar.mark} {pillar.element} · {pillar.solid}</p>
        <h2 className={`mt-4 font-display text-5xl font-semibold ${pillar.color}`}>{pillar.name}</h2>
        <p className={`mt-2 font-display text-2xl italic ${pillar.color}`}>{pillar.tagline}</p>
        <div className="mt-6 space-y-5 text-lg leading-8 text-bone/80">{pillar.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <Link href={`/pillars/${pillar.id}`} className={`mt-8 inline-block border px-5 py-3 font-mono text-xs uppercase tracking-[.12em] transition hover:bg-white/5 ${pillar.color}`} style={{ borderColor: pillar.tone }}>Explore {pillar.name} →</Link>
      </div>
      <Feature tone={pillar.tone} color={pillar.color} label={pillar.feature.label} title={pillar.feature.title} text={pillar.feature.text} />
    </div>
  </section>;
}

function Feature({ label, title, text, tone, color }: { label: string; title: string; text: string; tone: string; color: string }) {
  return <article className="border bg-void/82 p-6 backdrop-blur-sm" style={{ borderColor: `${tone}66` }}>
    <p className={`font-mono text-[10px] uppercase tracking-[.18em] ${color}`}>{label}</p>
    <h3 className="mt-4 font-display text-3xl text-bone">{title}</h3>
    <p className="mt-4 text-sm leading-7 text-bone/70">{text}</p>
    <Link href="/pillars/presence/gatherings" className={`mt-7 inline-block font-mono text-xs uppercase tracking-[.1em] ${color}`}>See gatherings →</Link>
  </article>;
}

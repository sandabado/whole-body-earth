import Image from "next/image";
import Link from "next/link";
import {
  ArtworkTile,
  ConstellationNav,
  FinalCta,
  MetricGrid,
  ProductionTicker,
  SectionHeading,
} from "@/components/home";
import { FeedFirstBlock } from "@/components/sections/FeedFirstBlock";
import { IcosahedronLayer } from "@/components/sections/IcosahedronLayer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const METRICS = [
  { value: "100%", label: "Artist-owned", detail: "Masters, publishing, and IP stay with the artist." },
  { value: "12%", label: "Distribution fee", detail: "A transparent service fee — never a rights grab." },
  { value: "0", label: "Recoupment traps", detail: "No hidden debt tied to the work you make." },
  { value: "∞", label: "Creative control", detail: "The artist remains the final voice." },
];

const ROSTER = [
  { title: "Sandābādo", subtitle: "Featured artist · ∞ Love", image: "/images/releases/sandabado-infinity-love.png", label: "Featured release" },
  { title: "Sarah Veya", subtitle: "New work in development", label: "In development" },
  { title: "Marcus Reed", subtitle: "Writing & pre-production", label: "In production" },
  { title: "Living Earth", subtitle: "A collaborative compilation", label: "Project file" },
];

const RELEASES = [
  { title: "∞ Love", subtitle: "Sandābādo · Album", image: "/images/releases/sandabado-infinity-love.png", label: "Featured" },
  { title: "Living Earth Vol. 1", subtitle: "Various artists · Compilation", label: "In development" },
  { title: "Memory EP", subtitle: "Sarah Veya · EP", label: "In production" },
];

const STUDIO_SPACES = [
  { title: "Desert Studio", subtitle: "Tracking · Morongo Valley, CA", image: "/images/studio/desert-session.png", label: "Field recording" },
  { title: "Mix & Master", subtitle: "Stereo, spatial, and vinyl-ready masters", image: "/images/studio/objects-session.png", label: "Post-production" },
  { title: "Film Unit", subtitle: "Music films, fieldwork, and visual direction", label: "Moving image" },
];

const ELEMENTS = [
  { symbol: "🜂", label: "Presence", href: "https://wholebody.earth/pillars/presence" },
  { symbol: "🜁", label: "Press", href: "https://wholebody.earth/pillars/press" },
  { symbol: "🜄", label: "Studios", href: "/", active: true },
  { symbol: "🜃", label: "Foundation", href: "https://wholebody.earth/pillars/foundation" },
  { symbol: "⊙", label: "Guardian", href: "https://wholebody.earth/pillars/guardian" },
];

export default function Home() {
  return (
    <>
      <IcosahedronLayer opacity={0.13} />

      <main className="relative z-10 overflow-hidden">
        <section className="border-b border-mercury px-6 pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <Badge variant="success" pulse className="mb-6">Artist-owned production infrastructure</Badge>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-plasma">Whole Body Studios</p>
              <h1 className="font-display text-5xl leading-[0.98] font-bold text-bone md:text-7xl">Build the work.<br /><span className="text-plasma">Keep the rights.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ghost">A production house for artists making music, film, and culture outside the extraction model. We supply the rooms, tools, and release support. You retain the work.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg"><Link href="/apply">Apply for partnership →</Link></Button>
                <Button asChild size="lg" variant="outline"><Link href="/catalog">View projects</Link></Button>
              </div>
            </div>

            <article className="relative overflow-hidden border border-mercury bg-steel p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:p-6">
              <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-plasma" />
              <div className="relative aspect-square overflow-hidden bg-void">
                <Image src="/images/releases/sandabado-infinity-love.png" alt="Sandābādo — ∞ Love album artwork" fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/50 to-transparent p-6 pt-20">
                  <Badge variant="info" className="mb-3">Featured release</Badge>
                  <p className="font-mono text-xs uppercase tracking-[0.17em] text-plasma">Sandābādo</p>
                  <h2 className="mt-1 font-display text-4xl font-bold text-bone">∞ Love</h2>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ghost">Artist-owned album · 13 tracks</p>
                <a href="https://sandabado.com/music" className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-plasma hover:text-bone">Explore ↗</a>
              </div>
            </article>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading eyebrow="The operating model" title={<>Proof in the <span className="text-plasma">structure.</span></>} description="The terms are simple by design: clear service fees, transparent splits, and no ownership transfer." className="mb-10" />
            <MetricGrid items={METRICS} />
          </div>
        </section>

        <section className="border-y border-mercury bg-carbon/35 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading eyebrow="Artist roster" title={<>Artists with <span className="text-plasma">the final say.</span></>} description="A growing circle of independent artists and projects, supported without surrendering their rights." align="center" className="mb-12" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ROSTER.map((artist) => <ArtworkTile key={artist.title} {...artist} />)}
            </div>
            <div className="mt-9 text-center"><Button asChild variant="outline"><Link href="/catalog">See the project catalog →</Link></Button></div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Selected releases" title={<>The catalog is <span className="text-plasma">the receipt.</span></>} />
              <Link href="/catalog" className="font-mono text-xs uppercase tracking-[0.14em] text-plasma hover:text-bone">Full catalog →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {RELEASES.map((release) => <ArtworkTile key={release.title} {...release} />)}
            </div>
          </div>
        </section>

        <section className="border-y border-mercury bg-carbon/35 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading eyebrow="Facilities & fieldwork" title={<>Rooms, tools, and the <span className="text-plasma">space between them.</span></>} description="From desert tracking to post-production and moving image, the facility follows the needs of the work." className="mb-12" />
            <div className="grid gap-6 md:grid-cols-3">
              {STUDIO_SPACES.map((space) => <ArtworkTile key={space.title} {...space} />)}
            </div>
            <div className="mt-9"><Button asChild variant="outline"><Link href="/services">View studio services →</Link></Button></div>
          </div>
        </section>

        <ProductionTicker items={["Now in production", "Sandābādo · vinyl masters", "Living Earth Vol. 1 · mixing", "Sarah Veya · tracking", "Film unit · field sessions"]} />

        <FeedFirstBlock />

        <section className="border-y border-mercury bg-carbon/35 px-6 py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeading eyebrow="Press room · launches Q4 2026" title={<>The story is <span className="text-plasma">still being written.</span></>} description="Published coverage, partner testimonials, and the complete press kit go live in Q4 2026. Until then, we would rather show the work than manufacture social proof." />
            <Card hud={false} className="border-dashed bg-void/40 p-8">
              <p className="font-mono text-xs uppercase tracking-[0.17em] text-plasma">For editors, curators & collaborators</p>
              <h3 className="mt-3 font-display text-2xl font-bold">Request the current press kit.</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-ghost">Artist bios, approved release imagery, and production notes are available by request. The public press room opens in Q4 2026, with published coverage added as it is earned.</p>
              <Button asChild variant="outline" className="mt-6"><Link href="/apply">Request information →</Link></Button>
            </Card>
          </div>
        </section>

        <ConstellationNav elements={ELEMENTS} />
        <FinalCta />
      </main>
    </>
  );
}

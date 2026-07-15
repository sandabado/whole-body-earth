import Link from "next/link";
import { PressBookCard } from "@/components/press/PressBookCard";
import { PressSectionHeading } from "@/components/press/PressSectionHeading";
import { PillarJourneyMap } from "@/components/layout/PillarJourneyMap";
import { pressVolumes } from "@/lib/press-data";

export default function PressHomePage() {
  return (
    <div className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <PressSectionHeading eyebrow="🜁 Whole Body Press" title="The Whole Body Series">
          <p>Five volumes. One operating system.</p>
          <p className="mt-2">From the instrument to the spiral. From silence to manifestation.</p>
        </PressSectionHeading>

        <section className="mt-14 border-y border-mercury py-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-press">From the library</p>
              <h2 className="mt-3 font-display text-3xl font-bold">Begin with a volume.</h2>
            </div>
            <Link href="/pillars/press/library" className="border border-press px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-press hover:bg-press hover:text-void">View the full library →</Link>
          </div>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {pressVolumes.slice(0, 3).map((volume) => <PressBookCard key={volume.slug} volume={volume} />)}
          </div>
        </section>

        <section className="mt-20 border-y border-press/30 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-press">The complete series</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-bold md:text-5xl">All five volumes.<br />One operating system.</h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-ghost">Read in sequence or enter at any volume. Each stands alone. Together they form the complete architecture.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 border-l border-mercury pl-0 sm:pl-8"><Price label="Digital bundle" price="$111" saving="save $44" /><Price label="Physical bundle" price="$333" saving="save $52" /><Price label="Both" price="$388" saving="save $98" /></div>
          </div>
          <p className="mt-8 font-mono text-xs text-ghost">Library access and purchase links open with the Q4 2026 launch.</p>
        </section>

        <section className="grid gap-10 py-20 md:grid-cols-3"><Info number="01" title="Buy">Purchase any volume or bundle. Library access unlocks with your edition.</Info><Info number="02" title="Read">Read in the secure, watermarked portal on any device.</Info><Info number="03" title="Keep">Your library is permanent. No subscription. No rental.</Info></section>

        <section className="grid gap-10 border-t border-mercury py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-press">Author spotlight</p><h2 className="mt-3 font-display text-3xl font-bold">Jesse Gawlik</h2><p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ghost">Founder · Whole Body Guild</p></div>
          <div className="leading-relaxed text-ghost"><p>Jesse writes from the intersection of ancient geometry, somatic practice, and sovereign enterprise. His work is not self-help. It is infrastructure — tools for people building real things in the physical world.</p><p className="mt-4">He lives in the Morongo Valley where the desert, the studio, and the writing desk occupy the same room.</p><Link href="/pillars/press/about" className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.14em] text-press">Read more about Jesse →</Link></div>
        </section>

        <section className="border border-press/35 bg-press/5 p-8 sm:p-12"><p className="font-mono text-xs uppercase tracking-[0.2em] text-press">Submissions</p><h2 className="mt-3 font-display text-3xl font-bold">Submit your work.</h2><p className="mt-4 max-w-2xl leading-relaxed text-ghost">We publish aligned authors. Not trends. Not algorithms. If your work serves the Living Earth, we want to read it.</p><Link href="/pillars/press/submissions" className="mt-7 inline-block border border-press px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-press hover:bg-press hover:text-void">Submit a manuscript →</Link></section>
        <PillarJourneyMap pillar="press" />
      </div>
    </div>
  );
}

function Price({ label, price, saving }: { label: string; price: string; saving: string }) { return <div><p className="font-mono text-[10px] uppercase tracking-[0.13em] text-ghost">{label}</p><p className="mt-2 font-display text-2xl font-bold text-bone">{price}</p><p className="mt-1 text-xs text-press">{saving}</p></div>; }
function Info({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <div><p className="font-mono text-sm text-press">{number}</p><h3 className="mt-3 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ghost">{children}</p></div>; }

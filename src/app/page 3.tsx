import Link from "next/link";
import { FeedFirstBlock } from "@/components/sections/FeedFirstBlock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const SERVICES = [
  {
    title: "Production",
    desc: "Desert Studio tracking, cloud mixing, mastering lathe, film unit",
    icon: "🎛️",
    href: "/services#production",
  },
  {
    title: "Distribution",
    desc: "DSP delivery, vinyl pressing, Bandcamp direct-to-fan",
    icon: "📀",
    href: "/services#distribution",
  },
  {
    title: "Sync Licensing",
    desc: "Film, TV, ads, brand campaigns — 20% commission only on placement",
    icon: "🎬",
    href: "/services#sync",
  },
];

export default function Home() {
  return (
    <>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px] text-center">
          <Badge variant="success" pulse className="mb-6">
            FEED FIRST · ARTIST-OWNED · ZERO EXTRACTION
          </Badge>

          <h1 className="mb-6 font-display text-5xl leading-[1.05] font-bold md:text-7xl">
            Infrastructure,<br />Not a Label.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-ghost">
            Whole Body Studios provides production, distribution, and sync licensing for artists who retain everything. We earn on services rendered — never on ownership. The artist eats first. Always.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/apply">Apply for Partnership →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <FeedFirstBlock />

      <section className="bg-carbon/50 px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">
            Services Built For Artists Who Own Everything
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <Card key={service.title} hoverEffect className="group">
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-2 font-display text-xl font-bold transition-colors group-hover:text-plasma">
                  {service.title}
                </h3>
                <p className="mb-4 text-ghost">{service.desc}</p>
                <Link href={service.href} className="inline-flex items-center gap-1 font-mono text-sm text-flux hover:text-plasma">
                  Learn more ↗
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

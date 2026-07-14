import { Card } from "@/components/ui/Card";

const ALGORITHM_STEPS = [
  { pct: "35%", label: "Artist Royalty Pool", desc: "Split among active artists" },
  { pct: "25%", label: "Guild Treasury", desc: "Equipment, studio, marketing" },
  { pct: "20%", label: "Guaranteed Stipend", desc: "Monthly minimum for partners" },
  { pct: "12%", label: "Distribution & Infra", desc: "Platform, hosting, software" },
  { pct: "8%", label: "Founder Allocation", desc: "Leadership compensation" },
];

export function FeedFirstBlock() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-display text-3xl leading-tight font-bold md:text-4xl">
            The Old World Extracted.<br />
            <span className="text-plasma">We Invert This.</span>
          </h2>
          <p className="leading-relaxed text-ghost">
            The label owns the masters. The artist gets 8%. The platform controls distribution. The musician rents their own voice.
          </p>
          <p className="leading-relaxed text-ghost">
            Whole Body Studios flips the script. Artists retain 100% of masters, publishing, and IP. We earn on production, distribution, and placement — never on ownership.
          </p>
          <p className="flex items-center gap-2 pt-4 font-mono text-sm text-flux">
            <span className="h-2 w-2 animate-pulse rounded-full bg-flux" />
            The artist eats first. Always.
          </p>
        </div>

        <Card hud className="space-y-4">
          <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-plasma">Feed First Algorithm</h3>
          <div className="space-y-3">
            {ALGORITHM_STEPS.map((step) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="min-w-[60px] font-mono text-2xl font-bold text-plasma">{step.pct}</div>
                <div className="flex-1">
                  <p className="font-semibold text-bone">{step.label}</p>
                  <p className="font-mono text-xs text-ghost">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

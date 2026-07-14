import Link from "next/link";

const PILLAR_LINKS = {
  studios: ["Records", "Productions", "Publishing", "Licensing", "Distribution"],
  presence: ["Events", "Residencies", "Workshops"],
  foundation: ["Grants", "Fellowships", "Partnerships"],
  press: ["Submissions", "Archives", "Guidelines"],
  guardian: ["Legal", "Contracts", "Disputes"],
} as const;

type Pillar = keyof typeof PILLAR_LINKS;

export default function PillarNav({ pillar = "studios" }: { pillar?: Pillar }) {
  return (
    <nav className="border-b border-mercury bg-steel" aria-label={`${pillar} navigation`}>
      <div className="mx-auto flex h-10 max-w-[1200px] items-center overflow-x-auto px-6">
        {PILLAR_LINKS[pillar].map((label) => (
          <Link key={label} href={`#${label.toLowerCase()}`} className="shrink-0 pr-6 font-mono text-[10px] uppercase tracking-[0.13em] text-ghost transition-colors hover:text-water focus-visible:text-water sm:pr-8">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export { PILLAR_LINKS };

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const PROJECTS = [
  { title: "Sandabado", subtitle: "Debut Album", year: "2026", status: "Released", variant: "success" as const, artist: "Sandabado", color: "#2BA8A0", surface: "rgba(43, 168, 160, 0.1)" },
  { title: "Living Earth Vol. 1", subtitle: "Compilation", year: "2026", status: "Available", variant: "success" as const, artist: "Various Artists", color: "#2BA8A0", surface: "rgba(43, 168, 160, 0.1)" },
  { title: "Memory EP", subtitle: "EP", year: "2026", status: "Forthcoming", variant: "warning" as const, artist: "Sarah Veya", color: "#2BA8A0", surface: "rgba(43, 168, 160, 0.1)" },
  { title: "Untitled", subtitle: "In Writing", year: "2027", status: "In Progress", variant: "neutral" as const, artist: "Marcus Reed", color: "#8888A0", surface: "rgba(136, 136, 160, 0.1)" },
];

export default function CatalogPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-mercury px-6 pt-12 pb-16"><div className="mx-auto max-w-[1200px]"><p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-water">Whole Body Studios</p><h1 className="mb-6 font-display text-4xl font-bold md:text-6xl">Project<br /><span className="text-plasma">Catalog</span></h1><p className="max-w-2xl text-lg leading-relaxed text-ghost">Released and upcoming projects from our artist partners. Each project is fully owned by the artist. We exist to serve the work.</p></div></section>
      <section className="px-6 py-20"><div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2">{PROJECTS.map((project) => <Card key={project.title} hoverEffect><div className="mb-4 flex aspect-square items-end rounded-[2px] border border-mercury p-6" style={{ backgroundColor: project.surface }}><div><p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.color }}>{project.artist}</p><p className="font-display text-4xl font-bold text-bone">{project.title}</p></div></div><Badge variant={project.variant} className="mb-3">{project.status}</Badge><h2 className="mb-1 font-display text-2xl font-bold">{project.title}</h2><p className="mb-2 font-mono text-sm text-ghost">{project.artist} • {project.year}</p><p className="mb-4 text-sm text-ghost">{project.subtitle}</p><span className="inline-flex font-mono text-sm text-flux">Listen ↗</span></Card>)}</div></section>
    </div>
  );
}

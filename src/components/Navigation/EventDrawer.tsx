"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PlatonicEdges } from "@/components/backgrounds/PlatonicEdges";
import { PILLARS, PILLAR_IDS, pillarForPath, type PillarId } from "@/lib/pillars";
import { DEFAULT_PILLAR_ACTIVITIES, getPillarActivities, type PillarActivity } from "@/lib/pillar-activities";
import { getUpcomingEvents, type UpcomingEvent } from "@/lib/upcoming-events";

function eventPillar(value: string): PillarId | null {
  return (PILLAR_IDS as readonly string[]).includes(value) ? value as PillarId : null;
}

const HOME_PILLAR_SECTIONS: Array<{ id: string; pillar: PillarId }> = [
  { id: "presence", pillar: "presence" },
  { id: "press", pillar: "press" },
  { id: "studios", pillar: "studios" },
  { id: "foundation", pillar: "foundation" },
  { id: "guardian", pillar: "guardian" },
];

function DodecahedronMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.DodecahedronGeometry(0.86), []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.42;
    ref.current.rotation.y += delta * 0.68;
  });

  return <mesh ref={ref} geometry={geometry} rotation={[0.25, 0.35, 0]}>
    <meshBasicMaterial color={color} depthWrite={false} opacity={0.36} transparent />
    <PlatonicEdges geometry={geometry} color="#050505" opacity={0.94} renderOrder={2} />
  </mesh>;
}

function LiveSignal({ color }: { color: string }) {
  return <span aria-hidden="true" className="live-signal"><Canvas camera={{ position: [0, 0, 3.25], fov: 42 }} dpr={[1, 1.25]}><DodecahedronMesh color={color} /></Canvas></span>;
}

export function EventDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [activities, setActivities] = useState<PillarActivity[]>(DEFAULT_PILLAR_ACTIVITIES);
  const [homePillar, setHomePillar] = useState<PillarId | null>(null);
  const activePillar = pathname === "/" ? homePillar : pillarForPath(pathname);
  const accent = activePillar ? PILLARS[activePillar].color : "#ff78c4";
  const activeLabel = activePillar ? PILLARS[activePillar].name : "Live now";

  useEffect(() => {
    if (pathname !== "/") return;

    const updateActivePillar = () => {
      const focusLine = window.scrollY + window.innerHeight / 2;
      const nextPillar = HOME_PILLAR_SECTIONS.find(({ id }) => {
        const section = document.getElementById(id);
        return section ? focusLine >= section.offsetTop && focusLine < section.offsetTop + section.offsetHeight : false;
      })?.pillar ?? null;
      setHomePillar((current) => current === nextPillar ? current : nextPillar);
    };

    updateActivePillar();
    window.addEventListener("scroll", updateActivePillar, { passive: true });
    window.addEventListener("resize", updateActivePillar);
    return () => {
      window.removeEventListener("scroll", updateActivePillar);
      window.removeEventListener("resize", updateActivePillar);
    };
  }, [pathname]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const [nextEvents, nextActivities] = await Promise.all([getUpcomingEvents(3), getPillarActivities()]);
      if (!active) return;
      setEvents(nextEvents);
      setActivities(nextActivities);
    };
    void load();
    const id = window.setInterval(load, 60_000);
    return () => { active = false; window.clearInterval(id); };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2">
      <button type="button" onClick={() => setOpen((current) => !current)} style={{ backgroundColor: accent, borderColor: accent, boxShadow: `0 14px 38px ${accent}54` }} className="group relative flex w-[7.5rem] flex-col items-center border px-3 py-4 text-center transition hover:brightness-125 sm:w-[10.35rem] sm:px-4 sm:py-6" aria-controls="live-shelf" aria-expanded={open} aria-label={open ? "Close live field" : `Enter live field, ${events.length + activities.length} signals`}><LiveSignal color={accent} /><span className="mt-2 font-mono text-[10px] uppercase tracking-[.16em] text-void/75 sm:mt-3 sm:text-xs">{open ? "Close" : activeLabel}</span><span className="mt-1 font-display text-base text-void sm:text-xl">{open ? "Field ×" : "Enter →"}</span><span className="mt-1.5 font-mono text-[10px] text-void/65 sm:mt-2 sm:text-xs">{activePillar ? `${PILLARS[activePillar].elementLabel} · ${events.length + activities.length} signals` : `${events.length + activities.length} signals`}</span></button>
      <aside id="live-shelf" aria-label="Live calendar and constellation activity" style={{ borderColor: `${accent}b3` }} className={`absolute left-0 top-1/2 max-h-[calc(100svh-2rem)] w-[min(25rem,calc(100vw-2rem))] -translate-y-1/2 overflow-y-auto border bg-void/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,.54)] backdrop-blur-xl transition duration-300 sm:p-6 ${open ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-[110%] opacity-0"}`}>
        <div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[.16em]" style={{ color: accent }}>Live shelf · {activeLabel}</p><h2 className="mt-2 font-display text-2xl text-bone">What&apos;s moving now.</h2></div><button type="button" onClick={() => setOpen(false)} style={{ color: accent, borderColor: `${accent}99` }} className="grid h-9 w-9 place-items-center border text-lg transition hover:bg-white/[.06]" aria-label="Close live shelf">×</button></div>

        <section className="mt-7 border-y border-mercury py-5"><div className="flex items-center justify-between gap-4"><p className="font-mono text-[10px] uppercase tracking-[.14em] text-bone/70">Calendar</p><Link href="/calendar" onClick={() => setOpen(false)} style={{ color: accent }} className="font-mono text-[10px] uppercase tracking-[.12em] transition hover:brightness-125">All events →</Link></div><div className="mt-3 divide-y divide-mercury/75">{events.length ? events.map((event) => { const pillarId = eventPillar(event.pillar); const eventAccent = pillarId ? PILLARS[pillarId].color : "#ff78c4"; return <Link key={event.id} href="/calendar" onClick={() => setOpen(false)} className="grid grid-cols-[3.8rem_1fr] gap-3 py-3 transition hover:bg-white/[.03]"><span className="font-mono text-[10px]" style={{ color: eventAccent }}>{new Intl.DateTimeFormat("en", { month: "short", day: "2-digit" }).format(new Date(event.event_date))}</span><span><span className="block font-display text-lg leading-tight text-bone">{event.title}</span><span className="mt-1 block text-xs text-ghost">{event.location ?? "Whole Body Earth"}</span></span></Link>; }) : <p className="py-4 text-sm text-ghost">No upcoming events. Check back soon.</p>}</div></section>

        <section className="pt-6"><p className="font-mono text-[10px] uppercase tracking-[.14em] text-bone/70">Across the constellation</p><div className="mt-3 grid gap-2">{activities.map((activity) => { const pillar = PILLARS[activity.pillar]; return <Link key={activity.id} href={activity.href} onClick={() => setOpen(false)} className="group border p-3 transition hover:bg-white/[.04]" style={{ borderColor: `${pillar.color}72` }}><div className="flex items-start gap-3"><span className="alchemical-glyph mt-0.5 text-lg" style={{ color: pillar.color }}>{pillar.symbol}</span><span className="min-w-0"><span className="block font-mono text-[9px] uppercase tracking-[.13em]" style={{ color: pillar.color }}>{activity.kicker}</span><span className="mt-1 block font-display text-lg leading-tight text-bone">{activity.title}</span><span className="mt-1 block text-xs leading-5 text-ghost">{activity.summary}</span></span></div></Link>; })}</div></section>

        <Link href="/calendar#scheduling" onClick={() => setOpen(false)} style={{ borderColor: `${accent}b3`, color: accent }} className="mt-6 block border px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[.12em] transition hover:bg-white/[.06]">Book a private session →</Link>
      </aside>
    </div>
  );
}

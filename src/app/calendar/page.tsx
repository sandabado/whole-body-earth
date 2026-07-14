import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Calendar | Whole Body Earth",
  description: "Upcoming Whole Body releases, gatherings, and open doors.",
};

const CALENDAR_ENTRIES = [
  {
    window: "Now",
    kind: "Release",
    title: "Sandabado — new music in the field",
    detail: "Listen, watch, and follow the project as new work arrives.",
    accent: "text-water",
  },
  {
    window: "Q4 2026",
    kind: "Opening",
    title: "Whole Body Press",
    detail: "The first titles and reading experiences enter the public field.",
    accent: "text-press",
  },
  {
    window: "Q1 2027",
    kind: "Gathering",
    title: "Whole Body Presence",
    detail: "Circles, retreats, and practices begin their first season.",
    accent: "text-fire",
  },
] as const;

function calendlyUrl() {
  const value = process.env.CALENDLY_URL?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function CalendarPage() {
  const bookingUrl = calendlyUrl();

  return (
    <div className="pb-20">
      <section className="border-b border-mercury px-6 pt-12 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-press">Public signal</p>
          <h1 className="font-display text-4xl font-bold md:text-6xl">Calendar</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ghost">Releases, gatherings, and openings across the Whole Body constellation. New dates land here first.</p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-3">
          {CALENDAR_ENTRIES.map((entry) => (
            <Card key={entry.title} hoverEffect className="flex min-h-60 flex-col">
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.15em]">
                <span className={entry.accent}>{entry.window}</span>
                <span className="text-ghost">{entry.kind}</span>
              </div>
              <h2 className="mt-10 font-display text-2xl font-bold text-bone">{entry.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ghost">{entry.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-[1200px] border border-mercury bg-carbon p-7 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-water">Scheduling</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Make a connection.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ghost">Private conversations, visits, and studio inquiries are managed through one hosted calendar.</p>
          </div>
          {bookingUrl ? (
            <Button asChild className="mt-6 shrink-0 md:mt-0">
              <a href={bookingUrl} target="_blank" rel="noreferrer">Open scheduling ↗</a>
            </Button>
          ) : (
            <p className="mt-6 shrink-0 font-mono text-[10px] uppercase tracking-[0.13em] text-ghost md:mt-0">Scheduling link coming online</p>
          )}
        </div>
      </section>
    </div>
  );
}

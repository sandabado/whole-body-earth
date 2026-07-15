import Link from "next/link";

const announcements = [
  "● NOW LIVE: SANDABADO — DEBUT ALBUM STREAMING · CODEX VOL. I–V AVAILABLE · WEEKLY CIRCLE EVERY TUESDAY ●",
];

export default function AnnouncementTicker() {
  const repeatingAnnouncements = [...announcements, ...announcements];

  return (
    <Link
      href="/calendar"
      className="group hidden h-5 min-w-0 max-w-[23rem] flex-1 items-center border-r border-mercury pr-3 text-[9px] text-ghost transition-colors hover:text-bone lg:flex"
      aria-label="View the Whole Body calendar: releases and gatherings"
    >
      <span className="shrink-0 bg-void pr-2 font-mono uppercase tracking-[0.16em] text-press">Live</span>
      <span className="sr-only">Current releases and upcoming gatherings: </span>
      <span className="min-w-0 flex-1 overflow-hidden">
        <span className="animate-marquee whitespace-nowrap font-mono uppercase tracking-[0.11em]" aria-hidden="true">
          {repeatingAnnouncements.map((announcement, index) => (
            <span key={`${announcement}-${index}`}>
              {announcement}<span className="mx-3 text-press">✦</span>
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

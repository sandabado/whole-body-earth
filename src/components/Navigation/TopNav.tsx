import Link from "next/link";
import AccountMenu from "./AccountMenu";
import AnnouncementTicker from "./AnnouncementTicker";

export default function TopNav() {
  return (
    <div className="border-b border-mercury bg-void/95 backdrop-blur-md">
      <nav className="mx-auto grid h-11 max-w-[1200px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-5 sm:px-6" aria-label="Whole Body Earth navigation">
        <div className="flex min-w-0 justify-start">
          <AnnouncementTicker />
        </div>
        <Link href="/" className="flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold tracking-wide transition-opacity hover:opacity-80 sm:text-base"><span className="earth-portal-mark alchemical-glyph text-xl">♁</span><span className="earth-portal-wordmark">Whole Body Earth</span></Link>
        <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-5">
          <Link href="/about" className={`${linkClass} hidden sm:inline`}>About</Link>
          <Link href="/catalog" className={`${linkClass} hidden sm:inline`}>Library</Link>
          <Link href="/calendar" className={`${linkClass} hidden sm:inline`}>Calendar</Link>
          <AccountMenu />
        </div>
      </nav>
    </div>
  );
}

const linkClass = "font-mono text-[10px] uppercase tracking-[0.1em] text-ghost transition-colors hover:text-bone focus-visible:text-bone";

import { type CSSProperties, type ElementType } from "react";
import { type AppData } from "./consts";

interface AppTileProps {
  app: AppData;
  index: number;
}

const interactiveStates = new Set<AppData["status"]>(["ACTIVE", "INVESTOR"]);

export default function AppTile({ app, index }: AppTileProps) {
  const isInteractive = interactiveStates.has(app.status);
  const isLocked = app.status === "LOCKED";
  const isHere = app.status === "HERE";
  const stateClasses = isLocked
    ? "border-mercury text-ghost opacity-40"
    : isHere
      ? "border-water bg-water/10 text-bone shadow-[0_0_18px_rgba(43,168,160,0.18)]"
      : "border-mercury text-bone hover:border-water hover:bg-water/5 hover:text-water";
  const Tag: ElementType = isInteractive ? "a" : "div";
  const linkProps = app.status === "INVESTOR"
    ? { href: app.url, target: "_blank", rel: "noopener noreferrer" }
    : app.status === "ACTIVE"
      ? { href: app.url }
      : { "aria-disabled": true, tabIndex: -1 };

  return (
    <li
      className="w-full opacity-0 animate-[modal-rise_200ms_ease-out_forwards]"
      style={{ animationDelay: `${100 + index * 50}ms` } as CSSProperties}
    >
      <Tag
        {...linkProps}
        className={`group relative flex w-full items-center gap-4 border bg-carbon/80 px-4 py-4 text-left transition-all duration-200 ease-out sm:px-5 ${stateClasses}`}
      >
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center border font-display text-2xl ${isLocked ? "border-mercury" : "border-water/60 text-water"}`} aria-hidden="true">{app.icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-semibold uppercase tracking-wide sm:text-base">{app.name}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-ghost">{app.element}</span>
        </span>
        <span className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.13em] ${isHere ? "text-water" : "text-ghost group-hover:text-water"}`}>
          {isHere ? "● Current" : app.subtitle}
        </span>
      </Tag>
    </li>
  );
}

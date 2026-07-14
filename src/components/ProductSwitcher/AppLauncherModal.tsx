"use client";

import { useEffect, useRef } from "react";
import AppTile from "./AppTile";
import { constellationApps, investorPortal } from "./consts";

interface AppLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppLauncherModal({ isOpen, onClose }: AppLauncherModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const selectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>(selectors) ?? [])
      .filter((element) => element.offsetParent !== null);
    const focusable = getFocusable();
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!dialog?.contains(event.target as Node)) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="absolute top-[calc(100%+0.75rem)] left-0 z-[100] max-h-[calc(100dvh-5rem)] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto border border-mercury bg-void/98 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm animate-[modal-rise_200ms_ease-out_forwards] sm:p-6"
      role="dialog"
      aria-labelledby="constellation-title"
    >
      <header className="flex w-full items-center justify-between gap-4">
        <h2 id="constellation-title" className="font-display text-lg font-semibold tracking-wide text-bone sm:text-xl">CONSTELLATION</h2>
        <p className="hidden font-mono text-xs uppercase tracking-widest text-water sm:block">SYSTEM STATUS: ONLINE ●</p>
        <button type="button" onClick={onClose} className="min-h-11 min-w-11 font-mono text-xl text-ghost transition-colors hover:text-water sm:hidden" aria-label="Close constellation">×</button>
      </header>
      <div className="my-4 w-full border-t border-mercury sm:my-5" />
      <ul className="flex w-full flex-col gap-2 sm:gap-3">
        {[...constellationApps, investorPortal].map((app, index) => <AppTile key={app.name} app={app} index={index} />)}
      </ul>
      <p className="mt-5 text-center font-mono text-xs text-ghost sm:mt-6">So It Is Built. So It Holds. So It Is. 🍀</p>
    </div>
  );
}

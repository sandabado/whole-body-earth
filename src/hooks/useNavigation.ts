"use client";

import { useEffect, useMemo, useState } from "react";

export type CurrentDomain = "studio" | "earth" | "unknown";
export type ElementState = "HERE" | "ACTIVE" | "LOCKED" | "INVESTOR";

export interface ElementConfig {
  name: string;
  icon: string;
  element: "WATER" | "FIRE" | "EARTH" | "AIR" | "ETHER";
  url: string;
  status: ElementState;
  subtitle?: string;
}

export const CONSTELLATION_CONFIG: ElementConfig[] = [
  { name: "Presence", icon: "🜂", element: "FIRE", url: "/presence", status: "LOCKED", subtitle: "Q1 2027" },
  { name: "Foundation", icon: "🜃", element: "EARTH", url: "/foundation", status: "LOCKED", subtitle: "Q1 2027" },
  { name: "Press", icon: "🜁", element: "AIR", url: "/press", status: "LOCKED", subtitle: "Q1 2027" },
  { name: "Studios", icon: "🜄", element: "WATER", url: "/studios", status: "HERE", subtitle: "Current" },
  { name: "Law", icon: "☉", element: "ETHER", url: "/law", status: "LOCKED", subtitle: "Q1 2027" },
];

export const INVESTOR_PORTAL = {
  name: "wholebody.earth",
  icon: "🌍",
  url: "https://wholebody.earth",
  status: "INVESTOR" as const,
  subtitle: "Investor Pitch",
};

export function useNavigation() {
  const [currentDomain, setCurrentDomain] = useState<CurrentDomain>("unknown");

  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes("wholebody.studio")) setCurrentDomain("studio");
    else if (host.includes("wholebody.earth")) setCurrentDomain("earth");
  }, []);

  const constellation = useMemo(() => CONSTELLATION_CONFIG.map((item) => (
    item.element === "WATER" && currentDomain === "earth" ? { ...item, status: "ACTIVE" as const } : item
  )), [currentDomain]);

  const getNavigationTarget = (target: Pick<ElementConfig, "element" | "url">) => {
    if (currentDomain === "studio" && target.element === "WATER") return "#";
    if (currentDomain === "earth") return target.url;
    return target.url.startsWith("http") ? target.url : `https://wholebody.earth${target.url}`;
  };

  return { currentDomain, constellation, getNavigationTarget };
}

export interface AppData {
  name: string;
  icon: string;
  element: string;
  status: "HERE" | "ACTIVE" | "LOCKED" | "INVESTOR";
  url: string;
  subtitle: string;
  brandColor: string;
}

export const constellationApps: AppData[] = [
  { name: "Presence", icon: "🜂", element: "FIRE", status: "ACTIVE", url: "/pillars/presence", subtitle: "Circle", brandColor: PILLAR_BRANDS.presence },
  { name: "Foundation", icon: "🜃", element: "EARTH", status: "ACTIVE", url: "/pillars/foundation", subtitle: "Ground", brandColor: PILLAR_BRANDS.foundation },
  { name: "Press", icon: "🜁", element: "AIR", status: "ACTIVE", url: "/pillars/press", subtitle: "Library", brandColor: PILLAR_BRANDS.press },
  { name: "Guardian", icon: "☉", element: "ETHER", status: "ACTIVE", url: "/pillars/guardian", subtitle: "Gate", brandColor: PILLAR_BRANDS.guardian },
  { name: "Studios", icon: "🜄", element: "WATER", status: "HERE", url: "/pillars/studios", subtitle: "Current", brandColor: PILLAR_BRANDS.studios },
];

export const investorPortal: AppData = {
  name: "Partnerships",
  icon: "✦",
  element: "CONSTELLATION",
  status: "INVESTOR",
  url: "/apply",
  subtitle: "Apply",
  brandColor: PILLAR_BRANDS.constellation,
};
import { PILLAR_BRANDS } from "@/lib/pillar-brands";

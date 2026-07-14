export interface AppData {
  name: string;
  icon: string;
  element: string;
  status: "HERE" | "ACTIVE" | "LOCKED" | "INVESTOR";
  url: string;
  subtitle: string;
}

export const constellationApps: AppData[] = [
  { name: "Presence", icon: "🜂", element: "FIRE", status: "ACTIVE", url: "https://wholebody.earth/pillars/presence", subtitle: "Open" },
  { name: "Foundation", icon: "🜃", element: "EARTH", status: "ACTIVE", url: "https://wholebody.earth/pillars/foundation", subtitle: "Open" },
  { name: "Press", icon: "🜁", element: "AIR", status: "ACTIVE", url: "https://wholebody.earth/pillars/press", subtitle: "Open" },
  { name: "Law", icon: "☉", element: "ETHER", status: "ACTIVE", url: "https://wholebody.earth/pillars/guardian", subtitle: "Open" },
  { name: "Studios", icon: "🜄", element: "WATER", status: "HERE", url: "/", subtitle: "Current" },
];

export const investorPortal: AppData = {
  name: "wholebody.earth",
  icon: "🌍",
  element: "CONSTELLATION",
  status: "INVESTOR",
  url: "https://wholebody.earth",
  subtitle: "Investor Pitch",
};

import { cn } from "@/lib/utils";

const STATUS_ITEMS = [
  { label: "Artist Applications Open", active: true },
  { label: "Production Services Active", active: true },
  { label: "Distribution Active", active: true },
  { label: "Sync Pipeline Building", active: false, eta: "Q4 2026" },
  { label: "Partner Dashboard", active: false, eta: "Q1 2027" },
];

export function StatusBar() {
  return (
    <div className="fixed top-[72px] right-0 left-0 z-40 border-b border-mercury bg-carbon/80 backdrop-blur">
      <div className="mx-auto max-w-[1200px] px-6 py-3">
        <div className="flex items-center justify-center gap-4 overflow-hidden">
          {STATUS_ITEMS.map((item, index) => (
            <div key={item.label} className={cn("min-w-0 items-center gap-2 font-mono text-xs", index === 0 ? "flex" : "hidden md:flex")}>
              <span
                className={cn("h-2 w-2 rounded-full", item.active ? "bg-flux" : "animate-pulse bg-halo")}
              />
              <span className={item.active ? "text-bone" : "text-ghost"}>{item.label}</span>
              {!item.active && item.eta && <span className="text-ghost/60">({item.eta})</span>}
              {index < STATUS_ITEMS.length - 1 && <span className="text-mercury">·</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ProductionTickerProps = {
  items: string[];
};

export function ProductionTicker({ items }: ProductionTickerProps) {
  const line = items.map((item) => `● ${item}`).join("   ");

  return (
    <section aria-label="Now in production" className="overflow-hidden border-y border-plasma/40 bg-plasma/10 py-4">
      <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.13em] text-plasma">
        <span>{line}&nbsp;&nbsp;&nbsp;</span>
        <span aria-hidden="true">{line}&nbsp;&nbsp;&nbsp;</span>
      </div>
    </section>
  );
}

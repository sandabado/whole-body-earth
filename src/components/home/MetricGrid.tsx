type Metric = {
  value: string;
  label: string;
  detail?: string;
};

type MetricGridProps = {
  items: Metric[];
};

export function MetricGrid({ items }: MetricGridProps) {
  return (
    <div className="grid border-t border-l border-mercury sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="min-h-40 border-r border-b border-mercury bg-carbon/45 p-6 md:p-8">
          <p className="font-display text-4xl font-bold text-plasma md:text-5xl">{item.value}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-bone">{item.label}</p>
          {item.detail && <p className="mt-2 text-sm leading-relaxed text-ghost">{item.detail}</p>}
        </div>
      ))}
    </div>
  );
}

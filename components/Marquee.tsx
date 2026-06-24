const items = [
  "Auto-fading blade",
  "240-min runtime",
  "Fully waterproof",
  "4 fade lengths",
  "90-day guarantee",
  "Free worldwide shipping",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10">
          <span className="text-[0.76rem] font-medium uppercase tracking-[0.16em] text-ink-2">{t}</span>
          <span className="h-1 w-1 rounded-full bg-brand" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-paper-alt py-3.5">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}

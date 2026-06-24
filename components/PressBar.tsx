// NOTE: "As featured in" is only honest if FadeClipper has genuinely been
// covered by these outlets. Replace with real press (or remove this section)
// before launch — claiming features you don't have is false advertising.
const press = [
  { name: "Forbes", className: "font-serif text-[1.7rem] font-bold tracking-tight" },
  { name: "GQ", className: "text-[1.7rem] font-extrabold tracking-tight" },
  { name: "Men's Health", className: "text-[1.05rem] font-bold uppercase tracking-[0.05em]" },
  { name: "Esquire", className: "font-serif text-[1.35rem] font-semibold uppercase tracking-[0.14em]" },
  { name: "QC", className: "text-[1.55rem] font-extrabold tracking-[0.04em]" },
];

export function PressBar() {
  return (
    <section className="border-b border-line bg-paper py-9">
      <div className="container-x">
        <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted">
          As featured in
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-ink opacity-70">
          {press.map((p) => (
            <span key={p.name} className={p.className}>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

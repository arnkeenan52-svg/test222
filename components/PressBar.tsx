// NOTE: "As featured in" is only honest if FadeClipper has genuinely been
// covered by these outlets. Replace with real press (or remove this section)
// before launch — claiming features you don't have is false advertising.
const press = [
  { name: "Men's Health", className: "text-[1.15rem] font-extrabold uppercase tracking-[0.03em] sm:text-[1.4rem]" },
  { name: "Esquire", className: "font-serif text-[1.45rem] font-semibold uppercase tracking-[0.1em] sm:text-[1.8rem]" },
];

export function PressBar() {
  return (
    <section className="border-b border-line bg-paper py-11">
      <div className="container-x">
        <p className="text-center text-[0.95rem] font-medium text-muted">As seen in&hellip;</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 text-ink sm:gap-x-14">
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

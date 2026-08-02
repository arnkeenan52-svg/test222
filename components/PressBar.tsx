// NOTE: "As featured in" is only honest if FadeClipper has genuinely been
// covered by these outlets. Replace with real press (or remove this section)
// before launch — claiming features you don't have is false advertising.
"use client";
import { useContent } from "@/components/useContent";

const press = [
  { name: "Men's Health", className: "whitespace-nowrap text-[1.05rem] font-extrabold uppercase tracking-[0.03em] sm:text-[1.4rem]" },
  { name: "Esquire", className: "whitespace-nowrap font-serif text-[1.3rem] font-semibold uppercase tracking-[0.1em] sm:text-[1.8rem]" },
];

export function PressBar() {
  return (
    <section className="border-b border-line bg-paper py-11">
      <div className="container-x">
        <p className="text-center text-[0.95rem] font-medium text-muted">{useContent().press.seenIn}</p>
        <div className="mt-7 flex items-center justify-center gap-x-8 text-ink sm:gap-x-14">
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

"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { n: 1, title: "Charge & power on", text: "Drop it on the dock until full, then tap the power button. The live display shows battery and runtime left.", img: "/assets/img/step-1.jpg" },
  { n: 2, title: "Pick your fade length", text: "Slide the lever to 0.4, 0.8 or 1.2mm. Start low and tight at the neckline, then step up as you move higher.", img: "/assets/img/step-2.jpg" },
  { n: 3, title: "Glide across the fade", text: "Hold it flat and level to the skin and glide it straight across the side. The blade blends the gradient for you.", img: "/assets/img/step-3.jpg" },
  { n: 4, title: "Blend & finish", text: "Step the length up a notch and pass a little higher to melt the lines into a smooth, sharp fade.", img: "/assets/img/step-4.jpg" },
];

export function HowItWorks({ openAll = false }: { openAll?: boolean }) {
  // Set of open step indices. On the home page (openAll) every step starts open;
  // elsewhere only the first is open. Clicking still toggles each step.
  const [open, setOpen] = useState<Set<number>>(() => new Set(openAll ? steps.map((_, i) => i) : [0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <div className="mx-auto max-w-[700px]">
      {steps.map((s, i) => {
        const isOpen = open.has(i);
        return (
          <div key={s.n} className="mb-4 overflow-hidden rounded-4xl bg-card">
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                {s.n}
              </span>
              <span className="flex-1 font-display text-[1.1rem] font-semibold">{s.title}</span>
              <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5">
                <p className="text-muted">{s.text}</p>
                <div className="mt-4 overflow-hidden rounded-3xl bg-black">
                  <img src={s.img} alt={s.title} className="aspect-[16/10] w-full object-cover" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

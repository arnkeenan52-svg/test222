"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { n: 1, title: "Charge & power on", text: "Drop it on the dock until full, tap power, then set your speed with + / –. The live display shows RPM and runtime left.", img: "/assets/img/product-dock.jpg" },
  { n: 2, title: "Pick your fade length", text: "Slide the lever to 0.4, 0.8 or 1.2mm. Start low and tight at the neckline, then step up as you move higher.", img: "/assets/img/blade.jpg" },
  { n: 3, title: "Glide up & flick out", text: "Hold it flat to the skin, glide straight up, and flick your wrist out at the top. The 45° blade blends the gradient for you.", video: "/assets/video/loop-fade.mp4" },
  { n: 4, title: "Blend & finish", text: "Bump the length up a notch and repeat a little higher to melt the lines. Rinse the blade under the tap — done.", video: "/assets/video/loop-side.mp4" },
];

export function HowItWorks() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-[700px]">
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.n} className="mb-4 overflow-hidden rounded-4xl bg-card">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
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
                  {s.video ? (
                    <video autoPlay muted loop playsInline className="aspect-[16/10] w-full object-cover">
                      <source src={s.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={s.img} alt={s.title} className="aspect-[16/10] w-full object-cover" />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

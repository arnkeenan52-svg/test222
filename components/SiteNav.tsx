"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Countdown } from "@/components/Countdown";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links: [string, string][] = [
  ["How it works", "#how"],
  ["Why FadeClipper", "#compare"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* offer bar */}
      <div className="bg-brand text-white">
        <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-4 py-2 text-[0.8rem]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="uppercase tracking-wide opacity-90">Offer ends in</span>
            <Countdown />
          </span>
          <a href="#buy" className="shrink-0 rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold text-brand">
            40% off &mdash; Launch Sale
          </a>
        </div>
      </div>

      {/* pill nav (static — does not follow on scroll) */}
      <div className="relative z-30 px-3 pt-3">
        <nav className="mx-auto flex max-w-container items-center justify-between gap-4 rounded-full border border-white/10 bg-black px-3 py-2.5 pl-5 text-white shadow-soft">
          <a href="#top" aria-label="FadeClipper home" className="text-white">
            <Logo />
          </a>
          <ul className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-[0.9rem] font-medium text-white/70 transition-colors hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#buy">Get yours</a>
            </Button>
            <button
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-x-3 top-[120px] z-40 rounded-4xl border border-line bg-white p-5 shadow-soft md:hidden">
          <div className="flex flex-col">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-line-2 py-3 font-semibold text-ink last:border-0"
              >
                {label}
              </a>
            ))}
            <Button asChild className="mt-4 w-full">
              <a href="#buy" onClick={() => setOpen(false)}>Get yours</a>
            </Button>
          </div>
        </div>
      )}

      {/* sticky mobile buy bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md transition-transform md:hidden",
          showBar ? "translate-y-0" : "translate-y-full"
        )}
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[1.25rem] font-bold">$59</span>
          <span className="text-xs text-muted line-through">$99</span>
        </div>
        <Button asChild className="flex-1">
          <a href="#buy">Get FadeClipper</a>
        </Button>
      </div>
    </>
  );
}

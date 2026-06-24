"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links: [string, string][] = [
  ["How it works", "#how"],
  ["Features", "#features"],
  ["Savings", "#savings"],
  ["FAQ", "#faq"],
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setShowBar(window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-50 border-b transition-colors",
          scrolled ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent"
        )}
      >
        <nav className="mx-auto flex h-[66px] max-w-container items-center justify-between gap-6 px-7">
          <a href="#top" aria-label="FadeClipper home" className="text-ink">
            <Logo />
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-[0.9rem] font-medium text-ink-2 transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#buy">Get FadeClipper</a>
            </Button>
            <button
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[66px] z-40 border-b border-line bg-paper px-7 pb-6 pt-2 md:hidden">
          <div className="flex flex-col">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-line-2 py-3 font-semibold text-ink"
              >
                {label}
              </a>
            ))}
            <Button asChild className="mt-4 w-full">
              <a href="#buy" onClick={() => setOpen(false)}>Get FadeClipper</a>
            </Button>
          </div>
        </div>
      )}

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md transition-transform md:hidden",
          showBar ? "translate-y-0" : "translate-y-full"
        )}
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[1.3rem] font-semibold">$59</span>
          <span className="text-xs text-muted line-through">$99</span>
        </div>
        <Button asChild className="flex-1">
          <a href="#buy">Get FadeClipper</a>
        </Button>
      </div>
    </>
  );
}

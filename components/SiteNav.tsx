"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Countdown } from "@/components/Countdown";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingBag } from "lucide-react";

const links: [string, string][] = [
  ["How it works", "/#how"],
  ["Why FadeClipper", "/#compare"],
  ["Reviews", "/#reviews"],
  ["FAQ", "/#faq"],
];

export function SiteNav({ variant = "light" }: { variant?: "hero" | "light" }) {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const { fmt } = useCurrency();
  const { add, count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hero = variant === "hero";

  // "hero" = transparent over the homepage glow; "light" = white floating pill (Flow-style)
  const wrap = hero ? "" : "px-3 pt-3";
  const bar = hero
    ? "mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-3.5 text-white"
    : "mx-auto flex max-w-container items-center justify-between gap-4 rounded-full border border-line bg-white px-3 py-2.5 pl-5 text-ink shadow-soft";
  const logoColor = hero ? "text-white" : "text-ink";
  const link = hero
    ? "text-[0.9rem] font-medium text-white/65 transition-colors hover:text-white"
    : "text-[0.9rem] font-medium text-muted transition-colors hover:text-ink";
  const iconBtn = hero
    ? "relative grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
    : "relative grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-card";
  const menuBtn = hero
    ? "grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
    : "grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-card md:hidden";
  const panel = hero
    ? "fixed inset-x-3 top-[112px] z-40 rounded-4xl border border-white/10 bg-[#111] p-5 shadow-soft md:hidden"
    : "fixed inset-x-3 top-[124px] z-40 rounded-4xl border border-line bg-white p-5 shadow-soft md:hidden";
  const panelLink = hero
    ? "border-b border-white/10 py-3 font-semibold text-white last:border-0"
    : "border-b border-line-2 py-3 font-semibold text-ink last:border-0";

  return (
    <>
      {/* offer bar */}
      <div className="bg-brand text-white">
        <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-4 py-2 text-[0.8rem]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="uppercase tracking-wide opacity-90">Offer ends in</span>
            <Countdown />
          </span>
          <a href="/product" className="shrink-0 rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold text-brand">
            40% off &mdash; Launch Sale
          </a>
        </div>
      </div>

      {/* nav bar — hero: transparent over the shared glow; light: white floating pill */}
      <div className={wrap}>
        <nav className={bar}>
          <a href="/" aria-label="FadeClipper home" className={logoColor}>
            <Logo />
          </a>
          <ul className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className={link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <button aria-label="Open cart" onClick={() => setCartOpen(true)} className={iconBtn}>
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.6rem] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="/product">Get yours</a>
            </Button>
            <button aria-label="Open menu" className={menuBtn} onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className={panel}>
          <div className="flex flex-col">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className={panelLink}>
                {label}
              </a>
            ))}
            <Button asChild className="mt-4 w-full">
              <a href="/product" onClick={() => setOpen(false)}>
                Get yours
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* sticky mobile buy bar — fades into the page (no hard white edge) */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-gradient-to-t from-white from-55% to-transparent px-4 pb-3 pt-9 transition-transform md:hidden",
          showBar ? "translate-y-0" : "translate-y-full"
        )}
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[1.2rem] font-bold">{fmt(59)}</span>
          <span className="text-xs text-muted line-through">{fmt(99)}</span>
        </div>
        <Button className="flex-1" onClick={() => add("single")}>
          Get FadeClipper
        </Button>
      </div>
    </>
  );
}

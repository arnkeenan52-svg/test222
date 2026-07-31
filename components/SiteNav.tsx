"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Countdown } from "@/components/Countdown";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingBag, Zap, Droplets } from "lucide-react";

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
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 500) {
        setShowBar(false); // stay hidden over the hero
      } else if (y < lastY - 4) {
        setShowBar(true); // scrolling up → reveal
      } else if (y > lastY + 4) {
        setShowBar(false); // scrolling down → tuck away
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
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
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={menuBtn}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div id="mobile-menu" className={panel}>
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

      {/* sticky mobile buy card — appears on scroll */}
      <div
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 md:hidden",
          showBar ? "translate-y-0" : "translate-y-[140%]"
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="rounded-[34px] bg-gradient-to-b from-[#242426] to-[#151517] p-6 text-white shadow-2xl ring-1 ring-white/10">
          {/* top row: title + subline beside the product tile */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-display text-[2.05rem] font-bold leading-[1] tracking-[-0.01em]">FadeClipper</p>
              <p className="mt-2 text-[0.95rem] leading-snug text-white/50">+ free accessory kit &amp; 90-day guarantee</p>
            </div>
            {/* product tile — FadeClipper package photo */}
            <div className="h-[104px] w-[104px] shrink-0 overflow-hidden rounded-[22px] bg-[#0e0e10] shadow-lg ring-1 ring-white/15">
              <img
                src="/assets/img/packaging.jpg"
                alt="FadeClipper package"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* feature bullets — full width, single line */}
          <ul className="mt-5 grid gap-3.5 text-[1.05rem] text-white/95">
            <li className="flex items-center gap-3"><Zap className="h-[22px] w-[22px] shrink-0" strokeWidth={1.75} /> 45&deg; auto-fade blade</li>
            <li className="flex items-center gap-3"><Droplets className="h-[22px] w-[22px] shrink-0" strokeWidth={1.75} /> Waterproof, 240-min battery</li>
          </ul>
          <button
            onClick={() => add("single")}
            className="relative mt-6 w-full rounded-full bg-brand py-[1.15rem] text-center font-display text-[1.2rem] font-bold text-white transition-colors hover:bg-brand-dark"
          >
            {fmt(59)} - Buy Now
            <span className="absolute -top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-[1.05rem] font-bold text-ink shadow-md">
              {count || 1}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

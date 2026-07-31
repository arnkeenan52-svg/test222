"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Countdown } from "@/components/Countdown";
import { useCurrency } from "@/components/CurrencyProvider";
import { useBuyNow } from "@/components/useBuyNow";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { cn } from "@/lib/utils";
import { Menu, X, Zap, Droplets } from "lucide-react";

const links: [string, string][] = [
  ["How it works", "/#how"],
  ["Why FadeClipper", "/#compare"],
  ["Reviews", "/#reviews"],
  ["FAQ", "/#faq"],
];

export function SiteNav({ variant = "light", buyBar = false }: { variant?: "hero" | "light"; buyBar?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const { fmt } = useCurrency();
  const { buy, loading } = useBuyNow();

  useEffect(() => {
    if (!buyBar) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // only eligible once the "60-second setup" section comes into view, and below
      const how = document.getElementById("how");
      const gate = how ? how.offsetTop - window.innerHeight * 0.5 : 600;
      if (y < gate) {
        setShowBar(false);
      } else if (y < lastY - 4) {
        setShowBar(true); // scrolling up → reveal
      } else if (y > lastY + 4) {
        setShowBar(false); // scrolling down → tuck away
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [buyBar]);

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

      {/* sticky mobile buy card — product page only, appears from the 60-second setup section down */}
      {buyBar && (
        <div
          className={cn(
            "fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 md:hidden",
            showBar ? "translate-y-0" : "translate-y-[140%]"
          )}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="rounded-[26px] bg-gradient-to-b from-[#242426] to-[#151517] p-3.5 text-white shadow-2xl ring-1 ring-white/10">
            {/* top row: title + subline beside the product tile */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-display text-[1.5rem] font-medium leading-[1.02] tracking-[-0.01em]">FadeClipper</p>
                <p className="mt-0.5 text-[0.8rem] leading-snug text-white/50">+ free kit &amp; 14-day guarantee</p>
                {/* feature bullets — tight, single line */}
                <ul className="mt-2.5 grid gap-1.5 text-[0.85rem] text-white/90">
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 shrink-0" strokeWidth={1.75} /> 45&deg; auto-fade blade</li>
                  <li className="flex items-center gap-2"><Droplets className="h-4 w-4 shrink-0" strokeWidth={1.75} /> Waterproof, 240-min battery</li>
                </ul>
              </div>
              {/* product tile — floating clipper render */}
              <div className="h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[18px] bg-[#0e0e10] shadow-lg ring-1 ring-white/15">
                <img
                  src="/assets/img/fc-clipper-float.png"
                  alt="FadeClipper clipper"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <button
              onClick={() => buy("single")}
              disabled={loading}
              className="relative mt-3 w-full rounded-full bg-brand py-[0.7rem] text-center font-display text-[0.9rem] font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
            >
              {loading ? "Starting checkout…" : <>{fmt(59)} - Buy Now</>}
              <span className="absolute -top-2.5 right-3 grid h-7 w-7 place-items-center rounded-full bg-white text-[0.72rem] font-medium text-ink shadow-md">
                1
              </span>
            </button>
            <DeliveryEstimate compact className="mt-2 justify-center text-[0.68rem] text-white/55" iconClassName="h-3.5 w-3.5" />
          </div>
        </div>
      )}
    </>
  );
}

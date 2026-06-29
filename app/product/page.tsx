import { SiteNav } from "@/components/SiteNav";
import { ProductGallery } from "@/components/ProductGallery";
import { BuyBox } from "@/components/BuyBox";
import { WatchDemo } from "@/components/WatchDemo";
import { PressBar } from "@/components/PressBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RedditReviews } from "@/components/RedditReviews";
import { SuggestedProducts } from "@/components/SuggestedProducts";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ChevronLeft, Check } from "lucide-react";

const specs: [string, string][] = [
  ["Cordless runtime", "Up to 240 minutes"],
  ["Charging", "USB-C · full charge in 90 min"],
  ["Blade", "45° titanium auto-fade head"],
  ["Water resistance", "IPX7 — fully washable"],
  ["Display", "Digital battery + length readout"],
  ["Weight", "248 g, balanced grip"],
];

const inBox = ["FadeClipper", "Charging dock + USB-C cable", "8 magnetic guards (1.5–24 mm)", "Cleaning brush + blade oil"];

const gallery = [
  { src: "/assets/img/packaging.jpg", alt: "FadeClipper box and clipper on the charging dock" },
  { src: "/assets/img/product-hero-dark.jpg", alt: "FadeClipper on a desk" },
  { src: "/assets/img/cine-1.jpg", alt: "FadeClipper in dramatic studio light" },
  { src: "/assets/img/cine-2.jpg", alt: "FadeClipper auto-fade blade, up close" },
  { src: "/assets/img/cine-3.jpg", alt: "FadeClipper — waterproof, on a wet surface" },
];

export default function ProductPage() {
  return (
    <>
      <SiteNav variant="light" />

      <main id="top">
        {/* breadcrumb */}
        <div className="container-x pt-4">
          <a href="/" className="inline-flex items-center gap-1 text-[0.85rem] font-medium text-muted hover:text-ink">
            <ChevronLeft className="h-4 w-4" /> Back to home
          </a>
        </div>

        {/* PRODUCT */}
        <section id="product" className="scroll-mt-24 pt-3">
          <div className="container-x grid items-start gap-8 md:grid-cols-2 md:gap-12">
            <ProductGallery images={gallery} />
            <div>
              <BuyBox />
              <div className="mt-3">
                <WatchDemo />
              </div>
            </div>
          </div>
        </section>

        {/* AS SEEN IN */}
        <PressBar />

        {/* HOW DOES IT WORK */}
        <section id="how" className="py-[clamp(3.5rem,7vw,6rem)]">
          <div className="container-x">
            <div className="mb-10 mx-auto max-w-[640px] text-center">
              <p className="eyebrow mb-4">60-second setup</p>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">How does it work?</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">No experience needed. If you can comb your hair, you can run a FadeClipper.</p>
            </div>
            <Reveal><HowItWorks /></Reveal>
          </div>
        </section>

        {/* WHY BETTER */}
        <section id="compare" className="bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]">
          <div className="container-x">
            <div className="mb-10 mx-auto max-w-[640px] text-center">
              <p className="eyebrow mb-4">The difference</p>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">Why FadeClipper beats ordinary clippers.</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">The auto-fade blade does what regular clippers can&rsquo;t — and what the barber charges you for, on repeat.</p>
            </div>
            <Reveal><div className="rounded-4xl bg-white p-4 shadow-card md:p-7"><ComparisonTable /></div></Reveal>
          </div>
        </section>

        {/* SPECS + SUGGESTED PRODUCTS — the product detail panel, with cross-sells beneath it */}
        <section id="details" className="py-[clamp(3.5rem,7vw,6rem)]">
          <div className="container-x">
            <div className="mb-10 mx-auto max-w-[640px] text-center">
              <p className="eyebrow mb-4">The details</p>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">Specifications &amp; what&rsquo;s in the box.</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">Everything you get, down to the numbers — so you know exactly what lands on your doorstep.</p>
            </div>

            <Reveal>
              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
                {/* spec table */}
                <div className="rounded-4xl bg-white p-6 shadow-card md:p-8">
                  <dl className="grid gap-0">
                    {specs.map(([k, v], i) => (
                      <div
                        key={k}
                        className={`flex items-center justify-between gap-4 py-3.5 ${i < specs.length - 1 ? "border-b border-line-2" : ""}`}
                      >
                        <dt className="text-[0.95rem] text-muted">{k}</dt>
                        <dd className="text-right font-display text-[0.98rem] font-semibold text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* in the box */}
                <div className="rounded-4xl bg-brand-tint p-6 shadow-card md:p-8">
                  <p className="mb-4 font-display text-[1.05rem] font-bold text-brand-dark">In the box</p>
                  <ul className="grid gap-3">
                    {inBox.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-[0.96rem] text-ink-2">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* suggested products, directly under the product details */}
            <Reveal className="mt-14">
              <SuggestedProducts />
            </Reveal>
          </div>
        </section>

        {/* TRUSTED BY PEOPLE — real Reddit posts */}
        <RedditReviews />
      </main>

      <SiteFooter />
    </>
  );
}

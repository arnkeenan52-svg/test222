"use client";
import { SiteNav } from "@/components/SiteNav";
import { ProductGallery } from "@/components/ProductGallery";
import { BuyBox } from "@/components/BuyBox";
import { WatchDemo } from "@/components/WatchDemo";
import { PressBar } from "@/components/PressBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TrustedByReddit } from "@/components/TrustedByReddit";
import { Reviews } from "@/components/Reviews";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { useContent } from "@/components/useContent";

const gallery = [
  { src: "/assets/img/product-box-stand.jpg", alt: "FadeClipper box and clipper on the charging stand" },
  { src: "/assets/img/product-open-box.jpg", alt: "FadeClipper in its open box" },
  { src: "/assets/img/product-whats-included.jpg", alt: "Everything included — FadeClipper, guards, blades, comb and USB-C cable" },
  { src: "/assets/img/product-in-use.jpg", alt: "The FadeClipper in use — fading at home" },
];

export default function ProductPage() {
  const t = useContent();
  return (
    <>
      <SiteNav variant="light" />

      <main id="top">
        {/* PRODUCT */}
        <section id="product" className="scroll-mt-24 pt-6">
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
              <p className="eyebrow mb-4">{t.how.eyebrow}</p>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">{t.how.title}</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">{t.how.sub}</p>
            </div>
            <Reveal><HowItWorks /></Reveal>
          </div>
        </section>

        {/* WHY BETTER */}
        <section id="compare" className="bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]">
          <div className="container-x">
            <div className="mb-10 mx-auto max-w-[640px] text-center">
              <p className="eyebrow mb-4">{t.compare.eyebrow}</p>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">{t.compare.title}</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">{t.compare.sub}</p>
            </div>
            <Reveal><div className="rounded-4xl bg-white p-4 shadow-card md:p-7"><ComparisonTable /></div></Reveal>
          </div>
        </section>

        {/* TRUSTED BY REDDIT */}
        <TrustedByReddit />

        {/* CUSTOMER REVIEWS */}
        <Reviews />
      </main>

      <SiteFooter />
    </>
  );
}

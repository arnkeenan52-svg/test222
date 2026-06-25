import { SiteNav } from "@/components/SiteNav";
import { ProductGallery } from "@/components/ProductGallery";
import { BuyBox } from "@/components/BuyBox";
import { WatchDemo } from "@/components/WatchDemo";
import { PressBar } from "@/components/PressBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RedditReviews } from "@/components/RedditReviews";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ChevronLeft } from "lucide-react";

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

        {/* TRUSTED BY PEOPLE — real Reddit posts */}
        <RedditReviews />
      </main>

      <SiteFooter />
    </>
  );
}

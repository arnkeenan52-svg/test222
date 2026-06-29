import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductsBrowser } from "@/components/ProductsBrowser";
import { Reveal } from "@/components/Reveal";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop all — FadeClipper & accessories",
  description:
    "Browse the full FadeClipper line-up — clippers, replacement blades, guards, charging dock, travel case and care kits. Search to find exactly what you need.",
};

export default function ProductsPage() {
  return (
    <>
      <SiteNav variant="light" />

      <main id="top">
        <div className="container-x pt-4">
          <a href="/" className="inline-flex items-center gap-1 text-[0.85rem] font-medium text-muted hover:text-ink">
            <ChevronLeft className="h-4 w-4" /> Back to home
          </a>
        </div>

        <section className="py-[clamp(2rem,5vw,3.5rem)]">
          <div className="container-x">
            <div className="mx-auto mb-8 max-w-[640px] text-center">
              <p className="eyebrow mb-4">Shop all</p>
              <h1 className="font-display text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05]">
                Everything for the perfect fade.
              </h1>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">
                The clipper, plus every blade, guard and accessory that keeps it cutting like new. Search or filter to
                find your match.
              </p>
            </div>
            <Reveal>
              <ProductsBrowser />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

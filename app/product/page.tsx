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
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
import type { Metadata } from "next";

const gallery = [
  { src: "/assets/img/product-box-stand.jpg", alt: "FadeClipper box and clipper on the charging stand" },
  { src: "/assets/img/product-open-box.jpg", alt: "FadeClipper in its open box" },
  { src: "/assets/img/product-whats-included.jpg", alt: "Everything included — FadeClipper, guards, blades, comb and USB-C cable" },
  { src: "/assets/img/product-in-use.jpg", alt: "The FadeClipper in use — fading at home" },
];

const SHIP_COUNTRIES = ["US", "CA", "GB", "DK", "SE", "NO", "DE", "FR", "NL", "IE", "AU"];

export const metadata: Metadata = {
  title: "FadeClipper — Auto-Fade Cordless Hair Clipper | Fade Your Own Hair at Home",
  description:
    "The FadeClipper auto-fade clipper blends a barber-quality fade for you — cordless, waterproof, 240-minute battery. Free worldwide shipping and a 14-day money-back guarantee.",
  keywords: [
    "auto fade clipper", "fade clipper", "self fade clipper", "cordless hair clipper",
    "fade your own hair", "waterproof hair clipper", "best clipper to fade your own hair", "FadeClipper",
  ],
  alternates: { canonical: "/product" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/product`,
    siteName: SITE_NAME,
    title: "FadeClipper — Auto-Fade Cordless Hair Clipper",
    description: "Blend a barber-quality fade at home. Cordless, waterproof, 240-minute battery. Free shipping & 14-day guarantee.",
    images: [{ url: abs("/assets/img/product-box-stand.jpg") }],
  },
  twitter: { card: "summary_large_image" },
};

// Product structured data — powers Google product/merchant listings (price,
// availability, free shipping, return window) and gives AI engines the exact
// spec. No aggregateRating on purpose: the on-site reviews are still sample
// content, and emitting review stars for them would misrepresent them to Google.
const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${SITE_URL}/product#product`,
      name: "FadeClipper",
      description:
        "The auto-fading cordless hair clipper. A 45° auto-fade blade blends a salon-quality fade for you — cordless, waterproof, with roughly 240 minutes of battery and a USB-C charging dock.",
      brand: { "@type": "Brand", name: SITE_NAME },
      category: "Hair Clippers & Trimmers",
      image: [
        abs("/assets/img/product-box-stand.jpg"),
        abs("/assets/img/product-hero-dark.jpg"),
        abs("/assets/img/product-whats-included.jpg"),
      ],
      additionalProperty: [
        { "@type": "PropertyValue", name: "Blade", value: "45° auto-fade" },
        { "@type": "PropertyValue", name: "Battery runtime", value: "Up to 240 minutes" },
        { "@type": "PropertyValue", name: "Waterproof", value: "Yes (IPX7)" },
        { "@type": "PropertyValue", name: "Charging", value: "USB-C dock" },
        { "@type": "PropertyValue", name: "Cordless", value: "Yes" },
      ],
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/product`,
        price: "89.99",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": `${SITE_URL}/#organization` },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: SHIP_COUNTRIES },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 10, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: SHIP_COUNTRIES,
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 14,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "FadeClipper", item: `${SITE_URL}/product` },
      ],
    },
  ],
};

export default function ProductPage() {
  return (
    <>
      <JsonLd data={productSchema} />
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

        {/* TRUSTED BY REDDIT */}
        <TrustedByReddit />

        {/* CUSTOMER REVIEWS */}
        <Reviews />
      </main>

      <SiteFooter />
    </>
  );
}

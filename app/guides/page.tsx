import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { GUIDES } from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Self-Fade Guides — How to Fade Your Own Hair at Home | FadeClipper",
  description:
    "Free guides to fading your own hair at home: how to fade the back of your own head, how to do a skin fade, the types of fades explained, and more.",
  keywords: ["fade guides", "how to fade your own hair", "self fade tutorials", "fade at home"],
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    title: "Self-Fade Guides — How to Fade Your Own Hair at Home",
    description: "Free, practical guides to fading your own hair at home.",
  },
};

// The pillar guide plus the cluster guides, as one library.
const PILLAR = {
  slug: "how-to-fade-your-own-hair",
  h1: "How to Fade Your Own Hair at Home: The Complete Guide",
  description: "The full walkthrough — fade types, step-by-step method, cost vs the barber, and FAQs.",
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Self-Fade Guides",
      url: `${SITE_URL}/guides`,
      description: "Practical guides to fading your own hair at home.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "ItemList",
      itemListElement: [PILLAR, ...GUIDES].map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/${g.slug === PILLAR.slug ? g.slug : `guides/${g.slug}`}`,
        name: g.h1,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      ],
    },
  ],
};

export default function GuidesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <SiteNav variant="light" />

      <main className="container-x py-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="mx-auto max-w-[860px]">
          <nav className="text-[0.8rem] text-muted" aria-label="Breadcrumb">
            <a href="/" className="hover:text-ink">Home</a> <span className="px-1">/</span> Guides
          </nav>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.05]">Self-fade guides</h1>
          <p className="mt-4 max-w-[60ch] text-[1.1rem] leading-relaxed text-ink-2">
            Everything you need to fade your own hair at home — no barber, no appointment. Start with the complete guide,
            then dive into the specifics.
          </p>

          {/* pillar, featured */}
          <a
            href={`/${PILLAR.slug}`}
            className="mt-8 flex flex-col justify-between gap-4 overflow-hidden rounded-4xl bg-ink p-8 text-white transition-transform hover:-translate-y-0.5 md:flex-row md:items-center"
          >
            <div>
              <span className="text-[0.72rem] font-bold uppercase tracking-wider text-brand">Start here</span>
              <p className="mt-2 font-display text-[1.5rem] font-bold leading-tight">{PILLAR.h1}</p>
              <p className="mt-2 max-w-[52ch] text-[0.98rem] text-white/70">{PILLAR.description}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand">Read the guide <ArrowRight className="h-4 w-4" /></span>
          </a>

          {/* cluster guides */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <a key={g.slug} href={`/guides/${g.slug}`} className="flex flex-col rounded-4xl border border-line bg-white p-6 shadow-card transition-colors hover:border-brand/40">
                <p className="font-display text-[1.15rem] font-semibold leading-snug text-ink">{g.h1}</p>
                <p className="mt-2 flex-1 text-[0.94rem] leading-relaxed text-muted">{g.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-brand">{g.readingMinutes} min read <ArrowRight className="h-3.5 w-3.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

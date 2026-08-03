import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { JsonLd } from "@/components/JsonLd";
import { GUIDES, guideBySlug, type Guide, type GuideBlock } from "@/lib/guides";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = guideBySlug(params.slug);
  if (!guide) return {};
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    title: guide.metaTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: guide.h1,
      description: guide.description,
      images: [{ url: abs("/assets/img/product-hero-dark.jpg") }],
    },
    twitter: { card: "summary_large_image" },
  };
}

// Minimal, safe inline formatter: **bold** and [label](/link) → React nodes.
// No innerHTML, so nothing in the (author-controlled) copy can inject markup.
function Inline({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) nodes.push(<a key={key++} href={m[2]} className="font-medium text-brand underline underline-offset-2">{m[1]}</a>);
    else nodes.push(<strong key={key++}><Inline text={m[3]} /></strong>); // recurse so a link inside bold still renders
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function Block({ block }: { block: GuideBlock }) {
  if ("p" in block) return <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2"><Inline text={block.p} /></p>;
  if ("tip" in block)
    return (
      <p className="mt-4 rounded-2xl border border-brand/25 bg-brand-tint px-5 py-3 text-[0.98rem] leading-relaxed text-brand-dark">
        <strong className="font-semibold">Tip: </strong>
        <Inline text={block.tip} />
      </p>
    );
  if ("ul" in block)
    return (
      <ul className="mt-4 grid gap-2.5">
        {block.ul.map((li, i) => (
          <li key={i} className="flex gap-2.5 text-[1.02rem] leading-relaxed text-ink-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span><Inline text={li} /></span>
          </li>
        ))}
      </ul>
    );
  return (
    <ol className="mt-4 grid gap-3">
      {block.ol.map((li, i) => (
        <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-[0.85rem] font-bold text-white">{i + 1}</span>
          <span className="pt-0.5"><Inline text={li} /></span>
        </li>
      ))}
    </ol>
  );
}

function schemaFor(guide: Guide) {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: guide.h1, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: guide.h1,
        description: guide.description,
        datePublished: guide.updated,
        dateModified: guide.updated,
        inLanguage: "en",
        mainEntityOfPage: url,
        image: abs("/assets/img/product-hero-dark.jpg"),
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guideBySlug(params.slug);
  if (!guide) notFound();

  const related = guide.related.map(guideBySlug).filter(Boolean) as Guide[];

  return (
    <>
      <JsonLd data={schemaFor(guide)} />
      <SiteNav variant="light" />

      <main className="container-x py-[clamp(2rem,5vw,3.5rem)]">
        <article className="mx-auto max-w-[760px]">
          <nav className="text-[0.8rem] text-muted" aria-label="Breadcrumb">
            <a href="/" className="hover:text-ink">Home</a> <span className="px-1">/</span>
            <a href="/guides" className="hover:text-ink"> Guides</a> <span className="px-1">/</span> {guide.h1}
          </nav>

          <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-bold leading-[1.06]">{guide.h1}</h1>
          <p className="mt-3 text-[0.82rem] text-muted">
            {guide.readingMinutes} min read · Updated{" "}
            {new Date(guide.updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <p className="mt-5 text-[1.12rem] leading-relaxed text-ink-2"><Inline text={guide.intro} /></p>

          {/* on this page */}
          <div className="mt-8 rounded-3xl border border-line bg-card p-5">
            <p className="font-display text-[1rem] font-semibold">On this page</p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {guide.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[0.92rem] text-ink-2 hover:text-brand">{i + 1}. {s.heading}</a>
                </li>
              ))}
            </ol>
          </div>

          {guide.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 pt-11">
              <h2 className="font-display text-[clamp(1.4rem,3.2vw,2rem)] font-bold leading-tight">{s.heading}</h2>
              {s.blocks.map((b, i) => <Block key={i} block={b} />)}
            </section>
          ))}

          {/* FAQ */}
          <section className="scroll-mt-24 pt-12">
            <h2 className="font-display text-[clamp(1.4rem,3.2vw,2rem)] font-bold leading-tight">Frequently asked questions</h2>
            <div className="mt-4 grid gap-3">
              {guide.faqs.map((f) => (
                <details key={f.q} className="group rounded-3xl border border-line bg-white px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.02rem] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-[0.97rem] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 overflow-hidden rounded-4xl bg-ink p-8 text-center text-white md:p-10">
            <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.3rem)] font-bold text-white">Do it yourself with the FadeClipper</h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-white/70">
              The auto-fade blade blends the fade for you — a sharp cut at home in minutes, for a one-time <Price usd={89.99} />.
            </p>
            <Button asChild size="lg" variant="invert" className="mt-6">
              <a href="/product">See the FadeClipper <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>

          {/* related guides */}
          {related.length > 0 && (
            <section className="pt-12">
              <h2 className="font-display text-[1.3rem] font-bold">Keep reading</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <a key={r.slug} href={`/guides/${r.slug}`} className="rounded-3xl border border-line bg-white p-5 transition-colors hover:border-brand/40">
                    <p className="font-display font-semibold text-ink">{r.h1}</p>
                    <p className="mt-1.5 text-[0.9rem] text-muted">{r.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

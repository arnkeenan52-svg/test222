import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { Check, X, ArrowRight } from "lucide-react";

const SITE_URL = "https://fadeclipper.com"; // ← change to your real .com domain

export const metadata: Metadata = {
  title: "How to Fade Your Own Hair at Home (2026 Guide) + Clipper Comparison | FadeClipper",
  description:
    "Step-by-step guide to fading your own hair at home — low, mid, high, taper and skin fades. Compare the FadeClipper auto-fade clipper vs a regular clipper vs the barber, with costs, FAQs and a fade glossary.",
  keywords: [
    "how to fade your own hair",
    "fade your own hair at home",
    "self fade clipper",
    "auto fade clipper",
    "best clipper to fade your own hair",
    "fade clipper",
    "how to fade the back of your own head",
    "low fade vs mid fade vs high fade",
    "skin fade at home",
    "self barber clipper",
    "fade machine",
    "taper vs fade",
    "FadeClipper",
  ],
  alternates: { canonical: `${SITE_URL}/how-to-fade-your-own-hair` },
  openGraph: {
    type: "article",
    title: "How to Fade Your Own Hair at Home (2026 Guide) + Clipper Comparison",
    description:
      "Everything you need to fade your own hair at home — step by step, fade types, costs vs the barber, and how the FadeClipper compares to regular clippers.",
    url: `${SITE_URL}/how-to-fade-your-own-hair`,
    siteName: "FadeClipper",
    images: [{ url: `${SITE_URL}/assets/img/product-hero-dark.jpg` }],
  },
  twitter: { card: "summary_large_image" },
};

const toc: [string, string][] = [
  ["What is a fade?", "#what-is-a-fade"],
  ["Types of fades", "#types-of-fades"],
  ["Can you fade your own hair?", "#can-you"],
  ["What you need", "#what-you-need"],
  ["How to fade your own hair (step by step)", "#steps"],
  ["FadeClipper vs a regular clipper", "#vs-clipper"],
  ["FadeClipper vs the barber (cost)", "#vs-barber"],
  ["Common mistakes", "#mistakes"],
  ["FAQ", "#faq"],
  ["Fade glossary", "#glossary"],
];

const steps: { title: string; text: string }[] = [
  { title: "Start with dry, brushed hair", text: "Fades blend best on clean, dry hair. Brush it down so every hair sits in its natural direction and you can see your current length." },
  { title: "Pick your top length first", text: "Run the FadeClipper over the top and crown at your longest setting. This sets the length everything else will blend down to." },
  { title: "Set your fade line", text: "Decide how high the fade goes: around the ear for a low fade, temple height for a mid fade, higher for a high fade. The auto-fade blade does the gradient — you just choose where it starts." },
  { title: "Glide up and flick out", text: "Start below the fade line and glide straight up, flicking the clipper away from your head as you reach the line. The tapered 45° blade automatically blends short-to-long so you don't have to 'guess' guard numbers." },
  { title: "Work around the whole head", text: "Repeat the glide-and-flick around the sides and back. For the back of your head, use your phone camera or a second mirror — most people get it on the second pass." },
  { title: "Blend the edges and check", text: "Go over any hard lines with light passes until the gradient looks smooth. Clean up the neckline and around the ears, then rinse the waterproof clipper under the tap." },
];

const faqs: { q: string; a: string }[] = [
  { q: "How do you fade your own hair at home?", a: "Brush your hair dry, cut the top to your chosen length, decide where the fade should start (low, mid or high), then glide an auto-fade clipper like the FadeClipper straight up and flick it away from your head along that line. The tapered blade blends the gradient for you, so you repeat the glide-and-flick around the sides and back until it looks smooth. Most beginners get a clean fade on their first or second try." },
  { q: "What is the best clipper to fade your own hair?", a: "The best clipper to fade your own hair is one with an auto-fade (tapered) blade, a cordless waterproof body and a long battery, because that combination removes the skill of manually blending guard numbers. The FadeClipper was built specifically for self-fading: a 45° auto-fade blade does the blending, it runs ~240 minutes cordless, and it rinses clean under the tap." },
  { q: "Can a beginner fade their own hair?", a: "Yes. A regular clipper makes fading hard because you have to manually blend several guard lengths. An auto-fade clipper does that blending mechanically, so a complete beginner can get a barber-style fade by simply choosing where the fade starts and gliding upward. No two-mirror gymnastics or years of practice required." },
  { q: "How do I fade the back of my own head?", a: "Use your phone's front camera or a handheld mirror angled into a wall mirror so you can see the back. Glide the auto-fade clipper straight up from the neckline and flick out at your fade line. Because the FadeClipper blends as it cuts, you don't have to perfectly match passes — overlapping strokes still blend cleanly." },
  { q: "What is the difference between a fade and a taper?", a: "A taper is a gradual shortening only around the edges (neckline and sideburns), while a fade blends the hair all the way down to very short or to the skin across the sides and back. Every fade is a type of taper, but not every taper is a full fade. The FadeClipper can do both — a subtle taper or a full skin fade — depending on where you set the fade line." },
  { q: "What guard numbers do I use for a fade?", a: "With a normal clipper you'd typically stack lengths like #1, #2, #3 and blend between them. With the FadeClipper you don't stack guards at all — the auto-fade blade creates the short-to-long gradient mechanically as you glide, so you only choose how high the fade goes and how long the top is." },
  { q: "How often do I need to re-fade my hair?", a: "Most people refresh a fade every 2–3 weeks. With a clipper at home it takes a few minutes and costs nothing, versus booking and paying for a barber each time." },
  { q: "Is the FadeClipper waterproof?", a: "Yes. The FadeClipper is fully waterproof, so you can fade in the shower and rinse the whole clipper clean under the tap in about ten seconds." },
  { q: "How long does the battery last?", a: "Up to 240 minutes of cordless runtime per charge — weeks of fades. A digital display shows the exact minutes remaining and it recharges over USB-C on the dock." },
  { q: "Can I get a skin fade at home?", a: "Yes. For a skin (bald) fade, set the fade line low and let the auto-fade blade taper down to the skin at the bottom. Go over the lowest section with light passes to take it all the way down." },
  { q: "Does it work on curly, thick or Afro/Black hair?", a: "Yes. Adjustable power lets you raise the RPM for thick, coarse or curly hair and lower it for fine detail, and the auto-fade blade blends the same way across hair types. Glide slowly through denser hair for the cleanest result." },
  { q: "How much does it cost to fade your own hair vs going to a barber?", a: "A barber fade is typically $30–$50 and most people go every 2–3 weeks, which is roughly $600–$850 a year. The FadeClipper is a one-time purchase (currently $59 on launch sale), so it usually pays for itself within the first two haircuts." },
  { q: "What is an auto-fade clipper?", a: "An auto-fade clipper has a specially tapered blade (on the FadeClipper, a 45° auto-fade blade) where static and moving blades work together to taper the cut as you glide. Instead of manually blending multiple guard lengths, the clipper creates the fade gradient itself — which is what makes self-fading possible for non-barbers." },
  { q: "How do I do a low, mid or high fade?", a: "It's all about where the fade starts. A low fade begins just above the ear, a mid fade around the temple, and a high fade higher up the side of the head. With the FadeClipper you simply start your upward glide at that height — the blade handles the blend below it." },
  { q: "Do I need two mirrors to fade my own hair?", a: "It helps for the back, but it isn't required. Many people use their phone's camera instead. Because the FadeClipper blends automatically, small imperfections in your passes still come out smooth, so you don't need a perfect view of the back of your head." },
  { q: "How do I clean the clipper?", a: "Rinse the waterproof body and blade under the tap, shake off the water and let it dry. Occasionally add a drop of clipper oil to the blade. The whole process takes about ten seconds." },
  { q: "What is the return policy?", a: "The FadeClipper is backed by a 90-day money-back guarantee and a 1-year warranty. If it isn't for you, send it back for a full refund." },
];

const glossary: [string, string][] = [
  ["Fade", "A haircut where the hair blends gradually from longer on top down to very short or skin on the sides and back."],
  ["Taper", "A gentler gradient at the edges only (neckline and sideburns), without taking the sides all the way down."],
  ["Auto-fade blade", "A tapered blade that blends the cut for you as you glide, instead of manually stacking guard lengths."],
  ["Skin / bald fade", "A fade that blends all the way down to bare skin at the bottom."],
  ["Low / mid / high fade", "Describes where the fade starts — near the ear (low), around the temple (mid), or higher on the head (high)."],
  ["Drop fade", "A fade that curves down behind the ear, 'dropping' lower at the back."],
  ["Burst fade", "A fade that fans out in a semicircle around the ear."],
  ["Guard", "A plastic comb attachment that sets cutting length on a normal clipper. The FadeClipper blends without stacking guards."],
  ["Blending", "Smoothing the transition between lengths so there are no hard lines."],
  ["Neckline", "The bottom edge of the haircut at the back of the neck."],
];

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "How to fade your own hair", item: `${SITE_URL}/how-to-fade-your-own-hair` },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to fade your own hair at home",
        description: "Fade your own hair at home with an auto-fade clipper in a few minutes.",
        totalTime: "PT15M",
        supply: [{ "@type": "HowToSupply", name: "FadeClipper auto-fade clipper" }, { "@type": "HowToSupply", name: "Mirror or phone camera" }],
        step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "Product",
        name: "FadeClipper",
        description: "Auto-fading cordless hair clipper with a 45° blade that blends the fade for you.",
        brand: { "@type": "Brand", name: "FadeClipper" },
        image: `${SITE_URL}/assets/img/product-hero-dark.jpg`,
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1200" },
        offers: { "@type": "Offer", price: "59", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${SITE_URL}/product` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav variant="light" />

      <main className="container-x py-[clamp(2rem,5vw,3.5rem)]">
        <article className="mx-auto max-w-[820px]">
          {/* breadcrumb */}
          <nav className="text-[0.8rem] text-muted">
            <a href="/" className="hover:text-ink">Home</a> <span className="px-1">/</span> How to fade your own hair
          </nav>

          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.1rem)] font-bold leading-[1.05]">
            How to Fade Your Own Hair at Home: The Complete Guide (2026)
          </h1>
          <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2">
            Fading your own hair used to mean a <strong>$30–$50 barber visit every two or three weeks</strong>. Not
            anymore. With an <strong>auto-fade clipper</strong> like the <a href="/product" className="text-brand underline">FadeClipper</a>,
            you can blend a sharp, barber-quality <strong>fade at home</strong> in minutes — no skill, no second mirror,
            no appointment. This guide covers what a fade is, the types of fades, exactly{" "}
            <strong>how to fade your own hair step by step</strong>, and how the FadeClipper compares to a regular
            clipper and to the barber.
          </p>

          {/* TOC */}
          <div className="mt-8 rounded-3xl border border-line bg-card p-6">
            <p className="font-display text-[1.05rem] font-semibold">On this page</p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {toc.map(([label, href], i) => (
                <li key={href}>
                  <a href={href} className="text-[0.95rem] text-ink-2 hover:text-brand">
                    {i + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <Section id="what-is-a-fade" title="What is a fade?">
            <p>
              A <strong>fade</strong> is a haircut where the hair blends gradually from longer on top down to very short
              — or all the way to the skin — on the sides and back. The magic of a good fade is the <em>blend</em>:
              there are no hard lines, just a smooth gradient. That blend is the hard part, and it&rsquo;s exactly what
              barbers train years to do by hand and what an auto-fade clipper does mechanically.
            </p>
            <p>
              A <strong>taper</strong> is a close cousin: a gentler gradient only around the edges (the neckline and
              sideburns). Every fade is a kind of taper, but a fade takes the sides much shorter. If you&rsquo;ve ever
              searched <em>&ldquo;taper vs fade&rdquo;</em>, that&rsquo;s the difference in one sentence.
            </p>
          </Section>

          <Section id="types-of-fades" title="Types of fades">
            <p>The names mostly describe <strong>where the fade starts</strong> and how it&rsquo;s shaped:</p>
            <ul>
              <li><strong>Low fade</strong> — starts just above the ear; subtle and office-friendly.</li>
              <li><strong>Mid fade</strong> — starts around the temple; the most popular all-rounder.</li>
              <li><strong>High fade</strong> — starts higher on the head; bold, high contrast.</li>
              <li><strong>Skin / bald fade</strong> — blends all the way down to bare skin at the bottom.</li>
              <li><strong>Drop fade</strong> — curves down behind the ear for a rounded shape.</li>
              <li><strong>Burst fade</strong> — fans out in a semicircle around the ear.</li>
              <li><strong>Taper fade</strong> — a softer version kept mostly to the edges.</li>
            </ul>
            <p>
              With the FadeClipper, you get any of these by choosing <strong>how high the fade starts</strong> — the
              tapered blade does the gradient below that line for you.
            </p>
          </Section>

          <Section id="can-you" title="Can you really fade your own hair?">
            <p>
              Yes — and the reason most people fail isn&rsquo;t skill, it&rsquo;s the <strong>tool</strong>. A normal
              clipper forces you to stack and blend several guard lengths (#1, #2, #3&hellip;) by hand, which is genuinely
              hard on the back of your own head. An <strong>auto-fade clipper</strong> removes that step: the blade
              tapers the cut as you glide, so a complete beginner can produce a smooth, barber-style fade by simply
              choosing where it starts. That single change is what makes <strong>self-fading</strong> realistic.
            </p>
          </Section>

          <Section id="what-you-need" title="What you need to fade your own hair">
            <ul>
              <li><strong>An auto-fade clipper</strong> (the FadeClipper) — does the blending for you.</li>
              <li><strong>A mirror, plus your phone camera</strong> for the back of your head.</li>
              <li><strong>Five to fifteen minutes.</strong> That&rsquo;s it — no capes, no clippings everywhere if you fade in the shower.</li>
            </ul>
          </Section>

          <Section id="steps" title="How to fade your own hair: step by step">
            <ol className="not-prose grid list-none gap-5 pl-0">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-[0.95rem] font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-display text-[1.1rem] font-semibold text-ink">{s.title}</p>
                    <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="vs-clipper" title="FadeClipper vs a regular clipper">
            <p>The core difference is who does the blending — you, or the blade:</p>
            <CompareTable
              cols={["", "FadeClipper", "Regular clipper"]}
              rows={[
                ["Blends the fade for you", true, false],
                ["Skill required", "Beginner-friendly", "Barber-level"],
                ["Stack multiple guards", "No", "Yes"],
                ["Works solo on the back of your head", true, "Hard"],
                ["Waterproof / shower-friendly", true, "Usually no"],
                ["Cordless runtime", "~240 min", "Varies"],
                ["Battery display", true, false],
              ]}
            />
          </Section>

          <Section id="vs-barber" title="FadeClipper vs the barber: the real cost">
            <p>
              A single barber fade is cheap. The <strong>habit</strong> is what&rsquo;s expensive. Here&rsquo;s a typical
              year if you keep a fresh fade every ~3 weeks:
            </p>
            <CompareTable
              cols={["", "Barber", "FadeClipper"]}
              rows={[
                ["Cost each time", "$30–$50", "$0"],
                ["Visits per year", "~17", "Unlimited"],
                ["First-year cost", "~$680", "$59 once"],
                ["Booking & travel", "Every time", "Never"],
                ["Touch-ups between cuts", "Pay again", "Free, anytime"],
              ]}
            />
            <p className="!mt-6">
              At a one-time <strong><Price usd={59} /></strong>, the FadeClipper typically pays for itself within{" "}
              <strong>two haircuts</strong> — everything after that is free.
            </p>
          </Section>

          <Section id="mistakes" title="Common self-fade mistakes (and how to avoid them)">
            <ul>
              <li><strong>Going too high, too soon.</strong> Start your fade line low — you can always take it higher, but you can&rsquo;t add hair back.</li>
              <li><strong>Cutting wet hair.</strong> Fade on dry hair so you can see your true length; rinse after.</li>
              <li><strong>Pressing too hard.</strong> Let the blade glide. Light, overlapping passes blend better than one heavy stroke.</li>
              <li><strong>Rushing the back.</strong> Use your phone camera and take a second pass — the auto-fade blade forgives overlaps.</li>
            </ul>
          </Section>

          <Section id="faq" title="Frequently asked questions">
            <div className="not-prose grid gap-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-3xl border border-line bg-white px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.02rem] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-[0.97rem] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Section>

          <Section id="glossary" title="Fade glossary">
            <dl className="not-prose grid gap-4">
              {glossary.map(([term, def]) => (
                <div key={term} className="rounded-3xl border border-line bg-card p-5">
                  <dt className="font-display font-semibold text-ink">{term}</dt>
                  <dd className="mt-1 text-[0.95rem] text-muted">{def}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* CTA */}
          <div className="mt-12 overflow-hidden rounded-4xl bg-ink p-8 text-center text-white md:p-10">
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-white">Ready to fade your own hair?</h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-white/70">
              The FadeClipper does the blending for you — get a sharp fade at home in minutes, for a one-time{" "}
              <Price usd={59} />.
            </p>
            <Button asChild size="lg" variant="invert" className="mt-6">
              <a href="/product">See the FadeClipper <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-12">
      <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-bold leading-tight">{title}</h2>
      <div className="prose-fc mt-4 text-ink-2">{children}</div>
    </section>
  );
}

function CompareTable({ cols, rows }: { cols: string[]; rows: (string | boolean)[][] }) {
  const cell = (v: string | boolean) =>
    v === true ? (
      <Check className="mx-auto h-5 w-5 text-[#1b8a4e]" strokeWidth={3} />
    ) : v === false ? (
      <X className="mx-auto h-5 w-5 text-muted" />
    ) : (
      <span>{v}</span>
    );
  return (
    <div className="not-prose mt-5 overflow-hidden rounded-3xl border border-line">
      <table className="w-full border-collapse text-[0.92rem]">
        <thead>
          <tr className="bg-card">
            {cols.map((c, i) => (
              <th key={i} className={`p-3 text-left font-display font-semibold ${i === 1 ? "text-brand" : "text-ink"}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-line">
              {r.map((v, ci) => (
                <td key={ci} className={`p-3 ${ci === 0 ? "font-medium text-ink" : "text-center text-ink-2"}`}>{cell(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { PressBar } from "@/components/PressBar";
import { HowItWorks } from "@/components/HowItWorks";
import { WatchDemo } from "@/components/WatchDemo";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RedditReviews } from "@/components/RedditReviews";
import { Reviews } from "@/components/Reviews";
import { Price } from "@/components/Price";
import { SiteFooter } from "@/components/SiteFooter";
import { useContent } from "@/components/useContent";
import { useLang } from "@/components/CurrencyProvider";
import { Check, Plus, Star, ArrowRight, Lock, CircleDollarSign } from "lucide-react";

export default function Page() {
  const t = useContent();
  const lang = useLang();
  return (
    <>
      {/* TOP — nav + hero live in ONE black box behind a SINGLE glow, so there is
          no seam between the logo/menu bar and the hero. */}
      <div id="top" className="relative overflow-hidden bg-black text-white">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(90%_60%_at_50%_15%,rgba(236,99,36,0.32),transparent_70%)]" />
        {/* subtle orange↔black blend at the bottom of the hero, mirroring the top */}
        <div className="hero-glow-2 pointer-events-none absolute inset-x-0 bottom-0 h-[440px] bg-[radial-gradient(85%_62%_at_50%_100%,rgba(236,99,36,0.20),transparent_72%)]" />
        <div className="relative">
          <SiteNav variant="hero" />
          <header>
            <div className="container-x flex flex-col items-center pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2.5rem,5.5vw,4rem)] text-center">
              <div className="mb-3.5 flex items-center gap-2">
                <span className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-[18px] w-[18px] fill-current" />)}
                </span>
                <span className="text-sm font-medium text-white/70"><b className="text-white">{lang === "da" ? "1.200+" : "1,200+"}</b> {t.hero.reviews}</span>
              </div>
              <h1 className="font-display text-[clamp(2.6rem,6.4vw,4.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                {t.hero.h1a}<br />
                <span className="text-brand">{t.hero.h1b}</span>
              </h1>
              <p className="mt-6 max-w-[42ch] text-[1.12rem] text-white/65">
                {t.hero.subA}
                <span className="underline decoration-white/30 underline-offset-2">{t.hero.subEmph}</span>.
              </p>
              <div className="mt-6 flex w-full max-w-[280px] flex-col gap-2.5">
                <Button asChild size="sm" className="h-11 text-[0.95rem]"><a href="/product">{t.hero.orderNow}<Price usd={89.99} /></a></Button>
                <WatchDemo size="sm" className="h-11 text-[0.95rem] border border-white/10 bg-[#524d48]/80 text-white/85 backdrop-blur-md hover:bg-[#585350]/80 hover:text-white" />
              </div>
              <Reveal className="mt-10 w-full max-w-[860px]">
                <figure className="overflow-hidden rounded-5xl border border-white/10 shadow-soft">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/img/product-hero-dark.jpg"
                    aria-label={t.hero.videoAlt}
                    className="aspect-[4/3] w-full object-cover"
                  >
                    <source src="/assets/video/hero-zoom.mp4" type="video/mp4" />
                  </video>
                </figure>
              </Reveal>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.85rem] font-medium text-white/55">
                <span className="flex items-center gap-1.5"><Lock className="h-4 w-4" strokeWidth={2} /> {t.hero.securePayment}</span>
                <span className="flex items-center gap-1.5"><CircleDollarSign className="h-4 w-4" strokeWidth={2} /> {t.hero.guarantee}</span>
              </div>
            </div>
          </header>
        </div>
      </div>

      <main>
        {/* AS SEEN IN */}
        <PressBar />

        {/* HOW DOES IT WORK */}
        <Section id="how">
          <Head center eyebrow={t.how.eyebrow} title={t.how.title} sub={t.how.sub} />
          <Reveal><HowItWorks openAll /></Reveal>
        </Section>

        {/* WHY BETTER */}
        <Section alt id="compare">
          <Head center eyebrow={t.compare.eyebrow} title={t.compare.title} sub={t.compare.sub} />
          <Reveal><div className="rounded-4xl bg-white p-4 shadow-card md:p-7"><ComparisonTable /></div></Reveal>
        </Section>

        {/* TRUSTED BY PEOPLE — real Reddit posts */}
        <RedditReviews />

        {/* OFFER */}
        <Section alt id="buy">
          <div className="mx-auto max-w-[760px]">
            <div className="overflow-hidden rounded-5xl bg-white shadow-soft">
              <div className="bg-brand px-6 py-3 text-center text-sm font-semibold text-white">{t.offer.bar}</div>
              <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
                <div>
                  <h2 className="font-display text-[2rem] font-bold leading-tight">{t.offer.h2}</h2>
                  <ul className="mt-5 grid gap-2.5">
                    {t.offer.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-[0.98rem] text-ink-2">
                        <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={3} />{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center rounded-4xl bg-card p-7 text-center">
                  <div className="flex items-baseline justify-center gap-2.5">
                    <Price usd={89.99} className="font-display text-[3rem] font-bold leading-none text-brand" />
                    <Price usd={149} className="text-[1.3rem] text-muted line-through" />
                  </div>
                  <p className="mt-2 text-[0.84rem] text-muted">{t.offer.oneTime}</p>
                  <Button asChild size="lg" className="mt-5 w-full"><a href="/product">{t.offer.cta} <ArrowRight className="h-4 w-4" /></a></Button>
                  <p className="mt-3 text-[0.74rem] text-muted">{t.offer.secure}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section alt id="faq">
          <Head center eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="mx-auto grid max-w-[720px] gap-3">
            {t.faq.items.map(([q, a]) => (
              <details key={q} className="group rounded-4xl bg-white px-6 shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.04rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="max-w-[60ch] pb-5 text-[0.97rem] text-muted">{a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* CUSTOMER REVIEWS — full widget near the bottom */}
        <Reviews id="customer-reviews" />

        {/* FINAL CTA */}
        <section className="px-3 pb-10">
          <Reveal className="container-x overflow-hidden rounded-5xl bg-ink px-6 py-[clamp(3.5rem,7vw,6rem)] text-center text-white">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold text-white">{t.finalCta.title}</h2>
            <p className="mx-auto mb-7 mt-4 max-w-[42ch] text-[1.06rem] text-white/70">{t.finalCta.sub}</p>
            <Button asChild size="lg" variant="invert"><a href="/product">{t.finalCta.cta}<Price usd={89.99} /></a></Button>
            <p className="mt-5 text-[0.8rem] text-white/50">{t.finalCta.note}</p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Section({ id, alt, children }: { id?: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={alt ? "bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]" : "py-[clamp(3.5rem,7vw,6rem)]"}>
      <div className="container-x">{children}</div>
    </section>
  );
}

function Head({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-[640px] ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">{title}</h2>
      {sub && <p className={`mt-4 text-[1.06rem] text-muted ${center ? "mx-auto" : ""} max-w-[52ch]`}>{sub}</p>}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { Marquee } from "@/components/Marquee";
import { PressBar } from "@/components/PressBar";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Logo } from "@/components/Logo";
import {
  Scissors,
  Ruler,
  BatteryCharging,
  Gauge,
  Droplets,
  Lock,
  Check,
  Plus,
  ArrowRight,
} from "lucide-react";

const features = [
  { icon: Scissors, title: "Auto-fade blade", text: "Static + moving blades taper the cut so the fade blends itself." },
  { icon: Ruler, title: "Four fade lengths", text: "Switch 0.4, 0.8 and 1.2mm with one lever." },
  { icon: BatteryCharging, title: "240-minute runtime", text: "Weeks of fades per charge, with a live battery display." },
  { icon: Gauge, title: "Adjustable power", text: "Dial RPM up for thick hair, down for detail." },
  { icon: Droplets, title: "Fully waterproof", text: "Fade in the shower; rinse it clean under the tap." },
  { icon: Lock, title: "Safety lock", text: "Lock your settings so nothing shifts mid-fade." },
];

const steps = [
  { n: "1", title: "Charge & power on", text: "Dock it to full, tap power, set your speed." },
  { n: "2", title: "Pick your length", text: "Slide to 0.4, 0.8 or 1.2mm. Start low and tight." },
  { n: "3", title: "Glide up & flick out", text: "Hold flat, glide up, flick your wrist out at the top." },
  { n: "4", title: "Blend & finish", text: "Step up a length, repeat higher to melt the lines." },
];

const faqs = [
  ["Can I really fade the back of my own head?", "Yes — that's exactly what FadeClipper is built for. The tapered auto-fade blade blends the gradient as you glide up, so you don't need barber-level skill or two mirrors. Most people get a clean back fade on the first or second try."],
  ["Is it hard to use if I've never faded before?", "No. Pick a length, glide up, flick out — the blade does the blending. Follow the four steps above and you'll have a sharp fade in minutes."],
  ["How long does the battery last?", "Up to 240 minutes of cordless runtime per charge — weeks of fades. The display shows exactly how many minutes remain, and it charges over USB-C on the dock."],
  ["Is it actually waterproof?", "Yes. You can fade in the shower and rinse the whole clipper under the tap. Cleanup takes about ten seconds."],
  ["What if I don't like it?", "You're covered by a 90-day money-back guarantee. If it isn't for you, send it back for a full refund."],
  ["How fast is shipping?", "We ship worldwide for free. Add your real dispatch and delivery window here."],
];

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center gap-3 bg-ink px-5 py-[0.55rem] text-center text-[0.8rem] font-medium text-paper/85">
        <span>Free worldwide shipping</span>
        <span className="opacity-40">·</span>
        <span>90-day money-back guarantee</span>
      </div>

      <SiteNav />

      <main id="top">
        {/* HERO */}
        <header className="py-[clamp(2.5rem,5vw,4.5rem)]">
          <div className="mx-auto grid max-w-container items-center gap-[clamp(2rem,5vw,4rem)] px-7 md:grid-cols-2">
            <div>
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <span className="h-px w-5 bg-brand" />Engineered for the fade
              </p>
              <h1 className="font-display text-[clamp(2.7rem,5.6vw,4.3rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                The world&rsquo;s first auto-fading clipper.
              </h1>
              <p className="mt-6 max-w-[42ch] text-[1.16rem] text-muted">
                A precision 45&deg; blade angle does the blending for you &mdash; so a barber-sharp fade takes
                a single swipe, no skill required.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button asChild size="lg">
                  <a href="#buy">Get FadeClipper</a>
                </Button>
                <Button asChild variant="link" size="lg">
                  <a href="#how">See how it works</a>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-6 text-[0.84rem] text-muted">
                {["Cordless & waterproof", "240-min runtime", "90-day guarantee"].map((t) => (
                  <li key={t} className="relative pl-[1.1rem] before:absolute before:left-0 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-brand before:content-['']">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal>
              <figure className="overflow-hidden rounded-[6px]">
                <img src="/assets/img/product-hero.jpg" alt="FadeClipper auto-fading cordless hair clipper" className="aspect-[4/5] w-full object-cover" />
              </figure>
            </Reveal>
          </div>
        </header>

        {/* BENEFITS MARQUEE */}
        <Marquee />

        {/* AS FEATURED IN */}
        <PressBar />

        {/* SPECS */}
        <section className="py-[clamp(2.5rem,5vw,4rem)]">
          <div className="mx-auto grid max-w-container grid-cols-2 px-7 md:grid-cols-5">
            {[
              ["240", "min", "cordless runtime"],
              ["70", "", "adjustable RPM"],
              ["4", "", "fade lengths"],
              ["0.4", "mm", "closest blend"],
              ["IPX", "", "fully waterproof"],
            ].map(([b, s, label], i) => (
              <div key={label} className={`px-2 py-3 text-center ${i < 4 ? "md:border-r md:border-line" : ""} ${i % 2 === 0 ? "border-r border-line md:border-r" : ""}`}>
                <b className="block font-display text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold leading-none">
                  {b}<small className="text-[0.45em] font-medium text-muted">{s}</small>
                </b>
                <span className="mt-2 block text-[0.74rem] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <Section id="why">
          <Head eyebrow="Why FadeClipper" title="The hard part of every fade — automated." />
          <div className="grid gap-9 md:grid-cols-3">
            {[
              ["The problem", "Blending lengths by hand is hard. Get it wrong and you're back in the chair."],
              ["The mechanism", "A tapered auto-fade blade blends the gradient for you as you glide up."],
              ["The outcome", "A sharp, seamless fade at home — in minutes, on your own head."],
            ].map(([k, t], i) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className="border-t-[1.5px] border-ink pt-5">
                  <span className="text-[0.74rem] font-semibold uppercase tracking-wide text-brand">{k}</span>
                  <p className="mt-3 text-muted">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* HOW */}
        <Section id="how" alt>
          <Head eyebrow="Step by step" title="Your first fade in four moves." sub="If you can comb your hair, you can run a FadeClipper." />
          <div className="grid items-start gap-[clamp(2rem,5vw,4rem)] md:grid-cols-2">
            <ol className="grid">
              {steps.map((s, i) => (
                <li key={s.n} className={`flex gap-5 py-5 ${i < steps.length - 1 ? "border-b border-line" : ""} ${i === 0 ? "pt-0" : ""}`}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-ink font-display text-base font-semibold">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-[1.1rem] font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[0.96rem] text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Reveal>
              <figure className="overflow-hidden rounded-[6px] border border-line bg-black">
                <video controls muted loop playsInline preload="none" poster="/assets/img/demo-poster.jpg" className="w-full">
                  <source src="/assets/video/demo.mp4" type="video/mp4" />
                </video>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* FEATURES */}
        <Section id="features">
          <Head eyebrow="Built for the fade" title="Everything that makes the blend effortless." />
          <div className="grid gap-x-10 gap-y-9 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.07}>
                <div className="border-t-[1.5px] border-ink pt-5">
                  <f.icon className="mb-4 h-7 w-7 stroke-[1.5] text-ink" />
                  <h3 className="text-[1.14rem] font-semibold">{f.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* BLADE DETAIL */}
        <Section id="blade" alt>
          <div className="grid items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-2">
            <Reveal>
              <figure className="overflow-hidden rounded-[6px] border border-line">
                <img src="/assets/img/blade.jpg" alt="FadeClipper auto-fade blade mounted at a 45-degree angle" className="aspect-[4/5] w-full object-cover" />
              </figure>
            </Reveal>
            <div>
              <p className="eyebrow mb-4">The blade</p>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight">
                Engineered to blend — at a 45° angle.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.06rem] text-muted">
                The cutting head sits at a 45-degree angle, so the tapered fade blade meets your hair the way
                a barber's wrist would — blending the gradient as you glide, not chopping a flat line.
              </p>
              <ul className="mt-6 grid gap-3">
                {[
                  "Triangle static blade + uniquely shaped moving blade",
                  "Tapers the cut into an automatic gradient",
                  "Brushed steel — rinse it clean under the tap",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[1rem] text-ink-2">
                    <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={3} />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* EDITORIAL BAND */}
        <section aria-hidden="true" className="overflow-hidden">
          <img
            src="/assets/img/product-linen.jpg"
            alt=""
            className="h-[clamp(320px,46vh,560px)] w-full object-cover"
          />
        </section>

        {/* SAVINGS */}
        <Section id="savings" alt>
          <div className="grid items-center gap-[clamp(2.5rem,6vw,5rem)] md:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">The math</p>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight">
                Your barber charges you every two weeks. Forever.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.06rem] text-muted">
                A one-time buy that pays for itself in about two haircuts.
              </p>
              <Button asChild size="lg" className="mt-7">
                <a href="#buy">Start saving</a>
              </Button>
            </div>
            <Reveal>
              <div className="rounded-[6px] border border-line bg-surface p-8">
                {[
                  ["Barber fade", "~$35, every 2 weeks", "$910/yr", true],
                  ["…and every year after", "it never stops", "$910/yr", true],
                ].map(([a, b, c]) => (
                  <div key={a as string} className="flex items-center justify-between gap-4 border-b border-line-2 py-4">
                    <span className="flex flex-col">
                      <b className="font-semibold">{a}</b>
                      <small className="text-[0.8rem] text-muted">{b}</small>
                    </span>
                    <span className="whitespace-nowrap font-display text-[1.4rem] font-semibold text-muted line-through">{c}</span>
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-between gap-4 rounded-[4px] border border-ink bg-brand-soft px-5 py-4">
                  <span className="flex flex-col">
                    <b className="font-semibold">FadeClipper</b>
                    <small className="text-[0.8rem] text-muted">one-time · fade whenever</small>
                  </span>
                  <span className="whitespace-nowrap font-display text-[1.4rem] font-semibold text-brand">$59</span>
                </div>
                <p className="mt-5 text-center text-[0.88rem] text-muted">
                  First-year saving: <b className="text-brand">$850+</b>, then it only grows.
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* COMPARISON */}
        <Section id="compare">
          <Head
            eyebrow="How we compare"
            title="FadeClipper vs. the rest."
            sub="The auto-fade blade does what ordinary clippers can't — and what the barber charges you for, on repeat."
          />
          <Reveal>
            <ComparisonTable />
          </Reveal>
        </Section>

        {/* IN ACTION */}
        <Section id="action">
          <Head eyebrow="See it in action" title="Real fades. Real footage." />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { v: "/assets/video/loop-fade.mp4", cap: "Fading the back — no second mirror" },
              { img: "/assets/img/fade-closeup.jpg", cap: "The blend the auto-fade blade leaves" },
              { v: "/assets/video/loop-side.mp4", cap: "Cleaning the sides in seconds" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <figure className="relative overflow-hidden rounded-[6px] border border-line bg-black">
                  {t.v ? (
                    <video autoPlay muted loop playsInline preload="none" poster="/assets/img/demo-poster.jpg" className="aspect-[4/5] w-full object-cover">
                      <source src={t.v} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={t.img} alt={t.cap} className="aspect-[4/5] w-full object-cover" />
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-[0.78rem] text-white">
                    {t.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* IN THE BOX */}
        <Section id="box" alt>
          <div className="grid items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-2">
            <Reveal>
              <figure className="overflow-hidden rounded-[6px] border border-line">
                <img src="/assets/img/product-dock.jpg" alt="FadeClipper clipper on its charging dock" className="aspect-[4/5] w-full object-cover" />
              </figure>
            </Reveal>
            <div>
              <p className="eyebrow mb-4">In the box</p>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight">
                Everything to start fading today.
              </h2>
              <ul className="mt-6">
                {["FadeClipper auto-fading clipper", "3× precision fade blades", "Guide comb attachment", "Charging dock", "USB-C charging cable", "Illustrated user guide"].map((t) => (
                  <li key={t} className="flex items-center gap-3 border-b border-line py-[0.95rem] text-[1.04rem]">
                    <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-brand" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* OFFER */}
        <Section id="buy">
          <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] md:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">The offer</p>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-tight">
                Skip six barber visits. Keep the clipper.
              </h2>
              <ul className="mt-6 grid gap-3">
                {["FadeClipper + full accessory kit", "Free worldwide shipping", "90-day money-back guarantee", "1-year warranty"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[1rem] text-ink-2">
                    <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={3} />{t}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal>
              <div className="border-[1.5px] border-ink bg-surface p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[3rem] font-semibold leading-none">$59</span>
                  <span className="text-[1.3rem] text-muted line-through">$99</span>
                </div>
                <p className="mb-6 mt-3 text-[0.86rem] text-muted">One-time payment · pays for itself in ~2 haircuts</p>
                <Button asChild size="lg" className="w-full">
                  <a href="#">Get FadeClipper <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <p className="mt-4 text-center text-[0.76rem] text-muted">Secure checkout · Visa · Mastercard · PayPal</p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* GUARANTEE */}
        <section className="border-y border-line py-[clamp(3rem,6vw,4.5rem)]">
          <Reveal className="mx-auto flex max-w-[840px] flex-col items-center gap-7 px-7 text-center md:flex-row md:text-left">
            <div className="grid h-[100px] w-[100px] shrink-0 place-items-center rounded-full bg-brand text-center font-display leading-none text-white">
              <span>
                <b className="text-[1.9rem] font-semibold">90</b>
                <span className="mt-1 block text-[0.54rem] font-semibold uppercase tracking-wider">day guarantee</span>
              </span>
            </div>
            <div>
              <h3 className="font-display text-[1.4rem] font-semibold">Fade with zero risk.</h3>
              <p className="mt-2 max-w-[54ch] text-muted">
                Try FadeClipper for 90 days. If your fades aren't sharper, easier and cheaper than the barber,
                send it back for a full refund.
              </p>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <Section id="faq">
          <div className="mx-auto max-w-[760px]">
            <Head eyebrow="Questions" title="Everything you're wondering." />
            <div className="border-t border-line">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.05rem] font-medium [&::-webkit-details-marker]:hidden">
                    {q}
                    <Plus className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-[64ch] pb-5 text-[0.98rem] text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* FINAL CTA */}
        <section className="bg-ink py-[clamp(4.5rem,9vw,7rem)] text-center text-paper">
          <Reveal className="mx-auto max-w-[640px] px-7">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold text-paper">
              Your next fade is on you.
            </h2>
            <p className="mx-auto mb-8 mt-4 max-w-[42ch] text-[1.06rem] text-paper/70">
              The auto-fading clipper that turns a barber-only skill into a one-swipe move.
            </p>
            <Button asChild size="lg" variant="invert">
              <a href="#buy">Get FadeClipper</a>
            </Button>
            <p className="mt-6 text-[0.8rem] text-paper/50">90-day money-back guarantee · Free worldwide shipping</p>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line py-14">
        <div className="mx-auto grid max-w-container gap-8 px-7 md:grid-cols-[1.7fr_1fr_1fr]">
          <div>
            <span className="text-ink"><Logo /></span>
            <p className="mt-4 max-w-[30ch] text-[0.9rem] text-muted">The auto-fading clipper. One swipe, fade done.</p>
          </div>
          <nav className="flex flex-col gap-3 text-[0.9rem] text-muted">
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#features" className="hover:text-ink">Features</a>
            <a href="#savings" className="hover:text-ink">Savings</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </nav>
          <nav className="flex flex-col gap-3 text-[0.9rem] text-muted">
            <a href="#" className="hover:text-ink">Shipping &amp; returns</a>
            <a href="#" className="hover:text-ink">Contact</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Privacy</a>
          </nav>
        </div>
        <div className="mx-auto mt-10 flex max-w-container flex-wrap justify-between gap-4 border-t border-line px-7 pt-6 text-[0.8rem] text-muted">
          <span>© {new Date().getFullYear()} FadeClipper. All rights reserved.</span>
          <span>hello@fadeclipper.com</span>
        </div>
      </footer>
    </>
  );
}

function Section({ id, alt, children }: { id?: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-[clamp(4rem,8vw,7rem)] ${alt ? "border-y border-line bg-paper-alt" : ""}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 max-w-[680px]">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-[clamp(1.85rem,3.6vw,2.7rem)] font-semibold leading-[1.08]">{title}</h2>
      {sub && <p className="mt-4 max-w-[52ch] text-[1.06rem] text-muted">{sub}</p>}
    </div>
  );
}

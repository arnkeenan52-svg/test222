import { Star, CheckCircle2, ThumbsUp, ShieldCheck, ChevronDown, SquarePen } from "lucide-react";

// ⚠️ PLACEHOLDER REVIEWS — original sample copy written for design preview only.
// Replace every entry below with your own REAL, verified customer reviews before
// going live. Publishing invented reviews (or another product's reviews) as
// genuine is illegal (FTC) and against ad-platform policy.
const SUMMARY = { rating: 4.7, count: 1247, dist: [82, 11, 4, 2, 1] as const }; // % for 5→1 stars

type Review = { name: string; stars: number; date: string; title: string; body: string; helpful: number };
const REVIEWS: Review[] = [
  { name: "Marcus J.", stars: 5, date: "3 weeks ago", title: "First self-fade came out clean", body: "I was nervous doing my own fade but the blade genuinely blends it — I just glide up and flick out. Second attempt looked like a shop fade. It's already saved me two barber visits.", helpful: 214 },
  { name: "Reginald M.", stars: 5, date: "1 month ago", title: "Stopped booking the barber", body: "Pays for itself in about two cuts. I do my own fade every couple weeks now and it looks sharp every time. Wish I'd bought this years ago.", helpful: 301 },
  { name: "Dwayne P.", stars: 5, date: "1 month ago", title: "Battery lasts forever", body: "Charged it once and I've cut my whole family's hair. The little display showing minutes left is a nice touch so you're never caught mid-cut.", helpful: 156 },
  { name: "Jordan B.", stars: 5, date: "3 weeks ago", title: "The auto-fade is the whole difference", body: "Had cheap clippers before where you have to blend the gradient yourself — impossible on the back of your own head. This one does the blending. Night and day.", helpful: 129 },
  { name: "Aisha R.", stars: 4, date: "2 weeks ago", title: "Great for my son's hair", body: "Cut my son's curls with it and the length settings made it easy. Took one practice run to nail the back, but now it's quick. Docking one star only because I'd love a travel case.", helpful: 88 },
  { name: "Carlos V.", stars: 5, date: "4 days ago", title: "Thick curly hair, no problem", body: "Turned the power up for my hair type and it powered straight through — no pulling or snagging. Fade blended smooth.", helpful: 33 },
  { name: "Ethan W.", stars: 5, date: "6 days ago", title: "First time doing my own hair", body: "Used my phone camera for the back like the guide suggests. Honestly came out way better than I expected for a first try. The four guards are clearly marked.", helpful: 58 },
  { name: "Sam O.", stars: 3, date: "3 weeks ago", title: "Good tool, small learning curve", body: "Blade is sharp and blends well, but my first fade was a little uneven — my technique, not the clipper. By the third cut it clicked. Would tell new users to go slow at first.", helpful: 61 },
  { name: "Priya N.", stars: 5, date: "2 months ago", title: "Bought it for my husband", body: "He does his own fades now and they look professional. It's also much quieter than our old clippers, which he loves.", helpful: 47 },
  { name: "Tyler K.", stars: 5, date: "5 days ago", title: "Waterproof is legit", body: "Fade in the shower, rinse the whole thing under the tap, done. Cleanup used to be the worst part of cutting my own hair — now it's ten seconds.", helpful: 42 },
  { name: "Nadia S.", stars: 4, date: "1 week ago", title: "Sharp and well built", body: "Feels premium in the hand and holds a charge for ages. Blade quality is excellent. Only wish it shipped with a case.", helpful: 25 },
  { name: "Malik T.", stars: 5, date: "2 weeks ago", title: "Fast shipping, sharp fade", body: "Arrived in four days, well packaged. The fade-length settings are clearly labelled so there's no guessing. Really happy with it.", helpful: 19 },
];

const GOLD = "#f5a623";

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={className} style={{ color: GOLD, fill: i < n ? GOLD : "transparent" }} />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-x">
        {/* Google-style reviews widget */}
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-4xl border border-line bg-white shadow-card">
          {/* header strip */}
          <div className="flex items-center gap-3 border-b border-line px-6 py-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#1a73e8] text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold leading-tight text-ink">Reviews by our customers</p>
              <p className="text-[0.8rem] text-muted">Updated daily</p>
            </div>
          </div>

          {/* summary */}
          <div className="px-6 py-6">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-[3.6rem] font-bold leading-none text-ink">{SUMMARY.rating}</span>
              <span className="text-[1.3rem] text-muted">/ 5</span>
            </div>
            <div className="mt-3"><Stars n={5} className="h-6 w-6" /></div>
            <p className="mt-3 text-[0.95rem] text-muted">
              Based on <span className="font-semibold text-[#1a73e8]">{SUMMARY.count.toLocaleString()} reviews</span>
            </p>

            <div className="mt-5 grid gap-2">
              {SUMMARY.dist.map((pct, i) => (
                <div key={i} className="flex items-center gap-3 text-[0.9rem]">
                  <span className="w-3 shrink-0 text-muted">{5 - i}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-card">
                    <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} />
                  </span>
                  <span className="w-10 shrink-0 text-right text-muted">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.85rem] font-medium text-ink">
              Most relevant <ChevronDown className="h-4 w-4 text-muted" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.85rem] font-medium text-ink">
              All ratings <ChevronDown className="h-4 w-4 text-muted" />
            </span>
            <a
              href="mailto:fadeclipper@gmail.com?subject=My%20FadeClipper%20review"
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-[#1666cc]"
            >
              <SquarePen className="h-4 w-4" /> Write a review
            </a>
          </div>
        </div>

        {/* review cards */}
        <div className="mx-auto mt-6 grid max-w-[980px] gap-4 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <article key={r.name + r.title} className="flex flex-col rounded-4xl bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint font-display text-[1.1rem] font-bold text-brand">
                  {r.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold leading-tight text-ink">{r.name}</p>
                  <p className="flex items-center gap-1 text-[0.76rem] font-medium text-[#1b8a4e]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified buyer
                  </p>
                </div>
                <span className="ml-auto shrink-0 text-[0.76rem] text-muted">{r.date}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Stars n={r.stars} />
                <span className="font-display text-[1rem] font-semibold leading-tight text-ink">{r.title}</span>
              </div>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{r.body}</p>
              <p className="mt-4 flex items-center gap-1.5 text-[0.78rem] text-muted">
                <ThumbsUp className="h-3.5 w-3.5" /> {r.helpful} people found this helpful
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[52ch] text-center text-[0.8rem] text-muted">
          Reviews reflect individual experiences. Results vary with hair type and technique.
        </p>
      </div>
    </section>
  );
}

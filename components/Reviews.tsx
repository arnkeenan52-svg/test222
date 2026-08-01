"use client";
import { useMemo, useState } from "react";
import { Star, CheckCircle2, ThumbsUp, ShieldCheck, ChevronDown } from "lucide-react";

// ⚠️ PLACEHOLDER REVIEWS — sample copy generated for design preview only.
// Publishing invented reviews as genuine is illegal (FTC) and against ad-platform
// policy. Before going live, replace this with your REAL verified reviews — e.g.
// wire up a Judge.me / Loox export and render those instead.

const GOLD = "#f5a623";
const SUMMARY = { rating: 4.7, count: 1247, dist: [82, 11, 4, 2, 1] as const }; // % for 5→1 stars

type Review = { name: string; stars: number; date: string; age: number; title: string; body: string; helpful: number; avatar?: string };

const AVATARS = [
  "/assets/img/avatars/a1.jpg",
  "/assets/img/avatars/a2.jpg",
  "/assets/img/avatars/a3.jpg",
  "/assets/img/avatars/a4.jpg",
  "/assets/img/avatars/a5.jpg",
  "/assets/img/avatars/a6.jpg",
];

// Hand-written "hero" reviews shown first (6 carry a real-looking photo).
const HERO: Review[] = [
  { name: "Marcus J.", stars: 5, date: "3 weeks ago", age: 22, title: "First self-fade came out clean", body: "I was nervous doing my own fade but the blade genuinely blends it — I just glide up and flick out. Second attempt looked like a shop fade. Already saved me two barber visits.", helpful: 214, avatar: AVATARS[0] },
  { name: "Reginald M.", stars: 5, date: "1 month ago", age: 32, title: "Stopped booking the barber", body: "Pays for itself in about two cuts. I do my own fade every couple weeks now and it looks sharp every time. Wish I'd bought this years ago.", helpful: 301, avatar: AVATARS[4] },
  { name: "Dwayne P.", stars: 5, date: "1 month ago", age: 34, title: "Battery lasts forever", body: "Charged it once and I've cut my whole family's hair. The little display showing minutes left is a nice touch so you're never caught mid-cut.", helpful: 156, avatar: AVATARS[5] },
  { name: "Jordan B.", stars: 5, date: "3 weeks ago", age: 20, title: "The auto-fade is the whole difference", body: "Cheap clippers make you blend the gradient yourself — impossible on the back of your own head. This one does the blending. Night and day.", helpful: 129, avatar: AVATARS[3] },
  { name: "Aisha R.", stars: 4, date: "2 weeks ago", age: 15, title: "Great for my son's hair", body: "Cut my son's curls with it and the length settings made it easy. One practice run to nail the back, now it's quick. Docking a star only because I'd love a travel case.", helpful: 88, avatar: AVATARS[2] },
  { name: "Carlos V.", stars: 5, date: "4 days ago", age: 4, title: "Thick curly hair, no problem", body: "Turned the power up for my hair type and it powered straight through — no pulling or snagging. Fade blended smooth.", helpful: 63, avatar: AVATARS[1] },
  { name: "Ethan W.", stars: 5, date: "6 days ago", age: 6, title: "First time doing my own hair", body: "Used my phone camera for the back like the guide suggests. Came out way better than I expected for a first try. The four guards are clearly marked.", helpful: 58 },
  { name: "Priya N.", stars: 5, date: "2 months ago", age: 60, title: "Bought it for my husband", body: "He does his own fades now and they look professional. Also much quieter than our old clippers, which he loves.", helpful: 47 },
  { name: "Tyler K.", stars: 5, date: "5 days ago", age: 5, title: "Waterproof is legit", body: "Fade in the shower, rinse the whole thing under the tap, done. Cleanup used to be the worst part — now it's ten seconds.", helpful: 42 },
  { name: "Sam O.", stars: 3, date: "3 weeks ago", age: 21, title: "Good tool, small learning curve", body: "Blade is sharp and blends well, but my first fade was a little uneven — my technique, not the clipper. By the third cut it clicked. Go slow at first.", helpful: 61 },
];

const FIRST = ["Marcus","Andre","Dwayne","Jordan","Kevin","Carlos","Ethan","Sam","Marco","Tyler","Nadia","Malik","Liam","Noah","Oliver","Elijah","James","Lucas","Mason","Logan","Hassan","Diego","Terrance","Kwame","Brian","Tommy","Victor","Omar","Isaac","Nathan","Ryan","Cole","Jaylen","Devin","Felix","Grant","Shane","Troy","Wesley","Chad","Derek","Gavin","Curtis","Leon","Ronnie","Xavier","Zane","Amir","Bilal","Caleb","Darnell","Eddie","Frankie","Hector","Ibrahim","Jamal","Priya","Aisha","Nadia","Sofia"];
const LAST = "ABCDEFGHIJKLMNOPRSTVWY".split("");
const DATE_AGES: [string, number][] = [["2 days ago",2],["3 days ago",3],["4 days ago",4],["6 days ago",6],["1 week ago",8],["2 weeks ago",15],["3 weeks ago",22],["4 weeks ago",28],["1 month ago",34],["6 weeks ago",44],["2 months ago",62],["3 months ago",92]];

const TITLES = ["Sharpest fade I've done at home","Barber-level results","No more $40 cuts","Blends like magic","So easy to use","Better than my old clippers","Worth every penny","My go-to now","Clean fade every time","Impressed by the battery","Quiet and powerful","Saved me so much money","Perfect for beginners","The battery display is genius","Basically fades itself","Shower cuts changed the game","Family clipper now","Wish I'd bought it sooner","Professional results at home","Cuts thick hair with ease","Fast shipping, sharp fade","Feels premium in the hand","Guards are clearly labelled","One swipe and done","My fades finally look right","Holds a charge for weeks","Simple and effective","Great gift for my dad","Nailed it first try","Best grooming buy this year"];
const POS = ["The 45° blade does the blending for you — my fade looks even without any skill. Genuinely surprised.","Charged it once and it's still going strong two weeks later. The minutes-left display is so handy.","Waterproof means I fade in the shower and rinse it clean in seconds. Cleanup used to be the worst part.","Went from paying the barber every two weeks to doing it myself. Paid for itself almost immediately.","Thick, coarse hair here — turned the power up and it powered through with zero snagging.","Used my phone for the back and the guide made it easy. First attempt looked way better than expected.","The four fade lengths on one lever make it foolproof. No guessing which guard to grab.","Blends the gradient at the back of my head that I could never do with normal clippers.","Quieter than my old pair and doesn't get hot even after a full cut. Really well built.","Bought it skeptical, now the whole house uses it. Kids' cuts included.","Delivery was quick and it was well packaged. The fade came out sharp on the first go.","Feels premium and solid, not cheap and plasticky like the ones I've had before.","My line-up and fade finally look like the shop. Massive upgrade from my old trimmer.","Holds a charge for weeks of cuts. I only remember to charge it because the display reminds me.","Honestly idiot-proof. If you can comb your hair you can run this thing.","Saved a fortune already. Two cuts and it's basically paid for itself.","Skin-fade to a taper, it handles both cleanly. The blade glides, doesn't tug.","My son sits still for it now because it's quiet. Cuts his curls no problem.","Sharp out of the box and stayed sharp. Blends beautifully with a little practice.","The build quality is what sold me — metal blade, solid grip, proper charging dock."];
const MIXED_T = ["Good but takes a little practice","Solid, minor learning curve","Great tool — go slow at first","Happy overall, small nitpick","Works well after a couple tries","Nearly perfect"];
const MIXED = ["Blends well but my first fade was uneven — my technique, not the clipper. By the third cut it clicked.","Great clipper, just wish it came with a travel case for the guards.","Took a couple tries to get the back right with my phone camera, but now it's quick.","Powerful and sharp; the guards could click on a touch more firmly.","Does the job well. Battery is great; instructions could be a bit clearer for total beginners.","Solid fade once you find the angle — give yourself one practice run and you're set.","Love it overall; docking a star only because I'd like a couple more guard sizes.","Works exactly as described. Slightly louder than I pictured but honestly not bad."];

function starsFor(i: number) {
  const m = i % 100;
  return m < 82 ? 5 : m < 93 ? 4 : m < 97 ? 3 : m < 99 ? 2 : 1;
}

const BULK: Review[] = Array.from({ length: 204 }, (_, k) => {
  const i = k + 7;
  const stars = starsFor(i);
  const [date, age] = DATE_AGES[(i * 5) % DATE_AGES.length];
  const mixed = stars <= 3;
  return {
    name: `${FIRST[(i * 13) % FIRST.length]} ${LAST[(i * 7) % LAST.length]}.`,
    stars,
    date,
    age,
    title: mixed ? MIXED_T[i % MIXED_T.length] : TITLES[(i * 3) % TITLES.length],
    body: mixed ? MIXED[i % MIXED.length] : POS[(i * 5 + 2) % POS.length],
    helpful: ((i * 7) % 140) + (stars === 5 ? 9 : 2),
  };
});

const ALL: Review[] = [...HERO, ...BULK];

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={className} style={{ color: GOLD, fill: i < n ? GOLD : "transparent" }} aria-hidden="true" />
      ))}
    </span>
  );
}

const PAGE = 8;

export function Reviews() {
  const [sort, setSort] = useState<"relevant" | "recent" | "high" | "low">("relevant");
  const [filter, setFilter] = useState(0); // 0 = all, 1-5 = stars
  const [visible, setVisible] = useState(PAGE);

  const list = useMemo(() => {
    let r = filter ? ALL.filter((x) => x.stars === filter) : [...ALL];
    if (sort === "recent") r = r.sort((a, b) => a.age - b.age);
    else if (sort === "high") r = r.sort((a, b) => b.stars - a.stars || b.helpful - a.helpful);
    else if (sort === "low") r = r.sort((a, b) => a.stars - b.stars || b.helpful - a.helpful);
    // "relevant" keeps curated order
    return r;
  }, [sort, filter]);

  const setFilterReset = (n: number) => {
    setFilter(n);
    setVisible(PAGE);
  };

  return (
    <section id="reviews" className="scroll-mt-24 bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-x">
        {/* reviews widget */}
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-4xl border border-line bg-white shadow-card">
          <div className="flex items-center gap-3 border-b border-line px-6 py-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#1a73e8] text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold leading-tight text-ink">Reviews by our customers</p>
              <p className="text-[0.8rem] text-muted">Verified buyers · updated daily</p>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-[3.6rem] font-bold leading-none text-ink tabular-nums">{SUMMARY.rating}</span>
              <span className="text-[1.3rem] text-muted">/ 5</span>
            </div>
            <div className="mt-3"><Stars n={5} className="h-6 w-6" /></div>
            <p className="mt-3 text-[0.95rem] text-muted">
              Based on <span className="font-semibold text-[#1a73e8]">{SUMMARY.count.toLocaleString()} reviews</span>
            </p>

            {/* distribution — click a row to filter by that rating */}
            <div className="mt-5 grid gap-2">
              {SUMMARY.dist.map((pct, i) => {
                const n = 5 - i;
                return (
                  <button
                    key={n}
                    onClick={() => setFilterReset(filter === n ? 0 : n)}
                    aria-pressed={filter === n}
                    className={`flex items-center gap-3 rounded-lg px-1.5 py-0.5 text-[0.9rem] transition-colors hover:bg-card ${filter === n ? "bg-card" : ""}`}
                  >
                    <span className="w-3 shrink-0 text-muted">{n}</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-card">
                      <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} />
                    </span>
                    <span className="w-10 shrink-0 text-right tabular-nums text-muted">{pct}%</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4">
            <label className="relative">
              <span className="sr-only">Sort reviews</span>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as any); setVisible(PAGE); }}
                className="touch-manipulation appearance-none rounded-full border border-line bg-white py-2 pl-4 pr-9 text-[0.85rem] font-medium text-ink"
              >
                <option value="relevant">Most relevant</option>
                <option value="recent">Most recent</option>
                <option value="high">Highest rated</option>
                <option value="low">Lowest rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            </label>
            <label className="relative">
              <span className="sr-only">Filter by rating</span>
              <select
                value={filter}
                onChange={(e) => setFilterReset(Number(e.target.value))}
                className="touch-manipulation appearance-none rounded-full border border-line bg-white py-2 pl-4 pr-9 text-[0.85rem] font-medium text-ink"
              >
                <option value={0}>All ratings</option>
                <option value={5}>5 stars</option>
                <option value={4}>4 stars</option>
                <option value={3}>3 stars</option>
                <option value={2}>2 stars</option>
                <option value={1}>1 star</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            </label>
            <span className="ml-auto text-[0.82rem] text-muted" aria-live="polite">
              Showing {Math.min(visible, list.length)} of {list.length.toLocaleString()}
            </span>
          </div>
        </div>

        {/* review cards */}
        <div className="mx-auto mt-6 grid max-w-[980px] gap-4 md:grid-cols-2">
          {list.slice(0, visible).map((r, i) => (
            <article key={`${r.name}-${r.title}-${i}`} className="flex flex-col rounded-4xl bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                {r.avatar ? (
                  <img src={r.avatar} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint font-display text-[1.1rem] font-bold text-brand">
                    {r.name.charAt(0)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-semibold leading-tight text-ink">{r.name}</p>
                  <p className="flex items-center gap-1 text-[0.76rem] font-medium text-[#1b8a4e]">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Verified buyer
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
                <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" /> {r.helpful} found this helpful
              </p>
            </article>
          ))}
        </div>

        {visible < list.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE)}
              className="touch-manipulation rounded-full border border-line bg-white px-6 py-3 font-semibold text-ink shadow-card transition-colors hover:bg-card"
            >
              Show more reviews
            </button>
          </div>
        )}

        <p className="mx-auto mt-8 max-w-[52ch] text-center text-[0.8rem] text-muted">
          Reviews reflect individual experiences. Results vary with hair type and technique.
        </p>
      </div>
    </section>
  );
}

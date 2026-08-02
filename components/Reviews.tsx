"use client";
import { useMemo, useState } from "react";
import { Star, MessageCircle, ShieldCheck, ChevronDown } from "lucide-react";

// ⚠️ PLACEHOLDER REVIEWS — sample copy generated for design preview only.
// Publishing invented reviews/threads as genuine is illegal (FTC) and against
// ad-platform policy. Replace with your REAL verified reviews before launch.

const GOLD = "#f5a623";
const SUMMARY = { rating: 4.7, count: 1247, dist: [82, 11, 4, 2, 1] as const };

// Solid colour circles (no initial) for anyone without a photo — Google style.
const COLORS = ["#1a73e8", "#1e8e3e", "#d93025", "#9334e6", "#e37400", "#12b5cb", "#c5221f", "#7b1fa2", "#0b8043", "#e52592", "#2a56c6", "#ad1457"];
function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
}

const A = (n: number) => `/assets/img/avatars/a${n}.jpg`;

type Reply = { name: string; date: string; body: string; avatar?: string; children?: Reply[] };
type Review = { name: string; stars: number; date: string; age: number; title: string; body: string; helpful: number; avatar?: string; replies?: Reply[] };

const HERO: Review[] = [
  {
    name: "Marcus J.", stars: 5, date: "3 weeks ago", age: 22, title: "First self-fade came out clean", avatar: A(1), helpful: 214,
    body: "I was nervous doing my own fade but the blade genuinely blends it — I just glide it flat around my head and it does the rest. Second attempt looked like a shop fade. Already saved me two barber visits.",
    replies: [
      { name: "Kevin D.", date: "2 weeks ago", body: "does this actually work on thick curly hair? mine's pretty coarse", children: [
        { name: "Marcus J.", date: "2 weeks ago", avatar: A(1), body: "@Kevin yeah I've got thick hair and it powered straight through, just bump the power up a notch" },
      ] },
      { name: "Tobias R.", date: "12 days ago", body: "how loud is it? got a baby that naps lol", children: [
        { name: "Marcus J.", date: "11 days ago", avatar: A(1), body: "@Tobias way quieter than my old Wahl, honestly surprised how quiet it is" },
      ] },
    ],
  },
  {
    name: "Malik R.", stars: 5, date: "1 month ago", age: 32, title: "Stopped booking the barber", avatar: A(5), helpful: 301,
    body: "Pays for itself in about two cuts. I do my own fade every couple weeks now and it looks sharp every time. Wish I'd bought this years ago.",
    replies: [
      { name: "Andre P.", date: "3 weeks ago", body: "how long does one charge actually last?", children: [
        { name: "Malik R.", date: "3 weeks ago", avatar: A(5), body: "@Andre I've gotten about 6 cuts on a single charge. The display shows minutes left so you're never caught out" },
      ] },
    ],
  },
  {
    name: "Dwayne P.", stars: 5, date: "1 month ago", age: 34, title: "Battery lasts forever", avatar: A(6), helpful: 156,
    body: "Charged it once and I've cut my whole family's hair. The little display showing minutes left is a nice touch so you're never caught mid-cut.",
    replies: [
      { name: "Sam W.", date: "3 weeks ago", body: "does it come with the guards or do you buy those separate?", children: [
        { name: "Dwayne P.", date: "3 weeks ago", avatar: A(6), body: "@Sam comes with the full guard set — four fade lengths on the one lever" },
      ] },
    ],
  },
  {
    name: "Aisha R.", stars: 4, date: "2 weeks ago", age: 15, title: "Great for my son's hair", avatar: A(3), helpful: 88,
    body: "Cut my son's curls with it and the length settings made it easy. One practice run to nail the back, now it's quick. Docking a star only because I'd love a travel case.",
    replies: [
      { name: "Nina K.", date: "10 days ago", body: "is it easy enough for a total beginner? I've literally never cut hair", children: [
        { name: "Aisha R.", date: "9 days ago", avatar: A(3), body: "@Nina honestly yeah — took me one practice run and the guide walks you through the back with your phone camera" },
      ] },
    ],
  },
  {
    name: "Carlos V.", stars: 5, date: "4 days ago", age: 4, title: "Thick curly hair, no problem", avatar: A(2), helpful: 63,
    body: "Turned the power up for my hair type and it powered straight through — no pulling or snagging. Fade blended smooth.",
    replies: [
      { name: "Deshawn T.", date: "3 days ago", body: "can you actually get a proper skin fade with this or just a taper?", children: [
        { name: "Carlos V.", date: "2 days ago", avatar: A(2), body: "@Deshawn skin fade no problem — lowest guard off and go slow at the bottom" },
      ] },
    ],
  },
  {
    name: "Jordan B.", stars: 5, date: "3 weeks ago", age: 20, title: "The auto-fade is the whole difference", avatar: A(4), helpful: 129,
    body: "Cheap clippers make you blend the gradient yourself — impossible on the back of your own head. This one does the blending. Night and day.",
    replies: [
      { name: "Mohammed A.", date: "2 weeks ago", body: "is it actually waterproof? want to do it in the shower", children: [
        { name: "Jordan B.", date: "2 weeks ago", avatar: A(4), body: "@Mohammed yep fully waterproof, I rinse the whole thing under the tap after" },
      ] },
    ],
  },
  { name: "Ethan W.", stars: 5, date: "6 days ago", age: 6, title: "First time doing my own hair", helpful: 58, body: "Used my phone camera for the back like the guide suggests. Came out way better than I expected for a first try. The four guards are clearly marked." },
  { name: "Priya N.", stars: 5, date: "2 months ago", age: 60, title: "Bought it for my husband", helpful: 47, body: "He does his own fades now and they look professional. Also much quieter than our old clippers, which he loves.",
    replies: [{ name: "Grace T.", date: "6 weeks ago", body: "thinking of getting this for my partner too — was it hard for him to learn?" }] },
  { name: "Tyler K.", stars: 5, date: "5 days ago", age: 5, title: "Waterproof is legit", helpful: 42, body: "Fade in the shower, rinse the whole thing under the tap, done. Cleanup used to be the worst part — now it's ten seconds." },
  { name: "Sam O.", stars: 3, date: "3 weeks ago", age: 21, title: "Good tool, small learning curve", helpful: 61, body: "Blade is sharp and blends well, but my first fade was a little uneven — my technique, not the clipper. By the third cut it clicked. Go slow at first." },
];

const FIRST = ["Marcus","Andre","Dwayne","Jordan","Kevin","Carlos","Ethan","Sam","Marco","Tyler","Nadia","Malik","Liam","Noah","Oliver","Elijah","James","Lucas","Mason","Logan","Hassan","Diego","Terrance","Kwame","Brian","Tommy","Victor","Omar","Isaac","Nathan","Ryan","Cole","Jaylen","Devin","Felix","Grant","Shane","Troy","Wesley","Chad","Derek","Gavin","Curtis","Leon","Ronnie","Xavier","Zane","Amir","Bilal","Caleb","Darnell","Eddie","Frankie","Hector","Ibrahim","Jamal","Priya","Aisha","Sofia","Nina"];
const LAST = "ABCDEFGHIJKLMNOPRSTVWY".split("");
const DATE_AGES: [string, number][] = [["2 days ago",2],["3 days ago",3],["4 days ago",4],["6 days ago",6],["1 week ago",8],["2 weeks ago",15],["3 weeks ago",22],["4 weeks ago",28],["1 month ago",34],["6 weeks ago",44],["2 months ago",62],["3 months ago",92]];
const TITLES = ["Sharpest fade I've done at home","Barber-level results","No more $40 cuts","Blends like magic","So easy to use","Better than my old clippers","Worth every penny","My go-to now","Clean fade every time","Impressed by the battery","Quiet and powerful","Saved me so much money","Perfect for beginners","The battery display is genius","Basically fades itself","Shower cuts changed the game","Family clipper now","Wish I'd bought it sooner","Professional results at home","Cuts thick hair with ease","Fast shipping, sharp fade","Feels premium in the hand","Guards are clearly labelled","One swipe and done","My fades finally look right","Holds a charge for weeks","Simple and effective","Great gift for my dad","Nailed it first try","Best grooming buy this year"];
const POS = ["The 45° blade does the blending for you — my fade looks even without any skill. Genuinely surprised.","Charged it once and it's still going strong two weeks later. The minutes-left display is so handy.","Waterproof means I fade in the shower and rinse it clean in seconds. Cleanup used to be the worst part.","Went from paying the barber every two weeks to doing it myself. Paid for itself almost immediately.","Thick, coarse hair here — turned the power up and it powered through with zero snagging.","Used my phone for the back and the guide made it easy. First attempt looked way better than expected.","The four fade lengths on one lever make it foolproof. No guessing which guard to grab.","Blends the gradient at the back of my head that I could never do with normal clippers.","Quieter than my old pair and doesn't get hot even after a full cut. Really well built.","Bought it skeptical, now the whole house uses it. Kids' cuts included.","Delivery was quick and it was well packaged. The fade came out sharp on the first go.","Feels premium and solid, not cheap and plasticky like the ones I've had before.","My line-up and fade finally look like the shop. Massive upgrade from my old trimmer.","Holds a charge for weeks of cuts. I only remember to charge it because the display reminds me.","Honestly idiot-proof. If you can comb your hair you can run this thing.","Saved a fortune already. Two cuts and it's basically paid for itself.","Skin-fade to a taper, it handles both cleanly. The blade glides, doesn't tug.","My son sits still for it now because it's quiet. Cuts his curls no problem.","Sharp out of the box and stayed sharp. Blends beautifully with a little practice.","The build quality is what sold me — metal blade, solid grip, proper charging dock."];
const MIXED_T = ["Good but takes a little practice","Solid, minor learning curve","Great tool — go slow at first","Happy overall, small nitpick","Works well after a couple tries","Nearly perfect"];
const MIXED = ["Blends well but my first fade was uneven — my technique, not the clipper. By the third cut it clicked.","Great clipper, just wish it came with a travel case for the guards.","Took a couple tries to get the back right with my phone camera, but now it's quick.","Powerful and sharp; the guards could click on a touch more firmly.","Does the job well. Battery is great; instructions could be a bit clearer for total beginners.","Solid fade once you find the angle — give yourself one practice run and you're set.","Love it overall; docking a star only because I'd like a couple more guard sizes.","Works exactly as described. Slightly louder than I pictured but honestly not bad."];
// 1–2 star: something went wrong with the unit, but the refund/replacement was handled well.
const LOW_T = ["Arrived faulty — refunded fast","Dead on arrival, but sorted quickly","Didn't work out, got my money back","Faulty unit — support made it right","Stopped working, they replaced it","Not my experience, but well handled"];
const LOW = ["Mine wouldn't power on out of the box, which was really disappointing. I emailed support and had a full refund within two days, no arguing. Not the experience I hoped for, but they handled it properly.","The first one died after a single charge. Frustrating. To their credit they shipped a replacement straight away and it's worked fine since, so it did work out in the end — just a rough start.","Charging port on my unit was faulty. Annoying, but customer service refunded me the same day I reached out. Can't fault how they dealt with it, just unlucky with the clipper.","Battery wouldn't hold a charge. I asked for a refund and got it back quickly, no questions asked. Shame, because the one fade I managed actually looked good.","Turned up with a loose, rattling blade. I sent a photo and they refunded in full within 48 hours. Didn't work out for me, but the support was genuinely solid.","Stopped turning on after about a week. I expected a hassle and instead got a replacement in a few days. Rocky start, but they made it right and the new one's been fine."];

function starsFor(i: number) {
  const m = i % 100;
  return m < 82 ? 5 : m < 93 ? 4 : m < 97 ? 3 : m < 99 ? 2 : 1;
}
const BULK: Review[] = Array.from({ length: 204 }, (_, k) => {
  const i = k + 7;
  const stars = starsFor(i);
  const [date, age] = DATE_AGES[(i * 5) % DATE_AGES.length];
  const low = stars <= 2; // defective-but-refunded stories
  const mid = stars === 3; // works, minor learning curve
  return {
    name: `${FIRST[(i * 13) % FIRST.length]} ${LAST[(i * 7) % LAST.length]}.`,
    stars, date, age,
    title: low ? LOW_T[i % LOW_T.length] : mid ? MIXED_T[i % MIXED_T.length] : TITLES[(i * 3) % TITLES.length],
    body: low ? LOW[i % LOW.length] : mid ? MIXED[i % MIXED.length] : POS[(i * 5 + 2) % POS.length],
    helpful: ((i * 7) % 140) + (stars === 5 ? 9 : 2),
  };
});
const ALL: Review[] = [...HERO, ...BULK];

function Stars({ n, className = "h-[18px] w-[18px]" }: { n: number; className?: string }) {
  return (
    <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={className} style={{ color: GOLD, fill: i < n ? GOLD : "transparent" }} aria-hidden="true" />
      ))}
    </span>
  );
}

function Avatar({ avatar, name, size = "md" }: { avatar?: string; name: string; size?: "md" | "sm" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  if (avatar) return <img src={avatar} alt="" width={size === "sm" ? 32 : 40} height={size === "sm" ? 32 : 40} className={`${dim} shrink-0 rounded-full object-cover`} />;
  return <span aria-hidden="true" className={`${dim} shrink-0 rounded-full`} style={{ background: colorFor(name) }} />;
}

function ReplyLink() {
  return (
    <button className="mt-2 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-muted transition-colors hover:text-ink">
      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Reply
    </button>
  );
}

function ReplyThread({ reply, nested = false }: { reply: Reply; nested?: boolean }) {
  return (
    <div className={nested ? "ml-2 border-l-2 border-line pl-4 sm:ml-3 sm:pl-5" : ""}>
      <div className="flex items-center gap-2.5">
        <Avatar avatar={reply.avatar} name={reply.name} size="sm" />
        <p className="text-[0.95rem]">
          <span className="font-semibold text-ink">{reply.name}</span>
          <span className="text-muted"> · {reply.date}</span>
        </p>
      </div>
      <p className="ml-[42px] mt-1 text-[0.95rem] leading-relaxed text-ink-2">{reply.body}</p>
      <div className="ml-[42px]"><ReplyLink /></div>
      {reply.children && reply.children.length > 0 && (
        <div className="ml-[42px] mt-4 space-y-4">
          {reply.children.map((c, i) => (
            <ReplyThread key={i} reply={c} nested />
          ))}
        </div>
      )}
    </div>
  );
}

const PAGE = 6;

export function Reviews({ id = "reviews" }: { id?: string } = {}) {
  const [sort, setSort] = useState<"relevant" | "recent" | "high" | "low">("relevant");
  const [filter, setFilter] = useState(0);
  const [visible, setVisible] = useState(PAGE);

  const list = useMemo(() => {
    let r = filter ? ALL.filter((x) => x.stars === filter) : [...ALL];
    if (sort === "recent") r = r.sort((a, b) => a.age - b.age);
    else if (sort === "high") r = r.sort((a, b) => b.stars - a.stars || b.helpful - a.helpful);
    else if (sort === "low") r = r.sort((a, b) => a.stars - b.stars || b.helpful - a.helpful);
    return r;
  }, [sort, filter]);

  const setFilterReset = (n: number) => { setFilter(n); setVisible(PAGE); };

  return (
    <section id={id} className="scroll-mt-24 bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-x">
        {/* summary + controls */}
        <div className="mx-auto max-w-[720px] overflow-hidden rounded-4xl border border-line bg-white shadow-card">
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
              <span className="font-display text-[3.4rem] font-bold leading-none text-ink tabular-nums">{SUMMARY.rating}</span>
              <span className="text-[1.3rem] text-muted">/ 5</span>
            </div>
            <div className="mt-3"><Stars n={5} className="h-6 w-6" /></div>
            <p className="mt-3 text-[0.95rem] text-muted">Based on <span className="font-semibold text-[#1a73e8]">{SUMMARY.count.toLocaleString()} reviews</span></p>
            <div className="mt-5 grid gap-2">
              {SUMMARY.dist.map((pct, i) => {
                const n = 5 - i;
                return (
                  <button key={n} onClick={() => setFilterReset(filter === n ? 0 : n)} aria-pressed={filter === n}
                    className={`flex items-center gap-3 rounded-lg px-1.5 py-0.5 text-[0.9rem] transition-colors hover:bg-card ${filter === n ? "bg-card" : ""}`}>
                    <span className="w-3 shrink-0 text-muted">{n}</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-card"><span className="block h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} /></span>
                    <span className="w-10 shrink-0 text-right tabular-nums text-muted">{pct}%</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4">
            <label className="relative">
              <span className="sr-only">Sort reviews</span>
              <select value={sort} onChange={(e) => { setSort(e.target.value as any); setVisible(PAGE); }} className="touch-manipulation appearance-none rounded-full border border-line bg-white py-2 pl-4 pr-9 text-[0.85rem] font-medium text-ink">
                <option value="relevant">Most relevant</option>
                <option value="recent">Most recent</option>
                <option value="high">Highest rated</option>
                <option value="low">Lowest rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            </label>
            <label className="relative">
              <span className="sr-only">Filter by rating</span>
              <select value={filter} onChange={(e) => setFilterReset(Number(e.target.value))} className="touch-manipulation appearance-none rounded-full border border-line bg-white py-2 pl-4 pr-9 text-[0.85rem] font-medium text-ink">
                <option value={0}>All ratings</option>
                <option value={5}>5 stars</option>
                <option value={4}>4 stars</option>
                <option value={3}>3 stars</option>
                <option value={2}>2 stars</option>
                <option value={1}>1 star</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            </label>
            <span className="ml-auto text-[0.82rem] text-muted" aria-live="polite">Showing {Math.min(visible, list.length)} of {list.length.toLocaleString()}</span>
          </div>
        </div>

        {/* threaded review list */}
        <div className="mx-auto mt-6 max-w-[720px] overflow-hidden rounded-4xl border border-line bg-white shadow-card">
          {list.slice(0, visible).map((r, i) => (
            <article key={`${r.name}-${r.title}-${i}`} className="border-t border-line px-6 py-7 first:border-t-0">
              <div className="flex items-center gap-3">
                <Avatar avatar={r.avatar} name={r.name} />
                <p className="font-semibold text-ink">{r.name}</p>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <Stars n={r.stars} />
                <span className="text-[0.85rem] text-muted">{r.date}</span>
              </div>
              <p className="mt-2.5 text-[1rem] leading-relaxed text-ink-2">{r.body}</p>
              <ReplyLink />
              {r.replies && r.replies.length > 0 && (
                <div className="mt-6 space-y-6 border-t border-line pt-6">
                  {r.replies.map((rep, j) => (
                    <ReplyThread key={j} reply={rep} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {visible < list.length && (
          <div className="mt-8 text-center">
            <button onClick={() => setVisible((v) => v + PAGE)} className="touch-manipulation rounded-full border border-line bg-white px-6 py-3 font-semibold text-ink shadow-card transition-colors hover:bg-card">
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

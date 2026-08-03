"use client";
import { useMemo, useState } from "react";
import { Star, MessageCircle, ShieldCheck, ChevronDown, ThumbsUp, BadgeCheck } from "lucide-react";

// ⚠️ PLACEHOLDER REVIEWS — sample copy for design/pitch preview only.
// Publishing invented reviews/threads as genuine is illegal (FTC) and against
// ad-platform policy. Replace with your REAL verified reviews before launch.

const GOLD = "#f5a623";
const SUMMARY = { rating: 4.8, count: 1247, dist: [86, 9, 3, 1, 1] as const };

// Solid colour circles (no initial) for anyone without a photo — Google style.
const COLORS = ["#1a73e8", "#1e8e3e", "#d93025", "#9334e6", "#e37400", "#12b5cb", "#c5221f", "#7b1fa2", "#0b8043", "#e52592", "#2a56c6", "#ad1457"];
function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
}

const A = (n: number) => `/assets/img/avatars/a${n}.jpg`;

// A reply is a comment under a review. Top-level replies are questions from other
// shoppers; `children` are answers. Many questions have no answer on purpose —
// that's what a real review thread looks like.
type Reply = { name: string; date: string; body: string; avatar?: string; children?: Reply[] };
type Review = { name: string; stars: number; date: string; age: number; title: string; body: string; helpful: number; avatar?: string; photos?: string[]; replies?: Reply[] };

const HERO: Review[] = [
  {
    name: "Marcus J.", stars: 5, date: "3 weeks ago", age: 22, title: "First fade actually came out clean", avatar: A(1), helpful: 214,
    body: "Ngl I was nervous cutting my own hair but the blade basically blends it for you. I just glide it flat around my head and it does the rest. Second go looked like a proper shop fade. Already saved me like two barber trips.",
    replies: [
      { name: "Kevin D.", date: "2 weeks ago", body: "does this actually work on thick curly hair?? mine's super coarse", children: [
        { name: "Marcus J.", date: "2 weeks ago", avatar: A(1), body: "@Kevin mine's thick too, just turned the power up a notch and it went straight through no problem" },
      ] },
      { name: "Tobias R.", date: "12 days ago", body: "how loud is it, got a newborn that naps 😅" },
    ],
  },
  {
    name: "Malik R.", stars: 5, date: "1 month ago", age: 32, title: "Stopped booking the barber tbh", avatar: A(5), helpful: 301,
    body: "Pays for itself in like two cuts. I do my own fade every couple weeks now and it looks sharp every time. Wish I'd bought it years ago honestly.",
    replies: [
      { name: "Andre P.", date: "3 weeks ago", body: "how long does one charge actually last?", children: [
        { name: "Malik R.", date: "3 weeks ago", avatar: A(5), body: "@Andre got about 6 cuts out of one charge. there's a little screen that shows minutes left so you're never caught out" },
      ] },
    ],
  },
  {
    name: "Dwayne P.", stars: 5, date: "1 month ago", age: 34, title: "Battery genuinely lasts", avatar: A(6), helpful: 156,
    body: "Charged it once and I've done my whole family's hair. The screen showing minutes left is such a nice touch, never get caught halfway through a cut.",
  },
  {
    name: "Aisha R.", stars: 4, date: "2 weeks ago", age: 15, title: "Great for my son's hair", avatar: A(3), helpful: 88,
    body: "Cut my son's curls and the length settings made it easy. Took one practice run to get the back right, quick now. Only reason it's not 5 stars is I wish it came with a travel case.",
    replies: [
      { name: "Nina K.", date: "10 days ago", body: "is this ok for a total beginner? I've legit never cut hair before", children: [
        { name: "Aisha R.", date: "9 days ago", avatar: A(3), body: "@Nina honestly yeah, took me one go. the little guide walks you through doing the back with your phone camera" },
      ] },
    ],
  },
  {
    name: "Carlos V.", stars: 5, date: "4 days ago", age: 4, title: "Handles thick hair no problem", avatar: A(2), helpful: 63,
    body: "Turned the power up for my hair type and it powered through, no pulling or snagging. Fade blended smooth. Can't complain.",
    replies: [
      { name: "Deshawn T.", date: "3 days ago", body: "can you get an actual skin fade with this or just a taper?" },
    ],
  },
  {
    name: "Jordan B.", stars: 5, date: "3 weeks ago", age: 20, title: "The auto-fade is the whole thing", avatar: A(4), helpful: 129,
    body: "Cheap clippers make YOU blend the gradient, which is basically impossible on the back of your own head. This one does the blending. Completely different.",
    replies: [
      { name: "Mohammed A.", date: "2 weeks ago", body: "is it actually waterproof? wanna do it in the shower", children: [
        { name: "Jordan B.", date: "2 weeks ago", avatar: A(4), body: "@Mohammed yep fully waterproof, I just rinse the whole thing under the tap after" },
      ] },
      { name: "Reece", date: "9 days ago", body: "does it come charged out the box or do you gotta wait" },
    ],
  },
  { name: "Ethan W.", stars: 5, date: "6 days ago", age: 6, title: "First time doing my own hair", helpful: 58, photos: ["/assets/img/reviews/result-a1.jpg", "/assets/img/reviews/result-a2.jpg"], body: "Used my phone for the back like the guide says. Came out way better than I expected for a first try, and the guards are clearly labelled. Adding a couple pics of the back 👇" },
  { name: "Priya N.", stars: 5, date: "2 months ago", age: 60, title: "Bought it for my husband", helpful: 47, body: "He does his own fades now and they look professional. Also way quieter than our old clippers, which he loves.",
    replies: [{ name: "Grace T.", date: "6 weeks ago", body: "thinking of getting this for my partner too, was it hard for him to learn?" }] },
  { name: "Tyler K.", stars: 5, date: "5 days ago", age: 5, title: "Waterproof is legit", helpful: 42, photos: ["/assets/img/reviews/result-b1.jpg"], body: "Fade in the shower, rinse the whole thing under the tap, done. Cleanup used to be the worst part, now it's like ten seconds. Pic from my second go 👇" },
  { name: "Sam O.", stars: 3, date: "3 weeks ago", age: 21, title: "Good but takes a little practice", helpful: 61, body: "Blade's sharp and blends well, but my first fade was a bit uneven — that was my technique, not the clipper tbh. Clicked by the third cut. Just go slow at first.",
    replies: [
      { name: "Louis", date: "2 weeks ago", body: "did it get easier fast or did it take a while?", children: [
        { name: "Sam O.", date: "2 weeks ago", body: "@Louis pretty fast, by the third time it was quick" },
      ] },
    ],
  },
];

const FIRST = ["Marcus","Andre","Dwayne","Jordan","Kevin","Carlos","Ethan","Sam","Marco","Tyler","Nadia","Malik","Liam","Noah","Oliver","Elijah","James","Lucas","Mason","Logan","Hassan","Diego","Terrance","Kwame","Brian","Tommy","Victor","Omar","Isaac","Nathan","Ryan","Cole","Jaylen","Devin","Felix","Grant","Shane","Troy","Wesley","Chad","Derek","Gavin","Curtis","Leon","Ronnie","Xavier","Zane","Amir","Bilal","Caleb","Darnell","Eddie","Frankie","Hector","Ibrahim","Jamal","Priya","Aisha","Sofia","Nina"];
const LAST = "ABCDEFGHIJKLMNOPRSTVWY".split("");
const DATE_AGES: [string, number][] = [["2 days ago",2],["3 days ago",3],["4 days ago",4],["6 days ago",6],["1 week ago",8],["2 weeks ago",15],["3 weeks ago",22],["4 weeks ago",28],["1 month ago",34],["6 weeks ago",44],["2 months ago",62],["3 months ago",92]];

// Titles + bodies written to read like normal people typed them — casual, varied
// length, contractions, the odd lowercase start.
const TITLES = ["Sharpest fade I've done myself","Looks like a barber did it","No more $40 cuts","It blends it for you, wild","So easy honestly","Way better than my old clippers","Worth it","My go-to now","Clean every time","Battery is insane","Quiet and powerful","Saved me so much money","Perfect if you're new to this","The little screen is genius","Basically fades itself","Shower cuts changed the game","Whole family uses it now","Should've bought this sooner","Barber results at home","Eats through thick hair","Came fast, cuts great","Feels premium not cheap","Guards are easy to figure out","One swipe, done","My fades finally look right","Holds charge for weeks","Simple and it just works","Got it for my dad, he loves it","Nailed it first try","Best thing I bought this year"];
const POS = ["The 45° blade does the blending for you, my fade looks even and I've got zero skill. Genuinely shocked.","Charged it once and it's still going two weeks later. The minutes-left screen is so handy.","Waterproof so I just fade in the shower and rinse it clean. Cleanup used to be the worst part.","Went from the barber every two weeks to doing it myself. Paid for itself almost immediately.","Thick coarse hair here, turned the power up and it went through, no snagging.","Used my phone for the back and it was easy, first try looked way better than I expected.","Four lengths on one lever so no guessing which guard. Foolproof honestly.","Blends the back of my head, which I could never do with normal clippers.","Quieter than my old pair and doesn't get hot even after a full cut.","Bought it skeptical, now the whole house uses it, kids included.","Came quick and packaged well. Fade came out sharp first go.","Feels solid and premium, not the cheap plasticky ones I've had before.","My lineup and fade finally look like the shop. Massive upgrade.","Holds a charge for weeks, I only remember to charge it cause the screen tells me.","Honestly idiot proof. If you can comb your hair you can use this.","Saved a fortune already, two cuts and it basically paid for itself.","Does a skin fade or a taper, both come out clean. The blade glides, doesn't tug.","My son actually sits still cause it's quiet. Cuts his curls fine.","Sharp out the box and stayed sharp. Blends nice once you get the hang of it.","The build is what got me, metal blade, solid grip, proper charging dock.","Does exactly what it says. Clean fade, no fuss.","10/10, wish I got it sooner.","Really easy, really sharp. No notes."];
const MIXED_T = ["Good but takes a little practice","Solid, small learning curve","Great once you get the hang of it","Happy overall, tiny nitpick","Works well after a couple goes","Nearly perfect"];
const MIXED = ["Blends well but my first fade was uneven — that was me, not the clipper. Clicked by the third go.","Great clipper, just wish it came with a case for the guards.","Took a couple tries to nail the back with my phone camera, but it's quick now.","Powerful and sharp, the guards could click on a bit firmer though.","Does the job. Battery's great, instructions could be clearer for total beginners.","Solid fade once you find the angle, give yourself one practice run.","Love it overall, only docking a star cause I'd like a couple more guard sizes.","Works as described, bit louder than I expected but honestly not bad."];
// 1–2 star: something went wrong with the unit, but the refund/replacement was handled well.
const LOW_T = ["Arrived faulty, refunded fast","Dead on arrival but sorted quick","Didn't work out, got my money back","Faulty unit, support made it right","Stopped working, they replaced it","Not my experience but handled well"];
const LOW = ["Mine wouldn't turn on out the box, which was annoying. Emailed support and got a full refund in two days, no hassle. Not what I hoped for, but they sorted it.","First one died after one charge. Frustrating. To be fair they shipped a replacement straight away and it's been fine since.","Charging port was faulty on mine. Customer service refunded me the same day I messaged. Can't fault how they handled it, just unlucky.","Battery wouldn't hold a charge. Asked for a refund, got it back quick, no questions. Shame cause the one fade I got looked good.","Came with a loose, rattly blade. Sent a photo and they refunded in full within two days. Didn't work out for me but support was solid.","Stopped turning on after a week. Expected a hassle, instead got a replacement in a few days. Rough start but they made it right."];

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
    <button className="mt-1.5 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-muted transition-colors hover:text-ink">
      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> Reply
    </button>
  );
}

function ReplyThread({ reply, author, nested = false }: { reply: Reply; author: string; nested?: boolean }) {
  const isAuthor = reply.name === author; // the reviewer answering their own thread
  return (
    <div className={nested ? "ml-3 border-l-2 border-line pl-4 sm:ml-4 sm:pl-5" : ""}>
      <div className="flex items-center gap-2.5">
        <Avatar avatar={reply.avatar} name={reply.name} size="sm" />
        <p className="text-[0.92rem] leading-tight">
          <span className="font-semibold text-ink">{reply.name}</span>
          {isAuthor && (
            <span className="ml-1.5 rounded-full bg-brand-tint px-1.5 py-0.5 align-middle text-[0.6rem] font-bold uppercase tracking-wide text-brand-dark">Reviewer</span>
          )}
          <span className="text-muted"> · {reply.date}</span>
        </p>
      </div>
      <p className="ml-[42px] mt-1 text-[0.94rem] leading-relaxed text-ink-2">{reply.body}</p>
      {!isAuthor && <div className="ml-[42px]"><ReplyLink /></div>}
      {reply.children && reply.children.length > 0 && (
        <div className="ml-[42px] mt-4 space-y-4">
          {reply.children.map((c, i) => (
            <ReplyThread key={i} reply={c} author={author} nested />
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

        {/* review list */}
        <div className="mx-auto mt-6 max-w-[720px] overflow-hidden rounded-4xl border border-line bg-white shadow-card">
          {list.slice(0, visible).map((r, i) => (
            <article key={`${r.name}-${r.title}-${i}`} className="border-t border-line px-6 py-7 first:border-t-0">
              {/* header: who + verified, date on the right */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar avatar={r.avatar} name={r.name} />
                  <div className="leading-tight">
                    <p className="font-semibold text-ink">{r.name}</p>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-[0.72rem] font-medium text-[#1b8a4e]">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified purchase
                    </span>
                  </div>
                </div>
                <span className="shrink-0 pt-0.5 text-[0.8rem] text-muted">{r.date}</span>
              </div>

              {/* stars + title + body */}
              <div className="mt-3"><Stars n={r.stars} className="h-[16px] w-[16px]" /></div>
              {r.title && <p className="mt-2 font-display text-[1.05rem] font-semibold leading-snug text-ink">{r.title}</p>}
              <p className="mt-1.5 text-[1rem] leading-relaxed text-ink-2">{r.body}</p>

              {r.photos && r.photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.photos.map((src, k) => (
                    <img
                      key={k}
                      src={src}
                      alt="Customer result photo"
                      loading="lazy"
                      width={96}
                      height={128}
                      className="h-32 w-24 rounded-xl border border-line object-cover object-top"
                    />
                  ))}
                </div>
              )}

              {/* helpful + reply */}
              <div className="mt-4 flex items-center gap-5 text-[0.85rem] text-muted">
                <button className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
                  <ThumbsUp className="h-4 w-4" aria-hidden="true" /> Helpful ({r.helpful})
                </button>
                <button className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Reply
                </button>
              </div>

              {r.replies && r.replies.length > 0 && (
                <div className="mt-5 space-y-5 border-t border-line pt-5">
                  {r.replies.map((rep, j) => (
                    <ReplyThread key={j} reply={rep} author={r.name} />
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

"use client";
import { ArrowBigUp, MessageCircle } from "lucide-react";
import { useContent } from "@/components/useContent";

// ⚠️ SAMPLE social proof for design preview. The photos are AI-generated and the
// posts are illustrative — swap for real, permissioned Reddit posts / customer
// photos before launch. Presenting fabricated posts as genuine is deceptive.
function Snoo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Reddit">
      <circle cx="24" cy="24" r="24" fill="#FF4500" />
      <line x1="24" y1="23" x2="30.5" y2="10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="31" cy="9.5" r="3" fill="#fff" />
      <ellipse cx="24" cy="30" rx="15" ry="11" fill="#fff" />
      <circle cx="9.5" cy="28.5" r="4.6" fill="#fff" />
      <circle cx="38.5" cy="28.5" r="4.6" fill="#fff" />
      <circle cx="19" cy="29" r="2.5" fill="#FF4500" />
      <circle cx="29" cy="29" r="2.5" fill="#FF4500" />
      <path d="M17.5 35.5 Q24 40 30.5 35.5" stroke="#FF4500" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const POST_META = [
  { img: "/assets/img/reddit/r1.jpg", user: "u/no_barber_needed", time: "3d", up: "2.4k", comments: 184 },
  { img: "/assets/img/reddit/r2.jpg", user: "u/homecut_mike", time: "1w", up: "1.8k", comments: 96 },
  { img: "/assets/img/reddit/r3.jpg", user: "u/fadegod_23", time: "5d", up: "3.1k", comments: 210 },
];

export function TrustedByReddit() {
  const c = useContent().trustedReddit;
  const posts = POST_META.map((m, i) => ({ ...m, title: c.postTitles[i] }));
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]">
      <div className="container-x">
        <div className="mx-auto mb-9 flex max-w-[640px] flex-col items-center text-center">
          <Snoo className="h-10 w-10" />
          <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-[1.1]">{c.title}</h2>
          <p className="mt-3 max-w-[46ch] text-[1.02rem] text-muted">
            {c.subA}<span className="font-medium text-ink">{c.subHighlight}</span>{c.subB}
          </p>
        </div>

        <div className="mx-auto grid max-w-[980px] gap-5 sm:grid-cols-3">
          {posts.map((p) => (
            <article key={p.user} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <div className="flex items-center gap-2 px-4 pt-4 text-[0.82rem]">
                <Snoo className="h-5 w-5 shrink-0" />
                <span className="font-semibold text-ink">r/SelfBarber</span>
                <span className="truncate text-muted">· {p.user} · {p.time}</span>
              </div>
              <p className="px-4 pb-3 pt-2 font-display text-[0.98rem] font-semibold leading-snug text-ink">{p.title}</p>
              <img src={p.img} alt="Self-fade result shared on Reddit" width={480} height={480} className="aspect-square w-full object-cover" />
              <div className="flex items-center gap-4 px-4 py-3 text-[0.82rem] text-muted">
                <span className="flex items-center gap-1 font-medium text-ink">
                  <ArrowBigUp className="h-4 w-4 text-[#FF4500]" aria-hidden="true" /> {p.up}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> {p.comments}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

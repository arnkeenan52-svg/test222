"use client";
import { ExternalLink } from "lucide-react";
import { useContent } from "@/components/useContent";

// Real, independent Reddit posts of people self-fading with this clipper. Links out
// to the public threads (no reposting of others' photos). Add/swap as you like.
const redditPosts = [
  { sub: "r/SelfBarber", img: "/assets/img/reddit-1.jpg", url: "https://www.reddit.com/r/SelfBarber/comments/1c5091o/first_attempt_with_a_fadify_20_not_the_greatest/" },
  { sub: "r/SelfBarber", img: "/assets/img/reddit-2.jpg", url: "https://www.reddit.com/r/SelfBarber/comments/1ds8agi/2nd_attempt_with_the_fadify_20/" },
  { sub: "r/Barber", img: "/assets/img/reddit-3.jpg", url: "https://www.reddit.com/r/Barber/comments/utvqn4/fadify_20_first_experience/" },
];

export function RedditReviews({ alt }: { alt?: boolean }) {
  const c = useContent().reddit;
  return (
    <section id="reviews" className={alt ? "bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]" : "py-[clamp(3.5rem,7vw,6rem)]"}>
      <div className="container-x">
        <div className="mb-10 mx-auto max-w-[640px] text-center">
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">{c.title}</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[1.06rem] text-muted">{c.sub}</p>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {redditPosts.map((p, i) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-[78%] shrink-0 snap-center overflow-hidden rounded-4xl bg-ink sm:w-[52%] md:w-auto"
            >
              <img src={p.img} alt={`Self-fade shared on ${p.sub}`} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[0.7rem] font-semibold backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" /> {p.sub}
                </span>
                <p className="mt-2 font-display text-[1.05rem] font-semibold leading-snug">{c.labels[i]}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-[0.82rem] text-white/80">
                  {c.view} <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 text-center text-[0.8rem] text-muted">{c.note}</p>
      </div>
    </section>
  );
}

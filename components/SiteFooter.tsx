import { Logo } from "@/components/Logo";

const SOCIALS = [
  { label: "Instagram (@fadeclippr)", href: "https://instagram.com/fadeclippr", icon: InstagramIcon },
  { label: "TikTok (@fadeclipper)", href: "https://www.tiktok.com/@fadeclipper", icon: TikTokIcon },
  { label: "X / Twitter (@fadeclipper)", href: "https://x.com/fadeclipper", icon: XIcon },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.55 3h-3.4v13.6a2.53 2.53 0 1 1-2.53-2.53c.19 0 .37.02.55.06v-3.47a5.94 5.94 0 1 0 5 5.87V9.01a7.6 7.6 0 0 0 4.4 1.4V7.05a4.3 4.3 0 0 1-2.97-1.23z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0d0d0f] py-14 text-white">
      <div className="container-x grid gap-8 md:grid-cols-[1.7fr_1fr_1fr]">
        <div>
          <span className="text-white"><Logo /></span>
          <p className="mt-4 max-w-[30ch] text-[0.9rem] text-white/55">The auto-fading clipper. One swipe, fade done.</p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`FadeClipper on ${label}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <nav className="flex flex-col gap-3 text-[0.9rem] text-white/60">
          <a href="/#how" className="transition-colors hover:text-white">How it works</a>
          <a href="/#compare" className="transition-colors hover:text-white">Why FadeClipper</a>
          <a href="/#reviews" className="transition-colors hover:text-white">Reviews</a>
          <a href="/how-to-fade-your-own-hair" className="transition-colors hover:text-white">How to fade your own hair</a>
          <a href="/#faq" className="transition-colors hover:text-white">FAQ</a>
        </nav>
        <nav className="flex flex-col gap-3 text-[0.9rem] text-white/60">
          <a href="/about" className="transition-colors hover:text-white">About us</a>
          <a href="/contact" className="transition-colors hover:text-white">Contact</a>
          <a href="/shipping" className="transition-colors hover:text-white">Shipping</a>
          <a href="/returns" className="transition-colors hover:text-white">Returns &amp; refunds</a>
          <a href="/terms" className="transition-colors hover:text-white">Terms</a>
          <a href="/privacy" className="transition-colors hover:text-white">Privacy</a>
        </nav>
      </div>
      <div className="container-x mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[0.8rem] text-white/45">
        <span>© {new Date().getFullYear()} FadeClipper. All rights reserved.</span>
        <span>contact@fadeclipper.com</span>
      </div>
    </footer>
  );
}

import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-[#0d0d0f] py-14 text-white">
      <div className="container-x grid gap-8 md:grid-cols-[1.7fr_1fr_1fr]">
        <div>
          <span className="text-white"><Logo /></span>
          <p className="mt-4 max-w-[30ch] text-[0.9rem] text-white/55">The auto-fading clipper. One swipe, fade done.</p>
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
        <span>fadeclipper@gmail.com</span>
      </div>
    </footer>
  );
}

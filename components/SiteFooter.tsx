import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-paper-alt py-14">
      <div className="container-x grid gap-8 md:grid-cols-[1.7fr_1fr_1fr]">
        <div>
          <span className="text-ink"><Logo /></span>
          <p className="mt-4 max-w-[30ch] text-[0.9rem] text-muted">The auto-fading clipper. One swipe, fade done.</p>
        </div>
        <nav className="flex flex-col gap-3 text-[0.9rem] text-muted">
          <a href="/#how" className="hover:text-ink">How it works</a>
          <a href="/#compare" className="hover:text-ink">Why FadeClipper</a>
          <a href="/#reviews" className="hover:text-ink">Reviews</a>
          <a href="/#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <nav className="flex flex-col gap-3 text-[0.9rem] text-muted">
          <a href="/about" className="hover:text-ink">About us</a>
          <a href="/contact" className="hover:text-ink">Contact</a>
          <a href="/shipping" className="hover:text-ink">Shipping</a>
          <a href="/returns" className="hover:text-ink">Returns &amp; refunds</a>
          <a href="/terms" className="hover:text-ink">Terms</a>
          <a href="/privacy" className="hover:text-ink">Privacy</a>
        </nav>
      </div>
      <div className="container-x mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[0.8rem] text-muted">
        <span>© {new Date().getFullYear()} FadeClipper. All rights reserved.</span>
        <span>hello@fadeclipper.com</span>
      </div>
    </footer>
  );
}

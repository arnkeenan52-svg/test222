# FadeClipper

Single-product landing page for **FadeClipper**, the auto-fading cordless hair clipper.

Built as a **Next.js 14 (App Router) + Tailwind + shadcn/ui** app — the same stack the
21st.dev Magic MCP generates into. Component-based, statically prerendered, Vercel-ready.

```
app/            # layout.tsx + page.tsx (all sections)
components/     # SiteNav, Reveal, Logo, ui/button (cva)
public/assets/  # product images + real demo/loop videos
legacy/         # the original static HTML version (kept for reference)
```

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Design
Visual system synthesized from the real CSS of premium grooming/DTC brands (Beardbrand,
Aesop, Bevel, Therabody, Dyson, Glossier, Native): **warm off-white** canvas, **near-black**
ink, **flat square black buttons**, Space Grotesk + Inter, hairline-bordered editorial cards,
one muted-green accent. No drop shadows, no emoji, no fake social proof.

Theme tokens live in `tailwind.config.ts` (`paper`, `ink`, `brand`, `line`, …).

## Honesty
No fabricated trust signals — no invented customer counts, ratings, or testimonials. Trust
comes from real specs, your offer terms (free shipping, 90-day money-back, warranty), and
**real demonstration footage**. Add real reviews only when you have them.

## Imagery
Product shots are your real clipper, cleaned via Higgsfield (competitor branding removed,
FADECLIPPER etched near the tilted blade), placed on a background matched to the site.

## Customise before launch
- **Price** — `$59` / `$99` appear in `app/page.tsx` and `components/SiteNav.tsx`.
- **Savings math** — set the barber figures in the savings section to your real market prices.
- **Checkout** — the buy button in the offer section links to `#`; point it at your real
  checkout URL (Shopify / Stripe link).
- **Footer links, email, shipping window** in the FAQ.

## Deploy
Push to GitHub and import the repo in Vercel (it auto-detects Next.js). Zero config.

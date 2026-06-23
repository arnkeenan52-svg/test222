# FadeClipper — single-product landing page

A fast, honest, conversion-focused landing page for **FadeClipper**, the auto-fading cordless hair clipper.
Static site (no build step): `index.html` + `styles.css` + `script.js` + `assets/`.

## Design
The visual system was **synthesized from the real design systems of premium DTC / grooming brands**
(extracted from their live CSS): Beardbrand, Aesop, Bevel, Therabody, Dyson, Glossier, Native, plus
clean-startup references (Linear, Stripe, Whop). The shared grammar those brands use:

- **Warm off-white** canvas (`#f4f2ec`), **near-black** text, **solid flat black buttons** (no drop shadows),
  a clean **grotesk** typeface (Space Grotesk + Inter), hairline borders, and a single restrained accent
  (a muted eucalyptus green) used sparingly.
- No neon, no emoji icons, no heavy gradients — the product photography carries the visual weight.

## Honesty (important)
There is **no fabricated social proof** anywhere — no invented "2,000+ customers", no fake star ratings,
no made-up testimonials. Trust is built only from honest signals you control:
- real product specs (240-min runtime, 70 RPM, 4 fade lengths, IPX waterproof),
- your offer terms (free shipping, 90-day money-back, 1-year warranty),
- and **real demonstration footage** of the clipper in use.

When you have **real** reviews, add them — don't ship invented ones.

## Imagery
All product imagery is built from **your own clipper footage** (the supplied video):
- Frames were cleaned with Higgsfield (Nano Banana Pro) to remove the original `iFADE`/`FADINGCULTURE`
  branding, etch a **FADECLIPPER** wordmark near the (tilted) blade, and place the product on a seamless
  warm off-white background that matches the site.
- `assets/video/loop-*.mp4` are short, caption-free action clips cut from your footage.

Swap any image by replacing the file in `assets/img` (keep the filename) or editing `src` in `index.html`.

## Customise before launch
Search `index.html` for `class="edit"` — every spot needing your real data is tagged:
- **Price** (`$59` / `$99`) — nav, savings, offer card, mobile bar.
- **Savings math** (`~$35 every 2 weeks`, `$910/yr`, `$850+`) — set to your market's real barber prices.
- **Footer links / email**, and the **shipping window** in the FAQ.

### Checkout
The main buy button is `#checkoutBtn`. Replace `href="#"` with your real checkout URL (Shopify / Stripe link).

## Deploy
Static — works on Vercel, Netlify, Cloudflare Pages, or GitHub Pages with zero config.

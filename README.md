# FadeClipper — single-product landing page

A fast, conversion-focused landing page for **FadeClipper**, the auto-fading cordless hair clipper.

Built as a static site (no build step): `index.html` + `styles.css` + `script.js` + `assets/`.
Open `index.html` directly, or serve the folder with any static host.

## Design
- **Aesthetic:** warm editorial minimalism — bone paper, warm ink, a single caramel/ochre accent
  (tied to the gold rim-light in the product photography). Restraint over decoration.
- **Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) for display + [Inter](https://fonts.google.com/specimen/Inter) for UI/body (loaded from Google Fonts).
- **Sections:** hero → spec strip → social proof → problem/solution → how-it-works → features →
  savings vs barber → results → in-the-box → offer → guarantee → FAQ → closing CTA.

## Imagery
All product imagery was produced from **your own clipper footage** (the supplied `.mp4`):
- Frames were extracted from the video, then cleaned with Higgsfield (Nano Banana Pro) to remove the
  original `iFADE` / `FADINGCULTURE` branding and etch a **FADECLIPPER** wordmark near the blade.
- The fade-result and lifestyle shots are brand-neutral supporting images.
- `assets/video/loop-*.mp4` are short, caption-free action loops cut from your footage.

Swap any image by replacing the file in `assets/img` (keep the same filename) or editing the `src` in `index.html`.

## Things to customize before launch
Search `index.html` for `class="edit"` — every spot that needs your real data is tagged:
- **Price** (`$59` / `$99` / `Save 40%`) — nav, hero, savings ledger, offer card, mobile buy bar.
- **Social proof numbers** (`2,000+`, `4.9`) — use real figures only.
- **Savings math** (`~$35 every 2 weeks`, `$910/yr`, `$850+`) — set to your market's real barber prices.
- **Reviews** — replace with real, attributable testimonials.
- **Footer links / email / domain** — Shipping, Contact, Terms, Privacy, `hello@fadeclipper.com`.
- **Shipping window** in the FAQ.

### Wire up checkout
The main buy button is `#checkoutBtn` in `index.html`. Replace `href="#"` with your real checkout URL
(Shopify, Stripe Payment Link, etc.). All other `Buy`/`Get FadeClipper` buttons jump to the `#buy` section.

### Logo
The wordmark is set in Fraunces with a small SVG "fade bars" mark (also the `favicon.svg`).
To use your own logo, drop it into the nav (`.brand`) and footer (`.brand-foot`).

## Deploy
Static — works on Vercel, Netlify, Cloudflare Pages, or GitHub Pages with zero config.
Point your domain at the host and you're live.

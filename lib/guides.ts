// Content-hub guides. Each targets a distinct, real search-intent cluster around
// self-fading and is written to be genuinely useful and unique (not thin/spun) —
// that is what actually ranks in Google's Helpful Content era and what AI answer
// engines quote. They interlink with each other and with the pillar guide
// (/how-to-fade-your-own-hair) and the product page.
//
// Inline formatting supported in text: **bold** and [label](/internal-link).

export type GuideBlock = { p: string } | { ul: string[] } | { ol: string[] } | { tip: string };
export type GuideSection = { id: string; heading: string; blocks: GuideBlock[] };
export type Guide = {
  slug: string;
  metaTitle: string;
  h1: string;
  description: string;
  keywords: string[];
  updated: string; // ISO date
  readingMinutes: number;
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  related: string[]; // other guide slugs
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-fade-the-back-of-your-own-head",
    metaTitle: "How to Fade the Back of Your Own Head (Solo, No Barber) | FadeClipper",
    h1: "How to Fade the Back of Your Own Head",
    description:
      "The back of your head is the hardest part of a self-fade. Here's the exact mirror and phone-camera setup, the gliding technique, and the mistakes to avoid — so you can fade the back solo.",
    keywords: [
      "how to fade the back of your own head",
      "fade back of head yourself",
      "cut the back of your own hair fade",
      "self fade back of head",
      "how to see the back of your head to cut hair",
    ],
    updated: "2026-08-01",
    readingMinutes: 6,
    intro:
      "Fading the sides is easy — you can see them. The **back of your own head** is where most self-fades go wrong, because you're cutting blind. The fix isn't years of practice; it's a good line of sight and an [auto-fade clipper](/product) that blends the gradient for you so overlapping passes still come out smooth. Here's how to fade the back solo.",
    sections: [
      {
        id: "see-the-back",
        heading: "Step 1: Set up so you can actually see the back",
        blocks: [
          { p: "You need a live view of the back of your head. Two setups work, and using both is best:" },
          {
            ul: [
              "**Phone camera (best):** Prop your phone on a shelf behind you, open the front camera or start a video, and angle it at the back of your head. A live video beats a mirror because you see movement in real time.",
              "**Two-mirror method:** Stand with your back to a wall mirror and hold a hand mirror in front of you angled over your shoulder. It takes a second to get used to the reversed movement, but it's reliable.",
            ],
          },
          { tip: "Do a dry run first: move the (switched-off) clipper to the back and watch it in your setup until reaching the back feels natural. Thirty seconds of practice saves a botched line." },
        ],
      },
      {
        id: "find-your-fade-line",
        heading: "Step 2: Find your fade line at the back",
        blocks: [
          {
            p: "Your fade line should be level all the way around — the same height at the back as it is on the sides. Pick your height first: just above the nape for a low fade, mid-way up the occipital bone for a mid fade, higher for a high fade.",
          },
          {
            p: "Because the [FadeClipper](/product) blends below whatever line you choose, you only have to get the **starting height** consistent. The gradient underneath takes care of itself.",
          },
        ],
      },
      {
        id: "glide-technique",
        heading: "Step 3: Glide flat and horizontal across the back",
        blocks: [
          {
            ol: [
              "Hold the clipper flat against your head — blade level, not dug in.",
              "Glide it horizontally across the back, following the curve of your skull. No flicking or scooping motion.",
              "Overlap each pass with the last one by about half. Overlaps are good here — the auto-fade blade blends them together instead of leaving lines.",
              "Work from the bottom up toward your fade line, letting the blade taper the length as you rise.",
            ],
          },
          {
            p: "Keep your head level and your eyes on the live view, not on your hand. Your hand knows where the clipper is; your eyes should be checking the result.",
          },
        ],
      },
      {
        id: "blend-and-check",
        heading: "Step 4: Blend the corners and check for lines",
        blocks: [
          {
            p: "The two back corners (where the back meets the sides, behind each ear) are where hard lines hide. Go over them with light, curved passes to round the transition. Then tilt your head side to side in your camera view and look for any horizontal 'shelf' — if you see one, take a light pass just above it to melt it in.",
          },
          { p: "Finish the neckline last. Decide on a shape — a natural rounded neckline is the most forgiving to do yourself — and clean up any strays below it." },
        ],
      },
      {
        id: "mistakes",
        heading: "Common back-of-head mistakes",
        blocks: [
          {
            ul: [
              "**Chasing symmetry by feel.** Don't. Use the live view — the camera is more honest than your fingers.",
              "**Starting too high.** You can't un-cut. Set the back line low first; raise it once both sides match.",
              "**Digging the corner in.** Behind the ear, keep the blade flat and let it glide, or you'll carve a notch.",
              "**One heavy pass.** Light, overlapping strokes blend far better than a single hard scrape.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How do I see the back of my head to fade it?",
        a: "Use your phone's camera as a live rear-view: prop it behind you and watch the video while you cut. Alternatively, stand with your back to a wall mirror and hold a hand mirror angled over your shoulder. A live phone video is easier because you see movement in real time.",
      },
      {
        q: "Can you really fade the back of your own head solo?",
        a: "Yes. The two things that make it possible are a live view of the back (phone camera) and an auto-fade clipper that blends the gradient mechanically, so your overlapping passes still come out smooth. Most people get a clean back fade on the first or second attempt.",
      },
      {
        q: "Why does the back of my fade have lines?",
        a: "Hard lines come from stopping a pass at the same height every time or pressing too hard. Fix them with light passes just above the line and keep the blade flat and gliding. An auto-fade blade blends overlaps, which removes most lines automatically.",
      },
      {
        q: "What neckline should I do myself?",
        a: "A natural rounded neckline is the most forgiving to cut yourself and grows out cleanly. Blocked (squared) and tapered necklines look sharp but are harder to keep even without a barber's view.",
      },
    ],
    related: ["skin-fade-at-home", "types-of-fades"],
  },

  {
    slug: "skin-fade-at-home",
    metaTitle: "How to Do a Skin Fade at Home (Bald Fade, Step by Step) | FadeClipper",
    h1: "How to Do a Skin Fade at Home",
    description:
      "A skin fade (bald fade) blends your hair all the way down to bare skin. Here's how to do one yourself at home — where to start the fade, how to take it to zero cleanly, and how to avoid patchiness.",
    keywords: [
      "skin fade at home",
      "how to do a skin fade yourself",
      "bald fade at home",
      "skin fade with clippers",
      "how to fade to skin",
    ],
    updated: "2026-08-01",
    readingMinutes: 6,
    intro:
      "A **skin fade** (also called a **bald fade**) takes the hair on the sides and back all the way down to bare skin at the bottom, then blends up into longer hair on top. It's the sharpest-looking fade — and the most unforgiving, because the shortest section shows every mistake. Done right at home with an [auto-fade clipper](/product), it's very achievable. Here's the method.",
    sections: [
      {
        id: "what-makes-it-skin",
        heading: "What makes a fade a 'skin' fade",
        blocks: [
          {
            p: "In a normal fade the shortest point is still a very short length of hair. In a **skin fade**, the bottom section goes down to the skin itself — zero. Everything above it is a smooth gradient from skin up to your top length. The skill is in the transition, not the bald part.",
          },
          {
            p: "With the [FadeClipper](/product), the tapered 45° blade creates that gradient as you glide, so your job is to (1) choose where the fade starts and (2) take the very bottom down to skin cleanly.",
          },
        ],
      },
      {
        id: "choose-height",
        heading: "Step 1: Choose your skin-fade height",
        blocks: [
          {
            ul: [
              "**Low skin fade** — skin starts just above the ear and nape. Subtle, office-friendly, easiest to do yourself.",
              "**Mid skin fade** — skin reaches up to the temple area. The popular all-rounder.",
              "**High skin fade** — skin goes high up the sides for maximum contrast. Boldest, and the least forgiving.",
            ],
          },
          { tip: "Doing your first skin fade? Start low. A low skin fade still looks sharp and leaves you far more room to fix mistakes than a high one." },
        ],
      },
      {
        id: "take-to-skin",
        heading: "Step 2: Take the bottom down to skin",
        blocks: [
          {
            ol: [
              "Start with dry, brushed-down hair so you can see your true length.",
              "Set the clipper to its closest cutting setting and glide the very bottom section — around the ears and along the nape — until it's down to skin. Go with the grain first, then lightly against it to clean up.",
              "Keep the blade flat and let it glide; don't press. Pressing causes irritation and uneven patches, not a closer cut.",
            ],
          },
        ],
      },
      {
        id: "blend-up",
        heading: "Step 3: Blend up from skin to your top length",
        blocks: [
          {
            p: "This is where the auto-fade blade earns its keep. Starting just above the skin section, glide upward in flat, horizontal, overlapping passes. The blade tapers short-to-long as you rise, blending the skin into your longer hair. Work all the way around — sides and back — keeping your fade line level.",
          },
          {
            p: "For the back, set up a phone camera or two mirrors so you can see it — full method in our [guide to fading the back of your own head](/guides/how-to-fade-the-back-of-your-own-head).",
          },
        ],
      },
      {
        id: "avoid-patchiness",
        heading: "How to avoid patchiness and irritation",
        blocks: [
          {
            ul: [
              "**Don't over-shave the skin part.** One clean pass with and against the grain is enough. Repeated scraping irritates skin and can look grey/shadowed.",
              "**Blend in good light.** Patches are shadows you missed — side lighting reveals them.",
              "**Go slow through the transition.** The 1–2 cm just above the skin is the whole illusion; light, patient passes there sell the fade.",
              "**Fade on dry hair, rinse after.** The [FadeClipper](/product) is waterproof, so you can rinse the whole thing (and yourself) in the shower afterward.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can you do a skin fade on yourself?",
        a: "Yes. Take the bottom section down to skin with the clipper's closest setting, then blend upward with an auto-fade blade that tapers the length for you. A low skin fade is the easiest to start with because it leaves the most room to correct mistakes.",
      },
      {
        q: "What's the difference between a skin fade and a bald fade?",
        a: "They're the same thing — both blend the hair down to bare skin at the bottom. 'Bald fade' and 'skin fade' are used interchangeably.",
      },
      {
        q: "How do I get the skin part smooth without a razor?",
        a: "You usually don't need a razor. Use the clipper's closest cutting setting, glide with the grain then lightly against it, and keep the blade flat. That gives a clean skin finish without the irritation a razor can cause.",
      },
      {
        q: "Why does my skin fade look patchy?",
        a: "Patchiness is almost always missed spots (shadows) or over-shaving one area. Work in side lighting so you can see shadows, take light even passes, and don't repeatedly scrape the same spot.",
      },
      {
        q: "How often do I need to redo a skin fade?",
        a: "Skin fades grow out fastest because the contrast is highest — most people refresh the bottom every 1–2 weeks. Doing it at home makes that practical since each touch-up is free and takes a few minutes.",
      },
    ],
    related: ["how-to-fade-the-back-of-your-own-head", "types-of-fades"],
  },

  {
    slug: "types-of-fades",
    metaTitle: "Types of Fades Explained: Low, Mid, High, Skin, Drop & Burst | FadeClipper",
    h1: "Types of Fades Explained (and How to Get Each at Home)",
    description:
      "Low, mid, high, skin, taper, drop and burst fades — what each one is, who it suits, and how to ask for it or do it yourself. A plain-English guide to every type of fade haircut.",
    keywords: [
      "types of fades",
      "fade haircut styles",
      "different types of fades",
      "low fade vs mid fade vs high fade",
      "drop fade vs burst fade",
      "taper vs fade",
    ],
    updated: "2026-08-01",
    readingMinutes: 5,
    intro:
      "Every fade name describes the same basic idea — hair blending from longer on top to shorter on the sides — but they differ in **where the fade starts** and **how it's shaped**. Here's every common type of fade in plain English, who each suits, and how to get it (at the barber or yourself with an [auto-fade clipper](/product)).",
    sections: [
      {
        id: "by-height",
        heading: "Fades by height: low, mid and high",
        blocks: [
          { p: "The most important distinction is simply how high up the head the fade begins." },
          {
            ul: [
              "**Low fade** — starts just above the ear and the nape. Subtle and versatile; great for professional settings and the easiest to do yourself.",
              "**Mid fade** — starts around the temple, roughly halfway up. The most popular all-rounder; balances contrast and subtlety.",
              "**High fade** — starts high on the sides for a bold, high-contrast look. Sharp, but the least forgiving because there's more short hair on show.",
            ],
          },
          {
            p: "With the [FadeClipper](/product) the height is the only real decision — you start your upward glide at that line and the blade blends everything below it.",
          },
        ],
      },
      {
        id: "by-length",
        heading: "Fades by shortest length: taper vs fade vs skin fade",
        blocks: [
          {
            ul: [
              "**Taper** — the gentlest: only the edges (neckline and sideburns) shorten, and the sides stay relatively long. Barely-there and very natural.",
              "**Fade** — the sides blend much shorter than a taper, down to a very short length.",
              "**Skin / bald fade** — the fade goes all the way to bare skin at the bottom. The sharpest and highest-maintenance. See our [skin fade at home guide](/guides/skin-fade-at-home).",
            ],
          },
          {
            p: "Every fade is technically a taper, but not every taper is a full fade. If you've searched 'taper vs fade', that's the whole difference in one line.",
          },
        ],
      },
      {
        id: "by-shape",
        heading: "Fades by shape: drop and burst",
        blocks: [
          {
            ul: [
              "**Drop fade** — the fade line curves down behind the ear, 'dropping' lower at the back for a rounded shape. Flatters most head shapes.",
              "**Burst fade** — the fade fans out in a semicircle around the ear, leaving the back longer. Popular with mohawks and mullets.",
            ],
          },
        ],
      },
      {
        id: "which-suits-you",
        heading: "Which fade suits you?",
        blocks: [
          {
            ul: [
              "**Want low-maintenance / office-safe?** Low fade or taper.",
              "**Want a classic all-rounder?** Mid fade.",
              "**Want maximum contrast?** High fade or high skin fade.",
              "**Rounder head shape?** A drop fade softens the back nicely.",
              "**First time doing it yourself?** Start with a low fade — it's the most forgiving.",
            ],
          },
        ],
      },
      {
        id: "diy",
        heading: "Doing any of these yourself",
        blocks: [
          {
            p: "The reason self-fading used to be hard is that a normal clipper makes you manually blend several guard lengths. An [auto-fade clipper](/product) does that blend mechanically, so the only thing that changes between a low, mid, high, drop or skin fade is **where you start** and **how you shape the line**. For the full step-by-step, see [how to fade your own hair](/how-to-fade-your-own-hair).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between a low, mid and high fade?",
        a: "It's where the fade starts. A low fade begins just above the ear, a mid fade around the temple, and a high fade higher up the side of the head. Higher fades show more short hair and look bolder; lower fades are subtler and easier to do yourself.",
      },
      {
        q: "What is the difference between a fade and a taper?",
        a: "A taper only shortens the edges (neckline and sideburns) and keeps the sides fairly long. A fade blends the whole side and back down to very short or to the skin. Every fade is a kind of taper, but a taper isn't necessarily a full fade.",
      },
      {
        q: "What's the difference between a drop fade and a burst fade?",
        a: "A drop fade curves down behind the ear so the fade line drops lower at the back. A burst fade fans out in a semicircle around the ear and leaves the back longer. Drop fades suit most styles; burst fades pair well with mohawks and mullets.",
      },
      {
        q: "Which type of fade is easiest to do yourself?",
        a: "A low fade or a taper. Both keep the shortest, most visible section low on the head, so mistakes are easier to hide and correct than with a high or high-skin fade.",
      },
    ],
    related: ["how-to-fade-the-back-of-your-own-head", "skin-fade-at-home"],
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);

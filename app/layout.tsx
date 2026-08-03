import type { Metadata } from "next";
import "./globals.css";

// No theme-color meta on purpose — that lets iOS Safari adapt each browser bar to
// the page content at that edge (like flowalarmclock): the orange offer bar at the
// very top makes the status bar orange, while the dark footer keeps the bottom bar
// neutral. Painting the body itself orange would force BOTH bars orange instead.
import { SmoothScroll } from "@/components/SmoothScroll";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { ConsentCards } from "@/components/ConsentCards";
import { VisitorTracker } from "@/components/VisitorTracker";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, CONTACT_EMAIL, SOCIAL_URLS, abs } from "@/lib/site";

const TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Storefront manifest (start_url "/"). The /admin layout overrides this with its
  // own manifest (start_url "/admin") so installing from /admin opens the dashboard.
  manifest: "/site.webmanifest",
  title: TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "shopping",
  keywords: [
    "fade your own hair", "auto fade clipper", "self fade clipper", "fade clipper",
    "how to fade your own hair", "cordless hair clipper", "hair fade at home",
    "skin fade at home", "best clipper to fade your own hair", "FadeClipper",
  ],
  // Tell Google to use full-length snippets and large image previews — better rich
  // results in Search and better material for AI answer engines to quote.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION in Vercel to verify the domain in Search Console
  // (adds the <meta name="google-site-verification"> tag on next deploy).
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  // Favicon (browser tab + Google result) comes from app/icon.png, app/apple-icon.png
  // and app/favicon.ico. The link-share preview comes from app/opengraph-image.png +
  // app/twitter-image.png — all via Next's file conventions, so no images are set here.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Site-wide structured data: the brand (Organization) and the site (WebSite).
// This is what lets Google build a brand knowledge panel and helps AI engines
// attribute facts to "FadeClipper" the company.
const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: abs("/icon.png") },
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      sameAs: SOCIAL_URLS,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Empty theme-color, exactly like flowalarmclock — lets iOS Safari colour
            the status bar from the page content (the orange offer bar) instead of
            defaulting it. */}
        <meta name="theme-color" content="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={SITE_SCHEMA} />
        <a href="#content" className="skip-link">Skip to content</a>
        <CurrencyProvider>
          <div id="content">
            <SmoothScroll>{children}</SmoothScroll>
          </div>
          <ConsentCards />
          <VisitorTracker />
        </CurrencyProvider>
      </body>
    </html>
  );
}

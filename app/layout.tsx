import type { Metadata } from "next";
import "./globals.css";

// No theme-color meta on purpose — that lets iOS Safari adapt each browser bar to
// the page content at that edge (like flowalarmclock): the orange offer bar at the
// very top makes the status bar orange, while the dark footer keeps the bottom bar
// neutral. Painting the body itself orange would force BOTH bars orange instead.
import { SmoothScroll } from "@/components/SmoothScroll";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { ConsentCards } from "@/components/ConsentCards";

export const metadata: Metadata = {
  metadataBase: new URL("https://fadeclipper.com"),
  title: "FadeClipper — Fade your own hair in minutes",
  description:
    "The auto-fading clipper that blends a salon-quality fade for you. One swipe, fade done. Cordless, waterproof, 240-minute runtime.",
  // Favicon (the circle in Google results + browser tab) comes from app/icon.png
  // and app/apple-icon.png via Next's file convention.
  openGraph: {
    title: "FadeClipper — Fade your own hair in minutes",
    description: "The auto-fading clipper that blends your fade for you. One swipe, fade done.",
    images: ["/assets/img/product-hero.jpg"],
    type: "website",
  },
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
        <a href="#content" className="skip-link">Skip to content</a>
        <CurrencyProvider>
          <div id="content">
            <SmoothScroll>{children}</SmoothScroll>
          </div>
          <ConsentCards />
        </CurrencyProvider>
      </body>
    </html>
  );
}

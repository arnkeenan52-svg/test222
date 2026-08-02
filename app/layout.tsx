import type { Metadata, Viewport } from "next";
import "./globals.css";

// Orange iOS status-bar strip (the area behind the clock/battery).
// Two mechanisms, so it's orange regardless of how iOS treats the page:
//   1. theme-color  — Safari/Chrome tint the browser chrome to this colour.
//   2. viewport-fit=cover + the offer bar padding its top safe-area  — lets the
//      orange offer bar render UP behind the status bar, so even when Safari
//      ignores theme-color it still samples orange (this is what flowalarmclock
//      relies on). The safe-area padding lives on the offer bar in SiteNav.
export const viewport: Viewport = {
  themeColor: "#ec6324",
  viewportFit: "cover",
};
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

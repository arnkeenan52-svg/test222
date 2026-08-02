import type { Metadata, Viewport } from "next";
import "./globals.css";

// Orange iOS status-bar strip (behind the clock/battery). iOS Safari colours it
// from the document background-color, so the real work is html/body being orange
// (see globals.css). theme-color is kept as a second signal for Android Chrome.
export const viewport: Viewport = {
  themeColor: "#ec6324",
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

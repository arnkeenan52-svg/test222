import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
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
        <CurrencyProvider>
          <CartProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <CartDrawer />
            <ConsentCards />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

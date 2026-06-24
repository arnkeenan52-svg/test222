import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://fadeclipper.com"),
  title: "FadeClipper — Fade your own hair in minutes",
  description:
    "The auto-fading clipper that blends a salon-quality fade for you. One swipe, fade done. Cordless, waterproof, 240-minute runtime.",
  icons: { icon: "/assets/img/favicon.svg" },
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

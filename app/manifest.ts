import type { MetadataRoute } from "next";

// Web app manifest — controls the "Add to Home Screen" install on Android/desktop.
// The homescreen icon is the clean 4-white-stripes mark on a black background.
// (iOS uses app/apple-icon.png, which matches.)
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FadeClipper",
    short_name: "FadeClipper",
    description: "The auto-fading cordless hair clipper.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon-app-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-app-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-app-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

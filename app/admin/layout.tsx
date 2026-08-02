import type { Metadata } from "next";

// The admin gets its own manifest (start_url /admin) + iOS web-app meta so it can
// be installed to the home screen and opens straight into the dashboard.
export const metadata: Metadata = {
  title: "Admin · FadeClipper",
  robots: { index: false, follow: false },
  manifest: "/admin.webmanifest",
  appleWebApp: { capable: true, title: "FadeClipper Admin", statusBarStyle: "black-translucent" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

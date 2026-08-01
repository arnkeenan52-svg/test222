import { Logo } from "@/components/Logo";

const footerLinks: [string, string][] = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Shipping", "/shipping"],
  ["Returns", "/returns"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
];

export function PageShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line">
        <div className="container-x flex items-center justify-between py-5">
          <a href="/" aria-label="FadeClipper home" className="text-ink">
            <Logo />
          </a>
          <a href="/" className="text-[0.9rem] font-medium text-muted transition-colors hover:text-ink">
            &larr; Back to store
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="container-x py-[clamp(2.5rem,6vw,4.5rem)]">
          <div className="mx-auto max-w-[760px]">
            <h1 className="font-display text-[clamp(2rem,4.6vw,3rem)] font-bold leading-tight tracking-[-0.02em]">{title}</h1>
            {intro && <p className="mt-4 text-[1.08rem] text-muted">{intro}</p>}
            {updated && <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>}
            <div className="prose-fc mt-9">{children}</div>
          </div>
        </div>
      </main>

      <footer className="border-t border-line bg-paper-alt py-9">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 text-[0.85rem] text-muted">
          <span>&copy; {new Date().getFullYear()} FadeClipper</span>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

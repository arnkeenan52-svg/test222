// Reddit trust badge. NOTE: this is a marketing/social-proof claim — keep it
// truthful. Adjust the communities/wording to match your actual traction.
function Snoo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Reddit">
      <circle cx="24" cy="24" r="24" fill="#FF4500" />
      <line x1="24" y1="23" x2="30.5" y2="10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="31" cy="9.5" r="3" fill="#fff" />
      <ellipse cx="24" cy="30" rx="15" ry="11" fill="#fff" />
      <circle cx="9.5" cy="28.5" r="4.6" fill="#fff" />
      <circle cx="38.5" cy="28.5" r="4.6" fill="#fff" />
      <circle cx="19" cy="29" r="2.5" fill="#FF4500" />
      <circle cx="29" cy="29" r="2.5" fill="#FF4500" />
      <path d="M17.5 35.5 Q24 40 30.5 35.5" stroke="#FF4500" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function TrustedByReddit() {
  return (
    <section className="py-[clamp(2rem,4vw,3rem)]">
      <div className="container-x">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 rounded-4xl border border-line bg-white p-6 text-center shadow-card sm:flex-row sm:text-left">
          <Snoo className="h-14 w-14 shrink-0" />
          <div>
            <p className="font-display text-[1.15rem] font-bold text-ink">Trusted by Reddit</p>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">
              Recommended by self-cutters across <span className="font-medium text-ink">r/SelfBarber</span>,{" "}
              <span className="font-medium text-ink">r/Barber</span> and <span className="font-medium text-ink">r/malegrooming</span> — a
              go-to pick for a clean fade at home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check, X } from "lucide-react";

type Cell = boolean | string;
const cols = ["FadeClipper", "Ordinary clipper", "Barber visit"];
const rows: { label: string; values: Cell[] }[] = [
  { label: "Auto-fades & blends the gradient for you", values: [true, false, true] },
  { label: "No skill or second mirror needed", values: [true, false, "—"] },
  { label: "Fade anytime, at home", values: [true, "Hard", false] },
  { label: "Waterproof, rinse-clean blade", values: [true, "Some", "—"] },
  { label: "240-min cordless runtime", values: [true, "Varies", "—"] },
  { label: "Cost in year one", values: ["$59 once", "$30–60", "$900+"] },
];

function Mark({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-brand" strokeWidth={3} />;
  if (v === false) return <X className="mx-auto h-5 w-5 text-muted/50" strokeWidth={2.5} />;
  return <span className="text-[0.86rem] font-medium text-ink-2">{v}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        {/* header */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-end">
          <div />
          {cols.map((c, i) => (
            <div
              key={c}
              className={`px-3 pb-4 text-center ${
                i === 0
                  ? "rounded-t-[4px] border-x border-t border-ink bg-ink pt-4 text-paper"
                  : "pt-4 text-ink-2"
              }`}
            >
              <span className="font-display text-[1rem] font-semibold">{c}</span>
              {i === 0 && (
                <span className="mt-1 block text-[0.66rem] font-medium uppercase tracking-[0.12em] text-paper/60">
                  You
                </span>
              )}
            </div>
          ))}
        </div>
        {/* rows */}
        {rows.map((r, ri) => (
          <div
            key={r.label}
            className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center ${
              ri % 2 ? "bg-paper-alt/60" : ""
            }`}
          >
            <div className="py-3.5 pl-1 pr-3 text-[0.92rem] font-medium">{r.label}</div>
            {r.values.map((v, ci) => (
              <div
                key={ci}
                className={`py-3.5 text-center ${
                  ci === 0
                    ? `border-x border-ink bg-brand-soft ${ri === rows.length - 1 ? "rounded-b-[4px] border-b" : ""}`
                    : ""
                }`}
              >
                <Mark v={v} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

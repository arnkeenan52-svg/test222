"use client";
import { Check, X } from "lucide-react";
import { useContent } from "@/components/useContent";

type Cell = boolean | string;

function Mark({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-brand sm:h-5 sm:w-5" strokeWidth={3} />;
  if (v === false) return <X className="mx-auto h-4 w-4 text-muted/50 sm:h-5 sm:w-5" strokeWidth={2.5} />;
  return <span className="text-[0.7rem] font-medium text-ink-2 sm:text-[0.85rem]">{v}</span>;
}

const grid = "grid grid-cols-[1.25fr_repeat(3,minmax(0,1fr))]";

export function ComparisonTable() {
  const { cols, rows, you } = useContent().compare;
  return (
    <div className="mx-auto max-w-[560px]">
      {/* header */}
      <div className={`${grid} items-end`}>
        <div />
        {cols.map((c, i) => (
          <div
            key={c}
            className={`px-0.5 pb-3 text-center sm:px-3 ${
              i === 0
                ? "rounded-t-[4px] border-x border-t border-ink bg-ink pt-3 text-paper"
                : "pt-3 text-ink-2"
            }`}
          >
            <span
              className={`font-display font-semibold leading-tight sm:text-[0.98rem] ${
                i === 0 ? "text-[0.62rem] tracking-[-0.03em]" : "text-[0.72rem]"
              }`}
            >
              {c}
            </span>
            {i === 0 && (
              <span className="mt-0.5 block text-[0.54rem] font-medium uppercase tracking-[0.1em] text-paper/60 sm:text-[0.66rem]">
                {you}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* rows */}
      {rows.map((r, ri) => (
        <div key={r.label} className={`${grid} items-center ${ri % 2 ? "bg-paper-alt/60" : ""}`}>
          <div className="py-3 pl-1 pr-1.5 text-[0.74rem] font-medium leading-tight sm:pr-3 sm:text-[0.92rem]">{r.label}</div>
          {r.values.map((v, ci) => (
            <div
              key={ci}
              className={`py-3 text-center ${
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
  );
}

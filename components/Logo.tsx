import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 40 28" className="h-[18px] w-[26px] fill-current" aria-hidden="true">
        <rect x="2" y="3" width="3.4" height="22" rx="1.7" />
        <rect x="11" y="7" width="3.4" height="18" rx="1.7" />
        <rect x="20" y="11" width="3.4" height="14" rx="1.7" />
        <rect x="29" y="15" width="3.4" height="10" rx="1.7" />
      </svg>
      <span className="font-display text-[1.05rem] font-bold tracking-[0.02em]">FADECLIPPER</span>
    </span>
  );
}

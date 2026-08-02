import { cn } from "@/lib/utils";

export function Logo({ className, size = "default" }: { className?: string; size?: "default" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={cn("inline-flex items-center", lg ? "gap-2.5" : "gap-2", className)}>
      <svg viewBox="0 0 40 28" className={cn("fill-current", lg ? "h-[26px] w-[37px]" : "h-[18px] w-[26px]")} aria-hidden="true">
        <rect x="2" y="3" width="3.4" height="22" rx="1.7" />
        <rect x="11" y="7" width="3.4" height="18" rx="1.7" />
        <rect x="20" y="11" width="3.4" height="14" rx="1.7" />
        <rect x="29" y="15" width="3.4" height="10" rx="1.7" />
      </svg>
      <span className={cn("font-display font-bold tracking-[0.02em]", lg ? "text-[1.4rem]" : "text-[1.05rem]")}>FADECLIPPER</span>
    </span>
  );
}

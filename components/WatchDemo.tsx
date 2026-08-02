"use client";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WatchDemo({ className, size = "lg" }: { className?: string; size?: "default" | "lg" | "sm" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button size={size} variant="outline" onClick={() => setOpen(true)} className={cn("w-full", className)}>
        <Play className="h-4 w-4 fill-current" /> See how it works
      </Button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How the FadeClipper works — demo video"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close demo"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <video
              src="/assets/video/demo-cut.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="max-h-[85vh] w-auto max-w-[92vw] rounded-3xl bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}

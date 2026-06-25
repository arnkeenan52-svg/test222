"use client";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WatchDemo({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="lg" variant="outline" onClick={() => setOpen(true)} className={cn("w-full", className)}>
        <Play className="h-4 w-4 fill-current" /> See how it works
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close"
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
              className="max-h-[85vh] w-auto max-w-[92vw] rounded-3xl bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}

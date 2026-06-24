"use client";
import { useState } from "react";

export type GalleryImage = { src: string; alt: string };

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="md:sticky md:top-6">
      <div className="overflow-hidden rounded-4xl bg-card">
        <img
          src={images[active].src}
          alt={images[active].alt}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-label={`View ${img.alt}`}
            className={`shrink-0 overflow-hidden rounded-2xl border-2 transition-colors ${
              i === active ? "border-brand" : "border-line hover:border-line-2"
            }`}
          >
            <img src={img.src} alt="" className="h-16 w-16 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

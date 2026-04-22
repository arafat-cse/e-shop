"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  title: string;
  images: string[];
};

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="grid gap-4 md:grid-cols-[72px_1fr]">
      <div className="order-2 grid grid-cols-4 gap-3 md:order-1 md:grid-cols-1">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-sm border bg-white",
              activeImage === image ? "border-primary ring-1 ring-primary" : "border-border"
            )}
          >
            <Image src={image} alt={`${title} ${index + 1}`} fill className="object-contain p-1" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-square overflow-hidden rounded-sm border border-border bg-white md:order-2">
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-contain p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export function Gallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const prev = React.useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? 0 : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const next = React.useCallback(
    () =>
      setOpenIndex((i) => (i === null ? 0 : (i + 1) % images.length)),
    [images.length]
  );

  // Keyboard navigation in lightbox.
  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, prev, next, close]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-sand transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && close()}
      >
        <DialogContent
          hideCloseButton
          className="max-w-5xl border-0 bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">
            {openIndex !== null ? images[openIndex].alt : "Gallery image"}
          </DialogTitle>
          {openIndex !== null && (
            <div className="relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink">
                <Image
                  src={images[openIndex].src.replace("w=1200", "w=1920")}
                  alt={images[openIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute -top-4 -right-4 inline-flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-soft hover:bg-accent"
              >
                <X className="size-5" />
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
              >
                <ChevronRight className="size-5" />
              </button>

              <p className="absolute inset-x-0 bottom-4 text-center text-xs uppercase tracking-[0.16em] text-white">
                {images[openIndex].alt}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

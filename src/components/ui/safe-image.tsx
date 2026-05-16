"use client";
import * as React from "react";
import Image, { type ImageProps } from "next/image";

/** Drop-in replacement for next/image that shows a branded fallback on error. */
export function SafeImage(props: ImageProps) {
  const [errored, setErrored] = React.useState(false);
  if (errored) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-sand to-accent/20"
        aria-label={typeof props.alt === "string" ? props.alt : "Image unavailable"}
      >
        <span className="px-4 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          {typeof props.alt === "string" && props.alt ? props.alt : "Image"}
        </span>
      </div>
    );
  }
  return <Image {...props} onError={() => setErrored(true)} />;
}

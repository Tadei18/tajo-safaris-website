"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const total = testimonials.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-primary">From the Guestbook</p>
            <h2 className="h2-section mt-3 max-w-2xl font-display font-medium text-ink">
              What travellers say after they get home.
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink-soft transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink-soft transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </header>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
              >
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-surface p-6 shadow-soft">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-4",
                          i < Math.round(t.rating)
                            ? "fill-accent"
                            : "fill-transparent"
                        )}
                      />
                    ))}
                  </div>
                  <blockquote className="text-base leading-relaxed text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-auto border-t border-ink/10 pt-4 text-xs">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-ink-soft">
                      {t.country} · {t.tourTitle}
                    </p>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-ink/20 hover:bg-ink/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

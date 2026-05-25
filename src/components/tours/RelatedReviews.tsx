import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function RelatedReviews({ tourSlug }: { tourSlug: string }) {
  const matching = testimonials.filter((t) => t.tourSlug === tourSlug);
  if (matching.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="border-t border-ink/10 pt-16">
        <p className="eyebrow text-primary">From the Guestbook</p>
        <h2 className="mt-3 font-display text-3xl font-medium">
          What travellers said about this safari
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matching.map((t) => (
            <article
              key={t.name}
              className="flex h-full flex-col gap-4 rounded-2xl bg-surface p-6 shadow-soft"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < Math.round(t.rating) ? "fill-accent" : "fill-transparent"
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What travellers say about safari trips with Tajo Safaris and Tours — Maasai Mara, Amboseli, Samburu, and beyond.",
};

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[30vh] items-end bg-primary pt-32 pb-12 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-accent">Reviews</p>
          <h1 className="h1-hero mt-3 font-display font-bold">
            What travellers say about Tajo
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            Real notes from real trips.
          </p>
        </div>
      </section>

      {/* All reviews */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="flex flex-col gap-4 rounded-2xl bg-surface p-7 shadow-soft"
              >
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="h2-section font-display font-medium">
            Got a story from your trip?
          </h2>
          <p className="mt-4 text-base text-white/80">
            We&apos;d love to read it.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={"/contact?subject=review" as "/contact"}>
              <Button variant="accent" size="lg">
                Share your review →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

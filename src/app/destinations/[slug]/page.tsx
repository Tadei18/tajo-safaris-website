import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Cat,
  Wind,
  Eye,
  Mountain,
  Waves,
  Shield,
  Droplet,
  Moon,
  Bird,
  Triangle,
  TreePine,
  Heart,
  Shell,
  Fish,
  type LucideIcon,
} from "lucide-react";
import { destinations, getDestination } from "@/data/destinations";
import { tours } from "@/data/tours";
import { destinationMetadata } from "@/data/seo";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/TourCard";
import { StatsRow } from "@/components/destinations/StatsRow";
import { BestTimeChart } from "@/components/destinations/BestTimeChart";
import { touristDestinationJsonLd } from "@/lib/schema";

const SPECIES_ICONS: Record<string, LucideIcon> = {
  Cat, Wind, Eye, Mountain, Waves, Shield, Droplet, Moon,
  Bird, Triangle, TreePine, Heart, Shell, Fish,
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return destinationMetadata(d);
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const relatedTours = tours
    .filter((t) =>
      t.destinations.includes(d.slug as (typeof t.destinations)[number])
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[55vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src={d.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-white lg:px-10">
          <nav aria-label="Breadcrumb" className="text-xs text-white/80">
            <Link href="/destinations" className="hover:text-accent">
              Destinations
            </Link>
            <span className="mx-2">›</span>
            <span>{d.name}</span>
          </nav>
          <h1 className="h1-hero mt-4 font-display font-bold">{d.name}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            {d.oneLineDraw}
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-12 max-w-7xl px-6 lg:px-10">
        <StatsRow destination={d} />
      </div>

      {/* Why go */}
      <section className="bg-bg py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3 lg:px-10">
          <div className="lg:col-span-1">
            <p className="eyebrow text-primary">Why Go</p>
            <h2 className="h2-section mt-3 font-display font-medium text-ink">
              The reason to be here.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-ink-soft lg:col-span-2">
            {d.whyGo.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll see */}
      <section className="bg-sand/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-primary">What You&apos;ll See</p>
          <h2 className="h2-section mt-3 font-display font-medium text-ink">
            Headline species.
          </h2>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.species.map((s) => {
              const Icon = SPECIES_ICONS[s.icon] ?? Cat;
              return (
                <li
                  key={s.name}
                  className="rounded-2xl bg-surface p-5 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {s.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">{s.note}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Best time */}
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-primary">Best Time to Visit</p>
          <h2 className="h2-section mt-3 max-w-2xl font-display font-medium text-ink">
            Month by month.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink-soft">
            Wildlife-viewing quality, scored from off-season to peak. Rains,
            migrations and water levels all shape what you&apos;ll see when.
          </p>
          <div className="mt-8">
            <BestTimeChart scores={d.monthlyScore} />
          </div>
        </div>
      </section>

      {/* Related safaris */}
      {relatedTours.length > 0 && (
        <section className="bg-sand/30 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="eyebrow text-primary">Safaris</p>
            <h2 className="h2-section mt-3 font-display font-medium text-ink">
              Trips that include {d.name}.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="h2-section font-display font-medium">
            Plan a custom safari to {d.name}.
          </h2>
          <p className="mt-4 text-base text-white/80">
            Tell us your dates and what you want to see. We&apos;ll send back
            an itinerary built specifically for this destination, within 24
            hours.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button size="lg">Start Planning</Button>
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(touristDestinationJsonLd(d)),
        }}
      />
    </>
  );
}

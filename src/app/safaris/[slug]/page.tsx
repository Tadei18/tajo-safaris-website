import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import {
  Sunrise,
  Camera,
  Tent,
  Users,
  Mountain,
  Check,
  X as XIcon,
  Star,
  ChevronRight,
} from "lucide-react";
import { tours, getTour, getRelatedTours } from "@/data/tours";
import { tourMetadata } from "@/data/seo";
import { Badge } from "@/components/ui/badge";
import { TourCard } from "@/components/tours/TourCard";
import { ItineraryAccordion } from "@/components/tours/ItineraryAccordion";
import { InquirySidebar } from "@/components/tours/InquirySidebar";
import { RouteMap } from "@/components/tours/RouteMap";
import { Gallery } from "@/components/tours/Gallery";
import { FaqAccordion } from "@/components/tours/FaqAccordion";
import { RelatedReviews } from "@/components/tours/RelatedReviews";
import { MobileInquiryBar } from "@/components/tours/MobileInquiryBar";
import { Button } from "@/components/ui/button";
import { formatUsd } from "@/lib/utils";
import { touristTripJsonLd, faqPageJsonLd } from "@/lib/schema";

// Map highlight icon names from data to lucide components.
const HIGHLIGHT_ICONS = {
  Sunrise,
  Camera,
  Tent,
  Users,
  Mountain,
} as const;

export const dynamic = "force-static";

export async function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return tourMetadata(tour);
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();
  const related = getRelatedTours(slug, 3);

  return (
    <>
      {/* 1. Hero strip */}
      <section className="relative isolate flex min-h-[60vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <SafeImage
            src={tour.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/30" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-white lg:px-10">
          <nav aria-label="Breadcrumb" className="text-xs text-white/80">
            <Link href="/safaris" className="hover:text-accent">
              Safaris
            </Link>
            <ChevronRight className="inline size-3 mx-1" />
            <span>{tour.title}</span>
          </nav>

          <h1 className="mt-4 h1-hero font-display font-bold">{tour.title}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="accent">{tour.durationDays} Days</Badge>
            <Badge variant="white">{tour.style}</Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              Max {tour.groupSizeMax} guests
            </Badge>
            <span className="inline-flex items-center gap-1 text-white/90">
              <Star className="size-4 fill-accent text-accent" />
              {tour.rating} ({tour.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-white/70">
                From
              </span>
              <p className="font-display text-4xl font-bold text-accent">
                {formatUsd(tour.priceFromUsd)}
                <span className="text-sm font-normal text-white/80">
                  {" "}
                  / person, double occupancy
                </span>
              </p>
            </div>
            <Link href="#inquire" className="hidden sm:block">
              <Button variant="accent" size="lg">Inquire</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg pb-32 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_360px] lg:gap-12 lg:px-10">
          {/* Left column — main content */}
          <div className="space-y-16">
            {/* 3. Overview */}
            <div>
              <p className="eyebrow text-primary">About This Safari</p>
              <h2 className="h2-section mt-3 font-display font-medium">
                {tour.shortDescription}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                {tour.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* 4. Highlights */}
            <div>
              <p className="eyebrow text-primary">Highlights</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                What this trip is built around.
              </h3>
              <ul className="mt-6 space-y-4">
                {tour.highlights.map((h, i) => {
                  const Icon =
                    HIGHLIGHT_ICONS[h.icon as keyof typeof HIGHLIGHT_ICONS] ??
                    Sunrise;
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <p className="text-base text-ink">{h.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 5. Itinerary */}
            <div>
              <p className="eyebrow text-primary">Itinerary</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                Day by day.
              </h3>
              <div className="mt-6">
                <ItineraryAccordion days={tour.itinerary} />
              </div>
            </div>

            {/* 6. Inclusions / Exclusions */}
            <div>
              <p className="eyebrow text-primary">What&apos;s Included</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                Inclusions &amp; exclusions.
              </h3>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-sm font-semibold text-primary">
                    Included
                  </p>
                  <ul className="space-y-2 text-sm">
                    {tour.inclusions.map((it, i) => (
                      <li key={i} className="flex gap-2">
                        <Check className="size-4 shrink-0 text-primary mt-0.5" />
                        <span className="text-ink">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-rust">
                    Not included
                  </p>
                  <ul className="space-y-2 text-sm">
                    {tour.exclusions.map((it, i) => (
                      <li key={i} className="flex gap-2">
                        <XIcon className="size-4 shrink-0 text-ink-soft mt-0.5" />
                        <span className="text-ink-soft">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Route map */}
            <div>
              <p className="eyebrow text-primary">Route</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                Where you&apos;ll go.
              </h3>
              <div className="mt-6">
                <RouteMap stops={tour.routeStops} />
              </div>
            </div>

            {/* 8. Gallery */}
            <div>
              <p className="eyebrow text-primary">Gallery</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                A taste of what you&apos;ll see.
              </h3>
              <div className="mt-6">
                <Gallery images={tour.gallery} />
              </div>
            </div>

            {/* 9. FAQs */}
            <div id="inquire">
              <p className="eyebrow text-primary">Good to Know</p>
              <h3 className="mt-3 font-display text-3xl font-medium">
                Frequently asked.
              </h3>
              <div className="mt-6">
                <FaqAccordion faqs={tour.faqs} />
              </div>
            </div>
          </div>

          {/* Right column — sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <InquirySidebar tour={tour} />
            </div>
          </div>
        </div>

        {/* 10b. Reviews for this safari */}
        <RelatedReviews tourSlug={tour.slug} />

        {/* 11. Related safaris */}
        {related.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="border-t border-ink/10 pt-16">
              <p className="eyebrow text-primary">More Trips</p>
              <h2 className="mt-3 font-display text-3xl font-medium">
                Other safaris you might like.
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((t) => (
                  <TourCard key={t.slug} tour={t} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 10. Mobile sticky inquiry */}
      <MobileInquiryBar tour={tour} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(touristTripJsonLd(tour)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(tour.faqs)),
        }}
      />
    </>
  );
}

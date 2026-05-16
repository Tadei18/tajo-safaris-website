import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tour } from "@/types";
import { formatUsd } from "@/lib/utils";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/safaris/${tour.slug}` as `/safaris/${string}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lifted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <SafeImage
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <Badge variant="primary">{tour.durationDays} Days</Badge>
          <Badge variant="sand">{tour.style}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink group-hover:text-primary transition-colors">
          {tour.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">
          {tour.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-ink-soft">
          {tour.routeLabel.map((stop, i) => (
            <span key={`${stop}-${i}`} className="inline-flex items-center gap-1">
              {i > 0 && <span className="text-ink/30">→</span>}
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3 text-primary-300" />
                {stop}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-ink-soft">
              From
            </span>
            <p className="font-display text-2xl font-bold text-rust">
              {formatUsd(tour.priceFromUsd)}
              <span className="text-xs font-normal text-ink-soft">
                {" "}
                / person
              </span>
            </p>
          </div>
          <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
            View itinerary →
          </span>
        </div>
      </div>
    </Link>
  );
}

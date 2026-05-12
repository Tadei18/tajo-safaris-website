import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types";

export function DestinationCard({
  destination,
  size = "default",
}: {
  destination: Destination;
  size?: "default" | "compact";
}) {
  const aspect = size === "compact" ? "aspect-[4/5]" : "aspect-[3/4]";
  return (
    <Link
      href={`/destinations/${destination.slug}` as `/destinations/${string}`}
      className={`group relative block overflow-hidden rounded-2xl border border-sand bg-surface shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lifted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4`}
    >
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={destination.heroImage}
          alt={`${destination.name} — ${destination.oneLineDraw}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-display text-2xl font-semibold leading-tight">
            {destination.name}
          </h3>
          <p className="mt-1 text-sm text-white/85">
            {destination.oneLineDraw}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}

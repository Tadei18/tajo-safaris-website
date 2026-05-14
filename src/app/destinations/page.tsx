import type { Metadata } from "next";
import Image from "next/image";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { destinationsListMetadata } from "@/data/seo";

export const metadata: Metadata = destinationsListMetadata;

export default function DestinationsPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[40vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1920&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-white lg:px-10">
          <p className="eyebrow text-accent">Destinations</p>
          <h1 className="h1-hero mt-3 font-display font-bold">
            Where to point your binoculars.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Eight Kenyan destinations, each with its own draw. Pick one, pair
            them, or let us route a circuit.
          </p>
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

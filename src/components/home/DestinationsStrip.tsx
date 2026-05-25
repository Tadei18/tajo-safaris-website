import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";

export function DestinationsStrip() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="eyebrow text-primary">Destinations</p>
          <h2 className="h2-section mt-3 font-display font-medium text-ink">
            Where to point your binoculars.
          </h2>
        </header>

        <div className="mt-10 snap-strip flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-2 md:items-stretch md:gap-6 lg:grid-cols-3">
          {destinations.map((d) => (
            <div
              key={d.slug}
              className="min-w-[78%] flex-shrink-0 sm:min-w-[55%] md:min-w-0"
            >
              <DestinationCard destination={d} size="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

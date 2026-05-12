import Link from "next/link";
import { TourCard } from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

export function SignatureSafaris() {
  return (
    <section className="bg-sand/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-primary">Our Safaris</p>
            <h2 className="h2-section mt-3 max-w-2xl font-display font-medium text-ink">
              Signature trips, ready to tailor.
            </h2>
          </div>
          <Link
            href="/safaris"
            className="text-sm font-semibold text-primary hover:underline"
          >
            See all safaris →
          </Link>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 6).map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}

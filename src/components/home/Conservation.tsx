import Image from "next/image";
import Link from "next/link";

export function Conservation() {
  return (
    <section className="bg-sand/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80"
            alt="A community conservancy ranger looking out across the savanna"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow text-primary">Our Approach</p>
          <h2 className="h2-section mt-3 font-display font-medium text-ink">
            Tourism that earns its place here.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            We contribute a guaranteed conservancy fee for every guest, every
            night — paid directly to community trusts that fund grazing
            management and anti-poaching salaries.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Our guides are locally employed and trained — most are from the
            communities adjoining the reserves they work. The training scheme
            we co-fund admits eight new guides a year.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            We route trips through low-vehicle conservancies wherever
            possible. Less crowding, better wildlife behaviour, and more of
            your trip cost reaching the people whose land you&apos;re
            travelling on.
          </p>
          <Link
            href="/about#conservation"
            className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Read more about how we travel →
          </Link>
        </div>
      </div>
    </section>
  );
}

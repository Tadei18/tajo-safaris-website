import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { guides } from "@/data/guides";
import { getDestination } from "@/data/destinations";
import { aboutMetadata } from "@/data/seo";
import { Button } from "@/components/ui/button";
import type { DestinationSlug } from "@/types";

export const metadata: Metadata = aboutMetadata;

// The parks where Tajo has the deepest guide / camp / conservancy relationships.
const majorDestinations: { slug: DestinationSlug; copy: string }[] = [
  {
    slug: "maasai-mara",
    copy: "Our home park. We work primarily in the Mara Triangle and the northern conservancies (Naboisho, Mara North, Olare Motorogi) — fewer vehicles, off-track game drives, and guides who have tracked these specific lion prides for years. We avoid the central reserve in peak season unless a client specifically wants it.",
  },
  {
    slug: "amboseli",
    copy: "Kilimanjaro views, big-tusker elephants, and one of the few parks where you can predict elephant behaviour because the same family groups have been studied here since the 1970s. We use small mid-range camps in the Kimana corridor — quieter, with better elephant viewing than the main park gates.",
  },
  {
    slug: "samburu",
    copy: "Northern Kenya, semi-arid, and home to the species you won't see further south — reticulated giraffe, Grevy's zebra, gerenuk, Beisa oryx. We pair Samburu with Ol Pejeta and Lewa for travelers who want the wildlife without the crowds.",
  },
  {
    slug: "ol-pejeta",
    copy: "Kenya's rhino stronghold and home to the world's last two northern white rhinos. We have direct conservancy partnerships here, which means our clients get behind-the-scenes access — anti-poaching unit visits, chimp sanctuary, night drives — that day-trippers can't book.",
  },
  {
    slug: "lake-naivasha",
    copy: "Our preferred soft landing. Ninety minutes from Nairobi, no flights needed, and you're on a boat among hippos and fish-eagles by lunchtime. We use Naivasha as a warm-up before the Mara or as a relaxed wind-down — and Crescent Island is one of the most underrated walking safaris in the country.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[40vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <SafeImage
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1920&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-white lg:px-10">
          <p className="eyebrow text-accent">Our Story</p>
          <h1 className="h1-hero mt-3 max-w-2xl font-display font-bold">
            Why we started Tajo.
          </h1>
        </div>
      </section>

      {/* Founder story */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
          <div className="lg:col-span-2">
            <p className="eyebrow text-primary">Founder</p>
            <h2 className="h2-section mt-3 font-display font-medium text-ink">
              Why we started Tajo
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft lg:col-span-3">
            <p>
              Tajo started where every good safari story should — with a guide
              who couldn&apos;t stop talking about the bush. We&apos;re a
              Nairobi-based outfit, family-run, built around the idea that a
              great safari isn&apos;t sold from a brochure. It&apos;s built
              around you, in conversation, by people who actually know where
              the leopards have been hunting this week.
            </p>
            <p>
              We do this because we love it. The team here grew up reading
              these landscapes — the dust patterns, the bird calls, the way the
              wildebeest move in October. Every itinerary we send out gets
              written by someone who has personally been in the camp, eaten the
              food, met the guides. No middlemen, no boilerplate, no copy-paste
              pricing.
            </p>
            <p>
              We&apos;re not the biggest operator in Kenya. We&apos;re not
              trying to be. What we are is the operator that picks up when you
              call, answers your follow-up question within the hour, and treats
              your trip like it&apos;s the only one we&apos;re running. Whether
              it&apos;s your first safari or your fifth, we&apos;ll build it
              around what you actually came for.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations we major in */}
      <section className="bg-bg pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <header className="max-w-2xl">
            <p className="eyebrow text-primary">Where We Operate</p>
            <h2 className="h2-section mt-3 font-display font-medium text-ink">
              Destinations we major in.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Kenya is big. We don&apos;t claim to know every corner of it
              equally well. These are the parks and conservancies where we have
              the deepest relationships — the guides, the camps, the conservancy
              partners. When you book one of these, you&apos;re getting our best.
            </p>
          </header>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {majorDestinations.map((m) => {
              const d = getDestination(m.slug);
              if (!d) return null;
              return (
                <article
                  key={m.slug}
                  className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-soft"
                >
                  <div className="relative aspect-[16/10]">
                    <SafeImage
                      src={d.heroImage}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {d.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {m.copy}
                    </p>
                    <Link
                      href={`/destinations/${m.slug}` as `/destinations/${string}`}
                      className="mt-auto pt-1 text-sm font-semibold text-accent-deep hover:text-accent"
                    >
                      Plan a {d.name} safari →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-sand/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <header>
            <p className="eyebrow text-primary">The Team</p>
            <h2 className="h2-section mt-3 max-w-2xl font-display font-medium text-ink">
              Our guides.
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-soft">
              Every one of them works in the field they grew up in. None of
              them rotates between countries chasing seasons.
            </p>
          </header>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <article
                key={g.name}
                className="overflow-hidden rounded-2xl bg-surface shadow-soft"
              >
                <div className="relative aspect-square">
                  <Image
                    src={g.photo}
                    alt={`Portrait of ${g.name}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold">
                    {g.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    {g.yearsInField} years in the field
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {g.languages.map((l) => (
                      <span
                        key={l}
                        className="rounded-full bg-sand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-medium text-primary">
                    {g.specialty}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {g.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we travel — anchor */}
      <section id="conservation" className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <header className="max-w-2xl">
            <p className="eyebrow text-primary">Our Approach</p>
            <h2 className="h2-section mt-3 font-display font-medium text-ink">
              How we travel.
            </h2>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                Community partnerships
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                We work through the community conservancies that ring the big
                national parks. Profits from conservancy fees go directly to
                landowner trusts — funding grazing management, schools, and
                ranger salaries.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                <strong className="text-ink">
                  We contribute $50/guest/night
                </strong>{" "}
                to the Mara Naboisho Conservancy fund. It&apos;s itemised on
                every Mara trip&apos;s invoice.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                Conservation contribution
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Tajo guides and clients have collectively contributed to the
                Sheldrick Wildlife Trust, the Mara Predator Project, and
                Lewa&apos;s rhino monitoring programme since we started.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                We co-fund the annual Tajo guide-training scheme, which admits
                eight new guides each year from communities adjoining the
                parks.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                Carbon awareness
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                We route trips to minimise internal flying where ground
                transfer is competitive on time. We&apos;re transparent about
                the trade-off — flying is faster, driving is greener, and the
                right answer depends on the trip.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Carbon offsets are available at booking through the Kasigau
                Corridor REDD+ programme. We don&apos;t add them silently;
                you choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Press / recognition */}
      <section className="bg-sand/30 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-center text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            As featured in
          </p>
          {/* TODO: replace placeholder press logos with real brand marks once cleared */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Travel + Leisure", "Condé Nast Traveler", "AFAR", "Robb Report", "Lonely Planet"].map(
              (p) => (
                <span
                  key={p}
                  className="font-display text-lg font-semibold text-ink-soft"
                >
                  {p}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="h2-section font-display font-medium">
            Let&apos;s plan yours.
          </h2>
          <p className="mt-4 text-base text-white/80">
            Tell us what you came to see. We&apos;ll send back a tailored
            itinerary within 24 hours.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/contact">
              <Button variant="accent" size="lg">Start Planning</Button>
            </Link>
            <Link href="/safaris">
              <Button variant="outline" size="lg">
                Browse Safaris
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

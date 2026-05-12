import { Binoculars, Compass, Map } from "lucide-react";

const pillars = [
  {
    icon: Binoculars,
    title: "Guides who read the bush.",
    body: "Average 12+ years tracking wildlife in the parks they grew up around. They know where the lions sleep and where the leopard's been seen this week.",
  },
  {
    icon: Compass,
    title: "Built around you, not a brochure.",
    body: "Every itinerary is rebuilt for your dates, pace, and what you actually want to see. We start with a conversation, not a price list.",
  },
  {
    icon: Map,
    title: "Routed away from the crowds.",
    body: "Private conservancies and timing windows that get you to the sightings before the line of vehicles arrives.",
  },
];

export function WhyTajo() {
  return (
    <section className="bg-primary py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="eyebrow text-accent">Why Tajo</p>
          <h2 className="h2-section mt-3 font-display font-medium">
            What you get that other operators don&apos;t.
          </h2>
        </header>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-accent text-ink">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function IntroBand() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
        <div className="lg:col-span-3">
          <p className="h2-section font-display font-medium text-ink">
            Kenya done properly — by guides who grew up reading these
            landscapes.
          </p>
        </div>
        <ul className="space-y-5 lg:col-span-2">
          {differentiators.map((d) => (
            <li key={d} className="flex gap-4">
              <span
                aria-hidden
                className="mt-2 inline-block size-2 shrink-0 rounded-full bg-accent-deep"
              />
              <span className="text-base text-ink-soft">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const differentiators = [
  "Local guides, average 12+ years in the field.",
  "Tailor-made itineraries, never boilerplate.",
  "Routed through conservancies, away from the crowds.",
];

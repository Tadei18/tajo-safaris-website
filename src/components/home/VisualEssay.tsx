import { SafeImage } from "@/components/ui/safe-image";

const tiles = [
  {
    src: "/images/visual-essay/lion-mara-dawn.webp",
    alt: "Lion in golden first light, Mara Triangle",
    caption: "Lion at first light, Mara Triangle",
    className: "col-span-6 row-span-2",
  },
  {
    src: "/images/visual-essay/elephants-kilimanjaro.webp",
    alt: "Elephant herd silhouetted against Mount Kilimanjaro at sunrise",
    caption: "Elephants under Kilimanjaro, Amboseli",
    className: "col-span-3 row-span-1",
  },
  {
    src: "/images/visual-essay/wild-dogs-laikipia.webp",
    alt: "Wild dog pack on the move in Laikipia scrubland",
    caption: "Wild dogs, Laikipia",
    className: "col-span-3 row-span-1",
  },
  {
    src: "/images/visual-essay/reticulated-giraffe-samburu.webp",
    alt: "Reticulated giraffe close-up in northern Kenya scrub",
    caption: "Reticulated giraffe, Samburu",
    className: "col-span-3 row-span-2",
  },
  {
    src: "/images/visual-essay/flamingos-bogoria.webp",
    alt: "Pink flamingo flock on a Rift Valley lake at dawn",
    caption: "Flamingos, Lake Bogoria",
    className: "col-span-3 row-span-1",
  },
];

export function VisualEssay() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="eyebrow text-primary">Field Notes</p>
          <h2 className="h2-section mt-3 font-display font-medium text-ink">
            Moments we tend to deliver.
          </h2>
        </header>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-6 gap-3 md:auto-rows-[220px] md:gap-4">
          {tiles.map((tile) => (
            <figure
              key={tile.alt}
              className={`group relative overflow-hidden rounded-2xl bg-sand ${tile.className}`}
            >
              <SafeImage
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {tile.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

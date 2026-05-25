import type { RouteStop } from "@/types";

// SVG outline of Kenya — rough, illustrative. The path is hand-tuned to fit
// the 0–100 viewbox so destination coords in `tours.ts` align visually.
const KENYA_OUTLINE =
  "M22 30 L34 18 L48 12 L60 15 L72 22 L80 32 L84 42 L82 56 L88 68 L92 80 L85 90 L70 92 L55 94 L42 92 L30 85 L18 72 L14 58 L18 44 Z";

export function RouteMap({ stops }: { stops: RouteStop[] }) {
  // Build the path between stops.
  const path = stops
    .map((s, i) => `${i === 0 ? "M" : "L"} ${s.x} ${s.y}`)
    .join(" ");

  return (
    <div className="rounded-2xl bg-sand/40 p-6">
      <svg
        viewBox="0 0 100 100"
        className="mx-auto w-full max-w-md"
        aria-labelledby="route-map-title"
        role="img"
      >
        <title id="route-map-title">
          Route map showing the journey across Kenya
        </title>
        <path
          d={KENYA_OUTLINE}
          fill="var(--color-bg)"
          stroke="var(--color-primary-300)"
          strokeWidth="0.4"
        />
        <path
          d={path}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {stops.map((s, i) => (
          <g key={`${s.slug}-${i}`}>
            <circle
              cx={s.x}
              cy={s.y}
              r="1.6"
              fill="var(--color-accent-deep)"
              stroke="var(--color-ink)"
              strokeWidth="0.3"
            />
            <text
              x={s.x + 2.5}
              y={s.y + 1}
              fontSize="3.2"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fill="var(--color-ink)"
            >
              {s.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 text-center text-sm text-ink-soft">
        Route:{" "}
        {stops.map((s, i) => (
          <span key={`${s.slug}-${i}`}>
            {i > 0 && <span className="text-ink/40"> → </span>}
            <span className="font-medium text-ink">{s.label}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

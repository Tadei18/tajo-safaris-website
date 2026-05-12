import { Ruler, Calendar, Sparkles } from "lucide-react";
import type { Destination } from "@/types";

export function StatsRow({ destination }: { destination: Destination }) {
  return (
    <ul className="grid gap-4 rounded-2xl bg-sand/60 p-6 sm:grid-cols-3">
      <li className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Ruler className="size-5" />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-soft">
            Size
          </p>
          <p className="font-display text-lg font-semibold text-ink">
            {destination.sizeKm2 > 0
              ? `${destination.sizeKm2.toLocaleString()} km²`
              : "Coastal — no fixed boundary"}
          </p>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Calendar className="size-5" />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-soft">
            Best months
          </p>
          <p className="font-display text-lg font-semibold text-ink">
            {destination.bestMonths.join(", ")}
          </p>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Sparkles className="size-5" />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-soft">
            Signature wildlife
          </p>
          <p className="font-display text-base font-semibold leading-tight text-ink">
            {destination.signatureWildlife.slice(0, 3).join(" · ")}
          </p>
        </div>
      </li>
    </ul>
  );
}

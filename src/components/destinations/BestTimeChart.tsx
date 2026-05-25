import { cn } from "@/lib/utils";
import type { Month } from "@/types";

const MONTHS: Month[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function BestTimeChart({
  scores,
}: {
  scores: Record<Month, number>;
}) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-soft">
      <div className="flex items-end gap-1.5 sm:gap-2.5">
        {MONTHS.map((m) => {
          const score = scores[m] ?? 0;
          const heightPct = (score / 5) * 100;
          const isPeak = score >= 4.5;
          return (
            <div key={m} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="relative flex w-full items-end justify-center"
                style={{ height: 140 }}
                aria-label={`${m}: ${score} out of 5`}
                role="img"
              >
                <div
                  className={cn(
                    "w-full rounded-t-md transition-all",
                    isPeak ? "bg-accent-deep" : "bg-primary-300/70",
                    score >= 5 && "bg-accent-deep",
                    score < 3 && "bg-primary-300/40"
                  )}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                {m}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-end gap-4 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-accent-deep" /> Peak
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-primary-300/70" />{" "}
          Good
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-primary-300/40" />{" "}
          Off-season
        </span>
      </div>
    </div>
  );
}

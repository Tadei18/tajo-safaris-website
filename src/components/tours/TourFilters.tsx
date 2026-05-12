"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterState = {
  durations: string[];
  styles: string[];
  destinations: string[];
  months: string[];
  sort: string;
};

const DURATIONS = ["3-5", "6-8", "9-12", "13+"] as const;
const STYLES = ["Budget", "Mid-range", "Luxury", "Family"] as const;
const DESTINATIONS = [
  { slug: "maasai-mara", label: "Maasai Mara" },
  { slug: "amboseli", label: "Amboseli" },
  { slug: "tsavo", label: "Tsavo" },
  { slug: "samburu", label: "Samburu" },
  { slug: "lake-nakuru", label: "Lake Nakuru" },
  { slug: "ol-pejeta", label: "Ol Pejeta" },
  { slug: "aberdare", label: "Aberdare" },
  { slug: "diani-beach", label: "Diani Beach" },
];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "shortest", label: "Shortest" },
  { value: "longest", label: "Longest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function getInitial(searchParams: URLSearchParams): FilterState {
  const parseList = (k: string) =>
    searchParams.get(k)?.split(",").filter(Boolean) ?? [];

  // Initial deep-link from quick-match `when`, `days`, `style` query params.
  const durationsFromDays = (() => {
    const days = searchParams.get("days");
    if (!days) return parseList("durations");
    return [days];
  })();
  const stylesFromStyle = (() => {
    const s = searchParams.get("style");
    if (!s) return parseList("styles");
    return [s];
  })();
  const monthsFromWhen = (() => {
    const w = searchParams.get("when");
    if (!w) return parseList("months");
    const map: Record<string, string[]> = {
      "jan-mar": ["Jan", "Feb", "Mar"],
      "apr-jun": ["Apr", "May", "Jun"],
      "jul-sep": ["Jul", "Aug", "Sep"],
      "oct-dec": ["Oct", "Nov", "Dec"],
    };
    return map[w] ?? [];
  })();

  return {
    durations: durationsFromDays,
    styles: stylesFromStyle,
    destinations: parseList("destinations"),
    months: monthsFromWhen,
    sort: searchParams.get("sort") ?? "recommended",
  };
}

export function useFilterState(): [FilterState, (next: Partial<FilterState>) => void, () => void] {
  const searchParams = useSearchParams();
  const router = useRouter();

  const state = React.useMemo(
    () => getInitial(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );

  const update = React.useCallback(
    (next: Partial<FilterState>) => {
      const params = new URLSearchParams();
      const merged = { ...state, ...next };
      if (merged.durations.length)
        params.set("durations", merged.durations.join(","));
      if (merged.styles.length)
        params.set("styles", merged.styles.join(","));
      if (merged.destinations.length)
        params.set("destinations", merged.destinations.join(","));
      if (merged.months.length)
        params.set("months", merged.months.join(","));
      if (merged.sort && merged.sort !== "recommended")
        params.set("sort", merged.sort);
      const qs = params.toString();
      router.replace(`/safaris${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, state]
  );

  const reset = React.useCallback(() => {
    router.replace("/safaris", { scroll: false });
  }, [router]);

  return [state, update, reset];
}

export function TourFilters({
  state,
  onChange,
  onReset,
  resultCount,
}: {
  state: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  resultCount: number;
}) {
  const toggleIn = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const hasFilters =
    state.durations.length ||
    state.styles.length ||
    state.destinations.length ||
    state.months.length;

  return (
    <div className="sticky top-20 z-30 -mx-6 border-y border-ink/10 bg-bg/95 px-6 py-4 backdrop-blur lg:-mx-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <FilterChipGroup
            label="Duration"
            options={DURATIONS.map((d) => ({ value: d, label: `${d} days` }))}
            selected={state.durations}
            onToggle={(v) =>
              onChange({ durations: toggleIn(state.durations, v) })
            }
          />
          <FilterChipGroup
            label="Style"
            options={STYLES.map((s) => ({ value: s, label: s }))}
            selected={state.styles}
            onToggle={(v) => onChange({ styles: toggleIn(state.styles, v) })}
          />
          <div className="ml-auto flex items-center gap-3">
            {hasFilters ? (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-rust"
              >
                <X className="size-3" /> Clear all
              </button>
            ) : null}
            <label className="flex items-center gap-2 text-xs">
              <span className="text-ink-soft">Sort</span>
              <select
                value={state.sort}
                onChange={(e) => onChange({ sort: e.target.value })}
                className="h-9 rounded-full border border-ink/15 bg-white px-3 text-xs text-ink focus-visible:border-primary focus-visible:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <details className="mt-3 group">
          <summary className="cursor-pointer text-xs font-medium text-ink-soft hover:text-ink list-none flex items-center gap-1">
            <span className="group-open:rotate-90 inline-block transition-transform">→</span>
            More filters · destinations &amp; departure month
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            <FilterChipGroup
              label="Destination"
              options={DESTINATIONS.map((d) => ({
                value: d.slug,
                label: d.label,
              }))}
              selected={state.destinations}
              onToggle={(v) =>
                onChange({ destinations: toggleIn(state.destinations, v) })
              }
            />
            <FilterChipGroup
              label="Month"
              options={MONTHS.map((m) => ({ value: m, label: m }))}
              selected={state.months}
              onToggle={(v) => onChange({ months: toggleIn(state.months, v) })}
            />
          </div>
        </details>

        <p className="mt-3 text-xs text-ink-soft">
          {resultCount} {resultCount === 1 ? "safari" : "safaris"} matching
        </p>
      </div>
    </div>
  );
}

function FilterChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="mr-1 text-xs font-medium text-ink-soft">
        {label}
      </legend>
      {options.map((o) => {
        const active = selected.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onToggle(o.value)}
            aria-pressed={active}
            className={cn(
              "h-8 rounded-full border px-3 text-xs font-medium transition-colors",
              active
                ? "border-primary bg-primary text-white"
                : "border-ink/15 bg-white text-ink hover:border-primary"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </fieldset>
  );
}

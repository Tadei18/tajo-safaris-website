"use client";

import * as React from "react";
import Link from "next/link";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import {
  TourFilters,
  useFilterState,
  type FilterState,
} from "@/components/tours/TourFilters";
import type { Tour } from "@/types";
import { Button } from "@/components/ui/button";
import { Telescope } from "lucide-react";

function inDurationBucket(days: number, bucket: string) {
  if (bucket === "3-5") return days >= 3 && days <= 5;
  if (bucket === "6-8") return days >= 6 && days <= 8;
  if (bucket === "9-12") return days >= 9 && days <= 12;
  if (bucket === "13+") return days >= 13;
  return true;
}

function applyFilters(list: Tour[], f: FilterState): Tour[] {
  let out = list.filter((t) => {
    if (f.durations.length && !f.durations.some((d) => inDurationBucket(t.durationDays, d)))
      return false;
    if (f.styles.length && !f.styles.includes(t.style)) return false;
    if (
      f.destinations.length &&
      !t.destinations.some((d) => f.destinations.includes(d))
    )
      return false;
    if (
      f.months.length &&
      !t.bestMonths.some((m) => f.months.includes(m))
    )
      return false;
    return true;
  });

  switch (f.sort) {
    case "shortest":
      out = [...out].sort((a, b) => a.durationDays - b.durationDays);
      break;
    case "longest":
      out = [...out].sort((a, b) => b.durationDays - a.durationDays);
      break;
    case "price-asc":
      out = [...out].sort((a, b) => a.priceFromUsd - b.priceFromUsd);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.priceFromUsd - a.priceFromUsd);
      break;
  }
  return out;
}

export function SafarisListing() {
  const [state, update, reset] = useFilterState();
  const results = applyFilters(tours, state);

  return (
    <section className="bg-bg pb-24">
      <TourFilters
        state={state}
        onChange={update}
        onReset={reset}
        resultCount={results.length}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        {results.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-2xl border border-dashed border-ink/20 bg-surface p-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-sand text-primary">
        <Telescope className="size-6" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold">
          No safaris match these filters yet.
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Let&apos;s build you a custom one instead — tell us your dates and
          what you came to see.
        </p>
      </div>
      <Link href="/contact">
        <Button>Plan a custom safari</Button>
      </Link>
    </div>
  );
}

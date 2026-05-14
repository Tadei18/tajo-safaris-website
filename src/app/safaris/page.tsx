import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { safarisListMetadata } from "@/data/seo";
import { SafarisListing } from "./SafarisListing";

export const metadata: Metadata = safarisListMetadata;

export default function SafarisPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[40vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/30" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-white lg:px-10">
          <p className="eyebrow text-accent">All safaris</p>
          <h1 className="h1-hero mt-3 font-display font-bold">
            Safaris &amp; Tours
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Six signature trips. Each one rebuilt around you.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-32 text-center text-ink-soft">Loading…</div>}>
        <SafarisListing />
      </Suspense>
    </>
  );
}

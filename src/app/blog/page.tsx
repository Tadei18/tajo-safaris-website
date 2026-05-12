import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { blogMetadata } from "@/data/seo";

export const metadata: Metadata = blogMetadata;

export default function BlogPage() {
  return (
    <section className="bg-bg pt-32 pb-24 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BookOpen className="size-6" />
        </span>
        <p className="eyebrow mt-6 text-primary">Field Notes</p>
        <h1 className="h1-hero mt-3 font-display font-bold text-ink">
          Coming soon.
        </h1>
        <p className="mt-5 text-base text-ink-soft sm:text-lg">
          We&apos;re writing up the dispatches — best time to visit, how to
          pack, what the migration actually looks like in October. Drop your
          email to know when they&apos;re live.
        </p>

        <div className="mx-auto mt-10 max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

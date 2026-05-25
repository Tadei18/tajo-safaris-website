import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <Image
        src="/brand/emblem.png"
        alt=""
        aria-hidden
        width={400}
        height={400}
        className="h-48 w-48"
      />
      <h1 className="mt-8 h2-section font-display font-medium text-ink">
        This trail&apos;s gone cold.
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-soft">
        Even our trackers can lose a scent sometimes. Let&apos;s get you back to
        the safaris.
      </p>
      <Link href="/safaris" className="mt-8">
        <Button size="lg">Browse Safaris</Button>
      </Link>
    </section>
  );
}

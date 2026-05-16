"use client";

import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { useChatLauncher } from "@/components/layout/ChatLauncher";
import { whatsappUrl } from "@/lib/constants";

export function FinalCTA() {
  const chat = useChatLauncher();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <SafeImage
          src="https://images.pexels.com/photos/259411/pexels-photo-259411.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/55" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 text-center text-white md:py-32 lg:px-10">
        <h2 className="h2-section mx-auto max-w-2xl font-display font-medium">
          Tell us what you came to see.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/85">
          We&apos;ll send back a tailored itinerary within 24 hours. No
          template, no pressure.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={() => chat.open()}>
            Start Planning
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Or chat on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

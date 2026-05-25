"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroTrust } from "@/lib/constants";
import { useChatLauncher } from "@/components/layout/ChatLauncher";

const words = ["See.", "Encounter.", "Feel the Wild."];

export function Hero() {
  const chat = useChatLauncher();
  return (
    <section className="relative isolate flex min-h-[90vh] items-end overflow-hidden">
      {/* Background image with ken-burns */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary to-accent"
          aria-hidden
        />
        <div className="ken-burns absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
            alt="Elephants on the Maasai Mara savanna at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10 lg:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold uppercase tracking-[0.3em] text-accent text-sm md:text-base"
        >
          Tajo Safaris &amp; Tours
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-2 font-semibold uppercase tracking-[0.2em] text-xs text-sand"
        >
          Kenya · Tanzania · Beyond
        </motion.p>

        <h1 className="mt-4 h1-hero font-display font-bold text-white max-w-3xl">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.3 }}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-6 max-w-2xl text-base text-white/90 sm:text-lg"
        >
          Private, guide-led safaris across Kenya — designed around the
          wildlife you came for, the pace that suits you, and the places
          most travellers never reach.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button variant="accent" size="lg" onClick={() => chat.open()}>
            Plan Your Safari
          </Button>
          <Link href="/safaris">
            <Button size="lg" variant="outline">
              Browse Safaris
            </Button>
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-sand"
        >
          {heroTrust.map((t) => (
            <li
              key={t}
              className="flex items-center gap-4 after:content-['·'] after:text-sand/40 last:after:hidden"
            >
              <span>{t}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

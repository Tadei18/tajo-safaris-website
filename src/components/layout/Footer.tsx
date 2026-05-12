import Link from "next/link";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import {
  contact,
  navLinks,
  siteName,
  siteTagline,
  social,
  trustBadges,
} from "@/lib/constants";

const destinationLinks = [
  { slug: "maasai-mara", label: "Maasai Mara" },
  { slug: "amboseli", label: "Amboseli" },
  { slug: "tsavo", label: "Tsavo" },
  { slug: "samburu", label: "Samburu" },
  { slug: "ol-pejeta", label: "Ol Pejeta" },
  { slug: "lake-nakuru", label: "Lake Nakuru" },
  { slug: "diani-beach", label: "Diani Beach" },
];

// Inline social icons — lucide-react has dropped brand glyphs.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.55 9.88v-6.99H7.9V12h2.55V9.8c0-2.52 1.5-3.92 3.8-3.92 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.58A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.58a3 3 0 0 0 2.1-2.12A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.07v12.42a2.42 2.42 0 0 1-2.42 2.42 2.42 2.42 0 1 1 0-4.83v-3.08a5.51 5.51 0 0 0-5.5 5.5 5.51 5.51 0 0 0 11 0V9.27a7.32 7.32 0 0 0 4.3 1.38v-3.07a4.3 4.3 0 0 1-3.25-1.76Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-bg/90">
      {/* Newsletter band */}
      <section className="border-b border-bg/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 lg:flex-row lg:px-10">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="font-display text-2xl text-bg">
              Bush dispatches — one short email a month.
            </h2>
            <p className="mt-2 text-sm text-bg/70">
              Field notes from the parks, best-time-to-visit tips, occasional
              departure offers. No filler.
            </p>
          </div>
          <NewsletterForm className="w-full max-w-md" />
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Link href="/" className="inline-flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-bg">Tajo</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-bg/60">
              Safaris &amp; Tours
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-bg/70">
            {siteTagline} Kenyan-owned, locally guided. We tailor every
            itinerary around your dates, pace, and what you came to see.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-bg/20 text-bg/80 transition-colors hover:bg-accent hover:text-ink"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-bg/20 text-bg/80 transition-colors hover:bg-accent hover:text-ink"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={social.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-bg/20 text-bg/80 transition-colors hover:bg-accent hover:text-ink"
            >
              <YoutubeIcon className="size-4" />
            </a>
            <a
              href={social.tiktok}
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-bg/20 text-bg/80 transition-colors hover:bg-accent hover:text-ink"
            >
              <TikTokIcon className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-bg">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-bg/70 hover:text-accent">
                Home
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-bg/70 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-bg">
            Destinations
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {destinationLinks.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}` as `/destinations/${string}`}
                  className="text-bg/70 hover:text-accent"
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-bg">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-bg/70">
            <li>{contact.address}</li>
            <li>
              <a href={`tel:${contact.phoneTel}`} className="hover:text-accent">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-accent"
              >
                {contact.email}
              </a>
            </li>
            <li className="pt-2 text-xs text-bg/50">{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg/10 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-sand">
            {trustBadges.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 after:content-['•'] after:text-sand/40 last:after:hidden"
              >
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-bg/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-bg/60 sm:flex-row lg:px-10">
          <p>
            © {new Date().getFullYear()} {siteName}. Crafted in Nairobi.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

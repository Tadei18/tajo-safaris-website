import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MultiStepInquiry } from "@/components/forms/MultiStepInquiry";
import { Button } from "@/components/ui/button";
import { contact, whatsappUrl } from "@/lib/constants";
import { contactMetadata } from "@/data/seo";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return (
    <section className="bg-bg pt-32 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left column */}
          <div>
            <p className="eyebrow text-primary">Contact</p>
            <h1 className="h2-section mt-3 font-display font-medium text-ink">
              Let&apos;s plan it.
            </h1>
            <p className="mt-4 text-base text-ink-soft">
              We typically reply within an hour, Nairobi business hours.
            </p>

            <ul className="mt-10 space-y-5">
              <ContactRow icon={MapPin} label="Office">
                {contact.address}
              </ContactRow>
              <ContactRow icon={Phone} label="Phone">
                <a href={`tel:${contact.phoneTel}`} className="hover:text-primary">
                  {contact.phoneDisplay}
                </a>
                <br />
                <a href={`tel:${contact.phoneTel2}`} className="hover:text-primary">
                  {contact.phoneDisplay2}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-primary"
                >
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow icon={Clock} label="Hours">
                {contact.hours}
              </ContactRow>
            </ul>

            <div className="mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
              {/* TODO: replace with an embedded Google or Mapbox map of Mama Ngina Street, Nairobi CBD */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-primary-300/40 text-center">
                <MapPin className="size-8 text-primary" />
                <p className="font-display text-lg font-semibold text-ink">
                  Mama Ngina Street, Nairobi
                </p>
                <p className="text-xs text-ink-soft">
                  (Interactive map coming soon)
                </p>
              </div>
            </div>
          </div>

          {/* Right column — multi-step form */}
          <div>
            <MultiStepInquiry />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-ink-soft">
          {label}
        </p>
        <p className="mt-0.5 text-base text-ink">{children}</p>
      </div>
    </li>
  );
}

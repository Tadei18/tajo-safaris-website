// Per-route metadata helpers. Centralised so titles + descriptions stay
// consistent and a single edit propagates to OG + Twitter cards.

import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/constants";
import type { Tour, Destination } from "@/types";

const defaultOg = "/og-default.png";

export const homeMetadata: Metadata = {
  title: `${siteName} — Private Kenya Safaris, Tailored to You`,
  description:
    "Private, guide-led safaris across Kenya. Tailored itineraries through the Maasai Mara, Amboseli, Samburu and beyond — designed around the wildlife you came for.",
  alternates: { canonical: siteUrl },
};

export const safarisListMetadata: Metadata = {
  title: "Safaris & Tours",
  description:
    "Six signature safari packages across Kenya — Maasai Mara, Amboseli, Samburu, Tsavo and beyond. Each one tailor-made around your dates, pace, and what you came to see.",
  alternates: { canonical: `${siteUrl}/safaris` },
};

export const destinationsListMetadata: Metadata = {
  title: "Destinations — Kenya Safari Parks & Reserves",
  description:
    "Eight Kenyan safari destinations, from the Maasai Mara to Diani Beach. Best months, signature wildlife, and the trips that include them.",
  alternates: { canonical: `${siteUrl}/destinations` },
};

export const aboutMetadata: Metadata = {
  title: "About Tajo — Guides, Conservation, How We Travel",
  description:
    "Kenyan-owned, locally guided. Meet the team behind Tajo Safaris and how we route trips through community conservancies.",
  alternates: { canonical: `${siteUrl}/about` },
};

export const contactMetadata: Metadata = {
  title: "Plan Your Safari — Contact Tajo Safaris",
  description:
    "Tell us when you want to travel, who's coming, and what you came to see. We'll send back a tailored itinerary within 24 hours.",
  alternates: { canonical: `${siteUrl}/contact` },
};

export const blogMetadata: Metadata = {
  title: "Field Notes — Coming Soon",
  description:
    "Dispatches from the bush — best time to visit, what to pack, what the migration actually looks like in October.",
  alternates: { canonical: `${siteUrl}/blog` },
};

export function tourMetadata(tour: Tour): Metadata {
  return {
    title: `${tour.title} | ${tour.durationDays}-Day Kenya Safari`,
    description: tour.shortDescription,
    alternates: { canonical: `${siteUrl}/safaris/${tour.slug}` },
    openGraph: {
      type: "article",
      title: `${tour.title} | ${tour.durationDays}-Day Kenya Safari`,
      description: tour.shortDescription,
      url: `${siteUrl}/safaris/${tour.slug}`,
      images: [{ url: tour.heroImage, width: 1200, height: 630, alt: tour.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} | ${tour.durationDays}-Day Kenya Safari`,
      description: tour.shortDescription,
      images: [tour.heroImage],
    },
  };
}

export function destinationMetadata(d: Destination): Metadata {
  return {
    title: `${d.name} Safari Guide — Best Time, Wildlife & Tours`,
    description: d.shortDescription,
    alternates: { canonical: `${siteUrl}/destinations/${d.slug}` },
    openGraph: {
      type: "article",
      title: `${d.name} Safari Guide — Best Time, Wildlife & Tours`,
      description: d.shortDescription,
      url: `${siteUrl}/destinations/${d.slug}`,
      images: [{ url: d.heroImage, width: 1200, height: 630, alt: d.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${d.name} Safari Guide`,
      description: d.shortDescription,
      images: [d.heroImage],
    },
  };
}

export { defaultOg };

import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { siteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/safaris`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${siteUrl}/destinations`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/blog`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const tourRoutes: MetadataRoute.Sitemap = tours.map((t) => ({
    url: `${siteUrl}/safaris/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${siteUrl}/destinations/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...tourRoutes, ...destinationRoutes];
}

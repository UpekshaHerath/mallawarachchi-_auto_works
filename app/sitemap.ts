import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: resolveSiteUrl(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

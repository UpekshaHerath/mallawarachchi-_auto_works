import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/url";

/**
 * One page, one entry. The image list is what gets the workshop photos into
 * Google Images — they are plain <picture> tags, so nothing else advertises
 * them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = resolveSiteUrl();

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${url}/img/hero-1400.jpg`,
        `${url}/img/master-at-work-1200.jpg`,
        `${url}/img/yard-wide-1280.jpg`,
        `${url}/img/svc-engine-1100.jpg`,
        `${url}/img/svc-brakes-1100.jpg`,
        `${url}/img/svc-cooling-1100.jpg`,
        `${url}/img/svc-transmission-1100.jpg`,
        `${url}/img/svc-suspension-1100.jpg`,
        `${url}/img/svc-electrical-1100.jpg`,
        `${url}/img/svc-fuel-1100.jpg`,
        `${url}/img/svc-service-1100.jpg`,
      ],
    },
  ];
}

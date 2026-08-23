import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/url";

/**
 * Preview and branch deploys share this code but must never be indexed —
 * only the production deployment advertises itself to crawlers.
 */
const isProduction =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${resolveSiteUrl()}/sitemap.xml`,
  };
}

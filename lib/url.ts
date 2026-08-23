import { site } from "./site";

/**
 * Absolute origin used for canonical URLs, the sitemap, robots.txt and the
 * Open Graph tags.
 *
 * Server-only — it reads Vercel's build-time environment. Do not import this
 * from a "use client" module; `lib/site.ts` is the client-safe one.
 *
 * Order of precedence:
 *   1. NEXT_PUBLIC_SITE_URL   — set this once the real domain is live.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the project's production *.vercel.app
 *      host, so a deploy without a custom domain still advertises a URL that
 *      actually resolves instead of a placeholder.
 *   3. site.url               — the intended final domain.
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return site.url;
}

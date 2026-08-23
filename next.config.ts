import type { NextConfig } from "next";

/**
 * Applied to every route. No CSP here: the layout ships an inline language-boot
 * script and Google Fonts/Maps are third-party, so a policy strict enough to be
 * worth having would need nonces on a site that is otherwise fully static.
 */
const securityHeaders = [
  // Vercel serves HTTPS only; two years, subdomains included, not preloaded.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), payment=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Every photo is a pre-built derivative served by <picture>; nothing goes
  // through the runtime image service, so leave it switched off.
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Pre-built derivatives are content-addressed by name + width; if a
        // photo changes the filename changes, so these can be cached hard.
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

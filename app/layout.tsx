import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Noto_Sans_Sinhala } from "next/font/google";
import { site } from "@/lib/site";
import { resolveSiteUrl } from "@/lib/url";
import "./globals.css";

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-condensed",
  display: "swap",
});

// Sinhala has a large glyph set (~130 KB). It is never preloaded: the hidden
// Sinhala spans don't trigger a download, so English visitors never pay for it
// and the file only arrives when someone switches the toggle.
const sinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  variable: "--font-sinhala",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: "Mallawaarachchi Auto Works — Car, Van & SUV Repairs in Ganemulla",
    template: "%s | Mallawaarachchi Auto Works",
  },
  description:
    "Light-vehicle repair workshop in Pahala Yagoda, Ganemulla. Engine overhauls, brakes, overheating, clutch and gearbox, suspension, scanner diagnostics and full service. Over 35 years in the trade. Call 071 430 9635.",
  keywords: [
    "vehicle repair Ganemulla",
    "car repair Gampaha",
    "engine overhaul Sri Lanka",
    "garage Ganemulla",
    "auto works Yagoda",
    "brake repair Ganemulla",
    "වාහන අලුත්වැඩියාව ගනේමුල්ල",
  ],
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: site.name,
    title: "Mallawaarachchi Auto Works — Ganemulla",
    description:
      "Cars, vans and SUVs. Engines, brakes, cooling, transmission and full running repairs. Over 35 years in Ganemulla.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mallawaarachchi Auto Works — Ganemulla",
    description:
      "Cars, vans and SUVs. Engines, brakes, cooling, transmission and full running repairs. Over 35 years in Ganemulla.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description:
    "Light-vehicle repair workshop handling cars, vans and SUVs — engine, brake, cooling, transmission, suspension, fuel and electrical repairs.",
  url: resolveSiteUrl(),
  telephone: site.phones.map((p) => p.e164),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.district,
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  hasMap: site.maps.place,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:30",
      closes: "17:00",
    },
  ],
  currenciesAccepted: "LKR",
  areaServed: ["Ganemulla", "Gampaha", "Yagoda", "Kadawatha", "Ja-Ela", "Nittambuwa"],
};

/* Restores the language choice before first paint so there is no flash. */
const langBoot = `(function(){try{var l=localStorage.getItem("maw-lang");if(l==="si"||l==="en")document.documentElement.setAttribute("data-lang",l);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${condensed.variable} ${sinhala.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBoot }} />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

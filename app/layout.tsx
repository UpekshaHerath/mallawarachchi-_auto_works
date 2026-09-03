import type { Metadata, Viewport } from "next";
import {
  Barlow,
  Barlow_Condensed,
  Gemunu_Libre,
  Noto_Sans_Sinhala,
} from "next/font/google";
import { site } from "@/lib/site";
import { resolveSiteUrl } from "@/lib/url";
import { buildJsonLd } from "@/lib/seo";
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

/*
 * Sinhala gets the same two-tier treatment as English: a display face for
 * headings and UI labels, a text face for prose. Running everything in Noto
 * left the Sinhala side flat next to the English, which has Barlow Condensed
 * over Barlow.
 *
 * Gemunu Libre is the Sinhala counterpart to Barlow Condensed — narrow,
 * upright, engineered rather than calligraphic — so a mixed heading like
 * "ENGINE අලුත්වැඩියාව" holds one voice across both scripts.
 *
 * Neither is preloaded: the hidden Sinhala spans don't trigger a download, so
 * English visitors never pay for either file.
 */
const sinhalaDisplay = Gemunu_Libre({
  subsets: ["sinhala"],
  weight: ["600", "700", "800"],
  variable: "--font-sinhala-display",
  display: "swap",
  preload: false,
});

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
    // Keyword first, brand second: nobody searches the name yet, they search
    // the job and the town.
    default:
      "Vehicle Repairs in Ganemulla, Gampaha | Mallawaarachchi Auto Works",
    template: "%s | Mallawaarachchi Auto Works",
  },
  description:
    "Light-vehicle repair workshop at Pahala Yagoda, Ganemulla, Gampaha. Engine overhauls, overheating, brakes, clutch and gearbox, suspension, injectors and scanner diagnostics for cars, vans and SUVs - petrol and diesel. Over 35 years, estimate before any work. Call 071 430 9635.",
  applicationName: site.name,
  category: "Automotive repair",
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "vehicle repair Ganemulla",
    "car repair Ganemulla",
    "garage Ganemulla",
    "vehicle repair Gampaha",
    "car service Gampaha",
    "workshop Yagoda",
    "engine overhaul Sri Lanka",
    "overheating repair Gampaha",
    "brake repair Ganemulla",
    "clutch and gearbox repair Gampaha",
    "auto electrical Ganemulla",
    "scanner diagnosis Sri Lanka",
    "van repair Ganemulla",
    "SUV repair Gampaha",
    "diesel injector cleaning Sri Lanka",
    "වාහන අලුත්වැඩියාව ගනේමුල්ල",
    "වාහන සේවා ගම්පහ",
    "ගනේමුල්ල garage",
  ],
  openGraph: {
    type: "website",
    locale: "en_LK",
    alternateLocale: "si_LK",
    url: "/",
    siteName: site.name,
    title: "Vehicle Repairs in Ganemulla, Gampaha - Mallawaarachchi Auto Works",
    description:
      "Cars, vans and SUVs, petrol and diesel. Engines, overheating, brakes, gearbox, suspension, injectors and scanner diagnostics - diagnosed before anything is replaced. Over 35 years at Pahala Yagoda, Ganemulla.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Repairs in Ganemulla, Gampaha - Mallawaarachchi Auto Works",
    description:
      "Light-vehicle workshop at Pahala Yagoda, Ganemulla. Engines, overheating, brakes, gearbox, suspension and diagnostics. Over 35 years.",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true },
  other: {
    // Legacy geo tags. Cheap, still read by a few local directories and
    // aggregators that never picked up JSON-LD.
    "geo.region": "LK-1",
    "geo.placename": `${site.address.city}, ${site.address.district}`,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  // The paper default in the markup; the boot script and the toggle re-write
  // this tag at runtime once the real theme is known
  // (components/ThemeToggle.tsx).
  themeColor: "#f2efe7",
  width: "device-width",
  initialScale: 1,
};

/*
 * Restores the language and theme choices before first paint so there is no
 * flash. With no stored theme it falls back to the OS preference, and to
 * paper when the OS has no opinion (or the query is unsupported), so
 * data-theme is always stamped by the time the first paint happens.
 */
const boot = `(function(){try{var d=document.documentElement;var l=localStorage.getItem("maw-lang");if(l==="si"||l==="en"){d.setAttribute("data-lang",l);d.setAttribute("lang",l);}var t=localStorage.getItem("maw-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}d.setAttribute("data-theme",t);d.setAttribute("data-theme-source",localStorage.getItem("maw-theme")?"user":"system");}catch(e){}})();`;

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
      className={`${body.variable} ${condensed.variable} ${sinhala.variable} ${sinhalaDisplay.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}

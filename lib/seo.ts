import { site } from "./site";
import { services, faqs, vehicles, brands } from "./content";
import { resolveSiteUrl } from "./url";

/**
 * One JSON-LD @graph for the whole page. Nodes reference each other by @id so
 * search engines read a single connected business rather than four unrelated
 * blobs.
 *
 * Deliberately absent: Review / AggregateRating markup. The ratings shown on
 * this page come from the workshop's Google Business listing, and Google's
 * structured-data policy does not allow a site to re-publish third-party
 * reviews about itself as its own review markup. The reviews still earn their
 * place on the page for readers — they just are not claimed in schema.
 */
export function buildJsonLd() {
  const url = resolveSiteUrl();
  const id = (hash: string) => `${url}/#${hash}`;
  const abs = (path: string) => `${url}${path}`;

  const business = {
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": id("workshop"),
    name: site.name,
    alternateName: "Mallawaarachchi Auto Works Ganemulla",
    description:
      "Light-vehicle repair workshop in Pahala Yagoda, Ganemulla, Gampaha District — engine overhauls, overheating and cooling faults, brakes, clutch and gearbox, suspension, fuel systems, auto electrical and scanner diagnostics for cars, vans and SUVs. Over 35 years in the trade.",
    slogan: site.tagline.en,
    url,
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
    sameAs: site.sameAs,
    image: [
      abs("/img/hero-1600.jpg"),
      abs("/img/master-at-work-1200.jpg"),
      abs("/img/g-12-1100.jpg"),
    ],
    logo: abs("/icon-512.png"),
    priceRange: site.priceRange,
    currenciesAccepted: "LKR",
    paymentAccepted: "Cash",
    knowsLanguage: ["si", "en"],
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
    areaServed: site.areaServed.map((n) => ({
      "@type": "City",
      name: n,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gampaha District, Sri Lanka",
      },
    })),
    // What lands on the ramp, and what gets done to it.
    makesOffer: vehicles.slice(0, 4).map((v) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${v.en} repair and service`,
        serviceType: "Vehicle repair",
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Repairs and services",
      itemListElement: services.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${url}/#service-${svc.id}`,
          name: svc.title.en,
          description: svc.lead.en,
          serviceType: svc.title.en,
          provider: { "@id": id("workshop") },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Gampaha District, Sri Lanka",
          },
        },
      })),
    },
    brand: brands.map((b) => ({ "@type": "Brand", name: b })),
  };

  const website = {
    "@type": "WebSite",
    "@id": id("website"),
    url,
    name: site.name,
    inLanguage: ["en", "si"],
    publisher: { "@id": id("workshop") },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": id("webpage"),
    url,
    name: "Vehicle Repairs in Ganemulla, Gampaha — Mallawaarachchi Auto Works",
    isPartOf: { "@id": id("website") },
    about: { "@id": id("workshop") },
    primaryImageOfPage: abs("/img/hero-1600.jpg"),
    inLanguage: "en",
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": id("faq"),
    isPartOf: { "@id": id("webpage") },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.en,
      acceptedAnswer: { "@type": "Answer", text: f.a.en },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, website, webpage, faqPage],
  };
}

export const site = {
  name: "Mallawaarachchi Auto Works",
  shortName: "Mallawaarachchi Auto Works",
  tagline: {
    en: "Light-vehicle repairs, done properly - for over 35 years.",
    si: "Light vehicle අලුත්වැඩියාව, හරියටම - වසර 35කට වැඩි කාලයක්.",
  },
  yearsInTrade: 35,
  url: "https://mallawaarachchiautoworks.lk",

  phones: [
    { label: "071 430 9635", e164: "+94714309635", whatsapp: true },
    { label: "077 795 3276", e164: "+94777953276", whatsapp: false },
  ],

  address: {
    line1: "58/04, Pahala Yagoda",
    city: "Ganemulla",
    district: "Gampaha",
    country: "Sri Lanka",
    si: {
      line1: "58/04, පහල යාගොඩ",
      city: "ගනේමුල්ල",
    },
  },

  geo: { lat: 7.0599496, lng: 79.9761031 },
  plusCode: "3X5G+XC Ganemulla",

  maps: {
    place: "https://www.google.com/maps?cid=7169456798782565345",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=7.0599496%2C79.9761031",
    embed:
      "https://www.google.com/maps?q=7.0599496,79.9761031&hl=en&z=16&output=embed",
    reviews: "https://www.google.com/maps?cid=7169456798782565345&hl=en",
  },

  rating: { value: 4.1, count: 24 },

  /** Free-text band used by schema.org. Not a quote — just an ordering hint. */
  priceRange: "$$",

  /** Towns people actually drive in from. Feeds schema.org areaServed. */
  areaServed: [
    "Ganemulla",
    "Yagoda",
    "Gampaha",
    "Kadawatha",
    "Ja-Ela",
    "Nittambuwa",
    "Veyangoda",
    "Ragama",
    "Kiribathgoda",
    "Minuwangoda",
    "Weliveriya",
    "Delgoda",
  ],

  /** Profiles that describe the same business, for schema.org sameAs. */
  sameAs: ["https://www.google.com/maps?cid=7169456798782565345"],

  /** 0 = Sunday. `null` = closed. Times are 24h local (Asia/Colombo). */
  hours: [
    null,
    { open: "08:30", close: "17:00" },
    { open: "08:30", close: "17:00" },
    { open: "08:30", close: "17:00" },
    { open: "08:30", close: "17:00" },
    { open: "08:30", close: "17:00" },
    { open: "08:30", close: "17:00" },
  ] as ({ open: string; close: string } | null)[],
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.phones[0].e164.replace("+", "")}?text=${encodeURIComponent(message)}`;

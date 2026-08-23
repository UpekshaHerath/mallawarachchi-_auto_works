import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Mallawaarachchi Auto Works — car, van and SUV repairs in Ganemulla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The signboard mark from components/Logo.tsx, inlined as a data URI: satori
   renders <img> reliably where raw <svg> support varies between versions. */
/* The signboard mark from components/Logo.tsx, inlined as a data URI: satori
   renders <img> reliably where raw <svg> support varies between versions.
   Keep the two path strings in step with components/Logo.tsx. */
const GEAR =
  "M52.41 13.11 L54.34 2.28 L65.66 2.28 L67.59 13.11 A47.5 47.5 0 0 1 76.87 15.60 " +
  "L83.96 7.18 L93.76 12.84 L90.02 23.19 A47.5 47.5 0 0 1 96.81 29.98 L107.16 26.24 " +
  "L112.82 36.04 L104.40 43.13 A47.5 47.5 0 0 1 106.89 52.41 L117.72 54.34 L117.72 65.66 " +
  "L106.89 67.59 A47.5 47.5 0 0 1 104.40 76.87 L112.82 83.96 L107.16 93.76 L96.81 90.02 " +
  "A47.5 47.5 0 0 1 90.02 96.81 L93.76 107.16 L83.96 112.82 L76.87 104.40 " +
  "A47.5 47.5 0 0 1 67.59 106.89 L65.66 117.72 L54.34 117.72 L52.41 106.89 " +
  "A47.5 47.5 0 0 1 43.13 104.40 L36.04 112.82 L26.24 107.16 L29.98 96.81 " +
  "A47.5 47.5 0 0 1 23.19 90.02 L12.84 93.76 L7.18 83.96 L15.60 76.87 " +
  "A47.5 47.5 0 0 1 13.11 67.59 L2.28 65.66 L2.28 54.34 L13.11 52.41 " +
  "A47.5 47.5 0 0 1 15.60 43.13 L7.18 36.04 L12.84 26.24 L23.19 29.98 " +
  "A47.5 47.5 0 0 1 29.98 23.19 L26.24 12.84 L36.04 7.18 L43.13 15.60 " +
  "A47.5 47.5 0 0 1 52.41 13.11 Z " +
  "M99 60 A39 39 0 1 0 21 60 A39 39 0 1 0 99 60 Z";

const CAR =
  "M27.5 71 L27.5 67.4 C27.5 63.2 29.6 60.8 33.6 60.1 L47 58.2 " +
  "C49.6 57.8 51.1 57 53 55.2 L59.4 48.8 C61 47.1 63 46.3 65.6 46.3 " +
  "L72.6 46.3 C75.6 46.3 77.7 47.2 79.3 49.3 L85 57 C86.5 58.8 88.4 60 90.6 60.8 " +
  "C92.7 61.6 93.5 63.4 93.5 66 L93.5 71 L88.5 71 A8.5 8.5 0 0 0 71.5 71 " +
  "L48.5 71 A8.5 8.5 0 0 0 31.5 71 Z " +
  "M56.6 55 L62 49.6 C62.7 48.9 63.6 48.6 64.8 48.6 L71.8 48.6 " +
  "C73 48.6 73.8 48.9 74.4 49.7 L79.2 55 Z";

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <g fill="#ffc10e">
    <path fill-rule="evenodd" d="${GEAR}"/>
    <path fill-rule="evenodd" d="${CAR}"/>
    <circle cx="40" cy="71" r="6.2"/>
    <circle cx="80" cy="71" r="6.2"/>
    <rect x="33" y="78.6" width="54" height="3" rx="1.5" opacity="0.9"/>
  </g>
</svg>`;

const mark = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;

/**
 * Pull the real brand faces so the share card matches the site instead of
 * falling back to satori's default sans.
 *
 * The old Chrome UA matters: Google Fonts only serves TTF to clients it
 * believes cannot handle WOFF2, and satori cannot parse WOFF2. If the fetch
 * fails for any reason the card still renders — a missing typeface is not a
 * reason to fail a production build.
 */
const LEGACY_UA =
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36";

async function googleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const api = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await fetch(api, { headers: { "User-Agent": LEGACY_UA } }).then((r) =>
    r.text(),
  );
  // Google serves woff to this UA and ttf to some others; satori reads both
  // (only woff2 is unsupported), so accept whichever comes back.
  const url = css.match(/src: url\((.+?)\) format\('(?:woff|opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`no ttf for ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

async function brandFonts() {
  try {
    const [condensed, body] = await Promise.all([
      googleFont("Barlow Condensed", 800),
      googleFont("Barlow", 500),
    ]);
    return [
      { name: "Barlow Condensed", data: condensed, weight: 800 as const, style: "normal" as const },
      { name: "Barlow", data: body, weight: 500 as const, style: "normal" as const },
    ];
  } catch {
    return undefined;
  }
}

export default async function Image() {
  const fonts = await brandFonts();

  // satori has no fallback of its own: handing it `fontFamily: undefined`
  // crashes the render. Spread an empty object instead when the fetch failed
  // and let next/og use its built-in face.
  const display = fonts ? { fontFamily: "Barlow Condensed" } : {};
  const body = fonts ? { fontFamily: "Barlow" } : {};

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0b0d10",
          color: "#f3efe6",
          ...body,
        }}
      >
        {/* hazard tape, same as the section dividers on the site */}
        <div style={{ display: "flex", height: 16, overflow: "hidden" }}>
          {Array.from({ length: 34 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 26,
                height: 16,
                marginLeft: i === 0 ? 0 : 12,
                background: "#ffc10e",
                transform: "skewX(-30deg)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 72px 54px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mark} width={118} height={118} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  ...display,
                  fontSize: 52,
                  lineHeight: 1,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Mallawaarachchi
              </div>
              <div
                style={{
                  ...display,
                  fontSize: 27,
                  color: "#ffc10e",
                  letterSpacing: 11,
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                Auto Works
              </div>
            </div>
          </div>

          <div
            style={{
              ...display,
              fontSize: 104,
              lineHeight: 0.94,
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>We don&rsquo;t guess.</span>
            <span style={{ color: "#ffc10e" }}>We diagnose.</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                ...display,
                fontSize: 26,
                background: "#ffc10e",
                color: "#0b0d10",
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: "12px 20px",
              }}
            >
              {`${site.yearsInTrade}+ years on the tools`}
            </div>
            <div style={{ fontSize: 27, color: "#cfc9bd" }}>
              {`${site.address.city}, ${site.address.district} · ${site.phones[0].label}`}
            </div>
          </div>
        </div>
      </div>
    ),
    fonts ? { ...size, fonts } : { ...size },
  );
}

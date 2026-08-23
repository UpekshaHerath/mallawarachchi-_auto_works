# Mallawaarachchi Auto Works — website

Marketing site for a light-vehicle repair workshop at 58/04, Pahala Yagoda,
Ganemulla, Sri Lanka. Bilingual (English / සිංහල), one page, no backend.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

## How it is put together

| Concern | Where | Notes |
| --- | --- | --- |
| Business facts | `lib/site.ts` | Phones, address, coordinates, opening hours, Google Maps links, rating. Change them here only. |
| All page copy | `lib/content.ts` | Services, process steps, vehicles, Google reviews, gallery captions — every string in both languages. |
| Opening-hours logic | `lib/hours.ts` | Works in Asia/Colombo regardless of the visitor's timezone. |
| Design system | `app/globals.css` | Colour tokens, textures (hazard tape, chequer plate, blueprint grid), buttons, reveal animations. |
| Sections | `components/*.tsx` + matching `*.module.css` | One component per section of the page. |
| Photo pipeline | `scripts/blur-plates.mjs` → `scripts/optimize-images.mjs` | Plate masking, then responsive encoding. See below. |

## Bilingual without a router

Both languages are rendered into the HTML and CSS hides one, keyed off
`<html data-lang>`:

```css
[data-lang="en"] .si { display: none }
[data-lang="si"] .en { display: none }
```

The toggle in the header flips that attribute and stores the choice in
`localStorage`; a tiny inline script in `app/layout.tsx` restores it before
first paint so there is no flash. Switching costs no re-render and no network
request, and both languages stay indexable by search engines.

The few places that can only hold a plain string — `<option>` labels, `alt`
text, the generated WhatsApp message — use the `useLang()` hook in
`lib/useLang.ts`.

## Images

Photos are **not** processed at runtime. Two scripts run offline, in order:

1. `scripts/blur-plates.mjs` — masks every visible number plate in the source
   photos and writes the whole set to a `blurred/` folder beside the originals.
2. `scripts/optimize-images.mjs` — reads that masked set and writes AVIF +
   WebP + JPEG at three or four widths into `public/img/`, plus a 20px blurred
   placeholder inlined into `lib/generated/media.ts`.

```bash
node scripts/blur-plates.mjs        # originals -> <originals>/blurred
node scripts/optimize-images.mjs    # blurred   -> public/img + media.ts
```

Both take their paths from the environment, so the originals can live anywhere:

| Variable | Read by | Meaning |
| --- | --- | --- |
| `PHOTO_SRC_RAW` | `blur-plates.mjs` | Folder of untouched camera originals. |
| `PHOTO_SRC` | both | Masked set — written by the first script, read by the second. |

### Number plates

Sri Lankan plates are personally identifying, and the cars belong to the
workshop's customers, not the workshop. Every plate visible in the photo set is
masked before any derivative is generated, so no unmasked pixel ever reaches
`public/img/`.

Regions are listed in the `PLATES` table in `scripts/blur-plates.mjs` as
fractions of the source image, which keeps them valid at any resolution:

```js
"p09.jpg": [[0.140, 0.608, 0.332, 0.708]],   // x0, y0, x1, y1
```

Each region is pixelated down to a handful of blocks, blown back up, blurred,
and composited through a feathered mask — the glyphs are destroyed rather than
smeared, and the edges blend instead of reading as a pasted rectangle.
Dealer stickers that repeat the registration number are masked the same way.

**When adding photos:** run `blur-plates.mjs`, open the output, and check every
vehicle — including ones parked in the background — before running the
optimiser. A plate that is only legible at full resolution still needs a box.

### Swapping photographs

Drop the new files in the originals folder, point the `SET` array in
`optimize-images.mjs` at the new filenames, add any plate regions to `PLATES`,
re-run both scripts, rebuild. The `<Media>` component and the gallery pick the
new files up automatically; alt text lives in `lib/content.ts` (gallery) and
the section components, and is worth re-reading when an image changes.

> The current photo set came from the workshop's Google Business listing.
> Several of those were uploaded by customers, who hold copyright in them.
> Replacing them with the shop's own photographs is the safe long-term move,
> and the pipeline above makes it a one-folder change.

## Contact

There is no form backend. The enquiry form composes a message and opens
WhatsApp to the workshop's main number; calling is presented as the primary
action throughout. Nothing is stored or transmitted by the site itself.

## Deploying to Vercel

The site is fully static — every route is prerendered at build time and there
is no runtime configuration to get wrong.

1. Push to GitHub and import the repo on Vercel. It deploys as-is: with no
   environment variable set, the canonical URL, `sitemap.xml`, `robots.txt`,
   the JSON-LD and the Open Graph tags all resolve to the project's own
   `*.vercel.app` production URL, so nothing points at a domain that does not
   exist yet.
2. Once the real domain is live, set `NEXT_PUBLIC_SITE_URL` in **Settings →
   Environment Variables** (production scope, no trailing slash) and redeploy.
   Resolution order lives in `lib/url.ts`:
   `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `url` in
   `lib/site.ts`. See `.env.example`.
3. Add the domain under **Settings → Domains** and point the registrar at
   Vercel's nameservers or the `A`/`CNAME` records it shows.

Framework detection picks up Next.js on its own; `vercel.json` pins the build
and install commands anyway and puts any future functions in `sin1`
(Singapore, the closest region to Sri Lanka).

Preview and branch deploys serve `Disallow: /` — `app/robots.ts` checks
`VERCEL_ENV`, so only the production deployment is ever indexable.

Or from the CLI:

```bash
npx vercel            # preview deployment
npx vercel --prod     # production
```

### What ships with the repo

| File | Why |
| --- | --- |
| `vercel.json` | Framework, `npm ci` install, `sin1` region, quiet GitHub comments. |
| `.vercelignore` | Keeps build output and agent notes out of the upload. |
| `app/opengraph-image.tsx` | 1200×630 share card, generated at build time. Pulls Barlow from Google Fonts so it matches the site, and falls back to the built-in face if that fetch ever fails — a share card must not be able to break a build. |
| `app/apple-icon.png`, `public/icon-*.png` | iOS home screen and Android launcher icons, rasterised from `app/icon.svg` by `npm run icons`. Committed, not built. |
| `lib/url.ts` | Resolves the absolute origin. Server-only — `lib/site.ts` is the client-safe half. |
| `.env.example` | The one optional environment variable. |
| `app/manifest.ts` | Web app manifest — name, theme colour, icon. |
| `app/robots.ts` | Allows crawling in production; blocks it on preview deploys via `VERCEL_ENV`. |
| `next.config.ts` | Security headers, immutable caching for `/img/*`, runtime image service off. |
| `engines.node` | `>=20.9.0`, so Vercel's Node version is never a surprise. |

Compression is handled by Vercel's edge (a bare Node host behind nginx needs
gzip/brotli switched on: uncompressed the HTML is ~208 KB, compressed ~24 KB).

### After the first deploy

- Check `/opengraph-image`, `/robots.txt`, `/sitemap.xml` and
  `/manifest.webmanifest` respond.
- Submit the sitemap in Google Search Console.
- Re-run the share preview in WhatsApp or Facebook's debugger once the domain
  resolves, so the card is cached against the real URL.

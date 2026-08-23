/**
 * Blurs number plates (and reg-number stickers) out of the source photos before
 * they are optimised. Regions are hand-picked, expressed as fractions of the
 * source image so they survive any resize.
 *
 *   node scripts/blur-plates.mjs
 *
 * Reads PHOTO_SRC_RAW (the untouched camera set), writes every photo to
 * PHOTO_SRC (what optimize-images.mjs consumes) with the regions masked.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RAW =
  process.env.PHOTO_SRC_RAW ||
  "C:/Users/UPEKSH~1/AppData/Local/Temp/claude/C--Upeksha-s-folder-test-projects-mallwarachchi-auto-works/6368d107-5ba6-486d-81a2-969b5882e577/scratchpad/photos";
const OUT = process.env.PHOTO_SRC || path.join(RAW, "blurred");

/** file -> [x0, y0, x1, y1] boxes, as fractions of the source image. */
const PLATES = {
  "p01.jpg": [
    [0.148, 0.658, 0.194, 0.720], // white hatchback, left
    [0.510, 0.690, 0.566, 0.766], // white sedan, centre
    [0.628, 0.614, 0.665, 0.652], // maroon car, mid-right
    [0.845, 0.672, 0.902, 0.734], // dark wagon, right
  ],
  "p04.jpg": [
    [0.172, 0.368, 0.462, 0.508], // front plate
    [0.226, 0.482, 0.408, 0.604], // dealer sticker (repeats the reg number)
  ],
  "p09.jpg": [[0.140, 0.608, 0.332, 0.708]],
  "p10.jpg": [
    [0.328, 0.156, 0.572, 0.290], // front plate
    [0.392, 0.263, 0.538, 0.358], // dealer sticker
    [0.485, 0.810, 0.550, 0.860], // car out in the yard
  ],
  "p12.jpg": [[0.318, 0.405, 0.435, 0.520]],
  "p13.jpg": [[0.508, 0.617, 0.717, 0.718]],
  "p16.jpg": [
    [0.750, 0.555, 0.796, 0.615], // motorcycle, front plate
    [0.800, 0.478, 0.826, 0.528], // second plate on the rack
  ],
  "p18.jpg": [
    [0.160, 0.728, 0.260, 0.810], // dark sedan
    [0.470, 0.560, 0.510, 0.605], // white van, centre
    [0.758, 0.536, 0.805, 0.584], // white van, right
  ],
  "p19.jpg": [[0.258, 0.688, 0.532, 0.858]],
  "p32.jpg": [[0.292, 0.945, 0.742, 1.0]],
};
PLATES["p37.jpg"] = PLATES["p18.jpg"]; // same photo, duplicated in the set

fs.mkdirSync(OUT, { recursive: true });

const sources = fs.readdirSync(RAW).filter((f) => /\.jpe?g$/i.test(f));

for (const file of sources) {
  const src = path.join(RAW, file);
  const dst = path.join(OUT, file);
  const boxes = PLATES[file];

  if (!boxes) {
    fs.copyFileSync(src, dst);
    continue;
  }

  const meta = await sharp(src).metadata();
  const { width: W, height: H } = meta;

  const patches = [];
  for (const [x0, y0, x1, y1] of boxes) {
    const left = Math.max(0, Math.round(W * x0));
    const top = Math.max(0, Math.round(H * y0));
    const width = Math.min(W - left, Math.round(W * (x1 - x0)));
    const height = Math.min(H - top, Math.round(H * (y1 - y0)));
    if (width < 2 || height < 2) continue;

    // Pixelate first (the glyphs are gone, not merely smeared), blur to soften,
    // then feather the edges so the mask reads as an out-of-focus plate rather
    // than a pasted grey box.
    const blocks = 6;
    const blurred = await sharp(src)
      .extract({ left, top, width, height })
      .resize(blocks, Math.max(2, Math.round((blocks * height) / width)), { fit: "fill" })
      .resize(width, height, { fit: "fill", kernel: "cubic" })
      .blur(Math.max(6, Math.max(width, height) / 10))
      .ensureAlpha()
      .png()
      .toBuffer();

    const feather = Math.max(2, Math.round(Math.min(width, height) * 0.12));
    const mask = await sharp({
      create: { width, height, channels: 3, background: "#000" },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${width}" height="${height}"><rect x="${feather}" y="${feather}" width="${Math.max(1, width - 2 * feather)}" height="${Math.max(1, height - 2 * feather)}" rx="${feather}" fill="#fff"/></svg>`
          ),
        },
      ])
      .blur(feather / 1.5)
      .toColorspace("b-w")
      .png()
      .toBuffer();

    const patch = await sharp(blurred)
      .composite([{ input: mask, blend: "dest-in" }])
      .png()
      .toBuffer();

    patches.push({ input: patch, left, top });
  }

  await sharp(src)
    .composite(patches)
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(dst);
  console.log(`✓ ${file}  ${patches.length} region(s) masked`);
}

console.log(`\nMasked set written to ${OUT}`);

/**
 * Rasterises app/icon.svg into the PNG sizes Android launchers and iOS home
 * screens ask for. SVG alone is enough for browser tabs, but neither of those
 * two reliably accepts it.
 *
 *   node scripts/make-icons.mjs
 *
 * Re-run whenever the logo changes.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = fs.readFileSync(path.join(root, "app", "icon.svg"));
const pub = path.join(root, "public");
const BG = "#0b0d10";

const write = async (buf, dest) => {
  fs.writeFileSync(dest, buf);
  console.log("✓", path.relative(root, dest), `${(buf.length / 1024).toFixed(1)} KB`);
};

// Plain icons — the SVG already carries its own rounded dark plate.
for (const size of [192, 512]) {
  const buf = await sharp(src, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await write(buf, path.join(pub, `icon-${size}.png`));
}

// Maskable: Android crops to a circle, so the mark has to sit inside the
// middle 80% and the plate has to bleed to the edges.
const inner = Math.round(512 * 0.78);
const maskable = await sharp({
  create: { width: 512, height: 512, channels: 4, background: BG },
})
  .composite([
    {
      input: await sharp(src, { density: 384 }).resize(inner, inner).png().toBuffer(),
      top: Math.round((512 - inner) / 2),
      left: Math.round((512 - inner) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();
await write(maskable, path.join(pub, "icon-maskable-512.png"));

// iOS home screen. Next picks app/apple-icon.png up by convention.
const apple = await sharp(src, { density: 384 })
  .resize(180, 180)
  .flatten({ background: BG })
  .png({ compressionLevel: 9 })
  .toBuffer();
await write(apple, path.join(root, "app", "apple-icon.png"));

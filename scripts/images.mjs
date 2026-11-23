/**
 * Gera variantes responsivas (AVIF + WebP) e um JPG 1200x630 para Open Graph
 * a partir das fotos originais em content/media.
 *
 * Uso: npm run images
 */
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "content/media";
const OUT_DIR = "public/images";
const WIDTHS = [600, 1000, 1600];
const OG_WIDTH = 1200;

const slugify = (name) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const entries = await readdir(SOURCE_DIR);
  const sources = entries.filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

  if (sources.length === 0) {
    console.warn(`Nenhuma imagem encontrada em ${SOURCE_DIR}`);
    return;
  }

  const manifest = {};

  for (const file of sources) {
    const input = path.join(SOURCE_DIR, file);
    const slug = slugify(path.basename(file, path.extname(file)));
    const metadata = await sharp(input).metadata();
    const sourceWidth = metadata.width ?? 0;
    const sourceHeight = metadata.height ?? 0;
    manifest[slug] = { width: sourceWidth, height: sourceHeight };

    for (const width of WIDTHS) {
      if (sourceWidth > 0 && width > sourceWidth) continue;
      const resized = sharp(input).resize({ width, withoutEnlargement: true });

      await resized
        .clone()
        .avif({ quality: 62, effort: 5 })
        .toFile(path.join(OUT_DIR, `${slug}-${width}.avif`));

      await resized
        .clone()
        .webp({ quality: 74 })
        .toFile(path.join(OUT_DIR, `${slug}-${width}.webp`));
    }

    await sharp(input)
      .resize({ width: OG_WIDTH, height: 630, fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT_DIR, `${slug}-og.jpg`));

    const ogStat = await stat(path.join(OUT_DIR, `${slug}-og.jpg`));
    console.log(
      `✓ ${slug} (${sourceWidth}×${sourceHeight}) → ${WIDTHS.join("/")}px + og (${Math.round(ogStat.size / 1024)} KB)`,
    );
  }

  console.log(`\nPronto: ${sources.length} imagens processadas em ${OUT_DIR}/`);
  await writeFile(
    path.join("lib", "image-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log(`Manifesto atualizado em lib/image-manifest.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

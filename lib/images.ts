import manifest from "./image-manifest.json";

type Manifest = Record<string, { width: number; height: number }>;

export const imageManifest = manifest as Manifest;

export type PhotoSlug = keyof typeof manifest;

export const PHOTO_WIDTHS = [600, 1000, 1600] as const;

export function photoSources(slug: PhotoSlug, widths: readonly number[] = PHOTO_WIDTHS) {
  const available = widths.filter((width) => width <= imageManifest[slug].width);
  const list = available.length > 0 ? available : [imageManifest[slug].width];

  return {
    width: imageManifest[slug].width,
    height: imageManifest[slug].height,
    src: `/images/${slug}-${list[Math.min(1, list.length - 1)]}.webp`,
    avif: list.map((width) => `/images/${slug}-${width}.avif ${width}w`).join(", "),
    webp: list.map((width) => `/images/${slug}-${width}.webp ${width}w`).join(", "),
  };
}

export const photoOg = (slug: PhotoSlug) => `/images/${slug}-og.jpg`;

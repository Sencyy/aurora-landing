import { photoSources, type PhotoSlug } from "@/lib/images";

type PhotoProps = {
  slug: PhotoSlug;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  ratio?: string;
};

export function Photo({ slug, alt, sizes = "100vw", className, priority = false, ratio }: PhotoProps) {
  const source = photoSources(slug);

  return (
    <picture className={className ? `photo ${className}` : "photo"}>
      <source type="image/avif" srcSet={source.avif} sizes={sizes} />
      <source type="image/webp" srcSet={source.webp} sizes={sizes} />
      <img
        src={source.src}
        alt={alt}
        width={source.width}
        height={source.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={ratio ? { aspectRatio: ratio } : undefined}
      />
    </picture>
  );
}

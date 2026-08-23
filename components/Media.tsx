import { media, type MediaName } from "@/lib/generated/media";

type Props = {
  name: MediaName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** object-position, e.g. "50% 35%" */
  position?: string;
};

/**
 * Plain <picture> over pre-built AVIF/WebP/JPEG derivatives.
 * No runtime image service, no layout shift, LQIP painted underneath.
 */
export function Media({ name, alt, sizes, className, priority, position }: Props) {
  const m = media[name];
  const srcset = (ext: string) =>
    m.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallbackW = m.widths[Math.min(1, m.widths.length - 1)];

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${fallbackW}.jpg`}
        srcSet={srcset("jpg")}
        sizes={sizes}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={{
          backgroundImage: `url(${m.lqip})`,
          backgroundSize: "cover",
          backgroundPosition: position ?? "center",
          objectPosition: position ?? "center",
        }}
      />
    </picture>
  );
}

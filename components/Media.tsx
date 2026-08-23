import { media, type MediaName } from "@/lib/generated/media";

/** Below this, the art-directed portrait crop is served instead of the wide one. */
const PORTRAIT_QUERY = "(max-width: 767px)";

type Props = {
  name: MediaName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** object-position, e.g. "50% 35%" */
  position?: string;
  /**
   * Art direction. A second, differently-cropped entry served to narrow
   * viewports — not a resize of the same frame but its own composition, so a
   * full-height phone hero doesn't have to crop a landscape photo to a sliver.
   */
  portrait?: MediaName;
};

/**
 * Plain <picture> over pre-built AVIF/WebP/JPEG derivatives.
 * No runtime image service, no layout shift, LQIP painted underneath.
 */
export function Media({
  name,
  alt,
  sizes,
  className,
  priority,
  position,
  portrait,
}: Props) {
  const m = media[name];
  const srcset = (entry: MediaName, ext: string) =>
    media[entry].widths.map((w) => `/img/${entry}-${w}.${ext} ${w}w`).join(", ");
  const fallbackW = m.widths[Math.min(1, m.widths.length - 1)];

  return (
    <picture className={className}>
      {/* Media-qualified sources must come first — the browser takes the first
          match, so the wide crop would otherwise always win. */}
      {portrait && (
        <>
          <source
            media={PORTRAIT_QUERY}
            type="image/avif"
            srcSet={srcset(portrait, "avif")}
            sizes={sizes}
          />
          <source
            media={PORTRAIT_QUERY}
            type="image/webp"
            srcSet={srcset(portrait, "webp")}
            sizes={sizes}
          />
          <source
            media={PORTRAIT_QUERY}
            type="image/jpeg"
            srcSet={srcset(portrait, "jpg")}
            sizes={sizes}
          />
        </>
      )}
      <source type="image/avif" srcSet={srcset(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, "webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${fallbackW}.jpg`}
        srcSet={srcset(name, "jpg")}
        sizes={sizes}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
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

"use client";

import { useCallback, useEffect, useState } from "react";
import { galleryImages } from "@/lib/content";
import { media } from "@/lib/generated/media";
import { useLang } from "@/lib/useLang";
import s from "./Gallery.module.css";
import sec from "./Sections.module.css";

const WIDE = new Set([0, 9]);

export function Gallery() {
  const lang = useLang();
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) =>
      setIdx((i) => (i === null ? i : (i + d + galleryImages.length) % galleryImages.length)),
    [],
  );

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx, close, step]);

  const current = idx === null ? null : galleryImages[idx];

  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <div className={`${sec.head} reveal`}>
          <span className="kicker">
            <span className="en">Inside the yard</span>
            <span className="si">වැඩපොළ ඇතුළේ</span>
          </span>
          <h2>
            <span className="en">Work in progress, not stock photos</span>
            <span className="si">Stock Photo නෙවෙයි - ඇත්ත වැඩ</span>
          </h2>
          <p className={sec.headNote}>
            <span className="en">
              Vehicles on the lift, engines opened up, parts laid out before
              they go back in. Every picture here is from this workshop.
            </span>
            <span className="si">
              Lift එකේ නංවපු වාහන, ගලවලා තියෙන engine, ආපහු දාන්න කලින් තියලා
              තියෙන part. මෙතන තියෙන හැම photo එකක්ම මේ වැඩපොළෙන්මයි.
            </span>
          </p>
        </div>

        <div className={`${s.grid} reveal`}>
          {galleryImages.map((g, i) => {
            const m = media[g.name];
            return (
              <button
                key={g.name + i}
                type="button"
                className={`${s.cell} ${WIDE.has(i) ? s.wide : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Open photo ${i + 1} of ${galleryImages.length}`}
              >
                <picture>
                  <source
                    type="image/avif"
                    srcSet={m.widths.map((w) => `/img/${g.name}-${w}.avif ${w}w`).join(", ")}
                    sizes="(min-width: 1080px) 33vw, (min-width: 720px) 40vw, 50vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={m.widths.map((w) => `/img/${g.name}-${w}.webp ${w}w`).join(", ")}
                    sizes="(min-width: 1080px) 33vw, (min-width: 720px) 40vw, 50vw"
                  />
                  <img
                    src={`/img/${g.name}-700.jpg`}
                    alt={g.alt[lang]}
                    width={m.width}
                    height={m.height}
                    loading="lazy"
                    decoding="async"
                    style={{ backgroundImage: `url(${m.lqip})`, backgroundSize: "cover" }}
                  />
                </picture>
              </button>
            );
          })}
        </div>

        <p className={s.credit}>
          <span className="en">
            Photographs of the workshop, contributed to our Google Business
            listing by customers and by us.
          </span>
          <span className="si">
            Customer ලා සහ අපි විසින් Google Business පිටුවට එකතු කරපු වැඩපොළේ
            photo.
          </span>
        </p>
      </div>

      {current && idx !== null && (
        <div
          className={`${s.box} on-dark`}
          role="dialog"
          aria-modal="true"
          aria-label="Workshop photo"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className={s.boxTop}>
            <span>
              {String(idx + 1).padStart(2, "0")} / {galleryImages.length}
            </span>
            <button type="button" className={s.close} onClick={close} aria-label="Close">
              ✕
            </button>
          </div>

          <div className={s.boxStage}>
            <img
              key={current.name}
              src={`/img/${current.name}-1100.jpg`}
              srcSet={`/img/${current.name}-700.jpg 700w, /img/${current.name}-1100.jpg 1100w`}
              sizes="(min-width: 900px) 80vw, 96vw"
              alt={current.alt[lang]}
            />
            <button
              type="button"
              className={`${s.nav} ${s.prev}`}
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${s.nav} ${s.next}`}
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>

          <p className={s.boxCap}>
            <span className="en">{current.alt.en}</span>
            <span className="si">{current.alt.si}</span>
          </p>
        </div>
      )}
    </section>
  );
}

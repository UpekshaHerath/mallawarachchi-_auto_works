import { reviews } from "@/lib/content";
import { site } from "@/lib/site";
import { StarIcon, ArrowIcon } from "./icons";
import s from "./Reviews.module.css";
import sec from "./Sections.module.css";

const Stars = ({ n }: { n: number }) => (
  <span className={s.stars} aria-label={`${n} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} className={i <= n ? undefined : s.starOff} />
    ))}
  </span>
);

export function Reviews() {
  return (
    <section className="section grid-bg" id="reviews">
      <div className="wrap">
        <div className={`${sec.head} reveal`}>
          <span className="kicker">
            <span className="en">In their words</span>
            <span className="si">Customer ලා කියන දේ</span>
          </span>
          <h2>
            <span className="en">What customers left on Google</span>
            <span className="si">Google එකේ Customer ලා දාපු Review</span>
          </h2>
        </div>

        <div className={s.wrapRow}>
          <aside className={`${s.score} reveal`}>
            <span className={s.scoreNum}>{site.rating.value}</span>
            <Stars n={4} />
            <p className={s.scoreMeta}>
              <span className="en">
                Based on {site.rating.count} Google reviews of Mallawaarachchi
                Auto Works, Ganemulla.
              </span>
              <span className="si">
                Mallawaarachchi Auto Works, ගනේමුල්ල සඳහා ලැබිලා තියෙන Google
                review {site.rating.count} මත පදනම්ව.
              </span>
            </p>
            <a
              className="btn btn--ghost"
              href={site.maps.reviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="en">Read on Google</span>
              <span className="si">Google එකේ බලන්න</span>
              <ArrowIcon />
            </a>
          </aside>

          <div className={s.list}>
            {reviews.map((r, i) => (
              <article
                key={r.author}
                className={`${s.item} reveal`}
                style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}
              >
                <div className={s.who}>
                  <span className={s.name}>{r.author}</span>
                  <span className={s.meta}>
                    {r.meta} · {r.when}
                  </span>
                </div>
                <Stars n={r.stars} />
                <p className={s.body} lang="en">
                  {r.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className={s.foot}>
          <p className={s.note}>
            <span className="en">
              Reviews are shown as they were written by the reviewer on Google.
            </span>
            <span className="si">
              Review Google එකේ ලියලා තිබුණු විදිහටම මෙතන දාලා තියෙන්නේ.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

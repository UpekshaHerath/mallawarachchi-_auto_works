import { services, marqueeWords } from "@/lib/content";
import { Media } from "./Media";
import s from "./Sections.module.css";

export function Marquee() {
  const strip = [...marqueeWords, ...marqueeWords];
  return (
    <div className={s.marquee} aria-hidden="true">
      <div className={s.track}>
        {strip.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="section grid-bg" id="services">
      <div className="wrap">
        <div className={`${s.head} reveal`}>
          <span className="kicker">
            <span className="en">What we repair</span>
            <span className="si">අපි කරන වැඩ</span>
          </span>
          <h2>
            <span className="en">All the running repairs, in one yard</span>
            <span className="si">හැම Running Repair එකක්ම එකම මිදුලක</span>
          </h2>
          <p className={s.headNote}>
            <span className="en">
              Cars, vans and SUVs — petrol and diesel. If it moves the vehicle,
              stops it, cools it or powers it, it is repaired here. Open any
              heading to see the individual jobs that fall under it.
            </span>
            <span className="si">
              Car, van සහ SUV — petrol සහ diesel දෙකම. වාහනය දුවවන, නවත්වන,
              සිසිල් කරන නැත්නම් power දෙන ඕනෑම කොටසක් මෙතන හදනවා. එක් එක්
              වැඩ මොනවද කියලා බලන්න පහළින් open කරන්න.
            </span>
          </p>
        </div>

        <div className={s.svcGrid}>
          {services.map((svc, i) => (
            <article
              key={svc.id}
              id={svc.id}
              className={`${s.svc} reveal`}
              style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}
            >
              <div className={s.svcFig}>
                <span className={s.svcNo}>{svc.no}</span>
                <Media
                  name={svc.image}
                  alt={`${svc.title.en} at the Mallawaarachchi Auto Works workshop in Ganemulla`}
                  sizes="(min-width: 1080px) 22vw, (min-width: 640px) 46vw, 92vw"
                />
              </div>

              <div className={s.svcBody}>
                <h3>
                  <span className="en">{svc.title.en}</span>
                  <span className="si">{svc.title.si}</span>
                </h3>

                <p className={s.svcLead}>
                  <span className="en">{svc.lead.en}</span>
                  <span className="si">{svc.lead.si}</span>
                </p>

                <p className={s.symptom}>
                  <b>
                    <span className="en">You&rsquo;d notice:</span>
                    <span className="si">ඔබට දැනෙන්නේ:</span>
                  </b>
                  <span>
                    <span className="en">{svc.symptom.en}</span>
                    <span className="si">{svc.symptom.si}</span>
                  </span>
                </p>

                <details className={s.details}>
                  <summary>
                    <span className="en">What this covers</span>
                    <span className="si">මේකට අයිති වැඩ</span>
                  </summary>
                  <ul className={s.jobs}>
                    {svc.jobs.map((j, k) => (
                      <li key={k}>
                        <span className="en">{j.en}</span>
                        <span className="si">{j.si}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

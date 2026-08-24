import { faqs } from "@/lib/content";
import s from "./Sections.module.css";

/**
 * The phone-call questions, written out. Doubles as the source for the
 * FAQPage structured data built in lib/seo.ts — edit the copy in
 * lib/content.ts and both stay in step.
 */
export function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className={`${s.head} reveal`}>
          <span className="kicker">
            <span className="en">Before you call</span>
            <span className="si">Call කරන්න කලින්</span>
          </span>
          <h2 id="faq-title">
            <span className="en">Questions we answer every day</span>
            <span className="si">හැමදාම අහන ප්‍රශ්න</span>
          </h2>
          <p className={s.headNote}>
            <span className="en">
              Appointments, estimates, spare parts and opening hours - the
              things people ask on the phone before they drive to Ganemulla.
            </span>
            <span className="si">
              Appointment, estimate, part සහ වෙලාවන් - ගනේමුල්ලට එන්න කලින්
              phone එකෙන් අහන දේවල්.
            </span>
          </p>
        </div>

        <div className={s.faqList}>
          {faqs.map((f, i) => (
            <details
              key={i}
              className={`${s.details} ${s.faq} reveal`}
              style={{ ["--d" as string]: `${Math.min(i, 5) * 50}ms` }}
            >
              <summary>
                <h3 className={s.faqQ}>
                  <span className="en">{f.q.en}</span>
                  <span className="si">{f.q.si}</span>
                </h3>
              </summary>
              <p className={s.faqA}>
                <span className="en">{f.a.en}</span>
                <span className="si">{f.a.si}</span>
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { processSteps } from "@/lib/content";
import s from "./Sections.module.css";

export function Process() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className={`${s.head} reveal`}>
          <span className="kicker">
            <span className="en">How we work</span>
            <span className="si">වැඩ පිළිවෙල</span>
          </span>
          <h2>
            <span className="en">From your phone call to the handover</span>
            <span className="si">Call එකේ ඉඳන් වාහනය බාරදෙනකම්</span>
          </h2>
          <p className={s.headNote}>
            <span className="en">
              No surprises on the bill and no vehicle opened up before you know
              what it will cost. This is the same order of work for a brake job
              and for a full engine overhaul.
            </span>
            <span className="si">
              Bill එකේ හදිසි surprise නෑ. වියදම කීයද කියලා ඔබ දැනගන්නකම් වාහනය
              ගලවන්නෙත් නෑ. පොඩි brake වැඩකට වුණත්, සම්පූර්ණ engine overhaul
              එකකට වුණත් අපි යන්නේ මේ පිළිවෙලමයි.
            </span>
          </p>
        </div>

        <div className={s.steps}>
          {processSteps.map((step, i) => (
            <div
              key={step.no}
              className={`${s.step} reveal`}
              style={{ ["--d" as string]: `${i * 60}ms` }}
            >
              <span className={s.stepNo} aria-hidden="true">
                {step.no}
              </span>
              <div className={s.stepBody}>
                <h3>
                  <span className="en">{step.title.en}</span>
                  <span className="si">{step.title.si}</span>
                </h3>
                <p>
                  <span className="en">{step.body.en}</span>
                  <span className="si">{step.body.si}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

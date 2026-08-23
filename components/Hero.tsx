import { Media } from "./Media";
import { OpenStatus } from "./OpenStatus";
import { PhoneIcon, PinIcon, ClockIcon, ArrowIcon } from "./icons";
import { site } from "@/lib/site";
import s from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`${s.hero} grain`} id="top">
      <div className={s.bg}>
        <Media
          name="hero"
          alt="A van up on the two-post lift at Mallawaarachchi Auto Works, Ganemulla"
          sizes="100vw"
          priority
          position="55% 45%"
        />
      </div>
      <div className={s.scrim} />
      <div className={s.vign} />
      <div className={s.shutter} aria-hidden="true" />

      <svg className={s.gear} viewBox="0 0 100 100" aria-hidden="true" fill="none">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="14" strokeDasharray="10 10" />
        <circle cx="50" cy="50" r="29" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="9" stroke="currentColor" strokeWidth="3" />
      </svg>

      <div className={s.inner}>
        <span className={s.est}>
          <span className={s.estNum}>35+</span>
          <span className="en">Years on the tools · Ganemulla</span>
          <span className="si">වසර 35+ පළපුරුද්ද · ගනේමුල්ල</span>
        </span>

        <h1 className={s.title}>
          <span className="en">
            <span className={s.line}>
              <span>We don&rsquo;t</span>
            </span>
            <span className={s.line}>
              <span>guess.</span>
            </span>
            <span className={s.line}>
              <span className={s.accent}>We diagnose.</span>
            </span>
          </span>
          <span className="si">
            <span className={s.line}>
              <span>අපි අනුමාන</span>
            </span>
            <span className={s.line}>
              <span>කරන්නේ නෑ.</span>
            </span>
            <span className={s.line}>
              <span className={s.accent}>Diagnose කරනවා.</span>
            </span>
          </span>
        </h1>

        <p className={s.lede}>
          <span className="en">
            A light-vehicle repair workshop at Pahala Yagoda, Ganemulla, in the
            Gampaha District — cars, vans and SUVs, petrol and diesel. Engines,
            brakes, overheating, clutch and gearbox, suspension and full running
            repairs, under one roof for over 35 years.
          </span>
          <span className="si">
            ගම්පහ දිස්ත්‍රික්කයේ, පහල යාගොඩ ගනේමුල්ලේ තියෙන light vehicle
            workshop එකක් — Car, Van සහ SUV, petrol සහ diesel. Engine, brake,
            overheating, clutch සහ gearbox, suspension ඇතුළු හැම running repair
            එකක්ම එකම වහලක් යට. වසර 35කට වැඩියි.
          </span>
        </p>

        <div className={s.ctas}>
          <a className="btn" href={`tel:${site.phones[0].e164}`}>
            <PhoneIcon />
            <span className="en">Call {site.phones[0].label}</span>
            <span className="si">Call {site.phones[0].label}</span>
          </a>
          <a className="btn btn--ghost" href="#services">
            <span className="en">What we repair</span>
            <span className="si">අපි කරන වැඩ</span>
            <ArrowIcon />
          </a>
        </div>

        <div className={s.card}>
          <div className={s.cardRow}>
            <OpenStatus dotClass={s.dot} dotShutClass={s.dotShut} />
          </div>
          <div className={s.cardRow}>
            <ClockIcon />
            <span>
              <span className="en">Mon &ndash; Sat &middot; 8.30 AM &ndash; 5.00 PM</span>
              <span className="si">සඳුදා &ndash; සෙනසුරාදා &middot; පෙ.ව 8.30 &ndash; ප.ව 5.00</span>
            </span>
          </div>
          <div className={s.cardRow}>
            <PinIcon />
            <span>
              <span className="en">
                {site.address.line1}, {site.address.city}
              </span>
              <span className="si">
                {site.address.si.line1}, {site.address.si.city}
              </span>
            </span>
          </div>
        </div>
      </div>

      <span className={s.scrollCue} aria-hidden="true">
        Scroll
      </span>

      <div className={s.foot}>
        <div className="hazard hazard-thin" />
        <div className={`${s.stats} plate`}>
          <div className={s.stat}>
            <span className={s.statNum}>
              35<em>+</em>
            </span>
            <span className={s.statLabel}>
              <span className="en">Years in the trade</span>
              <span className="si">වසර ගණන</span>
            </span>
          </div>
          <div className={s.stat}>
            <span className={s.statNum}>
              {site.rating.value}<em>★</em>
            </span>
            <span className={s.statLabel}>
              <span className="en">Google rating</span>
              <span className="si">Google Rating</span>
            </span>
          </div>
          <div className={s.stat}>
            <span className={s.statNum}>{site.rating.count}</span>
            <span className={s.statLabel}>
              <span className="en">Google reviews</span>
              <span className="si">Google Reviews</span>
            </span>
          </div>
          <div className={s.stat}>
            <span className={s.statNum}>6</span>
            <span className={s.statLabel}>
              <span className="en">Days open a week</span>
              <span className="si">සතියේ විවෘත දින</span>
            </span>
          </div>
        </div>
        <div className="hazard hazard-thin" />
      </div>
    </section>
  );
}

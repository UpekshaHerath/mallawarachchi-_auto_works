import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { LogoLockup } from "./Logo";
import { PhoneIcon, PinIcon } from "./icons";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className="hazard hazard-thin" />
      <div className="wrap">
        <div className={s.top}>
          <div className={s.brandCol}>
            <LogoLockup />
            <p className={s.blurb}>
              <span className="en">
                Light-vehicle repairs — cars, vans and SUVs — at Pahala Yagoda,
                Ganemulla. Over 35 years in the trade.
              </span>
              <span className="si">
                Light vehicle අලුත්වැඩියාව — car, van සහ SUV — පහල යාගොඩ,
                ගනේමුල්ල. වසර 35කට වැඩි පළපුරුද්දක්.
              </span>
            </p>
          </div>

          <div>
            <p className={s.colTitle}>
              <span className="en">Repairs</span>
              <span className="si">අලුත්වැඩියා</span>
            </p>
            <ul className={s.links}>
              {services.slice(0, 5).map((v) => (
                <li key={v.id}>
                  <a href={`#${v.id}`}>
                    <span className="en">{v.title.en}</span>
                    <span className="si">{v.title.si}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={s.colTitle}>
              <span className="en">The workshop</span>
              <span className="si">වැඩපොළ</span>
            </p>
            <ul className={s.links}>
              <li>
                <a href="#how">
                  <span className="en">How we work</span>
                  <span className="si">වැඩ පිළිවෙල</span>
                </a>
              </li>
              <li>
                <a href="#workshop">
                  <span className="en">About us</span>
                  <span className="si">අපි ගැන</span>
                </a>
              </li>
              <li>
                <a href="#gallery">
                  <span className="en">Photos</span>
                  <span className="si">Photos</span>
                </a>
              </li>
              <li>
                <a href="#reviews">
                  <span className="en">Reviews</span>
                  <span className="si">Reviews</span>
                </a>
              </li>
              <li>
                <a href="#contact">
                  <span className="en">Contact</span>
                  <span className="si">අපිට කියන්න</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={s.colTitle}>
              <span className="en">Reach us</span>
              <span className="si">අපිට කියන්න</span>
            </p>
            <ul className={s.links}>
              {site.phones.map((p) => (
                <li key={p.e164}>
                  <a href={`tel:${p.e164}`}>
                    <PhoneIcon size={14} /> {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.maps.place}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PinIcon size={14} />{" "}
                  <span className="en">58/04, Pahala Yagoda, Ganemulla</span>
                  <span className="si">58/04, පහල යාගොඩ, ගනේමුල්ල</span>
                </a>
              </li>
              <li>
                <span style={{ color: "var(--muted-2)", fontSize: ".9rem" }}>
                  <span className="en">Mon–Sat · 8.30 AM – 5.00 PM</span>
                  <span className="si">සඳුදා–සෙනසුරාදා · පෙ.ව 8.30 – ප.ව 5.00</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={s.bottom}>
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>
            <span className="en">Ganemulla · Gampaha District · Sri Lanka</span>
            <span className="si">ගනේමුල්ල · ගම්පහ දිස්ත්‍රික්කය · ශ්‍රී ලංකාව</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

import { site } from "@/lib/site";
import { WEEKDAYS, pretty } from "@/lib/hours";
import { MapFacade } from "./MapFacade";
import { PhoneIcon, ArrowIcon } from "./icons";
import s from "./Location.module.css";
import sec from "./Sections.module.css";

const ORDER = [1, 2, 3, 4, 5, 6, 0];

export function Location() {
  return (
    <section className="section" id="find-us">
      <div className="wrap">
        <div className={`${sec.head} reveal`}>
          <span className="kicker">
            <span className="en">Find us</span>
            <span className="si">අපිව හොයාගන්න</span>
          </span>
          <h2>
            <span className="en">Pahala Yagoda, Ganemulla</span>
            <span className="si">පහල යාගොඩ, ගනේමුල්ල</span>
          </h2>
          <p className={sec.headNote}>
            <span className="en">
              Off the Ganemulla road, minutes from Ganemulla town and an easy
              run from Gampaha, Yagoda, Kadawatha and Ja-Ela. Drive in - no
              appointment needed for a look.
            </span>
            <span className="si">
              ගනේමුල්ල පාරට යාබදව, ගනේමුල්ල නගරයට විනාඩි කිහිපයයි. ගම්පහ,
              යාගොඩ, කඩවත සහ ජා-ඇල ඉඳන් ලේසියෙන් එන්න පුළුවන්. කෙළින්ම එන්න -
              කලින් appointment එකක් ගන්න ඕන නෑ.
            </span>
          </p>
        </div>

        <div className={s.row}>
          <div className={`${s.info} reveal`}>
            <div className={s.block}>
              <span className={s.label}>
                <span className="en">Address</span>
                <span className="si">ලිපිනය</span>
              </span>
              <address className={s.value} style={{ fontStyle: "normal" }}>
                <span className="en">
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.district} District
                  <br />
                  {site.address.country}
                </span>
                <span className="si">
                  {site.address.si.line1}
                  <br />
                  {site.address.si.city}, ගම්පහ දිස්ත්‍රික්කය
                  <br />
                  ශ්‍රී ලංකාව
                </span>
              </address>
              <span className={s.sub}>Plus code: {site.plusCode}</span>
            </div>

            <div className={s.block}>
              <span className={s.label}>
                <span className="en">Call the workshop</span>
                <span className="si">වැඩපොළට Call කරන්න</span>
              </span>
              <div className={s.phones}>
                {site.phones.map((p, i) => (
                  <a key={p.e164} className={s.phone} href={`tel:${p.e164}`}>
                    <PhoneIcon size={19} />
                    {p.label}
                    <span className={s.phoneTag}>
                      {i === 0 ? (
                        <>
                          <span className="en">Main</span>
                          <span className="si">ප්‍රධාන</span>
                        </>
                      ) : (
                        <>
                          <span className="en">Alternate</span>
                          <span className="si">දෙවැනි</span>
                        </>
                      )}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className={s.block}>
              <span className={s.label}>
                <span className="en">Opening hours</span>
                <span className="si">විවෘත වෙලාවන්</span>
              </span>
              <table className={s.hours}>
                <tbody>
                  {ORDER.map((d) => {
                    const h = site.hours[d];
                    return (
                      <tr key={d} className={h ? "" : s.shut}>
                        <th scope="row">
                          <span className="en">{WEEKDAYS.en[d]}</span>
                          <span className="si">{WEEKDAYS.si[d]}</span>
                        </th>
                        <td>
                          {h ? (
                            `${pretty(h.open)} – ${pretty(h.close)}`
                          ) : (
                            <>
                              <span className="en">Closed</span>
                              <span className="si">වසා ඇත</span>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${s.mapCard} reveal`} style={{ ["--d" as string]: "100ms" }}>
            <MapFacade />
            <div className={s.mapActions}>
              <a
                className="btn"
                href={site.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="en">Get directions</span>
                <span className="si">Directions ගන්න</span>
                <ArrowIcon />
              </a>
              <a
                className="btn btn--ghost"
                href={site.maps.place}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="en">Open in Google Maps</span>
                <span className="si">Google Maps එකේ බලන්න</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

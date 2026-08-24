import { Media } from "./Media";
import { vehicles, brands } from "@/lib/content";
import { WrenchIcon, GearIcon, PinIcon, ClockIcon } from "./icons";
import s from "./Workshop.module.css";
import sec from "./Sections.module.css";

const FACTS = [
  {
    Icon: WrenchIcon,
    en: "Two-post lifts, hydraulic press and a proper tool wall - the vehicle goes up so the fault can actually be seen, not felt for from the ground.",
    si: "Two-post lift, hydraulic press සහ පිරුණු tool wall එකක්. බිම ඉඳන් අතගාමින් හොයනවා වෙනුවට වාහනය උස්සලා fault එක ඇස්වලින්ම බලනවා.",
  },
  {
    Icon: GearIcon,
    en: "Scanner and live-data diagnosis on modern vehicles, plus the hands-on knowledge that older carburettor and mechanical-diesel work still needs.",
    si: "අලුත් වාහනවලට scanner එකෙන් live data බලලා check කරනවා. ඒ එක්කම පරණ carburettor සහ mechanical diesel වැඩවලට ඕන අත් පුරුද්දත් තියෙනවා.",
  },
  {
    Icon: PinIcon,
    en: "Parts sourced for you. You don't have to hunt Panchikawatta or wait on three different shops to call back.",
    si: "Part අපිම හොයාගන්නවා. පංචිකාවත්තේ දුවන්නවත්, කඩ තුනකින් call එකක් එනකම් බලාගෙන ඉන්නවත් ඕන නෑ.",
  },
  {
    Icon: ClockIcon,
    en: "Most running repairs are turned around the same day. Bigger jobs get a realistic date - not an optimistic one.",
    si: "ගොඩක් running repair එදිනම ඉවර කරනවා. ලොකු වැඩවලට ඇත්ත දිනයක් දෙනවා - ඔබව සතුටු කරන්න කියන දිනයක් නෙවෙයි.",
  },
];

export function Workshop() {
  return (
    <section className="section" id="workshop">
      <div className="wrap">
        <div className={s.split}>
          <div className={`${s.figWrap} reveal`}>
            <div className={`${s.fig} grain`}>
              <Media
                name="master-at-work"
                alt="Press work under way at the Ganemulla workshop bench"
                sizes="(min-width: 900px) 44vw, 92vw"
              />
            </div>
            <div className={s.stamp} aria-hidden="true">
              <span className={s.stampBig}>35+</span>
              <span className={s.stampSmall}>Years</span>
            </div>
          </div>

          <div className={`${s.copy} reveal`} style={{ ["--d" as string]: "120ms" }}>
            <span className="kicker">
              <span className="en">The workshop</span>
              <span className="si">වැඩපොළ</span>
            </span>
            <h2>
              <span className="en">A family trade, not a franchise</span>
              <span className="si">පවුලේ වෘත්තියක්, Franchise එකක් නෙවෙයි</span>
            </h2>

            <p className={s.pull}>
              <span className="en">
                Every vehicle here is checked properly before anything is
                opened up - we find the real cause first, so the repair holds
                and you only pay for the work that was needed.
              </span>
              <span className="si">
                මෙතන හැම වාහනයක්ම වැඩේ පටන් ගන්න කලින් හොඳට check කරනවා - ඇත්ත
                ප්‍රශ්නය හොයාගෙනයි වැඩේ කරන්නේ. ඒ නිසා හදන වැඩේ හරියට හැදෙනව,
                ඕන නැති part එකකට ගෙවන්නත් වෙන්නේ නෑ.
              </span>
            </p>

            <p>
              <span className="en">
                Mallawaarachchi Auto Works has been repairing light vehicles at
                Pahala Yagoda in Ganemulla for over thirty-five years. It grew
                the way workshops in this country actually grow - one repair at
                a time, on vehicles owned by neighbours who come back and send
                their families.
              </span>
              <span className="si">
                Mallawaarachchi Auto Works, ගනේමුල්ල පහල යාගොඩ වසර 35කට වැඩි
                කාලයක් තිස්සේ light vehicle හදනවා. මේක හැදුණේ අපේ රටේ workshop
                හැදෙන විදිහටමයි - එකින් එක වැඩෙන්, ආපහු ආපහු එන ගමේ
                customer ලාගෙන්.
              </span>
            </p>

            <ul className={s.facts}>
              {FACTS.map(({ Icon, en, si }, i) => (
                <li key={i}>
                  <Icon size={18} />
                  <span>
                    <span className="en">{en}</span>
                    <span className="si">{si}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${s.band} reveal`}>
          <div className={`${sec.head} ${sec.headWide}`} style={{ marginBottom: 0, gap: ".75rem" }}>
            <span className="kicker">
              <span className="en">Vehicles we handle</span>
              <span className="si">අපි බාරගන්න වාහන</span>
            </span>
          </div>

          <div className={s.chips}>
            {vehicles.map((v, i) => (
              <span key={i} className={`${s.chip} ${s.chipHot}`}>
                <span className="en">{v.en}</span>
                <span className="si">{v.si}</span>
              </span>
            ))}
          </div>

          <div className={s.chips}>
            {brands.map((b) => (
              <span key={b} className={s.chip}>
                {b}
              </span>
            ))}
          </div>

          <p className={s.bandNote}>
            <span className="en">
              Brand isn&rsquo;t the deciding factor - if it&rsquo;s a light
              vehicle and parts can be sourced, bring it in. Heavy trucks and
              buses are the one thing we don&rsquo;t take.
            </span>
            <span className="si">
              Brand එක ප්‍රශ්නයක් නෙවෙයි - light vehicle එකක් නම්, part
              ගෙන්නගන්න පුළුවන් නම්, ගේන්න. අපි බාර නොගන්න එකම දේ බර truck සහ
              bus විතරයි.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

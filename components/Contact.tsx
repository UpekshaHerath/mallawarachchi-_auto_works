"use client";

import { useState } from "react";
import { site, waLink } from "@/lib/site";
import { useLang } from "@/lib/useLang";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import s from "./Contact.module.css";

const WHEN = [
  { v: "today", en: "Today", si: "අද" },
  { v: "tomorrow", en: "Tomorrow", si: "හෙට" },
  { v: "this-week", en: "Later this week", si: "මේ සතියේ පස්සේ" },
  { v: "asking", en: "Just asking for now", si: "දැනට අහනවා විතරයි" },
];

export function Contact() {
  const lang = useLang();
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [when, setWhen] = useState("today");
  const [problem, setProblem] = useState("");
  const [err, setErr] = useState("");

  const send = () => {
    if (!problem.trim()) {
      setErr("problem");
      return;
    }
    setErr("");

    const si = lang === "si";
    const w = WHEN.find((x) => x.v === when)!;

    const msg = si
      ? [
          "ආයුබෝවන්. Mallawaarachchi Auto Works website එකෙන් contact කරනවා.",
          name && `නම: ${name}`,
          vehicle && `වාහනය: ${vehicle}`,
          `ප්‍රශ්නය: ${problem.trim()}`,
          `ගේන්න බලාපොරොත්තු වෙන්නේ: ${w.si}`,
        ]
      : [
          "Hello, I'm contacting you from the Mallawaarachchi Auto Works website.",
          name && `Name: ${name}`,
          vehicle && `Vehicle: ${vehicle}`,
          `Problem: ${problem.trim()}`,
          `Hoping to bring it in: ${w.en}`,
        ];

    window.open(waLink(msg.filter(Boolean).join("\n")), "_blank", "noopener");
  };

  return (
    <section className={`${s.shell} section`} id="contact">
      <div className="wrap">
        <div className={s.row}>
          <div className={`${s.pitch} reveal`}>
            <span className="kicker">
              <span className="en">Get in touch</span>
              <span className="si">අපිට කියන්න</span>
            </span>
            <h2>
              <span className="en">Tell us what it&rsquo;s doing</span>
              <span className="si">වාහනේ මොකද කරන්නේ කියන්න</span>
            </h2>
            <p>
              <span className="en">
                Describe the symptom in your own words - the sound, when it
                happens, what changed. That is usually enough for us to tell you
                on the phone whether it&rsquo;s a small job or one that needs
                the vehicle left with us.
              </span>
              <span className="si">
                ඔබේම වචනවලින් ප්‍රශ්නය කියන්න - මොන වගේ හඬක්ද, කවදද ඒක වෙන්නේ,
                මොකද වෙනස් වුණේ. පොඩි වැඩක්ද නැත්නම් වාහනය තියලා යන්න වෙන
                එකක්ද කියලා phone එකෙන්ම කියන්න අපිට ඒක ඇති.
              </span>
            </p>

            <div className={s.callOut}>
              <span className={s.callOutTitle}>
                <span className="en">Calling is fastest</span>
                <span className="si">Call කරන එක ඉක්මන්ම ක්‍රමය</span>
              </span>
              <p className={s.small}>
                <span className="en">
                  The workshop phone is answered during working hours,
                  Monday to Saturday, 8.30 AM to 5.00 PM. Messages sent after
                  hours are picked up the next working morning.
                </span>
                <span className="si">
                  සඳුදා ඉඳන් සෙනසුරාදා දක්වා පෙ.ව 8.30 – ප.ව 5.00 අතර වැඩපොළේ
                  phone එකට උත්තර දෙනවා. ඊට පස්සේ එවන message වලට ඊළඟ වැඩ කරන
                  දවසේ උදේ උත්තර දෙනවා.
                </span>
              </p>
              <div className={s.actions}>
                <a className="btn" href={`tel:${site.phones[0].e164}`}>
                  <PhoneIcon />
                  {site.phones[0].label}
                </a>
                <a className="btn btn--ghost" href={`tel:${site.phones[1].e164}`}>
                  <PhoneIcon />
                  {site.phones[1].label}
                </a>
              </div>
            </div>
          </div>

          <div className={`${s.card} reveal`} style={{ ["--d" as string]: "120ms" }}>
            <div className={s.cardHead}>
              <span>
                <span className="en">Job enquiry</span>
                <span className="si">වැඩක් ගැන අහන්න</span>
              </span>
              <span>WhatsApp</span>
            </div>

            <form
              className={s.form}
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <div className={s.two}>
                <label className={s.field}>
                  <span className={s.fLabel}>
                    <span className="en">Your name</span>
                    <span className="si">ඔබේ නම</span>
                  </span>
                  <input
                    className={s.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </label>

                <label className={s.field}>
                  <span className={s.fLabel}>
                    <span className="en">Vehicle &amp; year</span>
                    <span className="si">වාහනය සහ Year එක</span>
                  </span>
                  <input
                    className={s.input}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="Toyota Axio 2012"
                  />
                </label>
              </div>

              <label className={s.field}>
                <span className={s.fLabel}>
                  <span className="en">What is it doing?</span>
                  <span className="si">වාහනේ මොකද කරන්නේ?</span>
                </span>
                <textarea
                  className={s.textarea}
                  value={problem}
                  onChange={(e) => {
                    setProblem(e.target.value);
                    if (err) setErr("");
                  }}
                  required
                  aria-invalid={err === "problem"}
                />
                {err === "problem" && (
                  <span className={s.err}>
                    <span className="en">Please describe the problem first.</span>
                    <span className="si">කරුණාකර මුලින්ම ප්‍රශ්නය කියන්න.</span>
                  </span>
                )}
              </label>

              <label className={s.field}>
                <span className={s.fLabel}>
                  <span className="en">When can you bring it?</span>
                  <span className="si">කවදා ගේන්න පුළුවන්ද?</span>
                </span>
                <select
                  className={s.select}
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                >
                  {WHEN.map((o) => (
                    <option key={o.v} value={o.v}>
                      {lang === "si" ? o.si : o.en}
                    </option>
                  ))}
                </select>
              </label>

              <div className={s.actions}>
                <button type="submit" className="btn btn--wa">
                  <WhatsAppIcon />
                  <span className="en">Send on WhatsApp</span>
                  <span className="si">WhatsApp එකෙන් යවන්න</span>
                </button>
              </div>

              <p className={s.small}>
                <span className="en">
                  This opens WhatsApp with your message already written to{" "}
                  {site.phones[0].label}. Nothing is stored on this website.
                </span>
                <span className="si">
                  මේකෙන් ඔබේ message එක ලියලා {site.phones[0].label} අංකයට
                  WhatsApp එක open වෙනවා. මේ website එකේ කිසිම දෙයක් save
                  වෙන්නේ නෑ.
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

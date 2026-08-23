"use client";

import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";
import s from "./Header.module.css";

const NAV = [
  { href: "#services", no: "01", en: "Repairs", si: "අලුත්වැඩියා" },
  { href: "#how", no: "02", en: "How we work", si: "වැඩ පිළිවෙල" },
  { href: "#workshop", no: "03", en: "Workshop", si: "වැඩපොළ" },
  { href: "#reviews", no: "04", en: "Reviews", si: "Reviews" },
  { href: "#find-us", no: "05", en: "Find us", si: "ලිපිනය" },
];

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "si">("en");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-lang");
    if (current === "si") setLang("si");

    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (next: "en" | "si") => {
    setLang(next);
    document.documentElement.setAttribute("data-lang", next);
    document.documentElement.setAttribute("lang", next);
    try {
      localStorage.setItem("maw-lang", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  return (
    <>
      <header className={`${s.header} ${stuck ? s.stuck : ""}`}>
        <div className={s.bar}>
          <a href="#top" className={s.brand} aria-label={site.name}>
            <LogoLockup compact />
          </a>

          <nav className={s.nav} aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={s.link}>
                <span className="en">{n.en}</span>
                <span className="si">{n.si}</span>
              </a>
            ))}
          </nav>

          <div className={s.actions}>
            <div className={s.lang} role="group" aria-label="Language / භාෂාව">
              <button
                type="button"
                className={`${s.langBtn} ${lang === "en" ? s.langOn : ""}`}
                onClick={() => pick("en")}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                className={`${s.langBtn} ${lang === "si" ? s.langOn : ""}`}
                onClick={() => pick("si")}
                aria-pressed={lang === "si"}
              >
                සිං
              </button>
            </div>

            <a className={s.call} href={`tel:${site.phones[0].e164}`}>
              <PhoneIcon />
              {site.phones[0].label}
            </a>

            <button
              type="button"
              className={`${s.burger} ${open ? s.open : ""}`}
              aria-expanded={open}
              aria-controls="menu-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-sheet"
        className={`${s.sheet} ${open ? s.sheetOpen : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className={s.sheetLink}
            onClick={() => setOpen(false)}
          >
            <span className={s.sheetNo}>{n.no}</span>
            <span className="en">{n.en}</span>
            <span className="si">{n.si}</span>
          </a>
        ))}
        <div className={s.sheetFoot}>
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
    </>
  );
}

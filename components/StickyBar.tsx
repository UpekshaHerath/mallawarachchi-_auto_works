"use client";

import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon, PinIcon } from "./icons";
import s from "./Footer.module.css";

/** Appears once the visitor is past the hero — thumb-reach actions on phones. */
export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${s.bar} ${show ? s.barShow : ""}`}
      aria-label="Quick contact"
    >
      <a className={`${s.barBtn} ${s.barCall}`} href={`tel:${site.phones[0].e164}`}>
        <PhoneIcon size={19} />
        <span className="en">Call</span>
        <span className="si">Call</span>
      </a>
      <a
        className={s.barBtn}
        href={waLink(
          "Hello, I'd like to ask about a repair at Mallawaarachchi Auto Works.",
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={19} />
        <span className="en">WhatsApp</span>
        <span className="si">WhatsApp</span>
      </a>
      <a
        className={s.barBtn}
        href={site.maps.directions}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PinIcon size={19} />
        <span className="en">Directions</span>
        <span className="si">Directions</span>
      </a>
    </nav>
  );
}

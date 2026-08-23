"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { PinIcon } from "./icons";
import s from "./Location.module.css";

/**
 * The Google Maps embed is ~700KB of third-party JS. It only loads when the
 * visitor actually asks for the map, so the page itself stays light.
 */
export function MapFacade() {
  const [live, setLive] = useState(false);

  if (live) {
    return (
      <iframe
        className={s.frame}
        src={site.maps.embed}
        title="Map showing Mallawaarachchi Auto Works, Pahala Yagoda, Ganemulla"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className={s.facade} onClick={() => setLive(true)}>
      <span className={s.facadeInner}>
        <span className={s.pin}>
          <PinIcon size={22} />
        </span>
        <span className={s.facadeText}>
          <span className="en">Show the map</span>
          <span className="si">සිතියම පෙන්වන්න</span>
        </span>
        <span className={s.facadeHint}>
          <span className="en">
            58/04, Pahala Yagoda, Ganemulla · loads Google Maps
          </span>
          <span className="si">
            58/04, පහල යාගොඩ, ගනේමුල්ල · Google Maps පූරණය වේ
          </span>
        </span>
      </span>
    </button>
  );
}

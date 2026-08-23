"use client";

import { useEffect, useState } from "react";

export type Lang = "en" | "si";

/**
 * Most text on this site renders in both languages and CSS hides one, so no
 * hook is needed. This is for the handful of places that can only hold a plain
 * string — <option> labels, alt text, generated WhatsApp messages.
 */
export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setLang(root.getAttribute("data-lang") === "si" ? "si" : "en");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-lang"] });
    return () => mo.disconnect();
  }, []);

  return lang;
}

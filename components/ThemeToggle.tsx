"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "dark" | "light";

const KEY = "maw-theme";

/** What the page is actually painting right now: the choice if one was made,
 *  the OS preference otherwise. Mirrors the boot script in app/layout.tsx. */
function current(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

/* Address-bar / task-switcher colour has to follow the theme too, and the
   static <meta> pair only covers the OS preference, not an explicit choice. */
function paintChrome(theme: Theme) {
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => m.remove());
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = theme === "light" ? "#f2efe7" : "#0b0d10";
  document.head.appendChild(meta);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(current());

    // With no stored choice the site follows the OS, including a change made
    // while the tab is open.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => {
      if (!document.documentElement.hasAttribute("data-theme")) {
        setTheme(mq.matches ? "light" : "dark");
      }
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  const flip = () => {
    const next: Theme = current() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    paintChrome(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  const toLight = theme === "dark";

  return (
    <button
      type="button"
      className={className}
      onClick={flip}
      aria-label={toLight ? "Switch to light theme" : "Switch to dark theme"}
      title={toLight ? "Light theme" : "Dark theme"}
    >
      {toLight ? <SunIcon size={17} /> : <MoonIcon size={17} />}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "dark" | "light";

const KEY = "maw-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/** What the page is actually painting right now. The boot script in
 *  app/layout.tsx stamps data-theme before first paint — from the stored
 *  choice if there is one, from the OS preference otherwise — so reading the
 *  attribute is the whole answer. */
function current(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  paintChrome(theme);
}

/* Address-bar / task-switcher colour has to follow the theme too; the static
   <meta> in app/layout.tsx only carries the paper default. */
function paintChrome(theme: Theme) {
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => m.remove());
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = theme === "light" ? "#f2efe7" : "#0b0d10";
  document.head.appendChild(meta);
}

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  // The server renders the paper default; the real theme is applied by the
  // boot script before paint, so the button and the chrome catch up on mount.
  useEffect(() => {
    const now = current();
    setTheme(now);
    paintChrome(now);
  }, []);

  // Until someone picks a side, the OS keeps driving: flipping the system
  // theme while the tab is open flips the page with it.
  useEffect(() => {
    const mq = window.matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (stored()) return;
      const next: Theme = e.matches ? "dark" : "light";
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const flip = () => {
    const next: Theme = current() === "light" ? "dark" : "light";
    apply(next);
    setTheme(next);
    document.documentElement.setAttribute("data-theme-source", "user");
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode — the choice just won't persist, so the OS keeps driving */
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

"use client";

import { useEffect, useState } from "react";
import { openState, pretty, WEEKDAYS } from "@/lib/hours";
import { site } from "@/lib/site";

/**
 * Rendered on the client only — the server has no idea what time it is where
 * the visitor is, and a stale "Open now" is worse than a beat of nothing.
 */
export function OpenStatus({
  dotClass = "",
  dotShutClass = "",
}: {
  dotClass?: string;
  dotShutClass?: string;
}) {
  const [state, setState] = useState<ReturnType<typeof openState> | null>(null);

  useEffect(() => {
    setState(openState());
    const id = setInterval(() => setState(openState()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return (
      <>
        <span className={dotClass} style={{ opacity: 0.25 }} />
        <span style={{ opacity: 0.45 }}>
          <span className="en">Mon–Sat, 8.30 AM – 5.00 PM</span>
          <span className="si">සඳුදා–සෙනසුරාදා, පෙ.ව 8.30 – ප.ව 5.00</span>
        </span>
      </>
    );
  }

  const opensAt = state.nextDay !== null ? site.hours[state.nextDay] : null;
  const sameDay = state.nextDay === state.day;

  return (
    <>
      <span className={`${dotClass} ${state.open ? "" : dotShutClass}`} />
      {state.open ? (
        <span>
          <span className="en">
            <strong style={{ color: "var(--go)" }}>Open now</strong> · until{" "}
            {pretty(site.hours[state.day]!.close)}
          </span>
          <span className="si">
            <strong style={{ color: "var(--go)" }}>දැන් OPEN</strong> ·{" "}
            {pretty(site.hours[state.day]!.close)} දක්වා
          </span>
        </span>
      ) : (
        <span>
          <span className="en">
            <strong style={{ color: "var(--oxide)" }}>Closed</strong>
            {opensAt
              ? ` · opens ${sameDay ? "" : WEEKDAYS.en[state.nextDay!] + " "}${pretty(opensAt.open)}`
              : ""}
          </span>
          <span className="si">
            <strong style={{ color: "var(--oxide)" }}>දැන් CLOSED</strong>
            {opensAt
              ? ` · ${sameDay ? "" : WEEKDAYS.si[state.nextDay!] + " "}${pretty(opensAt.open)} ට විවෘත වේ`
              : ""}
          </span>
        </span>
      )}
    </>
  );
}

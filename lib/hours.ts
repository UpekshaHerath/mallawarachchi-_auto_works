import { site } from "./site";

export type OpenState = {
  open: boolean;
  /** e.g. "8:30 AM – 5:00 PM" for the relevant day */
  window: string | null;
  /** the day the window belongs to (0 = Sunday) */
  day: number;
  /** when closed: the next day we open, as a weekday index */
  nextDay: number | null;
};

const COLOMBO = "Asia/Colombo";

/** Current wall-clock day + minutes in Colombo, whatever the visitor's TZ. */
export function colomboNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: COLOMBO,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days.indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { day: day < 0 ? new Date().getDay() : day, minutes };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const pretty = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}.${String(m).padStart(2, "0")} ${suffix}`;
};

export function openState(now = new Date()): OpenState {
  const { day, minutes } = colomboNow(now);
  const today = site.hours[day];

  if (today) {
    const from = toMinutes(today.open);
    const to = toMinutes(today.close);
    const window = `${pretty(today.open)} – ${pretty(today.close)}`;
    if (minutes >= from && minutes < to) {
      return { open: true, window, day, nextDay: null };
    }
    if (minutes < from) {
      return { open: false, window, day, nextDay: day };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (site.hours[d]) return { open: false, window: null, day, nextDay: d };
  }
  return { open: false, window: null, day, nextDay: null };
}

export const WEEKDAYS = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  si: ["ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා"],
};

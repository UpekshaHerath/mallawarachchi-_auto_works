import s from "./Logo.module.css";

/*
 * Redrawn from the shop's signboard: a machined gear ring with a car profile
 * parked inside it.
 *
 * The gear path is generated geometry, not a dashed circle — 12 trapezoidal
 * teeth on a 47.5 root / 58 tip radius, with the centre knocked out by the
 * even-odd rule. The car sits wholly inside the 39-radius bore with clearance
 * on every side, so nothing collides at favicon sizes.
 */

const GEAR =
  "M52.41 13.11 L54.34 2.28 L65.66 2.28 L67.59 13.11 A47.5 47.5 0 0 1 76.87 15.60 " +
  "L83.96 7.18 L93.76 12.84 L90.02 23.19 A47.5 47.5 0 0 1 96.81 29.98 L107.16 26.24 " +
  "L112.82 36.04 L104.40 43.13 A47.5 47.5 0 0 1 106.89 52.41 L117.72 54.34 L117.72 65.66 " +
  "L106.89 67.59 A47.5 47.5 0 0 1 104.40 76.87 L112.82 83.96 L107.16 93.76 L96.81 90.02 " +
  "A47.5 47.5 0 0 1 90.02 96.81 L93.76 107.16 L83.96 112.82 L76.87 104.40 " +
  "A47.5 47.5 0 0 1 67.59 106.89 L65.66 117.72 L54.34 117.72 L52.41 106.89 " +
  "A47.5 47.5 0 0 1 43.13 104.40 L36.04 112.82 L26.24 107.16 L29.98 96.81 " +
  "A47.5 47.5 0 0 1 23.19 90.02 L12.84 93.76 L7.18 83.96 L15.60 76.87 " +
  "A47.5 47.5 0 0 1 13.11 67.59 L2.28 65.66 L2.28 54.34 L13.11 52.41 " +
  "A47.5 47.5 0 0 1 15.60 43.13 L7.18 36.04 L12.84 26.24 L23.19 29.98 " +
  "A47.5 47.5 0 0 1 29.98 23.19 L26.24 12.84 L36.04 7.18 L43.13 15.60 " +
  "A47.5 47.5 0 0 1 52.41 13.11 Z " +
  "M99 60 A39 39 0 1 0 21 60 A39 39 0 1 0 99 60 Z";

/* Side profile: nose, raked screen, roof, fastback rear, arches cut for the wheels. */
const CAR =
  "M27.5 71 L27.5 67.4 C27.5 63.2 29.6 60.8 33.6 60.1 L47 58.2 " +
  "C49.6 57.8 51.1 57 53 55.2 L59.4 48.8 C61 47.1 63 46.3 65.6 46.3 " +
  "L72.6 46.3 C75.6 46.3 77.7 47.2 79.3 49.3 L85 57 C86.5 58.8 88.4 60 90.6 60.8 " +
  "C92.7 61.6 93.5 63.4 93.5 66 L93.5 71 L88.5 71 A8.5 8.5 0 0 0 71.5 71 " +
  "L48.5 71 A8.5 8.5 0 0 0 31.5 71 Z " +
  // side glass, punched out by the even-odd rule — without it the cabin
  // silhouette reads as a hump rather than a car
  "M56.6 55 L62 49.6 C62.7 48.9 63.6 48.6 64.8 48.6 L71.8 48.6 " +
  "C73 48.6 73.8 48.9 74.4 49.7 L79.2 55 Z";

export function LogoMark({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`${s.mark} logo-mark ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Mallawaarachchi Auto Works"
    >
      <g className={s.gear}>
        <path d={GEAR} fill="currentColor" fillRule="evenodd" />
      </g>
      <g fill="currentColor">
        <path d={CAR} fillRule="evenodd" />
        <circle cx="40" cy="71" r="6.2" />
        <circle cx="80" cy="71" r="6.2" />
        <rect x="33" y="78.6" width="54" height="3" rx="1.5" opacity="0.9" />
      </g>
    </svg>
  );
}

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`${s.lockup} ${compact ? s.lockupCompact : ""}`}>
      <LogoMark size={compact ? 36 : 48} />
      <span className={s.words}>
        <span className={`${s.name} ${compact ? s.nameCompact : ""}`}>
          Mallawaarachchi
        </span>
        <span className={s.sub}>
          <span className={`${s.subText} ${compact ? s.subCompact : ""}`}>
            Auto Works
          </span>
          <span className={s.subRule} aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}

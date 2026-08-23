/* Small line icons, 24-grid, stroke-based so they inherit colour and weight. */

type P = { size?: number; className?: string };
const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className,
});

export const PhoneIcon = ({ size = 17, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 13l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22.5l5.86-1.5a9.8 9.8 0 0 0 4.18.94h.01c5.43 0 9.83-4.4 9.83-9.84C21.88 6.4 17.48 2 12.04 2Zm5.7 13.9c-.24.68-1.4 1.3-1.94 1.34-.5.05-1.13.07-1.82-.11a15.9 15.9 0 0 1-1.65-.6c-2.9-1.25-4.8-4.16-4.94-4.35-.14-.2-1.18-1.57-1.18-3s.75-2.12 1.02-2.41c.27-.3.58-.37.78-.37h.56c.18 0 .42-.07.66.5.24.6.83 2.02.9 2.17.08.14.13.31.03.5-.1.2-.15.31-.29.48l-.44.51c-.14.14-.29.3-.12.59.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.2.72-.85.92-1.14.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.12.07.68-.17 1.35Z" />
  </svg>
);

export const PinIcon = ({ size = 18, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const ClockIcon = ({ size = 18, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.2V12l3.2 2" />
  </svg>
);

export const ArrowIcon = ({ size = 18, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const StarIcon = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45L2.6 9.45l6.5-.95L12 2.6Z" />
  </svg>
);

export const WrenchIcon = ({ size = 20, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M15.6 4.4a4.8 4.8 0 0 0-6.2 6l-5.1 5.1a1.8 1.8 0 0 0 0 2.6l1.6 1.6a1.8 1.8 0 0 0 2.6 0l5.1-5.1a4.8 4.8 0 0 0 6-6.2l-2.9 2.9-2.6-.7-.7-2.6 2.2-3.6Z" />
  </svg>
);

export const GearIcon = ({ size = 20, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" />
  </svg>
);

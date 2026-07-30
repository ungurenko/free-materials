// Инлайновые SVG-иконки — единый стиль, stroke 1.8, без внешних библиотек.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const IconTelegram = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21.5 3.6 2.9 10.8c-.9.35-.85 1.63.07 1.9l4.7 1.42 1.8 5.6c.28.87 1.4 1.05 1.94.31l2.4-3.3 4.6 3.4c.72.53 1.74.13 1.9-.77l2.4-13.9c.17-.98-.78-1.75-1.7-1.36Z" />
    <path d="m7.7 14.1 9.8-8.2" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconYoutube = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
    <path d="m10.2 9.4 4.6 2.6-4.6 2.6V9.4Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </svg>
);

export const IconArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

export const IconChevronLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
);

export const IconCopy = (p: P) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 13.8 9l6.2 1.8-6.2 1.8L12 18.8l-1.8-6.2L4 10.8 10.2 9 12 2.8Z" />
    <path d="M19 16.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" strokeWidth={1.4} />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconDoc = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 3.5h8L19 8.5v12H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
    <path d="M14 3.5v5h5" />
    <path d="M9 13h6M9 16.5h6" />
  </svg>
);

export const IconBolt = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 2.5 5 13.5h5.5L11 21.5l8-11h-5.5L13 2.5Z" />
  </svg>
);

export const IconGift = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="9" width="16" height="11" rx="1.5" />
    <path d="M12 9v11M4 13.5h16" />
    <path d="M12 9s-1.2-4.8-4.3-4.8C6 4.2 5 5.4 5 6.7 5 8.2 6.4 9 8 9h4Zm0 0s1.2-4.8 4.3-4.8C18 4.2 19 5.4 19 6.7 19 8.2 17.6 9 16 9h-4Z" />
  </svg>
);

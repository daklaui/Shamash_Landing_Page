export const typeScale: Record<string, [string, { lineHeight: string }]> = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.375rem" }],
  base: ["1rem", { lineHeight: "1.6rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["2rem", { lineHeight: "2.4rem" }],
  "4xl": ["2.5rem", { lineHeight: "2.875rem" }],
  "5xl": ["3.5rem", { lineHeight: "3.85rem" }],
  "6xl": ["4rem", { lineHeight: "4.4rem" }]
};

export const spacingScale = {
  18: "4.5rem",
  22: "5.5rem",
  26: "6.5rem",
  30: "7.5rem"
} as const;

export const containerTokens = {
  shell: "112rem",
  prose: "65ch"
} as const;

export const motionTokens = {
  duration: {
    fast: 0.18,
    standard: 0.34,
    reveal: 0.58
  },
  stagger: 0.08,
  curve: [0.22, 1, 0.36, 1] as const,
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  hoverDuration: "180ms",
  entranceDuration: "580ms",
  spring: {
    type: "spring" as const,
    stiffness: 280,
    damping: 28,
    mass: 0.8
  },
  css: {
    easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
    hoverDuration: "180ms",
    entranceDuration: "580ms"
  }
} as const;

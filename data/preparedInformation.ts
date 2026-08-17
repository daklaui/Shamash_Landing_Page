export const solutionIdentity = {
  xpertfactor: {
    code: "XF",
    label: "Xpert Factor",
    logo: "/logos/xpert-factor-logo-v2.webp",
    pattern: "portfolio"
  },
  factorix: {
    code: "FX",
    label: "Factorix",
    logo: "/logos/factorix-logo-v2.webp",
    pattern: "operations"
  },
  "document-management": {
    code: "XA",
    label: "XpertArchive",
    logo: "/logos/xpert-archive-logo-v2.webp",
    pattern: "records"
  },
  "ai-automation": {
    code: "AI",
    label: "AI Automation",
    logo: null,
    pattern: "automation"
  },
  "web-mobile-development": {
    code: "WM",
    label: "Web and Mobile",
    logo: null,
    pattern: "architecture"
  }
} as const;

export type SolutionIdentityId = keyof typeof solutionIdentity;

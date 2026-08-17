import type { Config } from "tailwindcss";
import { containerTokens, motionTokens, spacingScale, typeScale } from "./lib/designTokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontSize: typeScale,
    extend: {
      spacing: spacingScale,
      maxWidth: {
        shell: containerTokens.shell,
        prose: containerTokens.prose
      },
      transitionDuration: {
        snappy: motionTokens.hoverDuration,
        entrance: motionTokens.entranceDuration
      },
      transitionTimingFunction: {
        premium: motionTokens.easeOut,
        "premium-in": motionTokens.easeIn
      },
      colors: {
        shamash: {
          blue: "#35A8DE",
          indigo: "#505CA2",
          gold: "#E9AE11",
          navy: "#242850"
        },
        neutral: {
          page: "#F8FAFC",
          gray: "#F3F4F6",
          border: "#E5E7EB",
          text: "#374151",
          muted: "#6B7280",
          heading: "#111827"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(36, 40, 80, 0.12)",
        panel: "0 14px 40px rgba(36, 40, 80, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;

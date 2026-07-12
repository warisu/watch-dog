import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0B0F14",
          900: "#0F151C",
          800: "#12181F",
          700: "#1A222B",
          600: "#232B35",
        },
        ink: {
          100: "#E6EDF3",
          300: "#AEB9C4",
          500: "#7C8A99",
        },
        flare: {
          DEFAULT: "#FF5D3A",
          dim: "#7A2E1E",
        },
        radar: {
          DEFAULT: "#35D28A",
          dim: "#1B5C41",
        },
        signal: {
          DEFAULT: "#4FA3FF",
          dim: "#1E3A5C",
        },
        amber: {
          DEFAULT: "#F5B942",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;

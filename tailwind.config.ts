import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f4f2ec",
        "paper-alt": "#ebe8dd",
        surface: "#fbfaf5",
        ink: "#15140f",
        "ink-2": "#3b3933",
        muted: "#76726a",
        line: "#dcd8ca",
        "line-2": "#e6e2d6",
        brand: { DEFAULT: "#2f6b54", soft: "#e4efe8" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1140px" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,.61,.36,1) both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

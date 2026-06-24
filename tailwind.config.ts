import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        "paper-alt": "#f4f6f9",
        surface: "#ffffff",
        card: "#f1f4f8",
        ink: "#1b1b1d",
        "ink-2": "#3c3f45",
        muted: "#5f6368",
        line: "#e4e7ec",
        "line-2": "#eef1f5",
        brand: { DEFAULT: "#ec6324", dark: "#d2511a", soft: "#fdeadd", tint: "#fbf2ea" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1180px", reading: "640px" },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      boxShadow: {
        soft: "0 8px 40px rgba(20,22,30,0.10)",
        card: "0 2px 16px rgba(20,22,30,0.05)",
        btn: "0 10px 24px rgba(236,99,36,0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
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

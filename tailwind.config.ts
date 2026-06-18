import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette pulled from the GTA VI cover art.
        pink: "#FF2E97",
        cyan: "#16E0FF",
        violet: "#7B3FE4",
        sunset: "#FF8A3D",
        ink: "#0B0614",
        paper: "#FDF6EE",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "neon-pink": "0 0 20px rgba(255,46,151,0.55), 0 0 60px rgba(255,46,151,0.25)",
        "neon-cyan": "0 0 20px rgba(22,224,255,0.55), 0 0 60px rgba(22,224,255,0.25)",
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1.05) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.18) translate3d(-1.5%,-1.5%,0)" },
        },
        "flip-in": {
          "0%": { transform: "rotateX(-90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "ken-burns": "ken-burns 24s ease-out infinite alternate",
        "flip-in": "flip-in 320ms cubic-bezier(0.2,0.8,0.2,1)",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#0a0a0a",
        "surface-elevated": "#111111",
        border: "#1a1a1a",
        primary: {
          DEFAULT: "#007AFF",
          50: "#E5F1FF",
          100: "#CCE3FF",
          200: "#99C7FF",
          300: "#66AAFF",
          400: "#338EFF",
          500: "#007AFF",
          600: "#0062CC",
          700: "#004999",
          800: "#003166",
          900: "#001833",
        },
        accent: {
          cyan: "#00D4FF",
          purple: "#8B5CF6",
          pink: "#EC4899",
          gradient: "linear-gradient(135deg, #007AFF 0%, #8B5CF6 50%, #EC4899 100%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.8s ease-out",
        "slide-in": "slide-in 1s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 30px rgba(0, 122, 255, 0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(0, 122, 255, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "url('/grid.svg')",
      },
    },
  },
  plugins: [],
};

export default config;

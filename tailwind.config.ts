import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4B3F99",
          50: "#EEEDF8",
          100: "#D4D1EF",
          500: "#4B3F99",
          600: "#3D3380",
          700: "#2F2760",
        },
        secondary: {
          DEFAULT: "#4FC3C7",
          100: "#D5F0F1",
          500: "#4FC3C7",
        },
        accent: "#F39C12",
        alert: "#E74C3C",
        surface: "#FFFFFF",
        background: "#F8F9FB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)",
        "card-hover": "0 4px 12px 0 rgba(75,63,153,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

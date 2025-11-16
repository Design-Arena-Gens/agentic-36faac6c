import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      },
      colors: {
        primary: {
          50: "#f1fafe",
          100: "#e0f2fd",
          200: "#b9e4fb",
          300: "#82d1f8",
          400: "#47b4f2",
          500: "#1f97ea",
          600: "#0f71d0",
          700: "#0c56a6",
          800: "#0d4685",
          900: "#0f3b6c"
        }
      }
    }
  },
  plugins: []
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      // Typography
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.1" }],
        "display-md": ["2.5rem", { lineHeight: "1.2" }],
        "display-sm": ["2rem", { lineHeight: "1.3" }],
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },

      // Color Palette
      colors: {
        primary: {
          50:  "#e8f0ff",
          100: "#d5e3ff",
          200: "#b3ccff",
          300: "#85abff",
          400: "#1d5cfb", // Your main primary color
          500: "#1d5cfb",
          600: "#0a46e0",
          700: "#0835b5",
          800: "#0d2e8f",
          900: "#112a72",
          950: "#0a1a47",
        },
        secondary: {
          50:  "#fbf4ff",
          100: "#f6e6ff",
          200: "#f0d2ff",
          300: "#e5afff",
          400: "#d67dff",
          500: "#9714fa", // Your main secondary color
          600: "#8a0ce0",
          700: "#7809c0",
          800: "#640b9b",
          900: "#530e7d",
          950: "#36005a",
        },
        success: {
          500: "#10b981",
        },
        warning: {
          500: "#f59e0b",
        },
        error: {
          500: "#ef4444",
        },
      },

      // Utilities
      spacing: {
        18: "4.5rem",
      },
      boxShadow: {
        "elevation-1": "0 1px 3px rgba(0,0,0,0.12)",
        "elevation-2": "0 4px 6px -1px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

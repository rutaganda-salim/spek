import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "800px",
      // => @media (min-width: 800px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      spacing: {
        md: "44rem",
        lg: "64.0625rem",
        xl: "75rem",
      },
      colors: {
        white: "#fff",
        black: "#000",
        transparent: "transparent",
        background: "var(--background)",
        alabaster: {
          50: "var(--alabaster-50)",
          100: "var(--alabaster-100)",
          200: "var(--alabaster-200)",
          300: "var(--alabaster-300)",
          400: "var(--alabaster-400)",
          500: "var(--alabaster-500)",
          600: "var(--alabaster-600)",
          700: "var(--alabaster-700)",
          800: "var(--alabaster-800)",
          900: "var(--alabaster-900)",
          950: "var(--alabaster-950)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
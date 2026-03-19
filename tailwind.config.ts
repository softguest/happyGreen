
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        // === Greener Base Brand Colors ===
        
        green: {
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A", // Secondary Green (Leaf)
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32", // Primary Green (Forest)
          900: "#1B5E20",
        },
        gold: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#F9A825", // Accent Gold (Sunlight)
          600: "#F57F17",
          700: "#EF6C00",
        },
        earth: {
          50: "#EFEBE9",
          100: "#D7CCC8",
          200: "#BCAAA4",
          300: "#A1887F",
          400: "#8D6E63",
          500: "#795548",
          600: "#6D4C41",
          700: "#5D4037", // Earth Brown
          800: "#4E342E",
          900: "#3E2723",
        },
        cream: "#FAFDF6",    // Main background
        mist: "#F0F4F0",     // Card background
        aichat: "#0288D1",   // AI advisor accent

        // === shadcn overrides ===
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2E7D32",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#66BB6A",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F9A825",
          foreground: "#212121",
        },
        destructive: {
          DEFAULT: "#E53935",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F0F4F0",
          foreground: "#757575",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#212121",
        },
      },
      // fontFamily: {
      //   sans: ["Inter", "sans-serif"],
      //   heading: ["Plus Jakarta Sans", "sans-serif"],
      // },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
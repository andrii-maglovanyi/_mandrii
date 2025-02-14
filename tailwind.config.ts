import { COLORS } from "./src/components/constants";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/features/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: COLORS,
      backgroundColors: COLORS,
      fontFamily: {
        nunito: "var(--font-nunito)",
        leOsler: "var(--font-leOsler)",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blueMy': {
                '50': '#eefaff',
                '100': '#d9f4ff',
                '200': '#bbecff',
                '300': '#8ce2ff',
                '400': '#56cfff',
                '500': '#2fb4ff',
                '600': '#1996f7',
                '700': '#1283ed',
                '800': '#1564b8',
                '900': '#175691',
                '950': '#133558',
            },

      },
    },
  },
  plugins: [],
} satisfies Config;

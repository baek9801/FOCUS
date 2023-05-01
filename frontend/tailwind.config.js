/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    "yellow-button": {
      "@apply bg-gradient-to-b from-yellow-50 to-yellow-200 hover:from-slate-400 hover:to-slate-400 border-4 border-slate-300 text-xl rounded-xl px-2 mx-1":
        {},
    },
  },
  plugins: [],
};

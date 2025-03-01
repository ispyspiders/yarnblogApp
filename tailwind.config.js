/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "white": "#FFFAF8",
        "light": "#F6F0ED",
        "dark": "#10120A",
        "blue-deep": "#28536B",
        "blue-mid": "#7EA8BE",
        "blue-light": "#D6EAF4",
        "pink-deep": "#C2948A",
        "pink-mid": "#ECC5BD",
        "pink-light": "#F2E1DC",
        "dust-deep": "#726B57",
        "dust-mid": "#BBB193",
        "dust-light": "#F4E8C3",
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile_s: "320px",
      tablet_500: "500px",
      tablet_692: "692px",
      tablet_778: "778px",
      laptop_1024: "1024px",
      laptop_1300: "1300px",
      laptop_1592: "1592px",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        white: "#f4f4f4",
        accent: "#60d6ff",
        shades: "#101820",
        bright: "#fee715",
      },
      backgroundColor: {
        accent: "#60d6ff",
        shades: "#101820",
        tailwindColorDark: "#0e1729",
        tailwindColorGray: "#1d293a",
        bright: "#fee715",
      },
      height: {
        h46_875: "765px",
      },
      maxHeight: {
        fullscreen: "980px",
      },
    },
  },
  plugins: [],
};

const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#F1F2F6",
        "bg-primary-dark": "#575F67",
        "c-primary": "#7AC353",
        "primary-dark": "#E88C30",
        "c-secondary": "#042c40",
        "secondary-dark": "#d119e6",
        textColor: "#292929",
        "textColor-dark": "#FFFFFF",
      },
    },

    container: {
      center: true,
    },
  },
  plugins: [],
};

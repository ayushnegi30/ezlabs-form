/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#90D5FF",
        "primary-dark": "#0046CC",
        "primary-light": "#E6EEFF",
        light: "#F5F1EB",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.08)",
        soft: "0 4px 12px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        "gradient-pattern": "linear-gradient(135deg, #F5F1EB 0%, #E8F0FF 100%)",
      },
    },
  },
  plugins: [],
};

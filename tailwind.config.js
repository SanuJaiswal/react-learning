/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        eca854: "#eca854",
        f5f5f5: "#f5f5f5",
        cuisine: "rgba(2, 6, 12, 0.6)",
      },
      boxShadow: {
        "outline-color-custom": "0 2px #eca854",
      },
      // keyframes: {
      //   shimmer: {
      //     "100%": {
      //       backgroundPosition: "200% 0",
      //     },
      //   },
      // },
      // animation: {
      //   shimmer: "shimmer 1.5s infinite",
      // },
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   const newUtilities = {
    //     ".shimmer-effect": {
    //       background: "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
    //       "background-size": "200% 100%",
    //       animation: "shimmer",
    //     },
    //   };
    //   addUtilities(newUtilities, ["responsive", "hover"]);
    // },
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
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
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".shimmer-img": {
          background: "linear-gradient(-90deg, #eee 25%, #ddd 50%, #eee 75%)",
          "background-size": "200% 100%",
          animation: "shimmer 1.5s infinite",
        },
        ".shimmer-details": {
          height: "20px",
          width: "80%",
          background: "linear-gradient(-90deg, #eee 25%, #ddd 50%, #eee 75%)",
          "background-size": "200% 100%",
          animation: "shimmer 1.5s infinite",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

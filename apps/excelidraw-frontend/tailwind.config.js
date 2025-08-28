// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, hsl(254 88% 60%) 0%, hsl(220 100% 70%) 100%)",
      },
      colors: {
        "primary-foreground": "hsl(0 0% 100%)", // Example color from your CSS variable set
      },
      boxShadow: {
        glow: "0 0 40px hsl(254 88% 60% / 0.15)",
      },
    },
  },
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  plugins: [],
};

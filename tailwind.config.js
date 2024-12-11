module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xxs: { max: "375px" },
      xs: "375px",
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: { screens: { xs: "425px", md: "768px", lg: "768px", xl: "1024px", "2xl": "1440px" }},
    extend: { 
      keyframes: { marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-100%)" }}},
      animation: { marquee: "marquee 30s linear infinite" },
      backgroundImage: { bgMoving: "linear-gradient(90deg, #7062DF 0%, #0D3D9B 100%)" },
      colors: { signinColor: "#2728318f", inputBackground1: "rgba(59, 24, 130, 0.75)", inputBackground2: " rgba(158, 24, 99, 0.75)", backgroundBtn: "rgba(0,0,0,0.4)" },
      height: { 100: "800px" },
      with: { 101: "1000px" },
      lineClamp: { 15: "15" },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"), 
    require("tailwind-scrollbar"),
    function ({ addComponents, theme }) {
      addComponents({
        ".container-blogs": {
          maxWidth: "824px",
          margin: "0 auto",
          "@screen xxs": { maxWidth: "320px" },    // xxs: "375px"
          "@screen xs":  { maxWidth: "375px" },    // xs:  "375px",
          "@screen sm":  { maxWidth: "425px" },    // sm:  "425px",
          "@screen md":  { maxWidth: "640px" },    // md:  "768px",
          "@screen lg":  { maxWidth: "824px" },    // lg:  "1024px",
          "@screen xl":  { maxWidth: "824px" },    // xl:  "1440px",
          "@screen 2xl": { maxWidth: "824px" },    // 2xl: "1920px",
        },
      });
    }
  ],
  corePlugins: { preflight: false },
};

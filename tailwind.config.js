module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xs: "375px",
      xxs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "signinBackground": "url('http://192.168.15.181:3001/resources/images/login-background.png')",
        "signinLogo": "url('')"
      },
      colors: {
        'signinColor' : "rgba(116,99,224,0.25)",
        'inputBackground1' : "rgba(59, 24, 130, 0.75)",
        'inputBackground2' : ' rgba(158, 24, 99, 0.75)'
      },
      height: {
        100: "800px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

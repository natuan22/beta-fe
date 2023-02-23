module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        100: '800px'
      },
      translate: {
        '180%': '180%',
        '11%': '11%'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};

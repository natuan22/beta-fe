module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xs: '375px',
      xxs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      height: {
        100: '800px',
      },
      
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};

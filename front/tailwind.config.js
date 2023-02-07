module.exports = {
  purge: {
    enable: process.env.NODE_ENV === "production",
    content: [
      "./pages/**/*.js",
      "./components/**/*.js,",
      "./app/**/*.{html,js}",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

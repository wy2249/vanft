module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://lh3.googleusercontent.com/J734DD96jgdCHK95vKF1lb1sGn2qyxRIo2wF7pDYN3rEoQqZSBTHH2tRecaxgFCux-oIZcJAZSsVYY9xaGhSIZwpkQlh3R6YHf8w=s550')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

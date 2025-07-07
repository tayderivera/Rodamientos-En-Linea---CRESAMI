module.exports = {
    content: [
      "./src/**/*.{html,ts}",
      './index.html'
    ],
    theme: {
      extend: {},
      screens: {
      'xs': '475px', // Agrega esta línea
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    },
    plugins: [],
  };
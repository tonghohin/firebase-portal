/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('/public/img/main-bg.jpg')"
      }
    }
  },
  plugins: []
};

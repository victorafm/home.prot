/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        anielRed: "#ff0024",
        anielBlue: "#061143",
        neutralBg: "#f5f5f5"
      }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:
      {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
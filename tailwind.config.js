/** @type {import('tailwindcss').Config} */
import tailwindCssAnimated from "tailwindcss-animated"
export default {
 darkMode:'class',
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindCssAnimated],
}


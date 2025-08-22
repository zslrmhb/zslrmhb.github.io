// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  // dark mode: you’re already defining your own custom variant in CSS:
  // @custom-variant dark (&:is(.dark *));
  // If you prefer, you can ALSO keep Tailwind’s built-in class strategy here:
  darkMode: ['class'],

  // ⚠️ v4: no `content` here — use @source in CSS instead

  theme: {
    // Container is still useful; other tokens should live in @theme in CSS
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xs: '390px',
        sm: '435px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1600px'
      }
    },
    extend: {
      // You already set most tokens in app.css @theme. This is optional:
      fontFamily: { sans: [...fontFamily.sans] }
    }
  },

  // Keep plugin list minimal; ensure they support v4
  plugins: [
    // require('@tailwindcss/container-queries'), // enable if verified v4-compatible
    // require('tailwindcss-animate')             // enable if you actually use it
  ]
}
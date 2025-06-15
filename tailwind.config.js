// aliyamkamila/pemweb_tubes/Pemweb_Tubes-967c7a9e9544fd1b781408c9e5912ef7f3cef4e0/tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warmPeach: '#f4a896',
        beige: '#f5f5dc',
        darkBrown: '#5c4438',
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
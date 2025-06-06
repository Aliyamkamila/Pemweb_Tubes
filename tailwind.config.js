// Nama file: tailwind.config.js


const config = {
  // Menentukan file-file mana yang akan dipindai oleh Tailwind
  // untuk mencari kelas utilitas yang digunakan.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Kustomisasi dan penambahan tema default Tailwind
  theme: {
    extend: {
      // Menambahkan palet warna kustom Anda
      colors: {
        warmPeach: '#f4a896',
        beige: '#f5f5dc',
        darkBrown: '#5c4438',
      },
      // Menambahkan atau mengganti jenis font
      fontFamily: {
        serif: ["Merriweather", "Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      // Menambahkan gambar latar kustom (sudah ada sebelumnya)
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // Menambahkan animasi kustom (sudah ada sebelumnya)
    keyframes: {
      // animasi shimmer untuk skeleton loading
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },

  // Menambahkan plugin Tailwind
  plugins: [
    require('@tailwindcss/forms'), // Plugin untuk styling form default
  ],
};

export default config;
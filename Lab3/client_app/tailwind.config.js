module.exports = {
  content: [
    './src/**/*.{html,js,tsx,ts}',
  ],
  theme: {
    maxWidth: {
      '1/2': '50%',
      '200px': '200px',
    },
    screens: {
      'sm': '500px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'comforter': ['Comforter', 'cursive'], 
      },
      spacing:{
        '1px': '1px',
        '10%': '10%',
        '95%': '95%',
      },
      opacity: {
        '1': '.01',
        '2': '.02',
        '3': '.03',
        '4': '.04',
        '96': '.96',
        '97': '.97',
        '98': '.98',
        '99': '.99',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
          100: "#cccccc",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000"
        },
      white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
      },
      red: {
          100: "#f8d3d7",
          200: "#f2a6af",
          300: "#eb7a87",
          400: "#e54d5f",
          500: "#de2137",
          600: "#b21a2c",
          700: "#851421",
          800: "#590d16",
          900: "#2c070b"
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitamos modo oscuro manual si lo deseas
  theme: {
    extend: {
      colors: {
        // Aquí definimos la identidad de marca extraída de tus HTMLs
        primary: {
          DEFAULT: "#ee2b6c", // El rosado principal
          hover: "#d01b55",   // Un poco más oscuro para hovers
          light: "#fdf2f6",   // Fondo muy suave
        },
        background: {
          light: "#f8f6f6",
          dark: "#221016",
        },
        surface: {
          light: "#ffffff",
          dark: "#2d161d",
        }
      },
      fontFamily: {
        // Usaremos la fuente que venía en tus diseños
        display: ["Be Vietnam Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
}
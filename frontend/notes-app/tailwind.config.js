import('tailwindcss').Config
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Ajoutez jsx et tsx ici
  theme: {
    extend: {
      colors: {
        primary: "#2BB5FF",
        secondary: "#EF863E"
      }
    },
  },
  plugins: [],
}

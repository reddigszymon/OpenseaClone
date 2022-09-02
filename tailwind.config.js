/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "380px",

      xs: "450px",

      sm600: "600px",

      sm: "680px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern":
          "linear-gradient(to bottom, rgba(237, 240, 238, 0.6) 0%, rgba(240, 242, 241, 0.8) 50%, rgba(255, 255, 255, 1) 100%), url('https://lh3.googleusercontent.com/cwe12LQmPU14NEz8ImdEPyRSzvaqxgOb7p80mSbedsklzK0r4u_vmVVz-aLIES0OGPtDZTeazIcCE2VtUp6BlSxkjgZ_d0GhvwlVtA=s550')",
        "hero-pattern-dark":
          "linear-gradient(to bottom, rgba(0,0,0, 0.6) 0%, rgba(61, 61, 61, 0.8) 50%, rgba(32, 34, 37, 1) 100%), url('https://lh3.googleusercontent.com/cwe12LQmPU14NEz8ImdEPyRSzvaqxgOb7p80mSbedsklzK0r4u_vmVVz-aLIES0OGPtDZTeazIcCE2VtUp6BlSxkjgZ_d0GhvwlVtA=s550')",
        "moon-owl":
          "linear-gradient(to bottom, rgba(255,255,255, .1) 50%, rgba(0, 0, 0, 0.8) 100%), url('https://storage.googleapis.com/opensea-prod.appspot.com/static/promocards/MoonOwls_promocard2.png')",
        "moodies-nft":
          "linear-gradient(to bottom, rgba(255,255,255, .1) 50%,rgba(0,0,0,0.4) 75%, rgba(0, 0, 0, 0.8) 100%), url('https://openseauserdata.com/static/promocards/moodies_promocard.png')",
        "celebrating-nft":
          "linear-gradient(to bottom, rgba(0,0,0, 0.15) 0%, rgba(255,255,255, .1) 50%, rgba(0, 0, 0, 0.8) 100%), url('https://openseauserdata.com/static/promocards/FAKEIT_promocard.png')",
        "ice-nft":
          "linear-gradient(to bottom, rgba(255,255,255, .1) 50%, rgba(0, 0, 0, 0.8) 100%), url('https://openseauserdata.com/static/promocards/Metascapes_promocard2.png')",
      }),
    },
  },
  plugins: [],
};

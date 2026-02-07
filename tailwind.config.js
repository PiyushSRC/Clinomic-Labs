/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}" // Keeping this just in case, though structure seems flat
  ],
  theme: {
    extend: {
      colors: {
        // Add any custom colors from the original design if needed, 
        // strictly speaking standard tailwind colors + dark mode might suffice 
        // but let's check if we need to extend anything specific from the provided css.
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['80px', { lineHeight: '88px', letterSpacing: '-2px' }],
        'display-2': ['48px', { lineHeight: '56px', letterSpacing: '-1px' }],
        'h1': ['32px', { lineHeight: '40px', letterSpacing: '-0.5px' }],
        'h2': ['24px', { lineHeight: '32px', letterSpacing: '-0.25px' }],
        'h3': ['18px', { lineHeight: '26px', letterSpacing: '-0.25px' }],
        'body-1': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'body-2': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'cta-md': ['14px', { letterSpacing: '1.5px' }],
        'cta-sm': ['12px', { letterSpacing: '1px' }],
        'label-1': ['14px', { letterSpacing: '1px' }],
        'label-2': ['12px', { letterSpacing: '1px' }],
        'small-label': ['10px', { lineHeight: '14px', letterSpacing: '0.25px' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.25px' }],
        'breadcrumb': ['10px', { lineHeight: '14px', letterSpacing: '0.25px' }],
      },
      letterSpacing: {
        'spec-display-1': '-2px',
        'spec-display-2': '-1px',
        'spec-h1': '-0.5px',
        'spec-h2': '-0.25px',
        'spec-h3': '-0.25px',
        'spec-cta-md': '1.5px',
        'spec-cta-sm': '1px',
        'spec-label': '1px',
        'spec-small': '0.25px',
      }
    },
  },
  plugins: [],
}

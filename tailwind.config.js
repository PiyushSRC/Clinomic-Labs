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
        'display-1': ['clamp(3rem, 5vw + 1rem, 5rem)', { lineHeight: '1.1', letterSpacing: '-2px' }],
        'display-2': ['clamp(2rem, 4vw + 1rem, 3rem)', { lineHeight: '1.2', letterSpacing: '-1px' }],
        'h1': ['clamp(1.5rem, 3vw + 1rem, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.5px' }],
        'h2': ['clamp(1.25rem, 2vw + 1rem, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.25px' }],
        'h3': ['clamp(1rem, 1.5vw + 0.5rem, 1.125rem)', { lineHeight: '1.5', letterSpacing: '-0.25px' }],
        'body-1': ['clamp(1rem, 2vw, 1rem)', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-2': ['clamp(0.875rem, 1.5vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0' }],
        'cta-md': ['clamp(0.75rem, 1.5vw, 0.875rem)', { letterSpacing: '1.5px' }],
        'cta-sm': ['clamp(0.625rem, 1.5vw, 0.75rem)', { letterSpacing: '1px' }],
        'label-1': ['clamp(0.75rem, 1.5vw, 0.875rem)', { letterSpacing: '1px' }],
        'label-2': ['clamp(0.625rem, 1.5vw, 0.75rem)', { letterSpacing: '1px' }],
        'small-label': ['clamp(0.5rem, 1vw, 0.625rem)', { lineHeight: '1.4', letterSpacing: '0.25px' }],
        'caption': ['clamp(0.625rem, 1.5vw, 0.75rem)', { lineHeight: '1.4', letterSpacing: '0.25px' }],
        'breadcrumb': ['clamp(0.5rem, 1vw, 0.625rem)', { lineHeight: '1.4', letterSpacing: '0.25px' }],
      },
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
  plugins: [],
}

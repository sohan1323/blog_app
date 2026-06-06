/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        'on-primary': "#ffffff",
        ink: "#000000",
        canvas: "#ffffff",
        'inverse-canvas': "#000000",
        'inverse-ink': "#ffffff",
        'on-inverse-soft': "rgba(255, 255, 255, 0.16)",
        hairline: "#e6e6e6",
        'hairline-soft': "#f1f1f1",
        'surface-soft': "#f7f7f5",
        'block-lime': "#dceeb1",
        'block-lilac': "#c5b0f4",
        'block-cream': "#f4ecd6",
        'block-pink': "#efd4d4",
        'block-mint': "#c8e6cd",
        'block-coral': "#f3c9b6",
        'block-navy': "#1f1d3d",
        'accent-magenta': "#ff3d8b",
        'semantic-success': "#1ea64a",
        'overlay-scrim': "rgba(0, 0, 0, 0.6)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        xs: '2px',
        sm: '6px',
        md: '8px',
        lg: '24px',
        xl: '32px',
        pill: '50px',
      },
      spacing: {
        hair: '1px',
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      }
    },
  },
  plugins: [],
}

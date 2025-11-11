/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        midnightGradient: 'linear-gradient(0deg, #041910 0%, #041910 100%), linear-gradient(277deg, rgba(202, 197, 255, 0.20) 0%, rgba(202, 197, 255, 0.50) 49.61%, rgba(202, 197, 255, 0.10) 100.18%)',
        emrRibbon: 'linear-gradient(270deg, rgba(1, 181, 158, 0.20) 31.25%, rgba(1, 181, 158, 0.05) 100%)'
      },
      spacing: {
        '180': '180px'
      },
      width: {
        'flex-card': '483px'
      },
      borderRadius: {
        '24': '24px'
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
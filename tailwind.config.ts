import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deepNavy: '#071A3D',
          navy: '#102A56',
          blue: '#2563EB',
          softBlue: '#EFF6FF',
          gold: '#F4C542',
          goldHover: '#E5B730',
          white: '#FFFFFF',
          lightGray: '#F7F9FC',
          text: '#15264A',
          muted: '#667085',
          border: '#E5EAF0',
          darkBg: '#05132C',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(7, 26, 61, 0.05), 0 1px 2px 0 rgba(7, 26, 61, 0.03)',
        card: '0 4px 20px -2px rgba(7, 26, 61, 0.06), 0 2px 6px -1px rgba(7, 26, 61, 0.04)',
        cardHover: '0 10px 30px -4px rgba(7, 26, 61, 0.12), 0 4px 10px -2px rgba(7, 26, 61, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;

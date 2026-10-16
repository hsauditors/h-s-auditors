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
          deepNavy: '#2b2d54',      // Primary Theme Blue
          navy: '#2b2d54',          // Rich Executive Theme Blue
          navyLight: '#393c6e',     // Soft Navy Variant
          blue: '#2b2d54',          // Primary Theme Blue
          softBlue: '#F4F5FA',      // Soft Tint
          gold: '#fcdd5e',          // Theme Yellow
          goldHover: '#e6c645',     // Theme Yellow Hover
          goldLight: '#FEFCE8',     // Soft Yellow Tint
          goldBorder: '#FDE68A',    // Fine Accent
          white: '#FFFFFF',
          warmStone: '#FAF9F6',     // Alabaster Stone Surface
          warmCream: '#F4F1EA',     // Soft Warm Parchment
          text: '#2b2d54',          // Theme Primary Ink
          muted: '#526071',         // Editorial Neutral Slate
          border: '#E8E6E1',        // Warm Hairline Border
          darkBg: '#1e203c',        // Deepest Theme Navy
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        lora: ['"Lora"', 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(43, 45, 84, 0.04), 0 1px 2px 0 rgba(43, 45, 84, 0.02)',
        card: '0 2px 14px -2px rgba(43, 45, 84, 0.05), 0 1px 4px -1px rgba(43, 45, 84, 0.03)',
        cardHover: '0 12px 32px -4px rgba(43, 45, 84, 0.09), 0 4px 12px -2px rgba(43, 45, 84, 0.04)',
        goldGlow: '0 4px 20px -2px rgba(252, 221, 94, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;

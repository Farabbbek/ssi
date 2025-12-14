import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Glassmorphism Dark Theme
        'glass': {
          'dark': 'rgba(255, 255, 255, 0.05)',
          'darker': 'rgba(255, 255, 255, 0.03)',
          'border': 'rgba(255, 255, 255, 0.1)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
        },
        'navy': {
          '900': '#01091C',
          '800': '#0D1B3C',
          '700': '#1A2D5C',
        },
        'purple': {
          'neon': '#8B5CF6',
        },
        'indigo': {
          'neon': '#6366F1',
        },
        'background': '#01091C',
        'foreground': '#F9FAFB',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
        'glass-sm': 'blur(5px)',
        'glass-lg': 'blur(15px)',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))',
        'gradient-purple-indigo': 'linear-gradient(135deg, #8B5CF6, #6366F1)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config

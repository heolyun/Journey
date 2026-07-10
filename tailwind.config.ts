import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#060706',
        panel: '#10110f',
        line: '#262a24',
        mint: '#9dffcb',
        cyan: '#66e3ff',
        amber: '#ffcf70',
      },
      boxShadow: {
        glow: '0 0 42px rgba(102, 227, 255, 0.18)',
      },
    },
  },
  plugins: [],
} satisfies Config;

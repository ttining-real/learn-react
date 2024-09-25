import defaultTheme from 'tailwindcss/defaultTheme';
import pluginTailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        '.anim-scale-up': {
          description:
            '@starging-style을 사용한 scale-up 애니메이션 적용 클래스',
          opacity: '0 → 1',
          scale: '0.5 → 1',
        },
      });
    },
    pluginTailwindScrollbar({
      nocompatible: true,
    }),
  ],
};

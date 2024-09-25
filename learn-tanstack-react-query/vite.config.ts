import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/like-lion/',
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  optimizeDeps: {
    exclude: ['node_modules/.cache'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-ecosystem': [
            '@tanstack/react-query',
            'react-helmet-async',
            'react-router-dom',
            'react-hot-toast',
            'react-feather',
            'framer-motion',
            'clsx',
          ],
        },
      },
    },
  },
});

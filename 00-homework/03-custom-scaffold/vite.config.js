import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';

const viteConfig = defineConfig({
  base: '/',
  server: {
    host: 'localhost',
    port: 3000,
  },
  plugins: [
    pluginReact({
      jsxRuntime: 'automatic',
    }),
  ],
});

export default viteConfig;

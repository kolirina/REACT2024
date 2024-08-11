/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ['default', 'hanging-process'],
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['json', 'json-summary', 'text'],
      exclude: ['node_modules/', 'test/', 'dist/'],
      include: ['src/**/*.{js,ts,tsx}'],
    },
  },
  build: {
    rollupOptions: {
      input: './src/entry-client.tsx',
    },
  },
});

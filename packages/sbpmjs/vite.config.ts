import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import packageJson from './package.json';

export default defineConfig({
  plugins: [
    svelte({
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: packageJson.name,
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['@sbpmjs/modeler'],
    },
  },
});

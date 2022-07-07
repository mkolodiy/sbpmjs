import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import packageJson from './package.json';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: packageJson.name,
      formats: ['es'],
      fileName: () => `index.js`,
    },
  },
});

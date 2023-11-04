import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import packageJson from './package.json';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      emitCss: false,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: packageJson.name,
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@sbpmjs/modeler'],
    },
  },
});

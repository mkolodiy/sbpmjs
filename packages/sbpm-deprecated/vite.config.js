import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { svelteSVG } from 'rollup-plugin-svelte-svg';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
    svelteSVG({
      svgo: {},
      enforce: 'pre',
    }),
  ],
});

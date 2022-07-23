import { defineConfig } from 'vite';
import packageJson from './package.json';

export default defineConfig({
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
      external: ['jointjs'],
    },
  },
});

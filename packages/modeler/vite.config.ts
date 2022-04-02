import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyLib',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['jointjs'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          jointjs: 'joint',
        },
      },
    },
  },
});

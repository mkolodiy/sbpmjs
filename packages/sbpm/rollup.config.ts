import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

function emitModulePackageFile() {
  return {
    generateBundle() {
      this.emitFile({
        fileName: 'package.json',
        source: `{"type":"module"}`,
        type: 'asset',
      });
    },
    name: 'emit-module-package-file',
  };
}

export default {
  input: 'src/lib.ts',
  output: [
    {
      file: 'dist/esm/lib.js',
      format: 'es',
      sourcemap: true,
      plugins: [emitModulePackageFile()],
    },
    {
      file: 'dist/esm/lib.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser({ module: true })],
    },
    {
      file: 'dist/umd/lib.js',
      format: 'umd',
      sourcemap: true,
      name: 'expandableNode',
    },
    {
      file: 'dist/umd/lib.min.js',
      format: 'umd',
      name: 'expandableNode',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [typescript({ useTsconfigDeclarationDir: true }), sourceMaps()],
};

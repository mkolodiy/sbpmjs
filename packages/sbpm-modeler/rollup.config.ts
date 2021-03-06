import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package.json');

const libraryName = 'modeler';

export default {
  input: `lib/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true
    },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  plugins: [
    postcss({
      extensions: ['.css']
    }),
    json(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    commonjs(),
    resolve(),
    sourceMaps()
  ]
};

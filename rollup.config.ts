import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = 'nepali-date-converter'

const plugins = [
  // Allow json resolution
  json(),
  // Compile TypeScript files
  typescript({ useTsconfigDeclarationDir: true, include: ['*.ts', '**/*.ts'] }),
  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),
  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  resolve(),

  // Resolve source maps to the original source
  sourceMaps(),
]

const watch = {
  include: 'src/**',
}

export default [
  // require() and the browser global get the class itself
  {
    input: 'src/umd.ts',
    output: { file: pkg.main, name: 'NepaliDate', format: 'umd', exports: 'default', sourcemap: true },
    watch,
    plugins,
  },
  // ES modules: bundlers (pkg.module), CDN/Deno (.es5.js) and Node import (.mjs)
  {
    input: `src/${libraryName}.ts`,
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.exports['.'].import.default, format: 'es', sourcemap: true },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch,
    plugins,
  },
]

// Writes the type entry points for package.json "exports":
//   *.d.mts for `import` (ESM build), index.d.cts for `require()` (UMD build).
// The plain *.d.ts files stay as the fallback for older TypeScript resolution.
const { readdirSync, readFileSync, writeFileSync, unlinkSync } = require('fs')
const path = require('path')

const typesDir = path.resolve(__dirname, '..', 'dist', 'types')

// umd.ts only exists to shape the UMD build; its typings live in index.d.cts
unlinkSync(path.join(typesDir, 'umd.d.ts'))

for (const file of readdirSync(typesDir)) {
  if (!file.endsWith('.d.ts')) continue
  const source = readFileSync(path.join(typesDir, file), 'utf8')
  // ESM type files need explicit extensions on relative imports
  const esm = source.replace(/(from '\.\/[^']+)'/g, "$1.mjs'")
  writeFileSync(path.join(typesDir, file.replace(/\.d\.ts$/, '.d.mts')), esm)
}

writeFileSync(
  path.join(typesDir, 'index.d.cts'),
  `import NepaliDateClass from './nepali-date-converter'
import { dateConfigMap as config, DateConfig as Config } from './date-config'

// require('nepali-date-converter') returns the class itself, with the named
// exports attached to it
declare class NepaliDate extends NepaliDateClass {}
declare namespace NepaliDate {
  export { NepaliDateClass as default, NepaliDateClass as NepaliDate }
  export const dateConfigMap: typeof config
  export type DateConfig = Config
}
export = NepaliDate
`
)

// Smoke-tests the built package through its public entry points, the way
// users load it. Run after `npm run build`.
const assert = require('assert')

const check = (label, NepaliDate) => {
  assert.strictEqual(typeof NepaliDate, 'function', `${label}: not a constructor`)
  assert.strictEqual(new NepaliDate(new Date(2027, 5, 22)).format('YYYY-MM-DD'), '2084-03-08', label)
}

async function main() {
  const cjs = require('nepali-date-converter')
  check('require()', cjs)
  check('require().default', cjs.default)
  check('require().NepaliDate', cjs.NepaliDate)
  assert.strictEqual(typeof cjs.dateConfigMap, 'object', 'require().dateConfigMap')

  const esm = await import('nepali-date-converter')
  check('import default', esm.default)
  assert.strictEqual(typeof esm.dateConfigMap, 'object', 'import { dateConfigMap }')

  console.log('package entry points OK')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})

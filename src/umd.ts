import NepaliDate from './nepali-date-converter'
import { dateConfigMap } from './date-config'

// Entry for the UMD build. `require('nepali-date-converter')` and the browser
// global must return the class itself, so the named exports hang off it.
const exported = NepaliDate as typeof NepaliDate & {
  default: typeof NepaliDate
  NepaliDate: typeof NepaliDate
  dateConfigMap: typeof dateConfigMap
}
exported.default = NepaliDate
exported.NepaliDate = NepaliDate
exported.dateConfigMap = dateConfigMap

export default exported

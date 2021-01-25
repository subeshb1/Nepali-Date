import {
  convertToAD,
  convertToBS,
  IYearMonthDate,
  IAdBs,
  format,
  Language,
  parse
} from './nepali-date-helper'

const dateSymbol = Symbol('Date')
const daySymbol = Symbol('Day')
const yearSymbol = Symbol('Year')
const monthSymbol = Symbol('MonthIndex')
const jsDateSymbol = Symbol('JsDate')
const convertToBSMethod = Symbol('convertToBS()')
const convertToADMethod = Symbol('convertToAD()')
const setAdBs = Symbol('setADBS()')
const setDayYearMonth = Symbol('setDayYearMonth()')
export default class NepaliDate {
  private [jsDateSymbol]: Date
  private [yearSymbol]: number
  private [dateSymbol]: number
  private [daySymbol]: number
  private [monthSymbol]: number
  /**
   * Default language for formatting. Set the value to 'np' for default nepali formatting.
   */
  static language: 'np' | 'en' = Language.en
  /**
   * **String**
   *
   * Provide a valid Nepali date string. The current supported formats are:
   *
   * ```
   * YYYY/MM/DD
   * YYYY-MM-DD
   * YYYY MM DD
   * DD/MM/YYYY
   * DD-MM-YYYY
   * DD MM YYYY
   * ```
   *
   * Example:
   *
   * ```js
   * new NepaliDate('2051/02/01') // YYYY/MM/DD
   * new NepaliDate('2051-02-01')
   * new NepaliDate('2051 02 01')
   * new NepaliDate('01/02/2051') // DD/MM/YYYY
   * new NepaliDate('01-02-2051')
   * new NepaliDate('01 02 2051')
   * ```
   *
   * **Number**
   *
   * The number value represents the UTC timestamp that will be converted to Nepali date.
   *
   * Example:
   *
   * ```js
   * new NepaliDate(1589638162879)
   * ```
   *
   * **Date**
   *
   * Javascript Date object
   *
   * Example:
   *
   * ```js
   * new NepaliDate(new Date(2020, 10, 10))
   * ```
   *
   * **Empty constructor**
   *
   * If no values are provided, the current day date will be converted to Nepali date.
   *
   * ```js
   * new NepaliDate()
   * ```
   * @param value
   */
  constructor(value?: string | number | Date)
  /**
   * This constructor takes year, monthIndex i.e 0-11, and date.
   *
   * Example:
   *
   * ```js
   * new Date(2051, 0, 1) // Baisakh 1, 2051
   * ```
   * @param year
   * @param monthIndex
   * @param date
   */
  constructor(year: number, monthIndex: number, date: number)
  constructor() {
    const constructorError = new Error('Invalid constructor arguments')
    if (arguments.length === 0) {
      this[convertToBSMethod](new Date())
    } else if (arguments.length === 1) {
      const argument = arguments[0]
      switch (typeof argument) {
        case 'number':
          this[convertToBSMethod](new Date(argument))
          break
        case 'string':
          const { date, year, month } = parse(argument)
          this[setDayYearMonth](year, month, date)
          this[convertToADMethod]()
          break
        case 'object':
          if (argument instanceof Date) {
            this[convertToBSMethod](argument)
          } else {
            throw constructorError
          }
          break
        default:
          throw constructorError
      }
    } else if (arguments.length <= 3) {
      this[setDayYearMonth](arguments[0], arguments[1], arguments[2])
      this[convertToADMethod]()
    } else {
      throw constructorError
    }
  }

  private [setDayYearMonth](year: number, month: number = 0, date: number = 1, day: number = 0) {
    this[yearSymbol] = year
    this[monthSymbol] = month
    this[dateSymbol] = date
    this[daySymbol] = day
  }

  /**
   * Returns Javascript Date converted from nepali date.
   */
  toJsDate(): Date {
    return this[jsDateSymbol]
  }
  /**
   * Get Nepali date for the month
   */
  getDate(): number {
    return this[dateSymbol]
  }
  /**
   * Get Nepali date year.
   */
  getYear(): number {
    return this[yearSymbol]
  }

  /**
   * Get Week day index for the date.
   */
  getDay(): number {
    return this[daySymbol]
  }

  /**
   * Get Nepali month index.
   *
   * ```
   * Baisakh => 0
   * Jestha => 1
   * Asar => 2
   * Shrawan => 3
   * Bhadra => 4
   * Aswin => 5
   * Kartik => 6
   * Mangsir => 7
   * Poush => 8
   * Magh => 9
   * Falgun => 10
   * Chaitra => 11
   * ```
   */
  getMonth(): number {
    return this[monthSymbol]
  }

  /**
   * Returns an object with AD and BS object implementing IYearMonthDate
   *
   * Example:
   *
   * ```js
   * {
   *     BS: {
   *         year: 2052,
   *         month: 10,
   *         date: 10,
   *         day: 0
   *     },
   *     AD: {
   *         year: 2019,
   *         month: 10,
   *         date: 10,
   *         day: 0
   *     },
   *
   * }
   * ```
   */
  getDateObject(): IAdBs {
    return {
      BS: this.getBS(),
      AD: this.getAD()
    }
  }
  /**
   * Returns Nepali date fields in an object implementing IYearMonthDate
   *
   * ```js
   * {
   *     year: 2052,
   *     month: 10,
   *     date: 10,
   *     day: 0
   * }
   * ```
   */
  getBS(): IYearMonthDate {
    return {
      year: this[yearSymbol],
      month: this[monthSymbol],
      date: this[dateSymbol],
      day: this[daySymbol]
    }
  }
  /**
   * Returns AD date fields in an object implementing IYearMonthDate
   *
   * ```js
   * {
   *     year: 2019,
   *     month: 10,
   *     date: 10,
   *     day: 0
   * }
   * ```
   */
  getAD(): IYearMonthDate {
    return {
      year: this[jsDateSymbol].getFullYear(),
      month: this[jsDateSymbol].getMonth(),
      date: this[jsDateSymbol].getDate(),
      day: this[jsDateSymbol].getDay()
    }
  }

  /**
   * Set date in the current date object. It can be positive or negative. Positive values within the month
   * will update the date only and more then month mill increment month and year. Negative value will deduct month and year depending on the value.
   * It is similar to javascript Date API.
   *
   * Example:
   * ```js
   * let a = new NepaliDate(2054,10,10);
   * a.setDate(11); // will make date NepaliDate(2054,10,11);
   * a.setDate(-1); // will make date NepaliDate(2054,9,29);
   * a.setDate(45); // will make date NepaliDate(2054,10,15);
   * ```
   * @param date positive or negative integer value to set date
   */
  setDate(date: number) {
    const oldDate = this[dateSymbol]
    try {
      this[dateSymbol] = date
      this[convertToADMethod]()
    } catch (e) {
      this[dateSymbol] = oldDate
      throw e
    }
  }

  /**
   * Set month in the current date object. It can be positive or negative. Positive values within the month
   * will update the month only and more then month mill increment month and year. Negative value will deduct month and year depending on the value.
   * It is similar to javascript Date API.
   *
   * Example:
   * ```js
   * let a = new NepaliDate(2054,10,10);
   * a.setMonth(1); // will make date NepaliDate(2054,11,10);
   * a.setMonth(-1); // will make date NepaliDate(2053,11,10);
   * a.setMonth(12); // will make date NepaliDate(2054,0,10);
   * ```
   * @param date positive or negative integer value to set month
   */
  setMonth(month: number) {
    const oldMonth = this[monthSymbol]
    try {
      this[monthSymbol] = month
      this[convertToADMethod]()
    } catch (e) {
      this[monthSymbol] = oldMonth
      throw e
    }
  }

  /**
   * Set year in the current date object. It only takes positive value i.e Nepali Year
   *
   * Example:
   * ```js
   * let a = new NepaliDate(2054,10,10);
   * a.setYear(2053); // will make date NepaliDate(2053,10,15);
   * ```
   * @param date positive integer value to set year
   */
  setYear(year: number) {
    const oldYear = this[yearSymbol]
    try {
      this[yearSymbol] = year
      this[convertToADMethod]()
    } catch (e) {
      this[yearSymbol] = oldYear
      throw e
    }
  }

  /**
   * Format Nepali date string based on format string.
   * ```
   * YYYY - 4 digit of year (2077)
   * YYY  - 3 digit of year (077)
   * YY   - 2 digit of year (77)
   * M    - month number (1 - 12)
   * MM   - month number with 0 padding (01 - 12)
   * MMM  - short month name (Bai, Jes, Asa, Shr, etc.)
   * MMMM - full month name (Baisakh, Jestha, Asar, ...)
   * D    - Day of Month (1, 2, ... 31, 32)
   * DD   - Day of Month with zero padding (01, 02, ...)
   * d    - Week day (0, 1, 2, 3, 4, 5, 6)
   * dd   - Week day in short format (Sun, Mon, ..)
   * ddd  - Week day in long format (Sunday, Monday, ...)
   * ```
   * Set language to 'np' for nepali format. The strings can be combined in any way to create desired format.
   * ```js
   * let a = new NepaliDate(2054,10,10);
   * a.format('YYYY/MM/DD') // '2054/11/10'
   * a.format('YYYY MM DD') // '2054 11 10'
   * a.format('YYYY') // '2054'
   * a.format('ddd DD, MMMM YYYY') // 'Sunday 10, Falgun 2054'
   * a.format('To\\day is ddd DD, MMMM YYYY') // 'Today is Sunday 10, Falgun 2054', Note: use '\\' to escape [YMDd]
   * a.format('DD/MM/YYYY', 'np') //' १०/११/२०५४'
   * a.format('dd', 'np') // 'आइतबार'
   * a.format('ddd DD, MMMM YYYY','np') // 'आइतबार १०, फाल्गुण २०५४'
   * // Set static variable to 'np' for default Nepali language
   * NepaliDate.language = 'np'
   * a.format('ddd DD, MMMM YYYY') // 'आइतबार १०, फाल्गुण २०५४'
   * ```
   * @param formatString
   * @param language en | np
   */
  format(formatString: string, language: 'en' | 'np' = NepaliDate.language): string {
    return format(this.getBS(), formatString, language)
  }

  /**
   * Returns new Nepali Date from the string date format
   * Similar to calling constructor with string parameter
   * @param dateString
   */
  static parse(dateString: string): NepaliDate {
    const { date, year, month } = parse(dateString)
    return new NepaliDate(year, month, date)
  }

  /**
   * Returns new Nepali Date converted form current day date.
   * Similar to calling empty constructor
   */
  static now(): NepaliDate {
    return new NepaliDate()
  }

  /**
   * Returns new converted Nepali Date from the provided Javascript Date.
   * It is similar to passing string as constructor
   * @param date
   */
  static fromAD(date: Date): NepaliDate {
    return new NepaliDate(date)
  }

  private [convertToBSMethod](date: Date) {
    const { AD, BS } = convertToBS(date)
    this[setAdBs](AD, BS)
  }

  private [setAdBs](AD: IYearMonthDate, BS: IYearMonthDate) {
    this[setDayYearMonth](BS.year, BS.month, BS.date, BS.day)
    this[jsDateSymbol] = new Date(AD.year, AD.month, AD.date)
  }

  private [convertToADMethod]() {
    const { AD, BS } = convertToAD({
      year: this[yearSymbol],
      month: this[monthSymbol],
      date: this[dateSymbol]
    })
    this[setAdBs](AD, BS)
  }

  valueOf() {
    return this[jsDateSymbol].getTime()
  }

  toString() {
    return this.format('ddd DD, MMMM YYYY')
  }
}

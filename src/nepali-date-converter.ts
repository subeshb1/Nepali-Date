
import { convertToAD, convertToBS, IYearMonthDate, IAdBs } from './nepali-date-helper'


const dateSymbol = Symbol('Date')
const daySymbol = Symbol('Day')
const yearSymbol = Symbol('Year')
const monthSymbol = Symbol('Month')
const jsDateSymbol = Symbol('JSDate')
const convertToBSMethod = Symbol('convertToBS()');
const convertToADMethod = Symbol('convertToAD()');
const setAdBs = Symbol('setAdBs()');
const setDayYearMonth = Symbol('setDayYearMonth()');
export default class NepaliDate {
  private [jsDateSymbol]: Date;
  private [yearSymbol]: number;
  private [dateSymbol]: number;
  private [daySymbol]: number;
  private [monthSymbol]: number;

  constructor(value?: string | number | Date);
  constructor(year: number, monthIndex: number, day: number);
  constructor() {
    const constructorError = new Error("Invalid constructor arguments");
    if (arguments.length === 0) {
      this[convertToBSMethod](new Date());
    }
    else if (arguments.length === 1) {
      const argument = arguments[0];
      switch (typeof argument) {
        case "number":
          this[convertToBSMethod](new Date(argument))
          break;
        case "string":
          break;
        case "object":
          if (argument instanceof Date) {
            this[convertToBSMethod](argument)
          } else {
            throw constructorError;
          }
          break;
        default:
          throw constructorError
      }
    } else if (arguments.length <= 3) {
      this[setDayYearMonth](arguments[0], arguments[1], arguments[2])
      this[convertToADMethod]();
    } else {
      throw constructorError
    }
  }

  private [setDayYearMonth](year: number, month: number = 0, date: number = 1, day: number = 0) {
    this[yearSymbol] = year;
    this[monthSymbol] = month;
    this[dateSymbol] = date;
    this[daySymbol] = day;
  }

  toJsDate(): Date {
    return this[jsDateSymbol];
  }


  getDate(): number {
    return this[dateSymbol]
  }

  getDay(): number {
    return this[daySymbol]
  }

  setDate(date: number) {
    const oldDate = this[dateSymbol];
    try {
      this[dateSymbol] = date;
      this[convertToADMethod]();
    } catch (e) {
      this[dateSymbol] = oldDate;
      throw e;
    }
  }

  getMonth(): number {
    return this[monthSymbol]
  }

  getDateObject(): IAdBs {
    return {
      BS: {
        year: this[yearSymbol],
        month: this[monthSymbol],
        date: this[dateSymbol],
        day: this[daySymbol]
      },
      AD: {
        year: this[jsDateSymbol].getFullYear(),
        month: this[jsDateSymbol].getMonth(),
        date: this[jsDateSymbol].getDate(),
        day: this[jsDateSymbol].getDay(),
      }
    }
  }

  setMonth(month: number) {
    const oldMonth = this[monthSymbol];
    try {
      this[monthSymbol] = month;
      this[convertToADMethod]();
    } catch (e) {
      this[monthSymbol] = oldMonth;
      throw e;
    }
  }

  getYear(): number {
    return this[yearSymbol]
  }

  setYear(year: number) {
    const oldYear = this[yearSymbol];
    try {
      this[yearSymbol] = year;
      this[convertToADMethod]();
    } catch (e) {
      this[yearSymbol] = oldYear;
      throw e;
    }
  }

  static parse() {
    return new NepaliDate();
  }
  static now() {
    return new NepaliDate();
  }

  static fromAD(date: Date) {
    return new NepaliDate(date);
  }

  private [convertToBSMethod](date: Date) {
    const { AD, BS } = convertToBS(date);
    this[setAdBs](AD, BS);
  }

  private [setAdBs](AD: IYearMonthDate, BS: IYearMonthDate) {
    this[setDayYearMonth](BS.year, BS.month, BS.date, BS.day);
    this[jsDateSymbol] = new Date(AD.year, AD.month, AD.date);
  }

  private [convertToADMethod]() {
    const { AD, BS } = convertToAD({ year: this[yearSymbol], month: this[monthSymbol], date: this[dateSymbol] });
    this[setAdBs](AD, BS);
  }
}

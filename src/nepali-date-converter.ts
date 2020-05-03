
import { mapDaysToDate, findPassedDays } from './nepali-date-helper'



const dateSymbol = Symbol('Date')
const yearSymbol = Symbol('Year')
const monthSymbol = Symbol('Month')
const jsDateSymbol = Symbol('JSDate')
export default class NepaliDate {

  private [jsDateSymbol]: Date;

  private [yearSymbol]: number;
  private [dateSymbol]: number;
  private [monthSymbol]: number;

  constructor(value: number);
  constructor(dateString: string);
  constructor(year: number, monthIndex: number, day: number);
  constructor() {
    const constructorError = new Error("Invalid constructor arguments");
    if (arguments.length === 1) {
      switch (typeof arguments[0]) {
        case "number":
          this[jsDateSymbol] = new Date(arguments[0]);
          break;
        case "string":
          break;
        default:
          throw constructorError
      }
    } else if (arguments.length <= 3) {
      this.setDayYearMonth(arguments[0], arguments[1], arguments[2])
    } else {
      throw constructorError
    }
    this.convertToAD()
  }


  integerConstructor() {

  }

  stringConstructor() {

  }

  setDayYearMonth(year: number, month: number = 0, day: number = 1) {
    this[yearSymbol] = year;
    this[monthSymbol] = month;
    this[dateSymbol] = day;
  }

  jdDateConstructor() {

  }

  toJsDate(): Date {

    return this[jsDateSymbol];
  }


  getDate(): number {
    return this[dateSymbol]
  }

  setDate() {

  }

  getMonth(): number {
    return this[monthSymbol]
  }

  setMonth() {

  }

  getYear(): number {
    return this[yearSymbol]
  }

  setYear() {

  }


  static now() {
    return Date.now();
  }

  static fromAD() {

  }


  convertToAD() {
    const daysPassed = findPassedDays(this[yearSymbol], this[monthSymbol], this[dateSymbol])
    const { date, month, year } = mapDaysToDate(daysPassed);
    this.setDayYearMonth(year, month, date);
    this[jsDateSymbol] = new Date(1943, 3, 13 + daysPassed)
  }

  toLocaleString() {
    return "Subesh"
  }
}

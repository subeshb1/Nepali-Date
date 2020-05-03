
import { monthDaysMappings, yearDaysMapping } from './nepali-date-helper'



export default class NepaliDate {
  private date: number;
  private month: number;
  private year: number;
  private jsDate: Date;

  constructor();
  constructor(value: number);
  constructor(dateString: string);
  constructor(year: number, monthIndex: number, day: number);
  constructor(data?: any) {
    this.year = 2077;
    this.month = -1;
    this.date = 10;
    this.jsDate = new Date();
  }

  findDays() {

  }

  integerConstructor() {

  }

  stringConstructor() {

  }

  dayYearMonthConstructor() {

  }

  jdDateConstructor() {

  }

  toJsDate(): Date {

    return this.jsDate;
  }


  getDate(): number {
    return this.date
  }

  setDate() {

  }

  getMonth(): number {
    return this.month
  }

  setMonth() {

  }

  getYear(): number {
    return this.year
  }

  setYear() {

  }


  static now() {
    return Date.now();
  }

  static fromAD() {

  }


  convertToAD() {

  }
}


import monthDaysMappings from './month-days-mapping'

const KTM_TIMEZONE_OFFSET = 20700000;

export default class NepaliDate {
  private date:number;
  private month:number;
  private year:number;
  constructor();
  constructor(dateString: string);
  constructor(year: number, month: number, date: number);
  constructor(data?: any) {
    this.date = 1;
    this.month = 1;
    this.year = 1;
  }

  toJsDate(): Date {

    return new Date()
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
}

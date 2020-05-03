import { monthDaysMappings, yearDaysMapping, findDays, COMPLETED_DAYS, TOTAL_DAYS, getYearIndex, mapDaysToDate } from '../src/nepali-date-helper';



const Baisakh = 0;
const Jestha = 1;
const Asar = 2;
const Shrawan = 3;
const Bhadra = 4;
const Aswin = 5
const Kartik = 6;
const Mangsir = 7;
const Poush = 8
const Magh = 9
const Falgun = 10;
const Chaitra = 11;

describe("findDays", () => {
  it("returns days that have passed since epoch nepali time", () => {

    // Normal cases where the date and month don't exceed limits
    expect(findDays(2077, 0, 10)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][COMPLETED_DAYS] + 10)
    expect(findDays(2077, 1, 10)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Jestha][COMPLETED_DAYS] + 10)
    expect(findDays(2077, 1, 26)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Jestha][COMPLETED_DAYS] + 26)
    expect(findDays(2000, 0, 1)).toBe(yearDaysMapping[getYearIndex(2000)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2000)][Baisakh][COMPLETED_DAYS] + 1)
    expect(findDays(2090, 11, 30)).toBe(yearDaysMapping[getYearIndex(2090)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2090)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2090)][Chaitra][TOTAL_DAYS])
    // When month is negative
    expect(findDays(2077, -1, 1)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][COMPLETED_DAYS] + 1)
    expect(findDays(2077, -1, 30)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][COMPLETED_DAYS] + 30)
    expect(findDays(2077, -10, 2)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Asar][COMPLETED_DAYS] + 2)
    expect(findDays(2077, -12, 2)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Baisakh][COMPLETED_DAYS] + 2)
    expect(findDays(2077, -13, 2)).toBe(yearDaysMapping[getYearIndex(2075)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2075)][Chaitra][COMPLETED_DAYS] + 2)
    expect(findDays(2077, -24, 2)).toBe(yearDaysMapping[getYearIndex(2075)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2075)][Baisakh][COMPLETED_DAYS] + 2)
    expect(findDays(2077, -24, 365 * 2 + 1)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][COMPLETED_DAYS] + 1)

    // case when date is 0
    expect(findDays(2077, 1, 0)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][TOTAL_DAYS])
    expect(findDays(2077, 0, 0)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][TOTAL_DAYS])
    expect(findDays(2077, -480, 0)).toBe(yearDaysMapping[getYearIndex(2036)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2036)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2036)][Chaitra][TOTAL_DAYS])

    // case when date is beyond month dates
    expect(findDays(2077, 0, 33)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Jestha][COMPLETED_DAYS] + 2)
    expect(findDays(2076, 0, 365)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][TOTAL_DAYS])
    expect(findDays(2076, 0, 366)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][COMPLETED_DAYS] + 1)
    // case when date is negative
    expect(findDays(2077, 0, -1)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Chaitra][TOTAL_DAYS] - 1)
    expect(findDays(2077, 5, -10)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Bhadra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Bhadra][TOTAL_DAYS] - 10)
    expect(findDays(2077, 0, -365)).toBe(yearDaysMapping[getYearIndex(2075)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2075)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2075)][Chaitra][TOTAL_DAYS])
    expect(findDays(2077, 0, -364)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Baisakh][COMPLETED_DAYS] + 1)

    // case when both date and month is negative
    expect(findDays(2077, -1, -1)).toBe(yearDaysMapping[getYearIndex(2076)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Falgun][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2076)][Falgun][TOTAL_DAYS] - 1)
    expect(findDays(2077, -12, -1)).toBe(yearDaysMapping[getYearIndex(2075)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2075)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2075)][Chaitra][TOTAL_DAYS] - 1)
    expect(findDays(2077, -480, -365)).toBe(yearDaysMapping[getYearIndex(2035)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2035)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2035)][Chaitra][TOTAL_DAYS])
    expect(findDays(2077, -480, -364)).toBe(yearDaysMapping[getYearIndex(2036)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2036)][Baisakh][COMPLETED_DAYS] + 1)

  })

  it('throws if the the date doesn\'t lie within the nepali date boundary', () => {
    expect(() => findDays(2000, -1, -1)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
    expect(() => findDays(2000, -100, -1)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
    expect(() => findDays(2090, 11, 31)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
    expect(() => findDays(2090, 11, 3001)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
    expect(() => findDays(2000, 0, -31)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
    expect(() => findDays(2091, 1, 1)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
    expect(() => findDays(1999, 1, 1)).toThrow('The date doesn\'t ball within 2000/01/01 - 2090/12/30')
  })

})

describe("mapDaysToDate", () => {
  it("maps given epoch difference to nepali date", () => {
    // First Date
    expect(mapDaysToDate(1)).toEqual({ date: 1, month: 0, year: 2000 });
    // Last Date
    expect(mapDaysToDate(33238)).toEqual({ date: 30, month: 11, year: 2090 });
    expect(mapDaysToDate(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][COMPLETED_DAYS] + 10)).toEqual({ date: 10, month: 0, year: 2077 });
    expect(mapDaysToDate(yearDaysMapping[getYearIndex(2054)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2054)][Aswin][COMPLETED_DAYS] + 24)).toEqual({ date: 24, month: 5, year: 2054 });

  })

  it('throws if the difference is beyond min max boundaries', () => {
    expect(() => mapDaysToDate(-1)).toThrow('The epoch difference is not within the boundaries 1 - 33238');
    expect(() => mapDaysToDate(0)).toThrow('The epoch difference is not within the boundaries 1 - 33238');
    expect(() => mapDaysToDate(33239)).toThrow('The epoch difference is not within the boundaries 1 - 33238');
  })
})

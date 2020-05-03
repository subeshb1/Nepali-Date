import { monthDaysMappings, yearDaysMapping, findDays, COMPLETED_DAYS, TOTAL_DAYS, getYearIndex } from '../src/nepali-date-helper';



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

describe("Find Days", () => {
  it("tests number of days for given year,month,date", () => {

    // Normal cases where the date and month don't exceed limits
    expect(findDays(2077, 0, 10)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Baisakh][COMPLETED_DAYS] + 10)
    expect(findDays(2077, 1, 10)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Jestha][COMPLETED_DAYS] + 10)
    expect(findDays(2077, 1, 26)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Jestha][COMPLETED_DAYS] + 26)

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
    expect(findDays(2077, 0, 365)).toBe(yearDaysMapping[getYearIndex(2077)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Chaitra][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2077)][Chaitra][TOTAL_DAYS])
    expect(findDays(2077, 0, 366)).toBe(yearDaysMapping[getYearIndex(2078)][COMPLETED_DAYS] + monthDaysMappings[getYearIndex(2078)][Baisakh][COMPLETED_DAYS] + 1)
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
})

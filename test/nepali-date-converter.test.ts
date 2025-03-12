import NepaliDate from '../src/nepali-date-converter'

describe('NepaliDate to English', () => {
  it('tests constructor', () => {
    const now = new Date()
    expect(new NepaliDate().getAD()).toEqual({
      date: now.getDate(),
      day: now.getDay(),
      year: now.getFullYear(),
      month: now.getMonth(),
    })
    expect(new NepaliDate(2054, 10, 10).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
    expect(new NepaliDate('2054 11 10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
    expect(new NepaliDate('2054/11/10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
    expect(new NepaliDate(new Date(1998, 1, 22)).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
    expect(new NepaliDate(new Date(1998, 1, 22).getTime()).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })

    expect(new NepaliDate(new Date(2024, 5, 14).getTime()).getDateObject()).toEqual({
      AD: { date: 14, day: 5, month: 5, year: 2024 },
      BS: { date: 32, day: 5, month: 1, year: 2081 },
    })
  })

  it('tests getters', () => {
    const date = new NepaliDate(2077, 10, 10)
    expect(date.getDay()).toEqual(1)
    expect(date.getDate()).toEqual(10)
    expect(date.getMonth()).toEqual(10)
    expect(date.getYear()).toEqual(2077)
    expect(date.getDateObject()).toEqual({
      AD: { date: 22, day: 1, month: 1, year: 2021 },
      BS: { date: 10, day: 1, month: 10, year: 2077 },
    })
    expect(date.getBS()).toEqual({ date: 10, day: 1, month: 10, year: 2077 })
    expect(date.getAD()).toEqual({ date: 22, day: 1, month: 1, year: 2021 })
  })

  it('tests setters', () => {
    let date = new NepaliDate(2077, 10, 10)
    date.setDate(20)
    expect(date.getDate()).toEqual(20)
    date.setDate(60)
    expect(date.getDate()).toEqual(31)
    expect(date.getMonth()).toEqual(11)
    expect(date.getYear()).toEqual(2077)
    date.setMonth(2)
    expect(date.getMonth()).toEqual(2)
    date.setMonth(12)
    expect(date.getMonth()).toEqual(0)
    expect(date.getYear()).toEqual(2078)
    date.setYear(2056)
    expect(date.getYear()).toEqual(2056)
  })

  it('tests static methods', () => {
    const now = new Date()
    expect(NepaliDate.now().getAD()).toEqual({
      date: now.getDate(),
      day: now.getDay(),
      year: now.getFullYear(),
      month: now.getMonth(),
    })
    expect(NepaliDate.parse('2054 11 10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
    expect(NepaliDate.parse('2054/11/10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
    expect(NepaliDate.fromAD(new Date(1998, 1, 22)).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 },
    })
  })

  it('converts BS dates to AD with correct UTC handling', () => {
    const nepaliDate = new NepaliDate('2081/11/09')
    const jsDate = nepaliDate.toJsDate()
    
    // Test the exact conversion
    expect(jsDate.toISOString()).toBe('2025-02-21T00:00:00.000Z')
    
    // Verify date components
    expect(jsDate.getUTCFullYear()).toBe(2025)
    expect(jsDate.getUTCMonth()).toBe(1) // February
    expect(jsDate.getUTCDate()).toBe(21)
    
    // Verify time is set to midnight UTC
    expect(jsDate.getUTCHours()).toBe(0)
    expect(jsDate.getUTCMinutes()).toBe(0)
    expect(jsDate.getUTCSeconds()).toBe(0)
    expect(jsDate.getUTCMilliseconds()).toBe(0)
  })

  it('handles time in Kathmandu timezone', () => {
    // Test constructor with time
    const date = new NepaliDate(2081, 10, 9, 14, 30, 45, 500) // 2:30:45.500 PM
    
    // Test getters
    expect(date.getHours()).toBe(14)
    expect(date.getMinutes()).toBe(30)
    expect(date.getSeconds()).toBe(45)
    expect(date.getMilliseconds()).toBe(500)

    // Test setters
    date.setHours(15)
    expect(date.getHours()).toBe(15)
    expect(date.getMinutes()).toBe(30) // Other components should remain unchanged

    date.setMinutes(45)
    expect(date.getHours()).toBe(15)
    expect(date.getMinutes()).toBe(45)
    expect(date.getSeconds()).toBe(45)

    date.setSeconds(30)
    expect(date.getMinutes()).toBe(45)
    expect(date.getSeconds()).toBe(30)
    expect(date.getMilliseconds()).toBe(500)

    date.setMilliseconds(100)
    expect(date.getSeconds()).toBe(30)
    expect(date.getMilliseconds()).toBe(100)

    // Test multiple components at once
    date.setHours(16, 20, 10, 200)
    expect(date.getHours()).toBe(16)
    expect(date.getMinutes()).toBe(20)
    expect(date.getSeconds()).toBe(10)
    expect(date.getMilliseconds()).toBe(200)

    // Verify that the internal date is stored in UTC
    const jsDate = date.toJsDate()
    expect(jsDate.toISOString()).toBe('2025-02-21T10:35:10.200Z') // 16:20:10.200 NPT = 10:35:10.200 UTC
  })

  describe('tests formatting', () => {
    it('Formats the date in English format.', () => {
      // First Date
      expect(new NepaliDate(2020, 0, 21).format('DD/MM/YYYY', 'en')).toEqual('21/01/2020')

      expect(new NepaliDate(2020, 0, 21).format('dd M/D/YYYY', 'en')).toEqual('Sat 1/21/2020')

      expect(new NepaliDate(2020, 0, 21).format('To\\day is dd M/D/YYYY', 'en')).toEqual(
        'Today is Sat 1/21/2020'
      )
    })
    it('Formats the date in Nepali format.', () => {
      // First Date
      expect(new NepaliDate(2020, 0, 21).format('DD/MM/YYYY', 'np')).toEqual('२१/०१/२०२०')

      expect(new NepaliDate(2020, 0, 21).format('dd M/D/YYYY', 'np')).toEqual('शनि १/२१/२०२०')

      expect(new NepaliDate(2020, 0, 21).format('To\\day is dd M/D/YYYY', 'np')).toEqual(
        'Today is शनि १/२१/२०२०'
      )
    })
  })

  it('testing prototypes ', () => {
    const nd = new NepaliDate(2054, 5, 24)
    expect(typeof +nd).toBe('number')
    expect('Friday 24, Aswin 2054').toEqual(nd.toString())
  })
})

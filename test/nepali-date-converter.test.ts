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

  it('converts projected 2084-2086 dates (ISS-73)', () => {
    expect(new NepaliDate(new Date(2027, 5, 22)).getBS()).toEqual({
      date: 8,
      day: 2,
      month: 2,
      year: 2084,
    })
    expect(new NepaliDate(new Date(2028, 3, 13)).getBS()).toEqual({
      date: 1,
      day: 4,
      month: 0,
      year: 2085,
    })
    expect(new NepaliDate(new Date(2030, 1, 12)).getBS()).toEqual({
      date: 30,
      day: 2,
      month: 9,
      year: 2086,
    })
  })

  it('throws for AD dates before 2000/01/01 BS', () => {
    expect(new NepaliDate(new Date(1943, 3, 14)).getBS()).toEqual({
      date: 1,
      day: 3,
      month: 0,
      year: 2000,
    })
    expect(() => new NepaliDate(new Date(1943, 3, 12))).toThrow(
      "The date doesn't fall within 2000/01/01 - 2090/12/30"
    )
    expect(() => new NepaliDate(new Date(1900, 0, 1))).toThrow(
      "The date doesn't fall within 2000/01/01 - 2090/12/30"
    )
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

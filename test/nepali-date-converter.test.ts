import NepaliDate from '../src/nepali-date-converter'

describe('NepaliDate to English', () => {
  it('tests constructor', () => {
    const now = new Date()
    expect(new NepaliDate().getAD()).toEqual({
      date: now.getDate(),
      day: now.getDay(),
      year: now.getFullYear(),
      month: now.getMonth()
    })
    expect(new NepaliDate(2054, 10, 10).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
    })
    expect(new NepaliDate('2054 11 10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
    })
    expect(new NepaliDate('2054/11/10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
    })
    expect(new NepaliDate(new Date(1998, 1, 22)).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
    })
    expect(new NepaliDate(new Date(1998, 1, 22).getTime()).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
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
      BS: { date: 10, day: 1, month: 10, year: 2077 }
    })
    expect(date.getBS()).toEqual({ date: 10, day: 1, month: 10, year: 2077 })
    expect(date.getAD()).toEqual({ date: 22, day: 1, month: 1, year: 2021 })
    expect(date.toJsDate().getTime()).toEqual(1613931300000)
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
      month: now.getMonth()
    })
    expect(NepaliDate.parse('2054 11 10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
    })
    expect(NepaliDate.parse('2054/11/10').getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
    })
    expect(NepaliDate.fromAD(new Date(1998, 1, 22)).getDateObject()).toEqual({
      AD: { date: 22, day: 0, month: 1, year: 1998 },
      BS: { date: 10, day: 0, month: 10, year: 2054 }
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

# Nepali-Date

A small Javascript/Typescript Library to convert English Date to Nepali and Vice Versa.

[![Publish](https://github.com/subeshb1/Nepali-Date/actions/workflows/publish.yml/badge.svg)](https://github.com/subeshb1/Nepali-Date/actions/workflows/publish.yml) ![Release version](https://img.shields.io/github/v/release/subeshb1/nepali-date)

## Installation

CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/nepali-date-converter/dist/nepali-date-converter.umd.js"></script>
```

Node JS:

```sh
npm i nepali-date-converter
```

```js
import NepaliDate from 'nepali-date-converter'
// or

const NepaliDate = require('nepali-date-converter');
```

Deno:

```js
import NepaliDate from 'https://cdn.jsdelivr.net/npm/nepali-date-converter/dist/nepali-date-converter.es5.js'
```

## Basic Usage

```js
// NepaliDate (year,month,date)
let date1 = new NepaliDate(2054, 5, 24)
// Javascript Date object
new NepaliDate(2051, 5, 24).toJsDate()
// formatting
date1.format('ddd, DD MMMM YYYY') // 'Monday, 24 Aswin 2051'
// update date
date1.setDate(10)
date1.setMonth(1)
date1.setYear(2054)
```

## API

### Constructors

#### constructor(value?: string | number | Date)

**String**

Provide a valid Nepali date string. The current supported formats are:

```
YYYY/MM/DD
YYYY-MM-DD
YYYY MM DD
DD/MM/YYYY
DD-MM-YYYY
DD MM YYYY
```

Example:

```js
new NepaliDate('2051/02/01') // YYYY/MM/DD
new NepaliDate('2051-02-01')
new NepaliDate('2051 02 01')
new NepaliDate('01/02/2051') // DD/MM/YYYY
new NepaliDate('01-02-2051')
new NepaliDate('01 02 2051')
```

**Number**

The number value represents the UTC timestamp that will be converted to Nepali date.

Example:

```js
new NepaliDate(1589638162879)
```

**Date**

Javascript Date object

Example:

```js
new NepaliDate(new Date(2020, 10, 10))
```

**Empty constructor**

If no values are provided, the current day date will be converted to Nepali date.

```js
new NepaliDate()
```

#### constructor(year: number, monthIndex: number, date: number)

This constructor takes year, monthIndex i.e 0-11, and date.

Example:

```js
new NepaliDate(2051, 0, 1) // This date represents Baisakh 1, 2051
```

### getYear(): number

Get Nepali date year.

### getMonth(): number

Get Nepali month index.

```
Baisakh => 0
Jestha => 1
Asar => 2
Shrawan => 3
Bhadra => 4
Aswin => 5
Kartik => 6
Mangsir => 7
Poush => 8
Magh => 9
Falgun => 10
Chaitra => 11
```

### getDate(): number

Get Nepali date for the month

### getDay(): number

Get Week day index for the date.

### toJsDate(): Date

Returns Javascript Date converted from nepali date.

### getBS(): IYearMonthDate

Returns Nepali date fields in an object implementing IYearMonthDate

```js
{
    year: 2052,
    month: 10,
    date: 10,
    day: 0
}
```

### getAD(): IYearMonthDate

Returns AD date fields in an object implementing IYearMonthDate

Example:

```js
{
    year: 2019,
    month: 10,
    date: 10,
    day: 0
}
```

### getDateObject(): IAdBs

Returns an object with AD and BS object implementing IYearMonthDate

Example:

```js
{
    BS: {
        year: 2052,
        month: 10,
        date: 10,
        day: 0
    },
    AD: {
        year: 2019,
        month: 10,
        date: 10,
        day: 0
    },

}
```

### format(formatString: string, language: 'np' | 'en'): string

Format Nepali date string based on format string.

```
YYYY - 4 digit of year (2077)
YYY  - 3 digit of year (077)
YY   - 2 digit of year (77)
M    - month number (1 - 12)
MM   - month number with 0 padding (01 - 12)
MMM  - short month name (Bai, Jes, Asa, Shr, etc.)
MMMM - full month name (Baisakh, Jestha, Asar, ...)
D    - Day of Month (1, 2, ... 31, 32)
DD   - Day of Month with zero padding (01, 02, ...)
d    - Week day (0, 1, 2, 3, 4, 5, 6)
dd   - Week day in short format (Sun, Mon, ..)
ddd  - Week day in long format (Sunday, Monday, ...)
```

Set language to 'np' for nepali format. The strings can be combined in any way to create desired format.

```js
let a = new NepaliDate(2054, 10, 10)
a.format('YYYY/MM/DD') // '2054/11/10'
a.format('YYYY MM DD') // '2054 11 10'
a.format('YYYY') // '2054'
a.format('ddd DD, MMMM YYYY') // 'Sunday 10, Falgun 2054'
a.format('To\\day is ddd DD, MMMM YYYY') // 'Today is Sunday 10, Falgun 2054', Note: use '\\' to escape [YMDd]
a.format('DD/MM/YYYY', 'np') //' १०/११/२०५४'
a.format('dd', 'np') // 'आइतबार'
a.format('ddd DD, MMMM YYYY', 'np') // 'आइतबार १०, फाल्गुण २०५४'
// Set static variable to 'np' for default Nepali language
NepaliDate.language = 'np'
a.format('ddd DD, MMMM YYYY') // 'आइतबार १०, फाल्गुण २०५४'
```

### setYear(year: number)

Set year in the current date object. It only takes positive value i.e Nepali Year

Example:

```js
let a = new NepaliDate(2054, 10, 10)
a.setYear(2053) // will make date NepaliDate(2053,10,15);
```

### setMonth(month: number)

Set month in the current date object. It can be positive or negative. Positive values within the month
will update the month only and more then month mill increment month and year. Negative value will deduct month and year depending on the value.
It is similar to javascript Date API.

Example:

```js
let a = new NepaliDate(2054, 10, 10)
a.setMonth(1) // will make date NepaliDate(2054,1,10);
a.setMonth(-1) // will make date NepaliDate(2053,11,10); To go back to previous month(s) in same or previous year 
a.setMonth(12) // will make date NepaliDate(2054,0,10); To go ahead to coming month(s) in same or coming year
```

### setDate(date: number)

Set date in the current date object. It can be positive or negative. Positive values within the month
will update the date only and more then month mill increment month and year. Negative value will deduct month and year depending on the value.
It is similar to javascript Date API.

Example:

```js
let a = new NepaliDate(2054, 10, 10)
a.setDate(11) // will make date NepaliDate(2054,10,11);
a.setDate(-1) // will make date NepaliDate(2054,9,29); To go back to dates from previous months
a.setDate(45) // will make date NepaliDate(2054,10,15); To go ahead to dates in coming months
```

### static parse(dateString: string): NepaliDate

Returns new Nepali Date from the string date format
Similar to calling constructor with string parameter

### static now(): NepaliDate

Returns new Nepali Date converted form current day date.
Similar to calling empty constructor

### static fromAD(date: Date): NepaliDate

Returns new converted Nepali Date from the provided Javascript Date.
It is similar to passing string as constructor

## Contributing Guide

```bash
# Fork the repo
https://github.com/subeshb1/Nepali-Date

# Clone your forked repo
$ git clone git@github.com:subeshb1/Nepali-Date.git

$ npm install

# Create a new branch for you.
$ git pull origin master # Pull the latest master
$ git checkout new-branch # Checkout to your new branch

# Run test
npm run test

# Commit the changes
$ npm run commit

# Push your changes and
$ git push

# Make a pull request of your newly changed branch
[https://github.com/subeshb1/Nepali-Date/compare](https://github.com/subeshb1/Nepali-Date/compare)

```

## Fixing dates and adding future data

The length of month can change for the future dates. Update the `date-config-ts` files with the number of days in respective months to fix the issue. Order the data in ascending order

## Maintainer

- [Subesh Bhandari](https://twitter.com/subesh1)

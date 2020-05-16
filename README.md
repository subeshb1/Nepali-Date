# Nepali-Date

A small Javascript/Typescript Library to convert English Date to Nepali and Vice Versa.

[![Build Status](https://travis-ci.org/subeshb1/Nepali-Date.svg?branch=master)](https://travis-ci.org/subeshb1/Nepali-Date)

## Installation

```
npm i nepali-date-converter
```

## Basic Usage

```js
import NepaliDate from 'nepali-date-converter'
// NepaliDate (year,month,date)
let date1 = new NepaliDate(2051, 05, 24)
// Javascript Date object
new NepaliDate(2051, 05, 24).toJsDate()

// formatting
date1.format('ddd, DD MMMM YYYY') // 'Friday, 24 Aswin 2051'
```

## API

### Constructors

#### constructor(value?: string | number | Date)

**String**

Provide a valid nepali date string. The current supported formats are:

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

#### constructor(year: number, monthIndex: number, date: number)
This constructor takes year, monthIndex i.e 0-11, and date.

Example: 
```js
new Date(2051,0,1) // Baisakh 1, 2o51
```


## Contributing Guide

```bash
# Fork the repo
https://github.com/subeshb1/Nepali-Date

# Clone your forked repo
$ git clone git@github.com:subeshb1/Nepali-Date.git

$ npm install

# Create a new branch for you.
$ git pull orgin master # Pull the latest master
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

## Maintainer

- [Subesh Bhandari](https://twitter.com/subesh1)

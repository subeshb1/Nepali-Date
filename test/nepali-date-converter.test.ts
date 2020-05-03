import NepaliDate from "../src/nepali-date-converter"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("NepaliDate is instantiable", () => {
    expect(new NepaliDate()).toBeInstanceOf(NepaliDate)
  })
})

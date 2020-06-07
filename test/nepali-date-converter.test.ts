import NepaliDate from "../src/nepali-date-converter"

describe("NepaliDate to English", () => {
  it("testing toAD ", () => {
    const nd = new NepaliDate(2054, 5, 24);
    expect(nd.getAD()).toEqual({ year: 1997, month: 9, date: 10, day: 5 });
  });

  it("test fromAd", () => {
    const nd = NepaliDate.fromAD(new Date(1997, 9, 10));
    expect(nd.getBS()).toEqual(new NepaliDate(2054, 5, 24).getBS());
  });
});

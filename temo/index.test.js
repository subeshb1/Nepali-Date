const NepaliDate = require("./index");

describe("NepaliDate to English", () => {
  it(" testing toAD ", () => {
    const nd = new NepaliDate(2054, 5, 24);
    expect(nd.toAD()).toEqual({ year: 1997, month: 9, date: 10 });

    const empty = new NepaliDate();
    expect(empty.toAD()).toEqual({ year: 1943, month: 3, date: 14 });
  });

  it("test fromAd", () => {
    const nd = NepaliDate.fromAD(1997, 9, 10);
    expect(nd).toEqual(new NepaliDate(2054, 5, 24));
  });
});

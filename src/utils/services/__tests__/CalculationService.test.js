import {calculateBalance} from "../CalculationService";

const items = [
  {
    name: "test",
    cost: 100,
  },
  {
    name: "test2",
    cost: 120,
  },
];

const taxes = [
  {
    name: "test",
    percentage: 10,
  },
  {
    name: "test",
    percentage: 15,
  },
];

describe("Calculate Balance tests", () => {
  it("should return balance with no taxes or tip", () => {
    const balance = calculateBalance(items, []);
    expect(balance).toEqual("220.00");
  });

  it("should return balance with taxes no tip", () => {
    const balance = calculateBalance(items, taxes);
    expect(balance).toEqual("278.30");
  });

  it("should return balance with taxes and tipAmount", () => {
    const balance = calculateBalance(items, taxes, 10);
    expect(balance).toEqual("288.30");
  });

  it("should return balance with taxes and tipPercent", () => {
    const balance = calculateBalance(items, taxes, 0, 10);
    expect(balance).toEqual("306.13");
  });

  it("should return balance with taxes and tipPercent and tipAmount", () => {
    const balance = calculateBalance(items, taxes, 10, 10);
    expect(balance).toEqual("316.13");
  });
});

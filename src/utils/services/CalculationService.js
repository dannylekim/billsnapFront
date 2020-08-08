/**
 *
 * Calculates the balance of a bill.
 *
 * Note: does not do any verification on null or negative values
 *
 * @param items the list of items given. In the array of objects, each object must have a `cost` property
 * @param taxes the list of taxes given. In the array of objects, each object must have a `percentage` property
 * @param tipAmount is the flat amount of tip to be added. If it doesn't exist, it is defaulted to 0
 * @param tipPercent is the amount of tip percent to be added. If it doesn't exist, it is defaulted to 0
 */
export const calculateBalance = (
  items,
  taxes,
  tipAmount = 0,
  tipPercent = 0
) => {
  const itemSubTotal = items
    .map((item) => item.cost)
    .reduce((accumulator, cost) => accumulator + cost);

  const totalTaxPercent = taxes
    .map((tax) => tax.percentage)
    .map((taxPercent) => taxPercent / 100 + 1)
    .reduce(
      (currentTotalPercentage, currentPercentage) =>
        currentTotalPercentage * currentPercentage,
      1
    );

  const taxSubTotal = (itemSubTotal * totalTaxPercent) - itemSubTotal;
  const subTotal = itemSubTotal + taxSubTotal;

  const tipPercentTotal = (subTotal * tipPercent) / 100;

  const total = subTotal + tipPercentTotal + tipAmount;
  return total.toFixed(2);
};

const { URL } = require("../../config");
const { BILLSNAP_TOKEN, BILLS } = require("../../constants/constants");
/**
 * @function getBill
 * @description Function that calls the /bills route to return the bills associated to the user. With bearer token.
 */
export const getBill = async () => {
  const token = localStorage.getItem(BILLSNAP_TOKEN);
  const response = await fetch(`${URL}/${BILLS}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

/**
 * @function createBill
 * @description function that creates a bill by calling the secured POST /bills endpoint.
 * @param createBillParams (which has name, category, company, items, accountsList, tipAmount, tipPercent, taxes)
 * @returns a Promise<Bill> on code 201
 */
export const createBill = async (createBillParams) => {
  const token = localStorage.getItem(BILLSNAP_TOKEN);
  const response = await fetch(`${URL}/${BILLS}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createBillParams),
  });
  return checkStatus(response);
};


async function checkStatus(response) {
  const parsedResponse = await response.json();
  if (parsedResponse.status !== "CREATED") {
    throw parsedResponse;
  }
  return parsedResponse;
}

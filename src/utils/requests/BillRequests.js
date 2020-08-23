const { URL } = require("../../config");
/**
 * @function getBill
 * @description Function that calls the /bills route to return the bills associated to the user. With bearer token.
 */
export const getBill = async (query_params = "") => {
  try {
    const token = localStorage.getItem("billSnap_token");
    const response = await fetch(`${URL}/bills${query_params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * @function start bill
 * @description Function that calls the start bill route and starts the bill
 * @param billId the bill being started
 * @returns {Promise<any>} the full bill being started
 */
export const startBill = async (billId) => {
    const token = localStorage.getItem("billSnap_token");
    const response = await fetch(`${URL}/bills/start`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify({id: billId})
    });

    if (!response.ok) {
        throw await response.json();
    }

    return response.json();
}

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
 * @function answer bill
 * @description Function that calls the invitation route and accepts or declines the bill
 * @param isAccepted true to accept, false otherwise
 * @param billId the bill that we are answering
 * @returns {Promise<any>} it will return the full bill if we've accepted, null otherwise
 */
export const answerPendingBill = async (isAccepted, billId) => {
  const token = localStorage.getItem("billSnap_token");
  const response = await fetch(`${URL}/invitations/${billId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ answer: isAccepted }),
  });

  if (!response.ok) {
    throw await response.json();
  }

  if (!isAccepted) {
    return null;
  }

  return response.json();
};

/**
 * Get detailed information on a bill
 *
 * @param billId id of the bill to get more information on
 * @returns {Promise<any>} the full bill
 */
export const getDetailedBill = async (billId) => {
  const token = localStorage.getItem("billSnap_token");
  const response = await fetch(`${URL}/bills/${billId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};
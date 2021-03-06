const { URL } = require("../../config");

/**
 * @function logUser
 * @description Function used to wrap the login request while simply requiring credentials as params
 * @param {String} credentials.email
 * @param {String} credentials.password // no need to encrypt yet
 */
export const login = async (credentials) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await checkStatus(response);
};

/**
 * @function registerUser
 * @description Function used to wrap the register request while simply requiring data for account registration
 * @param {String} entries.firstName
 * @param {String} entries.lastName
 * @param {String} entries.email
 * @param {String} entries.password // no need to encrypt yet
 */

/*
{type: "cors", url: "https://billsnap-development.herokuapp.com/billsnap/register", redirected: false, status: 400, ok: false, …}
*/
export const register = async (entries) => {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  });

  return checkStatus(response);
};

export const getAccount = async () => {
  const token = localStorage.getItem("billSnap_token");
  const response = await fetch(`${URL}/account`, {
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

async function checkStatus(response) {
  const parsedResponse = await response.json();
  return { ...parsedResponse, statusCode: response.status };
}

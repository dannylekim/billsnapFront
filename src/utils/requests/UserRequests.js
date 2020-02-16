const { URL } = require("../../config")

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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...credentials}),
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...entries}),
    });

    return await checkStatus(response);
};

async function checkStatus(response) {
    const parsedResponse = await response.json();
  
    if (response.status < 200 || response.status >= 300) {
        
        // throw new Error(parsedResponse.errors);
    }

    return {...parsedResponse, statusCode: response.status};
}

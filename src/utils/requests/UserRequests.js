const { URL } = require("../../config")

/**
 * @function logUser
 * @description Function used to wrap the login request while simply requiring credentials as params
 * @param {String} credentials.email
 * @param {String} credentials.password // no need to encrypt yet
 */
export const login = async (credentials) => {
    try { 
        let response = await fetch(URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials),
        });

        return await checkStatus(response);

    } catch(error){
        return error;
    }
};

/**
 * @function registerUser
 * @description Function used to wrap the register request while simply requiring data for account registration
 * @param {String} entries.email
 * @param {String} entries.password // no need to encrypt yet
 * @param {String} entries.confirmPassword
 * @param {String} entries.etc... name, age, ...rest
 */
export const register = async (entries) => {
    try { 
        const response = await fetch(URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entries),
        });

        return await checkStatus(response);

    } catch(error){
        return error;
    }
};

async function checkStatus(response) {
    let parsedResponse = await response.json();

    if (response.status < 200 || response.status >= 300) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

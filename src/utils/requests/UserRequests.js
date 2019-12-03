const { URL } = require("../../../config")

/**
 * @function logUser
 * @description Function used to wrap the login request while simply requiring credentials as params
 * @param {String} credentials.email
 * @param {String} credentials.password // no need to encrypt yet
 */
export const login = async (credentials) => {
    try { 
        let x = await fetch(URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials),
        })
        checkStatus(x);
        parseJSON(x);
    }
    catch(e){
        return e;
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
        let x = await fetch(URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entries),
        })
        checkStatus(x);
        parseJSON(x);
    }
    catch(e){
        return e;
    }
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}
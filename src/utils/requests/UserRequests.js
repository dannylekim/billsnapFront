const { URL } = require("../../config")

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
        });
        checkStatus(x);
        return x.json();
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
        const responsePromise = await fetch(URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entries),
        });
        await checkStatus(responsePromise);
        return await responsePromise.json();
    }
    catch(e){
        console.error(e);
        return e;
    }
};

async function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw await response.json(); //TODO on how you want to format it
    }
}

/**
 * @function logUser
 * @description Function used to wrap the login request while simply requiring credentials as params
 * @param {String} credentials.email
 * @param {String} credentials.password // no need to encrypt yet
 */
export const login = async (credentials) => {
    // should do something with credentials...
    // hint: use GET
};

/**
 * @function logUser
 * @description Function used to wrap the register request while simply requiring credentials as params
 * @param {String} entries.email
 * @param {String} entries.password // no need to encrypt yet
 * @param {String} entries.confirmPassword
 * @param {String} entries.etc... name, age, ...rest
 */
export const register = async (entries) => {
    // should do something with entries...
    // hint: POST
};
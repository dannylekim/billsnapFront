const {URL} = require("../../config");
/**
 * @function getBill
 * @description Function that calls the /bills route to return the bills associated to the user. With bearer token.
 * @param {String} token
 */
export const getBill = async (token) => {
    try{
        const response = await fetch(`${URL}/bills`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        return await response;
    }catch(error){
        throw(error)
    };
};

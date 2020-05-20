const {URL} = require("../../config");
/**
 * @function getBill
 * @description Function that calls the /bills route to return the bills associated to the user. With bearer token.
 */
export const getBill = async () => {
    try{
        const token = localStorage.getItem("token");
        const response =  await fetch(`${URL}/bills`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.json();
    }catch(error){
        throw(error)
    }
};
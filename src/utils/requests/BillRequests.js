const {URL} = require("../../config");
/**
 * @function getBills
 * @description Function that calls the /bills route to return the bills associated to the user. With bearer token.
 */
export const getBills = async () => {
    try {
        const token = localStorage.getItem("billSnap_token");
        const response = await fetch(`${URL}/bills`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.json();
    } catch (error) {
        throw(error)
    }
};

/**
 * @function getDetailedBill
 * @description Function that calls /bills/{billId} route to get a Detailed Bill given the billId.
 * @param {String} billId
 */
export const getDetailedBill = async (billId) => {
    try {
        const token = localStorage.getItem("billSnap_token");
        const response = await fetch(`${URL}/bills/${billId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        return response.json();
    } catch (error) {
        throw(error);
    }
};


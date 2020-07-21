import {getBills} from "../../utils/requests/BillRequests";
import {setBillLoading} from "./applicationActions";

export const ACTIONS = {
  ADD_BILLS: "ADD_BILLS",
};

const addBill = (bills = []) => ({
  type: "ADD_BILLS",
  count: bills.length,
  bills,
});

export const fetchMyBills = () => {
  return async (dispatch) => {
    try {
      dispatch(setBillLoading(true));

      const bills = await getBills();
      dispatch(addBill(bills));
    } catch (err) {
        // maybe set bill fetch error?
    } finally {
      dispatch(setBillLoading(false));
    }
  };
};

import { getBill } from "../../utils/requests/BillRequests";
import { setBillLoading } from "./applicationActions";

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
      const bills = await getBill();

      dispatch(setBillLoading(true));
      dispatch(addBill(bills));
      dispatch(setBillLoading(false));
    } catch (err) {
        // maybe set bill fetch error?
    }
  };
};

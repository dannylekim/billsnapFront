import {getBill, payBill} from "../../utils/requests/BillRequests";
import {setBillLoading} from "./applicationActions";

export const ACTIONS = {
  ADD_BILLS: "ADD_BILLS",
  UPDATE_BILLS: "UPDATE_BILLS",
};

const addBill = (bills = []) => ({
  type: "ADD_BILLS",
  count: bills.length,
  bills,
});

const updateBill = (bills = []) => ({
  type: "UPDATE_BILLS",
  bills,
});

export const orderAlphabetical = (alphabeticalType, bills) => async (
  dispatch
) => {
  const sortedBills = bills.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  dispatch(
    updateBill(
      alphabeticalType === "A to Z" ? sortedBills : sortedBills.reverse()
    )
  );
};

export const fetchMyBills = (query_param = "") => {
  return async (dispatch) => {
    try {
      dispatch(setBillLoading(true));

      const bills = await getBill(query_param);

      dispatch(query_param === "" ? addBill(bills) : updateBill(bills));
    } catch (err) {
      // maybe set bill fetch error?
    } finally {
      dispatch(setBillLoading(false));
    }
  };
};

export const payABill = (amountPaid, billId) => {
  return async (dispatch, state) => {
    const bill = await payBill(amountPaid, billId);

    const updatedBills = state.bills.bills.filter(b => b.id !== bill.id);
    updatedBills.push(bill);

    dispatch(updateBill(updatedBills));
  }

}

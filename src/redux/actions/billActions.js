import {answerPendingBill, getBill} from "../../utils/requests/BillRequests";
import {setBillLoading} from "./applicationActions";

export const ACTIONS = {
  ADD_BILLS: "ADD_BILLS",
  UPDATE_BILLS: "UPDATE_BILLS",
  UPDATE_PENDING_BILLS: "UPDATE_PENDING_BILLS",
  UPDATE_BILL_SEARCH_NAME: "UPDATE_BILL_SEARCH_NAME",
  SET_ACTIVE_BILL: "SET_ACTIVE_BILL"
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

const updatePendingBills = (pendingBills = []) => ({
  type: ACTIONS.UPDATE_PENDING_BILLS,
  pendingBills,
});

export const updateSearchBillName = (input = "") => ({
  type: "UPDATE_BILL_SEARCH_NAME",
  input,
});

export const setActiveBill = (bill) => ({
  type: "SET_ACTIVE_BILL",
  bill,
});

export const clearActiveBill = () => ({
  type: "SET_ACTIVE_BILL",
  bill: {},
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

export const fetchPendingBills = (
  queryParam = "?invitation_status=PENDING"
) => {
  return async (dispatch) => {
    try {
      dispatch(setBillLoading(true));

      const pendingBills = await getBill(queryParam);

      dispatch(updatePendingBills(pendingBills));
    } catch (err) {
      // maybe set bill fetch error?
    } finally {
      dispatch(setBillLoading(false));
    }
  };
};

export const updatePendingBill = (isAccepted, billId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBillLoading(true));
      const bill = await answerPendingBill(isAccepted, billId);
      const state = getState();

      if (isAccepted) {
        dispatch(updateBill([...state.bills.bills, bill]));
      }

      const pendingBills = state.bills.pendingBills.filter(
        (pendingBill) => pendingBill.id !== billId
      );
      dispatch(updatePendingBills(pendingBills));
    } finally {
      dispatch(setBillLoading(false));
    }
  };
};

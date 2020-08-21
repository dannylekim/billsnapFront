import {ACTIONS} from "../actions/billActions";

const INTIAL_STATE = {
  count: 0, // keep track of count of bills
  bills: [],
  pendingBills: [],
  searchInput: '',
  activeBill: {} // bill user has selected
};

const billReducers = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.ADD_BILLS:
      return {
        ...state,
        count: action.count,
        bills: action.bills,
      };
    case ACTIONS.UPDATE_BILLS:
      return {
        ...state,
        bills: action.bills,
      };
    case ACTIONS.UPDATE_PENDING_BILLS:
      return {
        ...state,
        pendingBills: action.pendingBills,
      }
    case ACTIONS.SET_ACTIVE_BILL:
      return {
        ...state,
        activeBill: action.bill
      };
    case ACTIONS.UPDATE_BILL_SEARCH_NAME:
      return {
        ...state,
        searchInput: action.input,
      };
    default:
      return state;
  }
};

export default billReducers;

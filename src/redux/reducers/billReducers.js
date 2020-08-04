import {ACTIONS} from "../actions/billActions";

const INTIAL_STATE = {
  count: 0, // keep track of count of bills
  bills: [],
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
    default:
      return state;
  }
};

export default billReducers;

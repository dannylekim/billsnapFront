import {ACTIONS} from "../actions/billActions";

const INITIAL_STATE = {
  count: 0, // keep track of count of bills
  bills: [],
};

const billReducers = (state = INITIAL_STATE, action) => {
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
    case ACTIONS.CREATE_BILL:

      //make a new version of the previous bills as to not mutate state and add the newly created bill onto it.
      let billsList = state.bills.slice();
      billsList.push(action.bill);

      return {
        ...state,
        count: state.count + 1,
        bills: billsList,
      };
    default:
      return state;
  }
};

export default billReducers;

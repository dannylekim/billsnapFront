import {ACTIONS} from "../actions/applicationActions";

const INITIAL_STATE = {
  showRegisterFirst: true,
  isBillLoading: false,
  isActiveBillLoading: false,
};

const applicationReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_LANDING_PAGE_FORM:
      return {
        ...state,
        showRegisterFirst: !state.showRegisterFirst,
      };
    case ACTIONS.SET_BILL_LOADING_STATUS:
      return {
        ...state,
        isBillLoading: action.isBillLoading,
      };
    case ACTIONS.SET_ACTIVE_BILL_LOADING_STATUS:
      return {
        ...state,
        isActiveBillLoading: action.isActiveBillLoading,
      };
    default:
      return state;
  }
};

export default applicationReducers;

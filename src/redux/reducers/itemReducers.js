import {ACTIONS} from "../actions/itemAction";

const INITIAL_STATE = {
  activeItemId: -1,
};

const itemReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_ITEM_ID:
      return {
        ...state,
        activeItemId: action.itemId,
      };
    default:
      return state;
  }
};

export default itemReducers;

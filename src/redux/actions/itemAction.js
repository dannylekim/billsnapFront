export const ACTIONS = {
  SET_ACTIVE_ITEM_ID: "SET_ACTIVE_ITEM_ID",
};

export const setActiveItemIdAction = (itemId) => ({
  type: ACTIONS.SET_ACTIVE_ITEM_ID,
  itemId,
});

export const setActiveItemId = (itemId) => {
  return async (dispatch) => {
    dispatch(setActiveItemIdAction(itemId));
  };
};

import {getAccount} from "../../utils/requests/UserRequests";

export const ACTIONS = {
  SET_USER: "SET_USER",
};

export const setUser = (newUser) => ({
  type: ACTIONS.SET_USER,
  newUser,
});

export const loadUser = () => {
  return async (dispatch) => {
    const user = await getAccount();
    dispatch(setUser(user));
  };
};
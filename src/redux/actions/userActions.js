export const ACTIONS = {
  SET_USER: "SET_USER",
};

export const setUser = (newUser) => ({
  type: ACTIONS.SET_USER,
  newUser,
});

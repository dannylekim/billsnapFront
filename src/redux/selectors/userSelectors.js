export const getHasUser = (state) => state.users && Object.keys(state.users.userInfo).length > 0;
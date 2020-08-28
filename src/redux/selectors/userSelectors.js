import { createSelector } from 'reselect'

const loggedUser = (state) => state.users; 

export const isUserLogged = createSelector([loggedUser], (user) => user && Object.keys(user.userInfo).length > 0) && localStorage.getItem("billSnap_token");
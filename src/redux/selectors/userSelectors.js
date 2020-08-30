import { createSelector } from 'reselect'

const loggedUser = (state) => state.users; 

export const isUserLogged = createSelector([loggedUser], (user) => {
    return !!localStorage.getItem("billSnap_token");
});
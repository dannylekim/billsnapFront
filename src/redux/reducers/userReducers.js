import {ACTIONS} from '../actions/userActions';

const INTIAL_STATE = {
    userInfo: {},
};

const userReducers = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return {
                ...state,
                userInfo: {...action.newUser}
            }
        default:
            return state;
    }
};

export default userReducers;
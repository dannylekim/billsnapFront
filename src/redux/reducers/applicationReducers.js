import {ACTIONS} from '../actions/applicationActions';

const INTIAL_STATE = {
    showRegisterFirst: true,
    isBillLoading: false,
};

const applicationReducers = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_LANDING_PAGE_FORM:
            return {
                ...state,
                showRegisterFirst: !state.showRegisterFirst
            }
        case ACTIONS.SET_BILL_LOADING_STATUS:
            return {
                ...state,
                isBillLoading: action.isBillLoading
            }
        default:
            return state;
    }
};

export default applicationReducers;
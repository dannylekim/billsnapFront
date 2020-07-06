import { combineReducers } from "redux";

import bills from "./billReducer";
import users from "./userReducers";
import application from "./applicationReducers";

export default combineReducers({
    application,
    bills,
    users,
});

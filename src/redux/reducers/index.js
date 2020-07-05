import { combineReducers } from "redux";

import bills from "./billReducer";
import application from "./applicationReducers";

export default combineReducers({
    bills,
    application,
});

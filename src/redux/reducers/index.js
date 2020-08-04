import {combineReducers} from "redux";

import bills from "./billReducers";
import users from "./userReducers";
import application from "./applicationReducers";

export default combineReducers({
  application,
  bills,
  users,
});

import {combineReducers} from "redux";

import bills from "./billReducers";
import users from "./userReducers";
import application from "./applicationReducers";
import items from "./itemReducers";

export default combineReducers({
  application,
  bills,
  users,
  items,
});

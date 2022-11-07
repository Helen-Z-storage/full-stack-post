import ui from "./uiReducer";
import login from "./loginReducer";
import { combineReducers } from "redux";

export default combineReducers({
    ui,
    login
})

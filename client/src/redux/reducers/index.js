import ui from "./uiReducer";
import login from "./loginReducer";
import register from "./registerReducer";
import { combineReducers } from "redux";

export default combineReducers({
    ui,
    login,
    register
})

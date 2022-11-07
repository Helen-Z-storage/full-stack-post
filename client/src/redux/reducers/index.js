import ui from "./uiReducer";
import login from "./loginReducer";
import register from "./registerReducer";
import posts from "./postsReducer";
import { combineReducers } from "redux";

export default combineReducers({
    ui,
    login,
    register,
    posts
})

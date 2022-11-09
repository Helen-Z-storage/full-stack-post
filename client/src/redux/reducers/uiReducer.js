import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS(
        {
            error: "",
            loggedIn: false,
            token: "",
            postId: -1,
            
            username:  "",
            password:  "",

            authorIds: "",
            sortBy:    "",
            direction: "",
            text:      "",
            tags:      []
        }
    )
}

export default function reducer(state=initialState(), action) {
    if (typeof reducer.prototype[action.type] === "function") {
        return reducer.prototype[action.type](state, action);
    }
    return state;
}

reducer.prototype[actionType.ui.setError] = (state, action) => {
    return state.set("error", action.payload);
}

reducer.prototype[actionType.ui.setToken] = (state, action) => {
    return state.set("token", action.payload);
}

reducer.prototype[actionType.ui.setPostId] = (state, action) => {
    return state.set("postId", action.payload);
}

reducer.prototype[actionType.ui.setUsername] = (state, action) => {
    return state.set("username", action.payload);
}

reducer.prototype[actionType.ui.setPassword] = (state, action) => {
    return state.set("password", action.payload);
}

reducer.prototype[actionType.ui.setAuthorIds] = (state, action) => {
    return state.set("authorIds", action.payload);
}

reducer.prototype[actionType.ui.setSortBy] = (state, action) => {
    return state.set("sortBy", action.payload);
}

reducer.prototype[actionType.ui.setDirection] = (state, action) => {
    return state.set("direction", action.payload);
}

reducer.prototype[actionType.ui.setText] = (state, action) => {
    return state.set("text", action.payload);
}

reducer.prototype[actionType.ui.setTags] = (state, action) => {
    return state.set("tags", action.payload);
}
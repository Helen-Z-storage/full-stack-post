import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS({
        posts: {
            postsData: [],
            errorMsg: "",
            loading: true,
            loaded: false
        }
    });
}

export default function reducer(state=initialState(), action) {
    if (typeof reducer.prototype[action.type] === "function") {
        return reducer.prototype[action.type](state, action);
    }
    return state;
}

reducer.prototype[actionType.posts.postsLoadUserPending] = (state, action) => {
    return state.setIn("posts.loading".split("."), true)
                .setIn("posts.loaded".split("."), false)
                .setIn("posts.postsData".split("."), [])
                .setIn("posts.errorMsg".split("."), "");
}

reducer.prototype[actionType.posts.postsLoadUserRejected] = (state, action) => {
    return state.setIn("posts.loading".split("."), false)
                .setIn("posts.loaded".split("."), false)
                .setIn("posts.postsData".split("."), [])
                .setIn("posts.errorMsg".split("."), action.payload);
}
reducer.prototype[actionType.posts.postsLoadUserFulfilled] = (state, action) => {
    return state.setIn("posts.loading".split("."), false)
                .setIn("posts.loaded".split("."), true)
                .setIn("posts.postsData".split("."), action.payload)
                .setIn("posts.errorMsg".split("."), "");
}

import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS({
        users: {
            usersData: [],
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

reducer.prototype[actionType.users.usersLoadUserPending] = (state, action) => {
    return state.setIn("users.loading".split("."), true)
                .setIn("users.loaded".split("."), false)
                .setIn("users.usersData".split("."), [])
                .setIn("users.errorMsg".split("."), "");
}

reducer.prototype[actionType.users.usersLoadUserRejected] = (state, action) => {
    return state.setIn("users.loading".split("."), false)
                .setIn("users.loaded".split("."), false)
                .setIn("users.usersData".split("."), [])
                .setIn("users.errorMsg".split("."), action.payload);
}
reducer.prototype[actionType.users.usersLoadUserFulfilled] = (state, action) => {
    return state.setIn("users.loading".split("."), false)
                .setIn("users.loaded".split("."), true)
                .setIn("users.usersData".split("."), action.payload)
                .setIn("users.errorMsg".split("."), "");
}

import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS({
        login: {
            userData: {},
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

reducer.prototype[actionType.login.loginLoadUserPending] = (state, action) => {
    return state.setIn("login.loading".split("."), true)
                .setIn("login.loaded".split("."), false)
                .setIn("login.favList".split("."), {})
                .setIn("login.errorMsg".split("."), "");
}

reducer.prototype[actionType.login.loginLoadUserRejected] = (state, action) => {
    return state.setIn("login.loading".split("."), false)
                .setIn("login.loaded".split("."), false)
                .setIn("login.favList".split("."), {})
                .setIn("login.errorMsg".split("."), action.payload);
}
reducer.prototype[actionType.login.loginLoadUserFulfilled] = (state, action) => {
    return state.setIn("login.loading".split("."), false)
                .setIn("login.loaded".split("."), true)
                .setIn("login.favList".split("."), action.payload)
                .setIn("login.errorMsg".split("."), "");
}

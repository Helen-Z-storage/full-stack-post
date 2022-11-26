import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS({
        register: {
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

reducer.prototype[actionType.register.registerLoadUserPending] = (state, action) => {
    return state.setIn("register.loading".split("."), true)
                .setIn("register.loaded".split("."), false)
                .setIn("register.userData".split("."), {})
                .setIn("register.errorMsg".split("."), "");
}

reducer.prototype[actionType.register.registerLoadUserRejected] = (state, action) => {
    return state.setIn("register.loading".split("."), false)
                .setIn("register.loaded".split("."), false)
                .setIn("register.userData".split("."), {})
                .setIn("register.errorMsg".split("."), action.payload);
}

reducer.prototype[actionType.register.registerLoadUserFulfilled] = (state, action) => {
    return state.setIn("register.loading".split("."), false)
                .setIn("register.loaded".split("."), true)
                .setIn("register.userData".split("."), action.payload)
                .setIn("register.errorMsg".split("."), "");
}

reducer.prototype[actionType.register.registerErrMsgReset] = (state, _) => {
    return state.setIn("register.loading".split("."), false)
                .setIn("register.loaded".split("."), false)
                .setIn("register.userData".split("."), {})
                .setIn("register.errorMsg".split("."), "");
}
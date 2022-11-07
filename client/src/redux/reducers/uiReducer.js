import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS(
        {
            error: "",
            loggedIn: false
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

reducer.prototype[actionType.ui.setLoggedIn] = (state, action) => {
    return state.set("loggedIn", action.payload);
}

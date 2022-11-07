import { actionType } from "./actionType";

export const setError = (error) => {
    return {
        type: actionType.ui.setError,
        payload: error
    }
}

export const setLoggedIn = (loggedIn) => {
    return {
        type: actionType.ui.setLoggedIn,
        payload: loggedIn
    }
}

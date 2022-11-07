import { actionType } from "./actionType";

export const setError = (error) => {
    return {
        type: actionType.ui.setError,
        payload: error
    }
}

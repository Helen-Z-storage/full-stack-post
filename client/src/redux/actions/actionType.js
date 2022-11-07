import { ActionType } from "redux-promise-middleware";
export const actionType = {
    ui: {
        setError: "UI_SETERROR",
    },
    login: {
        loginLoadUserPending:  `LOGIN_LOADUSER${ActionType.Pending}`,
        loginLoadUserFulfilled:`LOGIN_LOADUSER${ActionType.Fulfilled}`,
        loginLoadUserRejected: `LOGIN_LOADUSER${ActionType.Rejected}`
    }
}

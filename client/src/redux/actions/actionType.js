import { ActionType } from "redux-promise-middleware";
export const actionType = {
    ui: {
        setError:     "UI_SETERROR",
        setToken:     "UI_SETTOKEN",
        setPostId:    "UI_SETPOSTID",

        setUsername:  "UI_SETUSERNAME",
        setPassword:  "UI_SETPASSWORD",

        setAuthorIds: "UI_SETAUTHORIDS",
        setSortBy:    "UI_SETSORTBY",
        setDirection: "UI_DIRECTION",
        setText:      "UI_SETTEXT",
        setTags:      "UI_SETTAGS"
    },
    login: {
        loginLoadUserPending:  `LOGIN_LOADUSER${ActionType.Pending}`,
        loginLoadUserFulfilled:`LOGIN_LOADUSER${ActionType.Fulfilled}`,
        loginLoadUserRejected: `LOGIN_LOADUSER${ActionType.Rejected}`
    },
    register: {
        registerLoadUserPending:  `REGISTER_LOADUSER${ActionType.Pending}`,
        registerLoadUserFulfilled:`REGISTER_LOADUSER${ActionType.Fulfilled}`,
        registerLoadUserRejected: `REGISTER_LOADUSER${ActionType.Rejected}`
    },
    posts: {
        postsLoadUserPending:  `POSTS_LOADUSER${ActionType.Pending}`,
        postsLoadUserFulfilled:`POSTS_LOADUSER${ActionType.Fulfilled}`,
        postsLoadUserRejected: `POSTS_LOADUSER${ActionType.Rejected}`
    },
}

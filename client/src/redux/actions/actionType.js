import { ActionType } from "redux-promise-middleware";
export const actionType = {
    ui: {
        setToken:     "UI_SETTOKEN",
        setPostId:    "UI_SETPOSTID",

        setUsername:  "UI_SETUSERNAME",
        setPassword:  "UI_SETPASSWORD",

        setAuthorIds:  "UI_SETAUTHORIDS",
        setSortBy:     "UI_SETSORTBY",
        setDirection:  "UI_DIRECTION",
        setText:       "UI_SETTEXT",
        setTags:       "UI_SETTAGS",
        setTagOptions: "UI_SETTAGOPTIONS"
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
    users: {
        usersLoadPending:  `USERS_LOAD${ActionType.Pending}`,
        usersLoadFulfilled:`USERS_LOAD${ActionType.Fulfilled}`,
        usersLoadRejected: `USERS_LOAD${ActionType.Rejected}`
    },
    posts: {
        postsLoadPending:  `POSTS_LOAD${ActionType.Pending}`,
        postsLoadFulfilled:`POSTS_LOAD${ActionType.Fulfilled}`,
        postsLoadRejected: `POSTS_LOAD${ActionType.Rejected}`
    },
}

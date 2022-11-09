import { actionType } from "./actionType";

export const setError = (error) => {
    return {
        type: actionType.ui.setError,
        payload: error
    }
}

export const setToken = (token) => {
    return {
        type: actionType.ui.setToken,
        payload: token
    }
}

export const setPostId = (postId) => {
    return {
        type: actionType.ui.setPostId,
        payload: postId
    }
}

export const setUsername = (username) => {
    return {
        type: actionType.ui.setUsername,
        payload: username
    }
}

export const setPassword = (password) => {
    return {
        type: actionType.ui.setPassword,
        payload: password
    }
}

export const setAuthorIds = (authorIds) => {
    return {
        type: actionType.ui.setAuthorIds,
        payload: authorIds
    }
}
export const setSortBy = (sortBy) => {
    return {
        type: actionType.ui.setSortBy,
        payload: sortBy
    }
}
export const setDirection = (direction) => {
    return {
        type: actionType.ui.setDirection,
        payload: direction
    }
}
export const setText = (text) => {
    return {
        type: actionType.ui.setText,
        payload: text
    }
}
export const setTags = (tags) => {
    return {
        type: actionType.ui.setTags,
        payload: tags
    }
}
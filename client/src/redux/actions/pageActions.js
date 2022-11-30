import { actionType } from "./actionType";
import { get, post, patch, del } from "../../utilities/fetch";
import * as uiActions from "./uiActions";

export const loginErrMsgReset = () => {
    return (dispatch) => {
        dispatch({type: actionType.login.loginErrMsgReset});
    }
}

export const registerErrMsgReset = () => {
    return (dispatch) => {
        dispatch({type: actionType.register.registerErrMsgReset});
    }
}

export const pageLoginLoadUser = (username, password, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.login.loginLoadUserPending, payload: null});
        post("http://localhost:8080/api/login", { username: username, password: password })
        .then(res => {
            dispatch({type: actionType.login.loginLoadUserFulfilled, payload: res});
            alert("欢迎！");
            navigate('/home');
            dispatch(uiActions.setToken(res.token));
            window.localStorage.setItem("token", res.token);
            window.localStorage.setItem("username", res.username);
            dispatch(pageSearchAllUsers(res.token));
        })
        .catch(error => {dispatch({type: actionType.login.loginLoadUserRejected, payload: error.response.data.error})})
    }
}

export const pageRegisterLoadUser = (username, password, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.register.registerLoadUserPending, payload: null});
        post("http://localhost:8080/api/register", { username: username, password: password })
        .then(res => {
            dispatch({type: actionType.register.registerLoadUserFulfilled, payload: res});
            alert("成功注册！");
            navigate('/login');
        })
        .catch(error => {dispatch({type: actionType.register.registerLoadUserRejected, payload: error.response.data.error})})
    }
}

export const pageSearchAllUsers = (token) => {
    return (dispatch) => {
        dispatch({type: actionType.users.usersLoadPending, payload: null});
        get("http://localhost:8080/api/allUsers", {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.users.usersLoadFulfilled, payload: res.users});
        })
        .catch(error => {dispatch({type: actionType.users.usersLoadRejected, payload: error.response.data.error})})
    }
}

export const pageDeleteUser = (token) => {
    return (dispatch) => {
        dispatch({type: actionType.users.usersLoadPending, payload: null});
        del("http://localhost:8080/api/", {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.users.usersLoadFulfilled, payload: res.users});
            window.localStorage.clear();
            alert("成功删除");
        })
        .catch(error => {dispatch({type: actionType.users.usersLoadRejected, payload: error.response.data.error})})
    }
}

export const pageSearchAllPosts = (token) => {
    return (dispatch) => {
        dispatch({type: actionType.posts.postsLoadPending, payload: null});
        get("http://localhost:8080/api/posts/allPosts", {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.posts.postsLoadFulfilled, payload: res.posts});
        })
        .catch(error => {dispatch({type: actionType.posts.postsLoadRejected, payload: error.response.data.error})})
    }
}

export const pageSearchPosts = (postQuery, token) => {
    return (dispatch) => {

        let url = new URL("http://localhost:8080/api/posts");
        Object.keys(postQuery).forEach(key => url.searchParams.set(key, postQuery[key]));

        dispatch({type: actionType.posts.postsLoadPending, payload: null});
        get(url, {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.posts.postsLoadFulfilled, payload: res.posts});
            alert("成功查找！");
        })
        .catch(error => {dispatch({type: actionType.posts.postsLoadRejected, payload: error.response.data.error})})
    }
}

export const pageAddPosts = (postBody, token, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.posts.postsLoadPending, payload: null});
        post("http://localhost:8080/api/posts", postBody, {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.posts.postsLoadFulfilled, payload: [res.post]});
            navigate('/home');
            alert("成功增加");
        })
        .catch(error => {dispatch({type: actionType.posts.postsLoadRejected, payload: error.response.data.error})})
    }
}

export const pageUpdatePosts = (postId, postBody, token, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.posts.postsLoadPending, payload: null});
        patch(`http://localhost:8080/api/posts/${postId}`, postBody, {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.posts.postsLoadFulfilled, payload: [res.post]});
            navigate('/home');
            alert("成功更新");
        })
        .catch(error => {dispatch({type: actionType.posts.postsLoadRejected, payload: error.response.data.error})})
    }
}

export const pageDeletePosts = (postId, token, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.posts.postsLoadPending, payload: null});
        del(`http://localhost:8080/api/posts/${postId}`, {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.posts.postsLoadFulfilled, payload: [res.post]});
            navigate('/home');
            alert("成功删除");
        })
        .catch(error => {dispatch({type: actionType.posts.postsLoadRejected, payload: error.response.data.error})})
    }
}
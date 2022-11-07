import { actionType } from "./actionType";
import { get, post } from "../../utilities/fetch";

export const pageLoginLoadUser = (username, password, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.login.loginLoadUserPending, payload: null});
        post("http://localhost:8080/api/login", { username: username, password: password })
        .then(res => {
            dispatch({type: actionType.login.loginLoadUserFulfilled, payload: res});
            alert("欢迎！");
            navigate('/home');
            window.localStorage.setItem("user", res);

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

export const pageSearchPosts = (postQuery) => {
    return (dispatch) => {
        let url = new URL("http://localhost:8080/api/posts");
        const token = window.localStorage.getItem("token");
        for (const key of postQuery) {
            url.searchParams.set(key, postQuery[key]);
        }

        dispatch({type: actionType.posts.postsLoadUserPending, payload: null});
        get(url, {'x-access-token': token})
        .then(res => {
            dispatch({type: actionType.posts.postsLoadUserFulfilled, payload: res.posts});
            alert("成功查找！");
        })
        .catch(error => {dispatch({type: actionType.posts.postsLoadUserRejected, payload: error.response.data.error})})
    }
}
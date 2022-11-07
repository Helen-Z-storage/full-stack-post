import { actionType } from "./actionType";
import { post } from "../../utilities/fetch";

export const pageLoginLoadUser = (username, password, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.login.loginLoadUserPending, payload: null})
        post("http://localhost:8080/api/login", { username: username, password: password })
        .then(res => {
            dispatch({type: actionType.login.loginLoadUserFulfilled, payload: res});
            alert("欢迎！");
            navigate('/home');
            window.localStorage.setItem("token", res.token);
            window.localStorage.setItem("UserId", res.id);

        })
        .catch(error => {dispatch({type: actionType.login.loginLoadUserRejected, payload: error.response.data.error})})
    }
}

export const pageRegisterLoadUser = (username, password, navigate) => {
    return (dispatch) => {
        dispatch({type: actionType.register.registerLoadUserPending, payload: null})
        post("http://localhost:8080/api/register", { username: username, password: password })
        .then(res => {
            dispatch({type: actionType.register.registerLoadUserFulfilled, payload: res});
            alert("成功注册！");
            navigate('/login');
        })
        .catch(error => {dispatch({type: actionType.register.registerLoadUserRejected, payload: error.response.data.error})})
    }
}
import { actionType } from "./actionType";
import { post } from "../../utilities/fetch";



export const pageloginLoadUser = (username, password, navigate) => {
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
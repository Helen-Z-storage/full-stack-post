//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useJwt } from "react-jwt";

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";
import { actionType } from "./redux/actions/actionType";

function Login(props) {
  let error = props.login.getIn("login.errorMsg".split("."));
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (event) => {
    const isLoggedIn = props.ui.get("loggedIn");
    if (!isLoggedIn) {
      props.dispatch(pageActions.pageLoginLoadUser(username, password, navigate));
    }
    else {
      alert("欢迎！");
      navigate('/home');
    }
    event.preventDefault();
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    alert("欢迎下次再来！");
    navigate('/login');
  }
  
  // keep log in status
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("UserId");
    if (loggedIn) {
      props.dispatch({type: actionType.login.loginLoadUserFulfilled, payload: loggedIn});
    }
  }, []);

  return (
    <div>
    <form onSubmit={(event) => handleLogin(event)}>
      <label>
        User Name:
        <input type="text" name="username" value={username} 
            onChange={(event) => setUsername(event.target.value)}/>
      </label>
      <label>
        Password:
        <input type="text" name="password" value={password} 
            onChange={(event) => setPassword(event.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => navigate('/register')}>Register</button>
          <div>{error}</div>


    </div>
  );
}

export default connect (
  (state) => {
    return {
      ui: state.ui,
      login: state.login
    }
  })(Login);

// citation, some code from
// https://juejin.cn/post/6984667855115517988
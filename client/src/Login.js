//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useJwt } from "react-jwt";

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function Login(props) {
  let error = props.login.getIn("login.errorMsg".split("."));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (event, error) => {
    props.dispatch(pageActions.pageloginLoadUser(username, password, navigate));
    event.preventDefault();
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    props.dispatch(uiActions.setError(""));
    navigate('/login');
  }

  return (
    <div>
    <form onSubmit={(event) => handleLogin(event, props.ui.get("error"))}>
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
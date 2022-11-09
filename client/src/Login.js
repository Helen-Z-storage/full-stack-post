//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';
import { useJwt } from "react-jwt";

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";
import { actionType } from "./redux/actions/actionType";

function Login(props) {
  let error = props.login.getIn("login.errorMsg".split("."));

  const username = props.ui.get("username");
  const password = props.ui.get("password");
  const navigate = useNavigate();


  const handleLogin = (event) => {
    props.dispatch(pageActions.pageLoginLoadUser(username, password, navigate));
    event.preventDefault();
  }

  const handleLogout = () => {
    props.dispatch(uiActions.setToken(""));
    alert("欢迎下次再来！");
    navigate('/login');
  }

  useEffect(() => {
      // componentWillMount
      props.dispatch(uiActions.setUsername(""));
      props.dispatch(uiActions.setPassword(""));
      // return () => {// componmentWillUnmount}
  }, []);

  return (
    <div>
    <form onSubmit={(event) => handleLogin(event)}>
      <label>
        User Name:
        <input type="text" name="username" value={username} 
            onChange={(event) => props.dispatch(uiActions.setUsername(event.target.value))}/>
      </label>
      <label>
        Password:
        <input type="text" name="password" value={password} 
            onChange={(event) => props.dispatch(uiActions.setPassword(event.target.value))}/>
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
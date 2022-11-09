//import './App.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function Register(props) {
  let error = props.register.getIn("register.errorMsg".split("."));
  const username = props.ui.get("username");
  const password = props.ui.get("password");
  
  const navigate = useNavigate();
  
  const handleRegister = (event) => {
    props.dispatch(pageActions.pageRegisterLoadUser(username, password, navigate));
    event.preventDefault();
  }
  
  return (
    <div>
    <form onSubmit={(event) => handleRegister(event)}>
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
          <button key={1} onClick={() => navigate('/login')}>Login</button>
          <div>{error}</div>
    </div>
  );
}

export default connect (
  (state) => {
    return {
      ui: state.ui,
      register: state.register
    }
  })(Register);
// citation, some code from
// https://juejin.cn/post/6984667855115517988
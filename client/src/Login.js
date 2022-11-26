//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useJwt } from "react-jwt";
import { connect } from "react-redux";
import { Alert, Button, Form, FloatingLabel } from 'react-bootstrap';

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
      props.dispatch(pageActions.loginErrMsgReset());
      // return () => {// componmentWillUnmount}
  }, []);

  return (
    <div>
    <Form>
      <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" 
            onChange={(event) => props.dispatch(uiActions.setUsername(event.target.value))}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" 
            onChange={(event) => props.dispatch(uiActions.setPassword(event.target.value))}/>
        </FloatingLabel>

        <Button variant="primary" type="submit" onClick={(event) => handleLogin(event)}>
          Submit
        </Button>
        <Button onClick={() => navigate('/register')}>
          Register new user
        </Button>
        {error && <Alert key="danger" variant="danger"> {error} </Alert>}
    </Form>
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
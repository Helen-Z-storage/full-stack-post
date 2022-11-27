//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Alert, Button, Form, FloatingLabel } from 'react-bootstrap';

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
  
  useEffect(() => {
    // componentWillMount
    props.dispatch(uiActions.setUsername(""));
    props.dispatch(uiActions.setPassword(""));
    props.dispatch(pageActions.registerErrMsgReset());
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
          <Form.Control type="text" placeholder="name@example.com" 
            onChange={(event) => props.dispatch(uiActions.setUsername(event.target.value))}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" 
            onChange={(event) => props.dispatch(uiActions.setPassword(event.target.value))}/>
        </FloatingLabel>

        <Button variant="primary" type="submit" onClick={(event) => handleRegister(event)}>
          Register
        </Button>
        <Button onClick={() => navigate('/login')}>
          Back to Login page
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
      register: state.register
    }
  })(Register);
// citation, some code from
// https://juejin.cn/post/6984667855115517988
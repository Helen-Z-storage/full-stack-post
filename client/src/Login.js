//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useJwt } from "react-jwt";
//const jwt = require('jsonwebtoken');

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  /*
  useEffect(() =>{
    // componentWillMount
    const expireDate = window.localStorage.setItem("expireDate");
    const secondsLeft = expireDate - new Date().getTime;
    if (secondsLeft <= 0) {
      handleLogout();
    }
    // return () => {componmentWillUnmount}
  }, []);
  */

  const handleLogin = (event) => {
    callLogInAPI();
    alert("欢迎！");
    navigate('/home');
    event.preventDefault();
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    navigate('/login');
  }

  const callLogInAPI = async () => {
    const requestBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    const res = await fetch("http://localhost:8080/api/login", requestBody);
    const responseBody = await res.json();
    const { error, token } = responseBody;
    if (error) {
      setErrorMessage(error);
    }
    setApiResponse(responseBody);
    window.localStorage.setItem("token", token);
    // const { decodedToken } = useJwt(token);
    // window.localStorage.setItem("expireDate", decodedToken.exp);
    return token;
  }


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
          <div>{errorMessage}</div>


    </div>
  );
}

export default Login;

// citation, some code from
// https://juejin.cn/post/6984667855115517988
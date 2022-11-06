//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios'




function Login(props) {
  const {posts, setPosts, error, setError} = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    console.log(error);
    if (!error) {
      alert("欢迎！");
      navigate('/home');
      setError("");
    }
    event.preventDefault();
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    navigate('/login');
    setError("");
  }

  const callLogInAPI = async () => {
    /*
    const requestBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    const res = await fetch("http://localhost:8080/api/login", requestBody);
    const responseBody = await res.json();

    const { error, token, id} = responseBody;
    console.log(responseBody);
    console.log(error, token, id);
    */
    const RequestBody = JSON.stringify({ username: username, password: password });
    const config = {baseURL: "http://localhost:8080/api/"}
    axios.post("login", RequestBody).then(
      (res) => {
          //执行成功后代码处理
      }).catch(error => error)

    if (error) {
      setError(error);
    }
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("UserId", id);
    setPosts();
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
          <button key={1} onClick={() => {navigate('/register'); setError("");}}>Register</button>
          <div>{error}</div>


    </div>
  );
}

export default Login;

// citation, some code from
// https://juejin.cn/post/6984667855115517988
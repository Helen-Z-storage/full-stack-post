//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (username && password) {
      callLogInAPI();
      //this.props.history.replace("/home");
      window.localStorage.setItem("islogin", 1);
      //this.setState({ apiRequest: {username, password} });
      alert("欢迎！");
      navigate('/home');
    } else {
      setError("请输入用户名和密码！");
    }
  }

  const callLogInAPI = () => {
    const b = { username: username, password: password };
    alert(JSON.stringify(b, null, 2));
    const responseBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(b)
    };
    fetch("http://localhost:8080/api/login", responseBody)
    .then(res => {res.json();alert(JSON.stringify(res, null, 2));})
    .then(data => {setApiResponse(data);})
    .catch((error) => {
      console.error('Error:', error);
    });
    
    alert(JSON.stringify(apiResponse, null, 2));
  }


  return (
    <div>
    <form onSubmit={() => handleLogin(username, password)}>
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

export default Login;

// citation, some code from
// https://juejin.cn/post/6984667855115517988
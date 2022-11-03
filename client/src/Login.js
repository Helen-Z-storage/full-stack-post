//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (username && password) {
      //this.props.history.replace("/home");
      window.localStorage.setItem("islogin", 1);
      //this.setState({ apiRequest: {username, password} });
      alert("欢迎！");
      navigate('/home');
    } else {
      setError("请输入用户名和密码！");
    }
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
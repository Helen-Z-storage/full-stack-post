//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

let localStorage = window.localStorage

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = () => {
    if (username && password) {
        let users = localStorage.getItem("User");
        users = JSON.parse(users);
        for (const user of users) {
            if (user.username === username) {
                setError("已经注册此账户");
                return;
            }
        }
        users.push({
            id: users.length + 1,
            username: username,
            password: password
        });
        localStorage.setItem("User", JSON.stringify(users));
      alert("成功注册");
      navigate('/login');
      //event.preventDefault();
    } else {
      setError("请输入用户名和密码！");
    }
  }

  return (
    <div>
    <form onSubmit={() => handleRegister()}>
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
          <button key={1} onClick={() => navigate('/login')}>Login</button>
          <div>{error}</div>
    </div>
  );
}

export default Register;

// citation, some code from
// https://juejin.cn/post/6984667855115517988
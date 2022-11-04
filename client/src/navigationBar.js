//import './App.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';

function NavigationBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    navigate('/login');
  }
  return (
    <div>
        <button key={1} onClick={() => navigate('/home')}>Home Page</button>
        <button key={2} onClick={() => navigate('/add')}>Add Post</button>
        <button key={3} onClick={() => navigate('/search')}>Search Post</button>
        <button key={4} onClick={() => navigate('/update')}>Update Post</button>
        <button key={5} onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
}

export default NavigationBar;

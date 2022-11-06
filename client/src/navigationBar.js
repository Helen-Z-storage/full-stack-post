//import './App.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';

function NavigationBar(props) {
  const {setError} = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    navigate('/login');
    setError("");
  }
  return (
    <div>
        <button key={1} onClick={() => {navigate('/home');setError("");}}>Home Page</button>
        <button key={2} onClick={() => {navigate('/add');setError("");}}>Add Post</button>
        <button key={3} onClick={() => {navigate('/search');setError("");}}>Search Post</button>
        <button key={4} onClick={() => {navigate('/update');setError("");}}>Update Post</button>
        <button key={5} onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
}

export default NavigationBar;

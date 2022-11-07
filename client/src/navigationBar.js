//import './App.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";

function NavigationBar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    alert("欢迎下次再来！");
    navigate('/login');
  }
  return (
    <div>
        <button key={1} onClick={() => {navigate('/home');props.dispatch(uiActions.setError(""));}}>Home Page</button>
        <button key={2} onClick={() => {navigate('/add');props.dispatch(uiActions.setError(""));}}>Add Post</button>
        <button key={3} onClick={() => {navigate('/search');props.dispatch(uiActions.setError(""));}}>Search Post</button>
        <button key={4} onClick={() => {navigate('/update');props.dispatch(uiActions.setError(""));}}>Update Post</button>
        <button key={5} onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
}

export default connect ((state) => {return {ui:state.ui}})(NavigationBar);

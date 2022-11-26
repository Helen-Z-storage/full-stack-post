//import './App.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';

import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function NavigationBar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    navigate('/login');
  }

  const handleDeleting = (event) => {
    const token = props.ui.get("token");
    props.dispatch(pageActions.pageDeleteUser(token, navigate));
    event.preventDefault();
  }

  return (
    <div>
        <Button key={1} onClick={() => navigate('/home')}>Home Page</Button>
        <Button key={2} onClick={() => navigate('/add')}>Add Post</Button>
        <Button key={3} onClick={() => navigate('/search')}>Search Post</Button>
        <Button key={4} onClick={() => navigate('/update')}>Update Post</Button>
        <Button key={5} onClick={() => handleLogout()}>Log Out</Button>
        <Button key={6} onClick={(event) => handleDeleting(event)}>Delete current user</Button>
    </div>
  );
}

export default connect ((state) => {return {ui:state.ui}})(NavigationBar);

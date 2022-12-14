//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Container, Offcanvas, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function NavigationBar(props) {
  //const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
    alert("欢迎下次再来！");
  }

  const handleDeleting = (event) => {
    const token = props.ui.get("token");
    props.dispatch(pageActions.pageDeleteUser(token));
    event.preventDefault();
  }

  const username = window.localStorage.getItem("username");
  
  return (
    <Navbar bg="primary" variant="dark" fixed="top" sticky="top">
      <Container>
        <Navbar.Brand>{username}</Navbar.Brand>
        <Nav className="me-auto" defaultActiveKey="/home">
          <Nav.Link as={Link} to="/home">Home Page</Nav.Link>
          <Nav.Link as={Link} to="/add">Add Post</Nav.Link>
          <Nav.Link as={Link} to="/search">Search Post</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={() => handleLogout()}>Log Out</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={(event) => handleDeleting(event)}>Delete User</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default connect ((state) => {return {ui:state.ui}})(NavigationBar);

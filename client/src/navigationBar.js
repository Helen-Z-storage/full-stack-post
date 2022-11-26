//import './App.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Container, Offcanvas, NavDropdown, Form } from 'react-bootstrap';

import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function NavigationBar(props) {
  //const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    alert("欢迎下次再来！");
    ;
  }

  const handleDeleting = (event) => {
    const token = props.ui.get("token");
    props.dispatch(pageActions.pageDeleteUser(token));
    event.preventDefault();
  }

  return (
    /*
    <div>
        <Button key={1} onClick={() => navigate('/home')}>Home Page</Button>
        <Button key={2} onClick={() => navigate('/add')}>Add Post</Button>
        <Button key={3} onClick={() => navigate('/search')}>Search Post</Button>
        <Button key={4} onClick={() => navigate('/update')}>Update Post</Button>
        <Button key={5} onClick={() => handleLogout()}>Log Out</Button>
        <Button key={6} onClick={(event) => handleDeleting(event)}>Delete current user</Button>
    </div>
    <>
      <Navbar bg="primary" variant="dark" fixed="left">
        <Container>
          <Navbar.Brand>UserName</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Add</Nav.Link>
            <Nav.Link href="#pricing">Search</Nav.Link>
            <Nav.Link href="#pricing">LogOut</Nav.Link>
            <Nav.Link href="#pricing">DeleteUser</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    
    */
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>UserName</Navbar.Brand>
        <Nav 
        className="me-auto"
        variant="pills" 
        defaultActiveKey="/home">
          <Nav.Link href="/home">Home Page</Nav.Link>
          <Nav.Link href="/add">Add Post</Nav.Link>
          <Nav.Link href="/search">Search Post</Nav.Link>
          <Nav.Link href="/login" onClick={() => handleLogout()}>Log Out</Nav.Link>
          <Nav.Link href="/login" onClick={(event) => handleDeleting(event)}>Delete User</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default connect ((state) => {return {ui:state.ui}})(NavigationBar);

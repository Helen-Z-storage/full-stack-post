import './App.css';
import React, { useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import MainPage from './mainPage';
import AddPost from './addPost';
import SearchPost from './searchPost';
import UpdatePost from './updatePost';
import NavigationBar from './navigationBar';
import * as uiActions from "./redux/actions/uiActions";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { connect } from "react-redux";

function App(props) {
  let token = window.localStorage.getItem("token");
  
  // keep log in status
  useEffect(() => {
    if (token) {
      props.dispatch(uiActions.setToken(token));
    }
  }, []);

  return (
    <div>
    <BrowserRouter>
      {token? <NavigationBar/> : <div></div>}
      <Routes>
        <Route path="/login" element={<Login store={props}/>} />
        <Route path="/register" element={<Register store={props}/>} />
        <Route path="/home" element={<MainPage store={props}/>} />
        <Route path="/add" element={<AddPost store={props}/>} />
        <Route path="/search" element={<SearchPost store={props}/>} />
        <Route path="/update" element={<UpdatePost store={props}/>} />
        <Route path="/" element={token ? (<Navigate to="/home" exact />) : (<Navigate to="/login" exact />)}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default connect ((state) => {return {ui: state.ui}})(App);

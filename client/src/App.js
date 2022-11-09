import './App.css';
import React, { useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import MainPage from './mainPage';
import AddPost from './addPost';
import SearchPost from './searchPost';
import UpdatePost from './updatePost';
import * as uiActions from "./redux/actions/uiActions";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { connect } from "react-redux";

function App(props) {
  let token = window.localStorage.getItem("token");
  
  // keep log in status
  useEffect(() => {
    token = window.localStorage.getItem("token");
    if (token) {
      props.dispatch(uiActions.setToken(token));
    }
  }, []);

  //const [posts, setPosts, error, setError] = useFetchPosts();
  return (
    <BrowserRouter>
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
  );
}
export default connect ((state) => {return {ui: state.ui}})(App);

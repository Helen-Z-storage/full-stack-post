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
import { BrowserRouter, Route, Routes, Navigate, Outlet} from "react-router-dom";
import { connect } from "react-redux";
import { isExpired } from "./utilities/helpers";

function App(props) {
  const token = window.localStorage.getItem("token");
  
  const AuthWrapper = () => {
    if (isExpired(token)) {
      window.localStorage.clear();
      return <Navigate to="/login" replace />;
    }
    else {
      return <Outlet />;
    }
  };

  // keep log in status
  useEffect(() => {
    if (token) {
      props.dispatch(uiActions.setToken(token));
    }
  }, []);

  return (
    <div>
    <BrowserRouter>
      {token && <NavigationBar/>}
      <Routes>
        <Route path="/login" element={<Login store={props}/>} />
        <Route path="/register" element={<Register store={props}/>} />
        
        <Route element={<AuthWrapper />}>
          <Route path="/home" element={<MainPage store={props}/>} />
        </Route>
        <Route element={<AuthWrapper />}>
          <Route path="/add" element={<AddPost store={props}/>} />
        </Route>
        <Route element={<AuthWrapper />}>
          <Route path="/search" element={<SearchPost store={props}/>} />
        </Route>        
        <Route element={<AuthWrapper />}>
          <Route path="/update" element={<UpdatePost store={props}/>} />
        </Route>
        <Route path="/" element={token ? (<Navigate to="/home" exact />) : (<Navigate to="/login" exact />)}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default connect ((state) => {return {ui: state.ui}})(App);
